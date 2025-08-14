import { verifyJwt } from '../_lib/jwt';
import { ok, bad } from '../_lib/http';

export default function handler(req, res) {
  // Extract the JWT token from the cookie
  const cookie = req.headers.cookie || '';
  const match = cookie.match(/(?:^|; )rr_session=([^;]+)/);
  
  if (!match) {
    return bad(res, 'Not authenticated', 401);
  }
  
  try {
    // Verify the JWT token
    const token = decodeURIComponent(match[1]);
    const payload = verifyJwt(token);
    
    if (!payload) {
      return bad(res, 'Invalid session', 401);
    }
    
    // Return the user information from the token
    return ok(res, { 
      user: { 
        id: payload.uid, 
        email: payload.email 
      } 
    });
  } catch (error) {
    console.error('Auth error:', error);
    return bad(res, 'Authentication failed', 401);
  }
}
