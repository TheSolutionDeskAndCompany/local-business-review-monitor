// api/setup.js
import { query } from './_lib/db';
import { withRateLimit } from './_lib/rate-limit';
import { bad, ok, method } from './_lib/http';

async function handler(req, res) {
  const token = req.headers['x-admin-token'];
  if (!token || token !== process.env.ADMIN_TOKEN) {
    return bad(res, 'Unauthorized', 401);
  }
  
  const methodCheck = method(req, res, ['POST']);
  if (methodCheck) return methodCheck;

  const q = (s, p = []) => query(s, p);
  if (!q) return bad(res, 'DATABASE_URL not set', 501);

  try {
    await q(`
      CREATE TABLE IF NOT EXISTS connectors (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        auth_type TEXT NOT NULL,
        enabled BOOLEAN NOT NULL DEFAULT FALSE,
        token_enc TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
      
      CREATE TABLE IF NOT EXISTS locations (
        id SERIAL PRIMARY KEY,
        platform TEXT NOT NULL,
        external_id TEXT NOT NULL,
        display_name TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
      
      CREATE TABLE IF NOT EXISTS reviews (
        id SERIAL PRIMARY KEY,
        source TEXT NOT NULL,
        location_id INT REFERENCES locations(id) ON DELETE CASCADE,
        rating INT NOT NULL,
        author TEXT,
        text TEXT,
        posted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        responded BOOLEAN NOT NULL DEFAULT FALSE
      );
    `);

    return ok(res, { message: 'Tables ensured' });
  } catch (error) {
    console.error('Setup error:', error);
    return bad(res, 'Database setup failed', 500);
  }
}

export default withRateLimit(handler, { max: 10 });
