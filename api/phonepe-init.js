import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    const { amount, transactionId, customerDetails, eventId } = req.body;

    if (!amount || !transactionId) {
      return res.status(400).json({ success: false, message: 'Missing amount or transactionId' });
    }

    const merchantId = process.env.PHONEPE_MERCHANT_ID || 'PGTESTPAYUAT86';
    const saltKey = process.env.PHONEPE_SALT_KEY || '96434309-7796-489d-8924-ab56988a6076';
    const saltIndex = process.env.PHONEPE_SALT_INDEX || '1';
    const env = process.env.PHONEPE_ENV || 'UAT';

    const baseUrl = env.toUpperCase() === 'PRODUCTION'
      ? 'https://api.phonepe.com/apis/hermes'
      : 'https://api-preprod.phonepe.com/apis/pg-sandbox';

    // Build origin URL for redirects
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    const proto = req.headers['x-forwarded-proto'] || 'https';
    const origin = `${proto}://${host}`;

    // Amount in paise (₹1 = 100 paise)
    const amountInPaise = Math.round(Number(amount) * 100);

    const payload = {
      merchantId: merchantId,
      merchantTransactionId: transactionId,
      merchantUserId: `MRL_${(customerDetails?.mobile || 'USER').replace(/[^0-9a-zA-Z]/g, '').slice(-10) || 'GUEST'}`,
      amount: amountInPaise,
      redirectUrl: `${origin}/api/phonepe-status?id=${transactionId}`,
      redirectMode: 'POST',
      callbackUrl: `${origin}/api/phonepe-status?id=${transactionId}`,
      mobileNumber: customerDetails?.mobile?.replace(/[^0-9]/g, '').slice(-10) || '9999999999',
      paymentInstrument: {
        type: 'PAY_PAGE'
      }
    };

    const base64Payload = Buffer.from(JSON.stringify(payload)).toString('base64');
    const apiEndpoint = '/pg/v1/pay';
    const stringToHash = base64Payload + apiEndpoint + saltKey;
    const sha256 = crypto.createHash('sha256').update(stringToHash).digest('hex');
    const xVerify = `${sha256}###${saltIndex}`;

    const response = await fetch(`${baseUrl}${apiEndpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-VERIFY': xVerify,
        'accept': 'application/json'
      },
      body: JSON.stringify({
        request: base64Payload
      })
    });

    const data = await response.json();

    if (data.success && data.data?.instrumentResponse?.redirectInfo?.url) {
      return res.status(200).json({
        success: true,
        redirectUrl: data.data.instrumentResponse.redirectInfo.url,
        transactionId
      });
    } else {
      return res.status(400).json({
        success: false,
        message: data.message || 'PhonePe payment initiation failed',
        details: data
      });
    }
  } catch (error) {
    console.error('PhonePe init error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal server error initializing PhonePe payment'
    });
  }
}

