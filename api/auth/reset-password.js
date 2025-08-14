import crypto from 'crypto';
import { query } from '../_lib/db';
import { withRateLimit } from '../_lib/rate-limit';
import { ok, bad, method } from '../_lib/http';
import { hashPassword } from '../_lib/hash';

// Helper function to hash tokens consistently (must match the one in request-reset.js)
function sha256(s) { 
  return crypto.createHash('sha256').update(s).digest('hex'); 
}

async function handler(req, res) {
  method(req, res, ['POST']);
  if (!query) return bad(res, 'DATABASE_URL not set', 501);
  
  const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  const { token, password } = body || {};
  
  // Validate input
  if (!token || !password || password.length < 8) {
    return bad(res, 'Valid token and 8+ character password are required');
  }

  try {
    const tokenHash = sha256(token);
    const now = new Date();
    
    // Find the token in the database
    const tokenResult = await query(
      `SELECT prt.id, prt.user_id, prt.expires_at, prt.used, u.email
       FROM password_reset_tokens prt
       JOIN users u ON prt.user_id = u.id
       WHERE prt.token_hash = $1 AND prt.used = FALSE AND prt.expires_at > $2`,
      [tokenHash, now]
    );
    
    // Check if token is valid
    if (tokenResult.rowCount === 0) {
      return bad(res, 'Invalid or expired token', 400);
    }
    
    const tokenData = tokenResult.rows[0];
    
    // Mark token as used
    await query('UPDATE password_reset_tokens SET used = TRUE WHERE id = $1', [tokenData.id]);
    
    // Hash the new password
    const newHash = await hashPassword(password);
    
    // Update the user's password
    await query('UPDATE users SET password_hash = $1 WHERE id = $2', [newHash, tokenData.user_id]);
    
    return ok(res, { 
      message: 'Password has been reset successfully. You can now log in with your new password.' 
    });
    
  } catch (error) {
    console.error('Password reset error:', error);
    return bad(res, 'Failed to reset password', 500);
  }
}

export default withRateLimit(handler, { max: 10 });
