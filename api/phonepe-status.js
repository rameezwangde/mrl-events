import { 
  getRegisteredOrder, 
  updateRegisteredOrder, 
  isRateLimited, 
  applySecurityHeaders 
} from './_security.js';
import { logPaymentEvent } from './_logger.js';

export default async function handler(req, res) {
  applySecurityHeaders(req, res, ['GET', 'POST']);

  // Extract transaction ID from query or body
  const transactionId = (req.query.id || req.body?.transactionId || '').toString().trim();

  // Validate transaction identifier syntax
  if (!transactionId || !/^[A-Za-z0-9_-]{8,64}$/.test(transactionId)) {
    return res.status(400).send('Bad Request: Invalid transaction identifier');
  }

  // Rate Limiting
  const clientIp = (req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown')
    .toString().split(',')[0].trim();
  if (isRateLimited(`status_${clientIp}`, 30, 60000)) {
    return res.status(429).send('Too Many Requests');
  }

  const clientId = process.env.PHONEPE_CLIENT_ID;
  const clientSecret = process.env.PHONEPE_CLIENT_SECRET;
  const clientVersion = process.env.PHONEPE_CLIENT_VERSION || '1';
  const env = process.env.PHONEPE_ENV || 'PRODUCTION';

  const host = req.headers['x-forwarded-host'] || req.headers.host;
  const proto = req.headers['x-forwarded-proto'] || 'https';
  const origin = `${proto}://${host}`;

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
      return res.redirect(302, `${origin}/events?paymentError=Auth+Failed`);
    }

    // 2. Query Authoritative Order Status from PhonePe Gateway
    const statusResponse = await fetch(`${checkoutBaseUrl}/checkout/v2/order/${encodeURIComponent(transactionId)}/status?details=false`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `O-Bearer ${accessToken}`
      }
    });

    const statusData = await statusResponse.json();

    // 3. Compare with registered order amount to prevent tampering
    const registered = getRegisteredOrder(transactionId);
    if (registered && statusData.amount) {
      const expectedPaise = Math.round(registered.amountInRupees * 100);
      if (statusData.amount !== expectedPaise) {
        // Amount mismatch detected! Fraud alert
        updateRegisteredOrder(transactionId, { status: 'FRAUD_DETECTED' });
        logPaymentEvent('error', 'PAYMENT_AMOUNT_FRAUD_DETECTED', {
          transactionId,
          status: 'FRAUD_DETECTED',
          amount: statusData.amount / 100
        });
        return res.redirect(302, `${origin}/events?paymentError=Security+Verification+Failed`);
      }
    }

    // 4. Update order status and redirect safely
    logPaymentEvent('info', 'REDIRECT_STATUS_EVALUATED', {
      transactionId,
      status: statusData.state || 'UNKNOWN'
    });

    if (statusData.state === 'COMPLETED') {
      updateRegisteredOrder(transactionId, { status: 'COMPLETED' });
      return res.redirect(302, `${origin}/booking-success?bookingId=${encodeURIComponent(transactionId)}&status=SUCCESS`);
    } else if (statusData.state === 'PENDING') {
      updateRegisteredOrder(transactionId, { status: 'PENDING' });
      return res.redirect(302, `${origin}/booking-success?bookingId=${encodeURIComponent(transactionId)}&status=PENDING`);
    } else {
      updateRegisteredOrder(transactionId, { status: 'FAILED' });
      return res.redirect(302, `${origin}/events?paymentError=${encodeURIComponent(statusData.state || 'Payment Failed')}`);
    }
  } catch (error) {
    logPaymentEvent('error', 'STATUS_CHECK_EXCEPTION', { error, transactionId });
    return res.redirect(302, `${origin}/events?paymentError=Verification+Error`);
  }
}
