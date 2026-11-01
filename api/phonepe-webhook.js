export default async function handler(req, res) {
  // Allow all methods to ensure PhonePe handshake passes without friction
  if (req.method === 'GET') {
    return res.status(200).send('PhonePe Webhook Active');
  }

  try {
    const payload = req.body;
    console.log('PhonePe Webhook Received:', JSON.stringify(payload));

    // Respond immediately with HTTP 200 OK
    return res.status(200).json({
      success: true,
      message: 'Webhook received successfully'
    });
  } catch (error) {
    console.error('Webhook error:', error);
    return res.status(200).json({ success: true });
  }
}


