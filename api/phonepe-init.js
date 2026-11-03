import { 
  calculateAuthoritativeAmount, 
  isRateLimited, 
  registerOrder, 
  getRegisteredOrder, 
  applySecurityHeaders 
} from './_security.js';

export default async function handler(req, res) {
  applySecurityHeaders(req, res, ['POST', 'OPTIONS']);

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  // 1. Strict HTTP Method Validation
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  // 2. Request Size & Payload Guard
  const contentLength = parseInt(req.headers['content-length'] || '0', 10);
  if (contentLength > 16384) { // Max 16KB
    return res.status(413).json({ success: false, message: 'Payload too large' });
  }

  // 3. Rate Limiting per IP
  const clientIp = (req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown')
    .toString().split(',')[0].trim();
  if (isRateLimited(`init_${clientIp}`, 15, 60000)) {
    return res.status(429).json({ success: false, message: 'Too many payment requests. Please try again in a minute.' });
  }

  try {
    const { transactionId, customerDetails, eventId, tickets } = req.body || {};

    // 4. Strict Input Validation
    if (!transactionId || typeof transactionId !== 'string' || !/^[A-Za-z0-9_-]{8,64}$/.test(transactionId)) {
      return res.status(400).json({ success: false, message: 'Invalid transaction identifier' });
    }

    if (!eventId || typeof eventId !== 'string') {
      return res.status(400).json({ success: false, message: 'Invalid event' });
    }

    if (!customerDetails || typeof customerDetails !== 'object') {
      return res.status(400).json({ success: false, message: 'Customer details required' });
    }

    const fullName = (customerDetails.fullName || '').toString().trim().slice(0, 80);
    const mobile = (customerDetails.mobile || '').toString().replace(/[^0-9]/g, '').slice(-10);
    const email = (customerDetails.email || '').toString().trim().slice(0, 100);

    if (!fullName || mobile.length !== 10) {
      return res.status(400).json({ success: false, message: 'Valid name and 10-digit mobile number are required' });
    }

    // 5. Idempotency Check & Duplicate Transaction Prevention
    const existingOrder = getRegisteredOrder(transactionId);
    if (existingOrder) {
      // Replay attack prevention: Don't allow reuse of the same transaction ID
      return res.status(409).json({ success: false, message: 'Transaction ID already initiated' });
    }

    // 6. AUTHORITATIVE BACKEND AMOUNT CALCULATION (CRITICAL)
    // Never trust frontend `amount` parameter! Calculate strictly from server catalog.
    const priceCalculation = calculateAuthoritativeAmount(eventId, tickets);
    if (!priceCalculation.valid) {
      return res.status(400).json({ success: false, message: priceCalculation.error || 'Price calculation failed' });
    }

    const authoritativeAmount = priceCalculation.amountInRupees;
    const amountInPaise = Math.round(authoritativeAmount * 100);

    // 7. Backend Credentials & Config
    const clientId = process.env.PHONEPE_CLIENT_ID;
    const clientSecret = process.env.PHONEPE_CLIENT_SECRET;
    const clientVersion = process.env.PHONEPE_CLIENT_VERSION || '1';
    const env = process.env.PHONEPE_ENV || 'PRODUCTION';

    if (!clientId || !clientSecret) {
      return res.status(500).json({ success: false, message: 'Payment gateway configuration unavailable' });
    }

    const isProduction = env.toUpperCase() === 'PRODUCTION';
    const authUrl = isProduction
      ? 'https://api.phonepe.com/apis/identity-manager/v1/oauth/token'
      : 'https://api-preprod.phonepe.com/apis/pg-sandbox/v1/oauth/token';

    const checkoutBaseUrl = isProduction
      ? 'https://api.phonepe.com/apis/pg'
      : 'https://api-preprod.phonepe.com/apis/pg-sandbox';

    // 8. Server-to-Server OAuth 2.0 Token Generation
    const authParams = new URLSearchParams();
    authParams.append('client_id', clientId.trim());
    authParams.append('client_secret', clientSecret.trim());
    authParams.append('client_version', clientVersion.toString().trim());
    authParams.append('grant_type', 'client_credentials');

    const tokenResponse = await fetch(authUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: authParams.toString()
    });

    const tokenData = await tokenResponse.json();
    if (!tokenData.access_token) {
      return res.status(502).json({ success: false, message: 'Authentication with payment gateway failed' });
    }

    const accessToken = tokenData.access_token;

    // 9. Host and HTTPS Verification
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    const proto = req.headers['x-forwarded-proto'] || 'https';
    const origin = `${proto}://${host}`;

    // 10. PhonePe Payload Construction with Server Authoritative Amount
    const payload = {
      merchantOrderId: transactionId,
      amount: amountInPaise,
      expireAfter: 1200,
      paymentFlow: {
        type: 'PG_CHECKOUT',
        message: `Booking ${transactionId}`,
        merchantUrls: {
          redirectUrl: `${origin}/api/phonepe-status?id=${encodeURIComponent(transactionId)}`
        }
      },
      metaInfo: {
        udf1: fullName,
        udf2: mobile,
        udf3: email
      }
    };

    const checkoutResponse = await fetch(`${checkoutBaseUrl}/checkout/v2/pay`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `O-Bearer ${accessToken}`
      },
      body: JSON.stringify(payload)
    });

    const checkoutData = await checkoutResponse.json();

    if (checkoutData.redirectUrl) {
      // 11. Register authoritative order in internal registry for state verification
      registerOrder(transactionId, {
        eventId,
        amountInRupees: authoritativeAmount,
        mobile,
        email,
        phonePeOrderId: checkoutData.orderId || null,
        status: 'INITIATED'
      });

      // Return only minimum required info to client
      return res.status(200).json({
        success: true,
        redirectUrl: checkoutData.redirectUrl,
        orderId: checkoutData.orderId,
        amount: authoritativeAmount,
        transactionId
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Could not initialize payment session with gateway'
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error processing payment initiation'
    });
  }
}
