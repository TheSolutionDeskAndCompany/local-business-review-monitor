// api/_lib/http.js
export function ok(res, data, extra = {}) {
  return res.status(200).json({ ok: true, ...data, ...extra });
}

export function bad(res, message = 'Bad Request', code = 400) {
  return res.status(code).json({ ok: false, message });
}

export function method(req, res, methods = ['GET']) {
  if (!methods.includes(req.method)) {
    res.setHeader('Allow', methods.join(', '));
    return bad(res, 'Method Not Allowed', 405);
  }
  return null;
}
