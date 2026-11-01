export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(200).send('OK');
  }

  try {
    const payload = req.body;
    console.log('PhonePe Webhook Received:', JSON.stringify(payload));

    // Acknowledge receipt to PhonePe immediately
    return res.status(200).json({
      success: true,
      message: 'Webhook received successfully'
    });
  } catch (error) {
    console.error('Webhook error:', error);
    return res.status(200).json({ success: true });
  }
}
