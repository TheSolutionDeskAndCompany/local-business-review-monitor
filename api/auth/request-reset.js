import crypto from 'crypto';
import { query } from '../_lib/db';
import { withRateLimit } from '../_lib/rate-limit';
import { ok, bad, method } from '../_lib/http';
import { sendEmail } from '../_lib/email';

// Helper function to hash tokens consistently
function sha256(s) { 
  return crypto.createHash('sha256').update(s).digest('hex'); 
}

async function handler(req, res) {
  method(req, res, ['POST']);
  if (!query) return bad(res, 'DATABASE_URL not set', 501);
  
  const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  const { email, baseUrl } = body || {};
  
  // Validate input
  if (!email) {
    return bad(res, 'Email is required');
  }

  try {
    // Find user by email
    const userResult = await query('SELECT id FROM users WHERE email = $1', [email.toLowerCase()]);
    
    // Don't reveal if the email exists or not
    if (!userResult.rowCount) {
      return ok(res, { message: 'If the email exists, a password reset link has been sent.' });
    }
    
    const userId = userResult.rows[0].id;
    
    // Generate a secure random token
    const token = crypto.randomBytes(32).toString('hex');
    const tokenHash = sha256(token);
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes from now
    
    // Store the hashed token in the database
    await query(
      `INSERT INTO password_reset_tokens (user_id, token_hash, expires_at) 
       VALUES ($1, $2, $3) 
       ON CONFLICT (user_id) 
       DO UPDATE SET token_hash = $2, expires_at = $3, used = FALSE`,
      [userId, tokenHash, expiresAt]
    );
    
    // Create reset URL with the plaintext token
    const resetUrl = `${baseUrl || 'http://localhost:3000'}/reset-password?token=${token}`;
    
    // Try to send the email
    const emailResult = await sendEmail({
      to: email,
      subject: 'Reset your ReviewReady password',
      html: `
        <p>You requested a password reset for your ReviewReady account.</p>
        <p>Click the link below to set a new password (expires in 30 minutes):</p>
        <p><a href="${resetUrl}">${resetUrl}</a></p>
        <p>If you didn't request this, please ignore this email.</p>
      `
    });
    
    // In development, return the reset URL if email sending is not configured
    if (emailResult.delivered === false && process.env.NODE_ENV !== 'production') {
      return ok(res, { 
        message: 'Password reset link generated (development mode)', 
        resetUrl 
      });
    }
    
    // In production, don't reveal if the email exists or not
    return ok(res, { 
      message: 'If the email exists, a password reset link has been sent.' 
    });
    
  } catch (error) {
    console.error('Password reset request error:', error);
    return bad(res, 'Failed to process password reset request', 500);
  }
}

export default withRateLimit(handler, { max: 10 });
