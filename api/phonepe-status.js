import crypto from 'crypto';

export default async function handler(req, res) {
  const transactionId = req.query.id || req.body?.transactionId;

  if (!transactionId) {
    return res.status(400).send('Transaction ID missing');
  }

  const merchantId = process.env.PHONEPE_MERCHANT_ID || 'PGTESTPAYUAT86';
  const saltKey = process.env.PHONEPE_SALT_KEY || '96434309-7796-489d-8924-ab56988a6076';
  const saltIndex = process.env.PHONEPE_SALT_INDEX || '1';
  const env = process.env.PHONEPE_ENV || 'UAT';

  const baseUrl = env.toUpperCase() === 'PRODUCTION'
    ? 'https://api.phonepe.com/apis/hermes'
    : 'https://api-preprod.phonepe.com/apis/pg-sandbox';

  const host = req.headers['x-forwarded-host'] || req.headers.host;
  const proto = req.headers['x-forwarded-proto'] || 'https';
  const origin = `${proto}://${host}`;

  try {
    const statusEndpoint = `/pg/v1/status/${merchantId}/${transactionId}`;
    const stringToHash = statusEndpoint + saltKey;
    const sha256 = crypto.createHash('sha256').update(stringToHash).digest('hex');
    const xVerify = `${sha256}###${saltIndex}`;

    const response = await fetch(`${baseUrl}${statusEndpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-VERIFY': xVerify,
        'X-MERCHANT-ID': merchantId,
        'accept': 'application/json'
      }
    });

    const data = await response.json();

    if (data.code === 'PAYMENT_SUCCESS') {
      // Payment Successful -> Redirect to frontend success screen with booking ID
      return res.redirect(302, `${origin}/booking-success?bookingId=${transactionId}&status=SUCCESS`);
    } else if (data.code === 'PAYMENT_PENDING') {
      return res.redirect(302, `${origin}/booking-success?bookingId=${transactionId}&status=PENDING`);
    } else {
      // Failed or cancelled
      return res.redirect(302, `${origin}/events?paymentError=${encodeURIComponent(data.message || 'Payment failed or cancelled')}`);
    }
  } catch (error) {
    console.error('PhonePe verification error:', error);
    return res.redirect(302, `${origin}/events?paymentError=Payment+Verification+Error`);
  }
}

