// api/health.js
export default function handler(req, res) {
  res.status(200).json({ 
    ok: true, 
    ts: Date.now(),
    status: 'operational',
    version: process.env.npm_package_version || '1.0.0'
  });
}
