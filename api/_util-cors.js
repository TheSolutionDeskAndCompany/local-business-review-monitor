// api/_util-cors.js
function setCors(res) {
  const origin = process.env.CLIENT_URL || "https://reviewready.ca";
  res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-auth-token');
}

module.exports = { setCors };
