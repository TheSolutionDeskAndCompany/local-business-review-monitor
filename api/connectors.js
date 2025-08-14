// api/connectors.js
import { query } from './_lib/db';
import { encrypt } from './_lib/crypto';
import { withRateLimit } from './_lib/rate-limit';
import { ok, bad, method } from './_lib/http';

const DEFAULTS = [
  { id: 'google',   name: 'Google Business Profile', auth_type: 'api_key', enabled: false },
  { id: 'facebook', name: 'Facebook Pages',          auth_type: 'oauth2',  enabled: false },
  { id: 'yelp',     name: 'Yelp',                    auth_type: 'api_key', enabled: false }
];

async function handler(req, res) {
  // Handle GET request - List all connectors
  if (req.method === 'GET') {
    try {
      const q = query ? await query('SELECT id, name, auth_type, enabled FROM connectors ORDER BY id') : null;
      if (!q || !q.rows?.length) {
        return ok(res, { connectors: DEFAULTS });
      }
      return ok(res, { connectors: q.rows });
    } catch (error) {
      console.error('Error fetching connectors:', error);
      return ok(res, { connectors: DEFAULTS });
    }
  }

  // Handle POST request - Update or create a connector
  if (req.method === 'POST') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const { id, token } = body || {};
      
      if (!id || !token) {
        return bad(res, 'id and token are required');
      }
      
      if (!query) {
        return bad(res, 'DATABASE_URL not set (cannot store token)', 501);
      }

      const enc = encrypt(token);
      await query(
        `INSERT INTO connectors (id, name, auth_type, enabled, token_enc)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (id) 
         DO UPDATE SET 
           name = EXCLUDED.name,
           enabled = EXCLUDED.enabled, 
           token_enc = EXCLUDED.token_enc`,
        [id, id, 'api_key', true, enc]
      );
      
      return ok(res, { message: 'Connector saved' });
    } catch (error) {
      console.error('Error saving connector:', error);
      return bad(res, 'Failed to save connector', 500);
    }
  }

  // Handle unsupported methods
  return method(req, res, ['GET', 'POST']);
}

export default withRateLimit(handler, { max: 60 });
