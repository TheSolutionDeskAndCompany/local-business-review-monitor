// api/auth/forgot-password.js
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

function resetTemplate({ appName, resetUrl }) {
  const subject = `${appName}: Reset your password`;
  const text = `Click the link to reset your password:\n${resetUrl}\n\nIf you didn't request this, ignore this email.`;
  const html = `
    <div style="font-family:system-ui,Segoe UI,Roboto,Arial,sans-serif;line-height:1.5">
      <h2>${appName}</h2>
      <p>We received a request to reset your password.</p>
      <p><a href="${resetUrl}" style="display:inline-block;padding:12px 18px;text-decoration:none;border-radius:8px;background:#111;color:#fff">Reset password</a></p>
      <p>Or paste this url in your browser:<br>${resetUrl}</p>
      <p>If you didn't request this, you can safely ignore this email.</p>
    </div>`;
  return { subject, text, html };
}

function makeTransport() {
  const port = Number(process.env.SMTP_PORT || 587);
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
}

async function readJSON(req) {
  if (req.body) return req.body;
  const chunks = [];
  for await (const ch of req) chunks.push(ch);
  try { return JSON.parse(Buffer.concat(chunks).toString() || "{}"); } catch { return {}; }
}

module.exports = async (req, res) => {
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");
  try {
    const { email } = await readJSON(req);
    if (!email) return res.status(400).send("Email required");

    const appName = process.env.APP_NAME || "ReviewReady";
    const base = (process.env.APP_URL || `${req.headers["x-forwarded-proto"] || "https"}://${req.headers.host}`).replace(/\/+$/,"");
    const token = jwt.sign({ email }, process.env.RESET_TOKEN_SECRET, { expiresIn: "30m" });
    const resetUrl = `${base}/reset-password?token=${encodeURIComponent(token)}`;

    const transport = makeTransport();
    const from = process.env.SMTP_FROM || `${appName} <no-reply@reviewready.ca>`;
    const { subject, text, html } = resetTemplate({ appName, resetUrl });
    await transport.sendMail({ to: email, from, subject, text, html });

    res.status(200).json({ ok: true, message: "If that email exists, reset instructions have been sent." });
  } catch (e) {
    console.error("forgot-password error:", e);
    res.status(500).send("Server error");
  }
};
