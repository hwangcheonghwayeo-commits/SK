import { fetchTourismSnapshot } from '../lib/busan-tourism.mjs';

// Only public, normalized tourism fields leave the server. Never log upstream errors/URLs.
export function createHandler({ keyProvider = () => process.env.BUSAN_TOURISM_API_KEY, load = fetchTourismSnapshot, now = Date.now } = {}) {
  let cached = null, expires = 0, pending = null;
  return async function handler(req, res) {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    const fail = (status, code) => { res.setHeader('Cache-Control', 'no-store'); res.setHeader('Vercel-CDN-Cache-Control', 'no-store'); res.statusCode = status; res.end(JSON.stringify({ error: code })); };
    if (req.method !== 'GET') { res.setHeader('Allow', 'GET'); fail(405, 'METHOD_NOT_ALLOWED'); return; }
    if (new URL(req.url, 'https://local.invalid').search) { fail(400, 'UNSUPPORTED_QUERY'); return; }
    try {
      const key = keyProvider();
      if (!key) { fail(503, 'TOURISM_UNAVAILABLE'); return; }
      if (!cached || expires <= now()) {
        if (!pending) pending = Promise.resolve().then(() => load(key)).then(data => { cached = data; expires = now() + 15 * 60 * 1000; return data; }).finally(() => { pending = null; });
        await pending;
      }
      res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
      res.setHeader('Vercel-CDN-Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
      res.statusCode = 200;
      res.end(JSON.stringify(cached));
    } catch { fail(503, 'TOURISM_UNAVAILABLE'); }
  };
}
export default createHandler();
