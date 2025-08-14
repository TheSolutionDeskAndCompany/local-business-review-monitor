// client/src/lib/http.js
export async function api(path, opts = {}) {
  const r = await fetch(`/api${path}`, {
    headers: { 'Content-Type': 'application/json', ...(opts.headers || {}) },
    ...opts,
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  });
  
  const data = await r.json().catch(() => ({}));
  
  if (!r.ok || data.ok === false) {
    const message = data?.message || `Request failed (${r.status})`;
    const error = new Error(message);
    error.status = r.status;
    error.data = data;
    throw error;
  }
  
  return data;
}
