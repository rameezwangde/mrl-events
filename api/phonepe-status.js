export default async function handler(req, res) {
  const transactionId = req.query.id || req.body?.transactionId;

  if (!transactionId) {
    return res.status(400).send('Transaction ID missing');
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
      : 'https://api-preprod.phonepe.com/apis/identity-manager/v1/oauth/token';

    const checkoutBaseUrl = isProduction
      ? 'https://api.phonepe.com/apis/pg'
      : 'https://api-preprod.phonepe.com/apis/pg-sandbox';

    // 1. Get Access Token
    const authParams = new URLSearchParams();
    authParams.append('client_id', clientId);
    authParams.append('client_secret', clientSecret);
    authParams.append('client_version', clientVersion);
    authParams.append('grant_type', 'client_credentials');

    const tokenResponse = await fetch(authUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: authParams.toString()
    });

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    if (!accessToken) {
      console.error('PhonePe Status Token Error:', tokenData);
      return res.redirect(302, `${origin}/events?paymentError=Auth+Failed`);
    }

    // 2. Query Order Status via /checkout/v2/order/{merchantOrderId}/status
    const statusResponse = await fetch(`${checkoutBaseUrl}/checkout/v2/order/${transactionId}/status?details=false`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `O-Bearer ${accessToken}`
      }
    });

    const statusData = await statusResponse.json();

    if (statusData.state === 'COMPLETED') {
      return res.redirect(302, `${origin}/booking-success?bookingId=${transactionId}&status=SUCCESS`);
    } else if (statusData.state === 'PENDING') {
      return res.redirect(302, `${origin}/booking-success?bookingId=${transactionId}&status=PENDING`);
    } else {
      return res.redirect(302, `${origin}/events?paymentError=${encodeURIComponent(statusData.state || 'Payment Failed')}`);
    }
  } catch (error) {
    console.error('PhonePe verification error:', error);
    return res.redirect(302, `${origin}/events?paymentError=Verification+Error`);
  }
}
