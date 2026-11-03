import { 
  getRegisteredOrder, 
  updateRegisteredOrder, 
  isRateLimited, 
  applySecurityHeaders 
} from './_security.js';

export default async function handler(req, res) {
  applySecurityHeaders(req, res, ['GET', 'OPTIONS']);

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const transactionId = (req.query.id || '').toString().trim();
  if (!transactionId || !/^[A-Za-z0-9_-]{8,64}$/.test(transactionId)) {
    return res.status(400).json({ success: false, message: 'Invalid or missing transaction ID' });
  }

  // Rate Limiting
  const clientIp = (req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown')
    .toString().split(',')[0].trim();
  if (isRateLimited(`verify_${clientIp}`, 30, 60000)) {
    return res.status(429).json({ success: false, message: 'Too many verification requests' });
  }

  const clientId = process.env.PHONEPE_CLIENT_ID;
  const clientSecret = process.env.PHONEPE_CLIENT_SECRET;
  const clientVersion = process.env.PHONEPE_CLIENT_VERSION || '1';
  const env = process.env.PHONEPE_ENV || 'PRODUCTION';

  try {
    const isProduction = env.toUpperCase() === 'PRODUCTION';

    const authUrl = isProduction
      ? 'https://api.phonepe.com/apis/identity-manager/v1/oauth/token'
      : 'https://api-preprod.phonepe.com/apis/pg-sandbox/v1/oauth/token';

    const checkoutBaseUrl = isProduction
      ? 'https://api.phonepe.com/apis/pg'
      : 'https://api-preprod.phonepe.com/apis/pg-sandbox';

    // 1. Authenticate with PhonePe Server-Side
    const authParams = new URLSearchParams();
    authParams.append('client_id', (clientId || '').trim());
    authParams.append('client_secret', (clientSecret || '').trim());
    authParams.append('client_version', (clientVersion || '1').toString().trim());
    authParams.append('grant_type', 'client_credentials');

    const tokenResponse = await fetch(authUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: authParams.toString()
    });

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    if (!accessToken) {
      return res.status(502).json({ success: false, state: 'AUTH_FAILED', verified: false });
    }

    // 2. Query PhonePe Order Status directly from PhonePe's Gateway API
    const statusResponse = await fetch(`${checkoutBaseUrl}/checkout/v2/order/${encodeURIComponent(transactionId)}/status?details=false`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `O-Bearer ${accessToken}`
      }
    });

    const statusData = await statusResponse.json();

    // 3. Reconcile with Authoritative Registry & Check for Amount Tampering
    const registered = getRegisteredOrder(transactionId);
    let amountTampered = false;

    if (registered && statusData.amount) {
      const expectedPaise = Math.round(registered.amountInRupees * 100);
      if (statusData.amount !== expectedPaise) {
        amountTampered = true;
        updateRegisteredOrder(transactionId, { status: 'FRAUD_AMOUNT_MISMATCH' });
      }
    }

    if (amountTampered) {
      return res.status(403).json({
        success: false,
        verified: false,
        state: 'FRAUD_DETECTED',
        message: 'Transaction amount verification failed'
      });
    }

    const isCompleted = statusData.state === 'COMPLETED';

    if (isCompleted) {
      updateRegisteredOrder(transactionId, { status: 'COMPLETED' });
    }

    // Return only sanitized verification indicators, never raw tokens or internal fields
    return res.status(200).json({
      success: true,
      verified: isCompleted,
      state: statusData.state || 'UNKNOWN',
      bookingId: transactionId,
      amount: statusData.amount ? statusData.amount / 100 : registered?.amountInRupees || null
    });
  } catch (error) {
    return res.status(500).json({ success: false, verified: false, message: 'Verification lookup failed' });
  }
}
