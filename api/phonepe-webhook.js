import crypto from 'crypto';
import { 
  getRegisteredOrder, 
  updateRegisteredOrder, 
  isRateLimited, 
  applySecurityHeaders 
} from './_security.js';

/**
 * Authenticates PhonePe S2S webhook using timing-safe comparison
 * for the configured SHA/Basic Auth scheme.
 * @param {string} authHeader
 * @returns {boolean}
 */
function verifyWebhookAuthentication(authHeader) {
  if (!authHeader || typeof authHeader !== 'string') {
    return false;
  }

  const expectedUsername = (process.env.PHONEPE_WEBHOOK_USERNAME || 'mrlevents').trim();
  const expectedPassword = (process.env.PHONEPE_WEBHOOK_PASSWORD || 'MrlEvents2026').trim();

  // 1. Support Standard Basic Auth: "Basic <base64>"
  if (authHeader.startsWith('Basic ')) {
    const base64Credentials = authHeader.slice(6).trim();
    try {
      const decoded = Buffer.from(base64Credentials, 'base64').toString('utf8');
      const colonIdx = decoded.indexOf(':');
      if (colonIdx === -1) return false;

      const user = decoded.substring(0, colonIdx);
      const pass = decoded.substring(colonIdx + 1);

      const userBuf = Buffer.from(user);
      const expUserBuf = Buffer.from(expectedUsername);
      const passBuf = Buffer.from(pass);
      const expPassBuf = Buffer.from(expectedPassword);

      if (userBuf.length !== expUserBuf.length || passBuf.length !== expPassBuf.length) {
        return false;
      }

      return crypto.timingSafeEqual(userBuf, expUserBuf) && crypto.timingSafeEqual(passBuf, expPassBuf);
    } catch (e) {
      return false;
    }
  }

  // 2. Support SHA-256 Signature Auth Scheme: SHA256(username + ":" + password)
  const expectedSha = crypto.createHash('sha256').update(`${expectedUsername}:${expectedPassword}`).digest('hex');
  const incomingClean = authHeader.replace(/^(SHA256|Bearer|Basic)\s+/i, '').trim();

  try {
    const incomingBuf = Buffer.from(incomingClean);
    const expectedBuf = Buffer.from(expectedSha);
    if (incomingBuf.length === expectedBuf.length && crypto.timingSafeEqual(incomingBuf, expectedBuf)) {
      return true;
    }
  } catch (e) {}

  return false;
}

export default async function handler(req, res) {
  applySecurityHeaders(req, res, ['POST']);

  // 1. Enforce POST Method
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  // 2. Rate Limiting (Protection against Denial-of-Service / Flooding)
  const clientIp = (req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown')
    .toString().split(',')[0].trim();
  if (isRateLimited(`webhook_${clientIp}`, 60, 60000)) {
    return res.status(429).json({ success: false, message: 'Too Many Requests' });
  }

  // 3. Request Size Limit (Protect against large payload attacks)
  const contentLength = parseInt(req.headers['content-length'] || '0', 10);
  if (contentLength > 32768) {
    return res.status(413).json({ success: false, message: 'Payload Too Large' });
  }

  // 4. Authenticate Webhook Caller (Reject unauthenticated callbacks)
  const authHeader = req.headers['authorization'] || req.headers['Authorization'];
  const isAuthenticated = verifyWebhookAuthentication(authHeader);

  if (!isAuthenticated) {
    // Audit Log only safe metadata
    return res.status(401).json({ success: false, message: 'Unauthorized callback' });
  }

  try {
    const payload = req.body || {};
    
    // Extract transaction & order identifiers
    const merchantOrderId = (payload?.payload?.merchantOrderId || payload?.data?.merchantOrderId || payload?.merchantOrderId || '').toString().trim();
    const orderState = (payload?.payload?.state || payload?.data?.state || payload?.state || '').toString().trim();
    const phonePeOrderId = (payload?.payload?.orderId || payload?.data?.orderId || payload?.orderId || '').toString().trim();
    const reportedAmountPaise = payload?.payload?.amount || payload?.data?.amount || payload?.amount;

    if (!merchantOrderId || !/^[A-Za-z0-9_-]{8,64}$/.test(merchantOrderId)) {
      return res.status(400).json({ success: false, message: 'Invalid order identifier' });
    }

    // 5. Compare with Stored Authoritative Order Record (Reconciliation)
    const storedOrder = getRegisteredOrder(merchantOrderId);

    if (storedOrder) {
      // 6. Idempotency Check: Protect against duplicate callbacks
      if (storedOrder.status === 'COMPLETED' && orderState === 'COMPLETED') {
        // Already processed; respond 200 without duplicate execution
        return res.status(200).json({ success: true, message: 'Callback already processed' });
      }

      // 7. Amount Verification: Confirm paid amount matches stored order
      if (reportedAmountPaise !== undefined && storedOrder.amountInRupees) {
        const expectedPaise = Math.round(storedOrder.amountInRupees * 100);
        if (Number(reportedAmountPaise) !== expectedPaise) {
          // Amount mismatch - Possible tampering attempt
          updateRegisteredOrder(merchantOrderId, { status: 'FRAUD_AMOUNT_MISMATCH' });
          return res.status(400).json({ success: false, message: 'Amount verification failed' });
        }
      }

      // 8. Server-Side Payment Status Verification using PhonePe API
      // Independent reconciliation: query PhonePe directly to guarantee state
      const clientId = process.env.PHONEPE_CLIENT_ID;
      const clientSecret = process.env.PHONEPE_CLIENT_SECRET;
      const clientVersion = process.env.PHONEPE_CLIENT_VERSION || '1';
      const env = process.env.PHONEPE_ENV || 'PRODUCTION';

      if (clientId && clientSecret) {
        const isProduction = env.toUpperCase() === 'PRODUCTION';
        const authUrl = isProduction
          ? 'https://api.phonepe.com/apis/identity-manager/v1/oauth/token'
          : 'https://api-preprod.phonepe.com/apis/pg-sandbox/v1/oauth/token';

        const checkoutBaseUrl = isProduction
          ? 'https://api.phonepe.com/apis/pg'
          : 'https://api-preprod.phonepe.com/apis/pg-sandbox';

        const authParams = new URLSearchParams();
        authParams.append('client_id', clientId.trim());
        authParams.append('client_secret', clientSecret.trim());
        authParams.append('client_version', clientVersion.toString().trim());
        authParams.append('grant_type', 'client_credentials');

        const tokenResponse = await fetch(authUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: authParams.toString()
        });

        const tokenData = await tokenResponse.json();
        const accessToken = tokenData?.access_token;

        if (accessToken) {
          const verifyResponse = await fetch(`${checkoutBaseUrl}/checkout/v2/order/${encodeURIComponent(merchantOrderId)}/status?details=false`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `O-Bearer ${accessToken}`
            }
          });

          const verifyData = await verifyResponse.json();

          if (verifyData.state === 'COMPLETED') {
            updateRegisteredOrder(merchantOrderId, {
              status: 'COMPLETED',
              phonePeOrderId: verifyData.orderId || phonePeOrderId || null,
              verifiedAt: Date.now()
            });
          } else {
            updateRegisteredOrder(merchantOrderId, {
              status: verifyData.state || orderState || 'UNKNOWN'
            });
          }
        }
      } else {
        // Fallback update if credentials temporarily unavailable
        updateRegisteredOrder(merchantOrderId, {
          status: orderState === 'COMPLETED' ? 'COMPLETED' : orderState,
          phonePeOrderId: phonePeOrderId || null
        });
      }
    }

    // 9. Respond with HTTP 200 OK without leaking sensitive metadata
    return res.status(200).json({
      success: true,
      message: 'Callback processed successfully'
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Callback processing error' });
  }
}
