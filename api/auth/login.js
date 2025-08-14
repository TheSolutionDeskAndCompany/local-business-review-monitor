import { query } from '../_lib/db';
import { withRateLimit } from '../_lib/rate-limit';
import { ok, bad, method } from '../_lib/http';
import { verifyPassword } from '../_lib/hash';
import { signJwt, sessionCookie } from '../_lib/jwt';

async function handler(req, res) {
  method(req, res, ['POST']);
  if (!query) return bad(res, 'DATABASE_URL not set', 501);
  
  const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  const { email, password } = body || {};
  
  // Validate input
  if (!email || !password) {
    return bad(res, 'Email and password required');
  }

  try {
    // Find user by email
    const result = await query(
      'SELECT id, email, password_hash FROM users WHERE email = $1',
      [email.toLowerCase()]
    );
    
    // Check if user exists
    if (result.rowCount === 0) {
      return bad(res, 'Invalid credentials', 401);
    }
    
    const user = result.rows[0];
    
    // Verify password
    const isValid = await verifyPassword(password, user.password_hash);
    if (!isValid) {
      return bad(res, 'Invalid credentials', 401);
    }

    // Create session
    const token = signJwt({ uid: user.id, email: user.email });
    res.setHeader('Set-Cookie', sessionCookie(token));
    
    return ok(res, { 
      user: { 
        id: user.id, 
        email: user.email 
      } 
    });
  } catch (error) {
    console.error('Login error:', error);
    return bad(res, 'Login failed', 500);
  }
}

export default withRateLimit(handler, { max: 60 });
