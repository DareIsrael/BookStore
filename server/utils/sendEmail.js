// // utils/sendEmail.js
// const nodemailer = require("nodemailer");

// const sendEmail = async (options) => {
//   const transporter = nodemailer.createTransport({
//     host: process.env.SMTP_HOST,
//     port: process.env.SMTP_PORT,
//     auth: {
//       user: process.env.SMTP_USER,
//       pass: process.env.SMTP_PASS,
//     },
//   });

//   await transporter.sendMail({
//     from: `"winifredfagbolagun" <${process.env.SMTP_USER}>`,
//     to: options.to,
//     subject: options.subject,
//     html: options.html,
//   });
// };

// module.exports = sendEmail;


// utils/sendEmail.js
// server/utils/sendEmail.js
const nodemailer = require("nodemailer");

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  EMAIL_FROM // optional; fallback to SMTP_USER
} = process.env;

if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
  console.warn(
    "⚠️  SMTP variables missing. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS in your .env"
  );
}

const port = Number(SMTP_PORT) || 587;
const secure = port === 465; // true for 465, false for 587

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port,
  secure,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
  // optional: helps in some environments
  tls: {
    rejectUnauthorized: false,
  },
});

// verify transporter on require() (prints to server logs)
transporter
  .verify()
  .then(() => console.log("✅ Email transporter ready"))
  .catch((err) =>
    console.warn("⚠️ Email transporter verification failed:", err && err.message)
  );

/**
 * Generic send mail
 * options: { to, subject, text, html }
 */
async function sendEmail(options = {}) {
  const { to, subject, text, html } = options;
  if (!to || !subject || (!text && !html)) {
    throw new Error("sendEmail: missing required fields (to, subject, text/html)");
  }

  try {
    const info = await transporter.sendMail({
      from: EMAIL_FROM || `"Winifred F" <${SMTP_USER}>`,
      to,
      subject,
      text,
      html,
    });
    return info;
  } catch (err) {
    console.error("❌ sendEmail error:", err && err.message ? err.message : err);
    throw err;
  }
}

/**
 * Convenience: welcome email
 */
async function sendWelcomeEmail(user = {}) {
  if (!user?.email) {
    throw new Error("sendWelcomeEmail: user.email is required");
  }

  const subject = `Welcome to our store, ${user.name || "friend"}!`;
  const text = `Hi ${user.name || ""},\n\nThanks for creating an account. Visit us: ${process.env.CLIENT_URL_PRO ||
    "your-site-url"}\n\n— Team`;
  const html = `
    <div style="font-family: Arial, Helvetica, sans-serif; color:#333;">
      <h2>Hello ${user.name || "Friend"},</h2>
      <p>Welcome — thank you for signing up. We're glad you're here.</p>
      <p><a href="${process.env.CLIENT_URL_PRO || "#"}">Visit our store</a></p>
      <p style="margin-top:20px">Blessings,<br/><strong>The Team</strong></p>
    </div>
  `;

  return sendEmail({ to: user.email, subject, text, html });
}

/**
 * Convenience: password reset email (if you need)
 */
async function sendResetPasswordEmail({ user, resetUrl }) {
  if (!user?.email || !resetUrl) {
    throw new Error("sendResetPasswordEmail: missing parameters");
  }

  const subject = "Password reset instructions";
  const text = `Hi ${user.name || ""},\n\nReset your password: ${resetUrl}\n\nIf you didn't request this, ignore.`;
  const html = `
    <div style="font-family: Arial, Helvetica, sans-serif; color:#333;">
      <p>Hi ${user.name || ""},</p>
      <p>Click below to reset your password:</p>
      <p><a style="background:#D4AF37;color:#fff;padding:10px 14px;border-radius:6px;text-decoration:none;" href="${resetUrl}">Reset Password</a></p>
      <p>If you didn't request this, ignore this email.</p>
    </div>
  `;

  return sendEmail({ to: user.email, subject, text, html });
}

module.exports = {
  sendEmail,
  sendWelcomeEmail,
  sendResetPasswordEmail,
  transporter,
};
