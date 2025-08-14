// api/_lib/rate-limit.js
const buckets = new Map(); // ok for small scale; switch to Upstash/Redis later

export function withRateLimit(handler, { windowMs = 60000, max = 60 } = {}) {
  return async (req, res) => {
    const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket.remoteAddress || 'anon';
    const now = Date.now();
    const key = `${ip}`;
    const item = buckets.get(key) || { count: 0, reset: now + windowMs };
    
    if (now > item.reset) { 
      item.count = 0; 
      item.reset = now + windowMs; 
    }
    
    item.count++;
    buckets.set(key, item);
    
    res.setHeader('X-RateLimit-Limit', String(max));
    res.setHeader('X-RateLimit-Remaining', String(Math.max(0, max - item.count)));
    res.setHeader('X-RateLimit-Reset', String(Math.floor(item.reset / 1000)));
    
    if (item.count > max) {
      return res.status(429).json({ message: 'Too many requests' });
    }
    
    return handler(req, res);
  };
}
