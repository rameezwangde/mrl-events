export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    const { amount, transactionId, customerDetails } = req.body;

    if (!amount || !transactionId) {
      return res.status(400).json({ success: false, message: 'Missing amount or transactionId' });
    }

    const clientId = process.env.PHONEPE_CLIENT_ID;
    const clientSecret = process.env.PHONEPE_CLIENT_SECRET;
    const clientVersion = process.env.PHONEPE_CLIENT_VERSION || '1';
    const env = process.env.PHONEPE_ENV || 'PRODUCTION';

    if (!clientId || !clientSecret) {
      return res.status(400).json({
        success: false,
        message: 'PhonePe PHONEPE_CLIENT_ID or PHONEPE_CLIENT_SECRET is missing in environment variables.'
      });
    }

    const isProduction = env.toUpperCase() === 'PRODUCTION';

    // 1. URLs for OAuth & Checkout
    const authUrl = isProduction
      ? 'https://api.phonepe.com/apis/identity-manager/v1/oauth/token'
      : 'https://api-preprod.phonepe.com/apis/pg-sandbox/v1/oauth/token';

    const checkoutBaseUrl = isProduction
      ? 'https://api.phonepe.com/apis/pg'
      : 'https://api-preprod.phonepe.com/apis/pg-sandbox';

    // 2. Request OAuth 2.0 Access Token
    const authParams = new URLSearchParams();
    authParams.append('client_id', clientId);
    authParams.append('client_secret', clientSecret);
    authParams.append('client_version', clientVersion);
    authParams.append('grant_type', 'client_credentials');

    const tokenResponse = await fetch(authUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: authParams.toString()
    });

    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token) {
      console.error('PhonePe OAuth error:', tokenData);
      const errDetail = tokenData.error_description || tokenData.error || tokenData.message || JSON.stringify(tokenData);
      return res.status(400).json({
        success: false,
        message: `PhonePe Auth Error: ${errDetail}`,
        details: tokenData
      });
    }

    const accessToken = tokenData.access_token;

    // 3. Build Redirect URL back to your site
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    const proto = req.headers['x-forwarded-proto'] || 'https';
    const origin = `${proto}://${host}`;

    // Amount in paisa (₹1 = 100)
    const amountInPaise = Math.round(Number(amount) * 100);

    const payload = {
      merchantOrderId: transactionId,
      amount: amountInPaise,
      expireAfter: 1200,
      paymentFlow: {
        type: 'PG_CHECKOUT',
        message: `MRL Events Booking ${transactionId}`,
        merchantUrls: {
          redirectUrl: `${origin}/api/phonepe-status?id=${transactionId}`
        }
      },
      metaInfo: {
        udf1: customerDetails?.fullName || 'Guest',
        udf2: customerDetails?.mobile || '9999999999',
        udf3: customerDetails?.email || ''
      }
    };

    // 4. Create Payment via /checkout/v2/pay
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
      return res.status(200).json({
        success: true,
        redirectUrl: checkoutData.redirectUrl,
        orderId: checkoutData.orderId,
        transactionId
      });
    } else {
      console.error('PhonePe checkout error:', checkoutData);
      return res.status(400).json({
        success: false,
        message: checkoutData.message || 'Payment initiation failed',
        code: checkoutData.code || null,
        details: checkoutData
      });
    }
  } catch (error) {
    console.error('PhonePe API Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal server error initializing PhonePe'
    });
  }
}
