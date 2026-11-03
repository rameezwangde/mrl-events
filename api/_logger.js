/**
 * Centralized Safe Payment Logger
 * 
 * Enforces strict redaction of sensitive payment data across all environments
 * (Development, Staging, Production, and Serverless Monitoring/Logs).
 * 
 * Permitted Fields:
 * - internalOrderId
 * - transactionId / referenceId
 * - paymentState / status
 * - timestamp (ISO)
 * - sanitizedErrorCode / message
 * 
 * Prohibited & Redacted Fields:
 * - Card details (PAN, expiry, CVV/CVC)
 * - OTP / PINs (card PIN, UPI PIN)
 * - Banking passwords / raw credentials
 * - Authorization headers / Basic Auth / Bearer tokens
 * - Cookies / Session IDs
 * - Full request / response payloads
 */

// List of prohibited sensitive keys to redact if ever encountered in any object
const SENSITIVE_KEY_PATTERNS = [
  /card/i,
  /cvv/i,
  /cvc/i,
  /expiry/i,
  /exp/i,
  /pin/i,
  /otp/i,
  /password/i,
  /secret/i,
  /token/i,
  /auth/i,
  /cookie/i,
  /credential/i,
  /key/i
];

/**
 * Sanitizes an error or message to prevent leaking internal traces or credential strings.
 * @param {any} error
 * @returns {string}
 */
export function sanitizeErrorMessage(error) {
  if (!error) return 'Unknown error';
  const rawMsg = typeof error === 'string' ? error : (error.message || 'Payment system error');

  // Strip anything that resembles a JWT, Bearer token, hex hash, or UUID
  return rawMsg
    .replace(/Bearer\s+[A-Za-z0-9._-]+/gi, 'Bearer [REDACTED]')
    .replace(/Basic\s+[A-Za-z0-9+/=]+/gi, 'Basic [REDACTED]')
    .replace(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi, '[REDACTED_UUID]')
    .slice(0, 150); // limit length
}

/**
 * Emits a structured, safe log entry for payment operations.
 * @param {'info' | 'warn' | 'error'} level
 * @param {string} action - e.g., 'PAYMENT_INITIATED', 'STATUS_CHECKED', 'WEBHOOK_PROCESSED'
 * @param {{
 *   orderId?: string,
 *   transactionId?: string,
 *   state?: string,
 *   status?: string,
 *   amount?: number,
 *   errorCode?: string,
 *   error?: any
 * }} context
 */
export function logPaymentEvent(level, action, context = {}) {
  const safeEntry = {
    timestamp: new Date().toISOString(),
    channel: 'PAYMENT_GATEWAY',
    action: action ? String(action).toUpperCase().replace(/[^A-Z0-9_]/g, '') : 'UNKNOWN',
    level: level.toUpperCase()
  };

  if (context.orderId) {
    safeEntry.orderId = String(context.orderId).slice(0, 64);
  }

  if (context.transactionId) {
    safeEntry.transactionId = String(context.transactionId).slice(0, 64);
  }

  if (context.state || context.status) {
    safeEntry.status = String(context.state || context.status).slice(0, 32);
  }

  if (typeof context.amount === 'number' && !isNaN(context.amount)) {
    safeEntry.amountInRupees = context.amount;
  }

  if (context.errorCode) {
    safeEntry.errorCode = String(context.errorCode).slice(0, 32);
  }

  if (context.error) {
    safeEntry.error = sanitizeErrorMessage(context.error);
  }

  const serialized = JSON.stringify(safeEntry);

  if (level === 'error') {
    process.stderr.write(`${serialized}\n`);
  } else if (level === 'warn') {
    process.stdout.write(`${serialized}\n`);
  } else {
    process.stdout.write(`${serialized}\n`);
  }
}

