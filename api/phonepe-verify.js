export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const transactionId = req.query.id;
  if (!transactionId || typeof transactionId !== 'string') {
    return res.status(400).json({ success: false, message: 'Invalid or missing transaction ID' });
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
      return res.status(401).json({ success: false, state: 'AUTH_FAILED', verified: false });
    }

    // 2. Query PhonePe Order Status directly from PhonePe's API
    const statusResponse = await fetch(`${checkoutBaseUrl}/checkout/v2/order/${encodeURIComponent(transactionId)}/status?details=false`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `O-Bearer ${accessToken}`
      }
    });

    const statusData = await statusResponse.json();

    return res.status(200).json({
      success: true,
      verified: statusData.state === 'COMPLETED',
      state: statusData.state || 'UNKNOWN',
      bookingId: transactionId
    });
  } catch (error) {
    return res.status(500).json({ success: false, verified: false, message: 'Verification lookup failed' });
  }
}
