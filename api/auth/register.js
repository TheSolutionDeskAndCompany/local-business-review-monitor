import { query } from '../_lib/db';
import { withRateLimit } from '../_lib/rate-limit';
import { ok, bad, method } from '../_lib/http';
import { hashPassword } from '../_lib/hash';
import { signJwt, sessionCookie } from '../_lib/jwt';

async function handler(req, res) {
  method(req, res, ['POST']);
  if (!query) return bad(res, 'DATABASE_URL not set', 501);
  
  const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  const { email, password } = body || {};
  
  // Validate input
  if (!email || !password || password.length < 8) {
    return bad(res, 'Email and 8+ character password required');
  }

  try {
    // Check if email already exists
    const existing = await query('SELECT id FROM users WHERE email = $1', [email.toLowerCase()]);
    if (existing.rowCount > 0) {
      return bad(res, 'Email already registered', 409);
    }

    // Hash password and create user
    const hash = await hashPassword(password);
    const ins = await query(
      'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email',
      [email.toLowerCase(), hash]
    );

    // Create session
    const token = signJwt({ uid: ins.rows[0].id, email: ins.rows[0].email });
    res.setHeader('Set-Cookie', sessionCookie(token));
    
    return ok(res, { 
      user: { 
        id: ins.rows[0].id, 
        email: ins.rows[0].email 
      } 
    });
  } catch (error) {
    console.error('Registration error:', error);
    return bad(res, 'Registration failed', 500);
  }
}

export default withRateLimit(handler, { max: 30 });
