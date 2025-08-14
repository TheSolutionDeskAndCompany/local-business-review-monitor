import { ok } from '../_lib/http';
import { clearCookie } from '../_lib/jwt';

export default function handler(req, res) {
  // Clear the session cookie
  res.setHeader('Set-Cookie', clearCookie());
  return ok(res, { message: 'Logged out successfully' });
}
