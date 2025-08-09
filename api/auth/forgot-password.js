// api/auth/forgot-password.js
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

function resetTemplate({ appName, resetUrl }) {
  const subject = `${appName}: Reset your password`;
  const text = `Click the link to reset your password:\n${resetUrl}\n\nIf you didn't request this, ignore this email.`;
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reset Your Password - ${appName}</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        
        <!-- Header with ReviewReady branding -->
        <div style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(16, 185, 129, 0.02) 100%); border-top: 1px solid rgba(16, 185, 129, 0.1); border-bottom: 1px solid rgba(16, 185, 129, 0.1); padding: 40px 40px; text-align: center;">
          <h1 style="margin: 0; font-size: 32px; font-weight: 800; color: #1f2937; text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);">${appName}</h1>
          <p style="margin: 8px 0 0 0; color: #10b981; font-weight: 600; font-size: 16px;">Never Miss Another Review Again</p>
        </div>
        
        <!-- Main content -->
        <div style="padding: 40px;">
          <h2 style="margin: 0 0 24px 0; font-size: 24px; font-weight: 700; color: #1f2937;">Reset Your Password</h2>
          
          <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 1.6; color: #374151;">
            We received a request to reset your password for your ${appName} account. Click the button below to create a new password.
          </p>
          
          <!-- Reset button with ReviewReady styling -->
          <div style="text-align: center; margin: 32px 0;">
            <a href="${resetUrl}" style="display: inline-block; padding: 16px 32px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: #ffffff; text-decoration: none; border-radius: 12px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 14px 0 rgba(16, 185, 129, 0.3); transition: all 0.2s ease;">
              Reset Password
            </a>
          </div>
          
          <p style="margin: 24px 0 0 0; font-size: 14px; line-height: 1.5; color: #6b7280;">
            If the button doesn't work, you can copy and paste this link into your browser:
          </p>
          <p style="margin: 8px 0 0 0; font-size: 14px; word-break: break-all; color: #10b981;">
            ${resetUrl}
          </p>
          
          <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #e5e7eb;">
            <p style="margin: 0 0 8px 0; font-size: 14px; color: #6b7280;">
              This password reset link will expire in 30 minutes for security reasons.
            </p>
            <p style="margin: 0; font-size: 14px; color: #6b7280;">
              If you didn't request this password reset, you can safely ignore this email.
            </p>
          </div>
        </div>
        
        <!-- Footer -->
        <div style="background-color: #f9fafb; padding: 24px 40px; border-top: 1px solid #e5e7eb;">
          <p style="margin: 0; font-size: 14px; color: #6b7280; text-align: center;">
            © 2025 ${appName} / The Solution Desk Inc. | 
            <a href="https://reviewready.ca" style="color: #10b981; text-decoration: none;">reviewready.ca</a>
          </p>
        </div>
        
      </div>
    </body>
    </html>`;
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
  
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  try {
    const { email } = await readJSON(req);
    if (!email) return res.status(400).json({ error: "Email required" });

    // Check if required environment variables are set
    if (!process.env.RESET_TOKEN_SECRET) {
      console.error("RESET_TOKEN_SECRET not set");
      return res.status(500).json({ error: "Server configuration error" });
    }

    const appName = process.env.APP_NAME || "ReviewReady";
    const base = (process.env.APP_URL || `${req.headers["x-forwarded-proto"] || "https"}://${req.headers.host}`).replace(/\/+$/,"");
    const token = jwt.sign({ email }, process.env.RESET_TOKEN_SECRET, { expiresIn: "30m" });
    const resetUrl = `${base}/reset-password?token=${encodeURIComponent(token)}`;

    // Try to send email, but don't fail if email service is not configured
    try {
      const transport = makeTransport();
      const from = process.env.SMTP_FROM || `${appName} <no-reply@reviewready.ca>`;
      const { subject, text, html } = resetTemplate({ appName, resetUrl });
      await transport.sendMail({ to: email, from, subject, text, html });
      console.log("Password reset email sent successfully");
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      // In development or if email fails, return the reset link
      return res.status(200).json({ 
        ok: true, 
        message: "If that email exists, reset instructions have been sent.",
        resetLink: resetUrl // For development
      });
    }

    res.status(200).json({ ok: true, message: "If that email exists, reset instructions have been sent." });
  } catch (e) {
    console.error("forgot-password error:", e);
    res.status(500).json({ error: "Server error", details: e.message });
  }
};
