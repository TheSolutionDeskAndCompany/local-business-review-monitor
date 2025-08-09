// api/auth/reset-password.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { getDB } = require("../../lib/mongo");

async function readJSON(req) {
  if (req.body) return req.body;
  const chunks = [];
  for await (const ch of req) chunks.push(ch);
  try { return JSON.parse(Buffer.concat(chunks).toString() || "{}"); } catch { return {}; }
}

function bad(res, code, msg) { return res.status(code).json({ ok: false, error: msg }); }

module.exports = async (req, res) => {
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return bad(res, 405, "Method Not Allowed");

  try {
    const { token, password } = await readJSON(req);
    if (!token) return bad(res, 400, "Missing token");
    if (!password) return bad(res, 400, "Missing password");
    if (password.length < 8) return bad(res, 400, "Password must be at least 8 characters");

    let payload;
    try {
      payload = jwt.verify(token, process.env.RESET_TOKEN_SECRET);
    } catch {
      return bad(res, 400, "Invalid or expired token");
    }

    const email = String(payload?.email || "");
    if (!email) return bad(res, 400, "Invalid token payload");

    const emailLower = email.toLowerCase();
    const passwordHash = await bcrypt.hash(password, 12);

    const db = await getDB();
    const users = db.collection("users");

    // Update by case-insensitive email match; also store emailLower for future lookups.
    const result = await users.updateOne(
      { $or: [{ emailLower }, { email }] },
      { $set: { passwordHash, emailLower, updatedAt: new Date() } }
    );

    // Avoid user enumeration: return 200 either way, but log if nothing was updated.
    if (result.matchedCount === 0) {
      console.warn("reset-password: no user matched for", emailLower);
    }

    return res.status(200).json({ ok: true, message: "Password updated" });
  } catch (e) {
    console.error("reset-password error:", e);
    return bad(res, 500, "Server error");
  }
};
