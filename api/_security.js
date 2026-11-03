// Authoritative Server-Side Catalog of Events & Ticket Prices
// The client CANNOT dictate ticket prices. Prices are strictly looked up and calculated here.
export const AUTHORITATIVE_CATALOG = {
  'mrl-test-1rs': {
    title: 'MRL LIVE TEST SHOW (₹1)',
    tickets: {
      'test-pass': { name: 'TEST PASS', price: 1 }
    }
  },
  'mrl-live-2026': {
    title: 'MRL LIVE EXPERIENCE',
    tickets: {
      'standard': { name: 'STANDARD', price: 999 },
      'vip': { name: 'VIP', price: 1999 },
      'vvip': { name: 'VVIP', price: 3499 }
    }
  },
  'corp-exp-2026': {
    title: 'CORPORATE EXPERIENCE NIGHT',
    tickets: {
      'standard': { name: 'STANDARD', price: 1499 },
      'vip': { name: 'VIP', price: 2999 },
      'vvip': { name: 'VVIP', price: 4999 }
    }
  },
  'grand-stage-2026': {
    title: 'THE GRAND STAGE',
    tickets: {
      'standard': { name: 'STANDARD', price: 799 },
      'vip': { name: 'VIP', price: 1599 },
      'vvip': { name: 'VVIP', price: 2499 }
    }
  }
};

/**
 * Calculates authoritative server-side amount based on eventId and selected ticket items.
 * @param {string} eventId
 * @param {Array<{id: string, quantity: number}>} items
 * @returns {{ valid: boolean, amountInRupees: number, error?: string }}
 */
export function calculateAuthoritativeAmount(eventId, items) {
  if (!eventId || typeof eventId !== 'string') {
    return { valid: false, amountInRupees: 0, error: 'Invalid event ID' };
  }

  const event = AUTHORITATIVE_CATALOG[eventId.trim()];
  if (!event) {
    return { valid: false, amountInRupees: 0, error: 'Unknown event' };
  }

  if (!Array.isArray(items) || items.length === 0) {
    return { valid: false, amountInRupees: 0, error: 'At least one ticket must be selected' };
  }

  let total = 0;
  let totalTickets = 0;

  for (const item of items) {
    if (!item || !item.id || typeof item.quantity !== 'number') {
      return { valid: false, amountInRupees: 0, error: 'Invalid ticket structure' };
    }

    const qty = Math.floor(item.quantity);
    if (qty < 0 || qty > 10) {
      return { valid: false, amountInRupees: 0, error: 'Ticket quantity must be between 1 and 10' };
    }

    if (qty === 0) continue;

    const ticketConfig = event.tickets[item.id.trim()];
    if (!ticketConfig) {
      return { valid: false, amountInRupees: 0, error: `Invalid ticket tier: ${item.id}` };
    }

    total += ticketConfig.price * qty;
    totalTickets += qty;
  }

  if (totalTickets === 0 || total <= 0) {
    return { valid: false, amountInRupees: 0, error: 'No tickets selected' };
  }

  return { valid: true, amountInRupees: total };
}

// In-Memory Rate Limiter (sliding window per IP/key)
const rateLimitMap = new Map();

/**
 * Rate limits requests per IP or identifier.
 * @param {string} key
 * @param {number} maxRequests
 * @param {number} windowMs
 * @returns {boolean} true if request allowed, false if limit exceeded
 */
export function isRateLimited(key, maxRequests = 20, windowMs = 60000) {
  const now = Date.now();
  const entry = rateLimitMap.get(key) || [];
  const validTimestamps = entry.filter(ts => now - ts < windowMs);

  if (validTimestamps.length >= maxRequests) {
    return true;
  }

  validTimestamps.push(now);
  rateLimitMap.set(key, validTimestamps);
  return false;
}

// Global Order Store for Idempotency & Verification Tracking
// Maps transactionId -> { eventId, amountInRupees, customerMobile, createdAt, status, phonePeOrderId }
const orderRegistry = globalThis.__MRL_ORDER_REGISTRY__ || new Map();
globalThis.__MRL_ORDER_REGISTRY__ = orderRegistry;

export function registerOrder(transactionId, orderData) {
  orderRegistry.set(transactionId, {
    ...orderData,
    createdAt: Date.now()
  });
}

export function getRegisteredOrder(transactionId) {
  return orderRegistry.get(transactionId) || null;
}

export function updateRegisteredOrder(transactionId, updates) {
  const existing = orderRegistry.get(transactionId);
  if (existing) {
    orderRegistry.set(transactionId, { ...existing, ...updates });
  }
}

/**
 * Validates origin / CORS
 */
export function applySecurityHeaders(req, res, allowedMethods = ['POST']) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');

  const origin = req.headers.origin;
  const allowedOrigins = [
    'https://www.mrlevents.com',
    'https://mrlevents.com',
    'https://mrl-events.vercel.app'
  ];

  if (origin && (allowedOrigins.includes(origin) || origin.endsWith('.vercel.app'))) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Methods', allowedMethods.join(', '));
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}
