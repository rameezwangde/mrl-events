export default async function handler(req, res) {
  // Allow all methods to ensure PhonePe handshake passes without friction
  if (req.method === 'GET') {
    return res.status(200).send('PhonePe Webhook Active');
  }

  try {
    // In production, acknowledge receipt immediately without logging sensitive payload structures
    return res.status(200).json({
      success: true,
      message: 'Webhook received successfully'
    });
  } catch (error) {
    return res.status(200).json({ success: true });
  }
}


