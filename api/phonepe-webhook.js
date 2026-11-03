import { 
  updateRegisteredOrder, 
  isRateLimited, 
  applySecurityHeaders 
} from './_security.js';

export default async function handler(req, res) {
  applySecurityHeaders(req, res, ['POST']);

  // Strictly POST only
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  // Rate Limiting
  const clientIp = (req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown')
    .toString().split(',')[0].trim();
  if (isRateLimited(`webhook_${clientIp}`, 60, 60000)) {
    return res.status(429).json({ success: false, message: 'Rate limit exceeded' });
  }

  // Request Size Guard
  const contentLength = parseInt(req.headers['content-length'] || '0', 10);
  if (contentLength > 32768) {
    return res.status(413).json({ success: false, message: 'Payload too large' });
  }

  try {
    const payload = req.body;
    
    // Extract transaction order state if available
    const orderId = payload?.data?.orderId || payload?.orderId || payload?.merchantOrderId;
    const state = payload?.data?.state || payload?.state;

    if (orderId && state) {
      updateRegisteredOrder(orderId, {
        status: state === 'COMPLETED' ? 'COMPLETED' : state
      });
    }

    // Always respond 200 OK without leaking server internals
    return res.status(200).json({
      success: true,
      message: 'Webhook received'
    });
  } catch (error) {
    return res.status(200).json({ success: true });
  }
}
