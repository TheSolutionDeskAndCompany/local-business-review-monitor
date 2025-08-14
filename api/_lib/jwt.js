import jwt from 'jsonwebtoken';

const DAY = 24*60*60;
const secret = process.env.JWT_SECRET || 'dev-secret';
const expDays = parseInt(process.env.JWT_EXPIRES_DAYS || '7', 10);

export function signJwt(payload) {
  return jwt.sign(payload, secret, { expiresIn: `${expDays}d` });
}

export function verifyJwt(token) {
  try { 
    return jwt.verify(token, secret); 
  } catch { 
    return null; 
  }
}

export function sessionCookie(token) {
  const isProd = process.env.VERCEL_ENV === 'production' || process.env.NODE_ENV === 'production';
  const maxAge = expDays * DAY;
  let cookie = `rr_session=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}`;
  if (isProd) cookie += '; Secure';
  return cookie;
}

export function clearCookie() {
  const isProd = process.env.VERCEL_ENV === 'production' || process.env.NODE_ENV === 'production';
  let cookie = 'rr_session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0';
  if (isProd) cookie += '; Secure';
  return cookie;
}
