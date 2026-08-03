const RESEND_API_KEY = process.env.RESEND_API_KEY;
const EMAIL_FROM = process.env.EMAIL_FROM || 'Nexa <onboarding@resend.dev>';
const APP_URL = process.env.APP_URL || 'http://localhost:3001';

async function sendEmail({ to, subject, html }) {
  if (!RESEND_API_KEY) {
    console.warn('[EMAIL] RESEND_API_KEY not set — email not sent to', to);
    return { ok: false, skipped: true };
  }
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from: EMAIL_FROM, to, subject, html }),
  });
  if (!res.ok) {
    const text = await res.text();
    console.error('[EMAIL] Send failed:', res.status, text);
    return { ok: false, error: text };
  }
  return { ok: true };
}

function layout(title, bodyHtml) {
  return `
    <div style="font-family: -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; background: #0a0a0f; padding: 40px 20px; border-radius: 16px; max-width: 480px; margin: 0 auto;">
      <div style="text-align: center; margin-bottom: 24px;">
        <span style="display:inline-block; background: linear-gradient(135deg,#6366f1,#8b5cf6); color:#fff; font-weight:700; font-size:18px; width:40px; height:40px; line-height:40px; border-radius:10px;">N</span>
        <div style="color:#e4e4e7; font-weight:700; font-size:18px; margin-top:8px;">Nexa</div>
      </div>
      <h1 style="color:#ffffff; font-size:20px; text-align:center;">${title}</h1>
      <div style="background:#14141d; border:1px solid rgba(255,255,255,0.06); border-radius:12px; padding:20px; margin-top:16px;">${bodyHtml}</div>
      <p style="color:#52525b; font-size:12px; text-align:center; margin-top:24px;">If you didn't request this, you can safely ignore this email.</p>
    </div>
  `;
}

export async function sendVerificationCode({ email, name = '', code }) {
  await sendEmail({
    to: email,
    subject: 'Your Nexa verification code',
    html: layout('Verify your email', `
      <p style="color:#a1a1aa; font-size:14px; margin:0 0 16px;">Hi ${name || 'there'}, use the code below to verify your Nexa account. It expires in 10 minutes.</p>
      <div style="text-align:center; font-size:32px; letter-spacing:8px; font-weight:800; color:#a5b4fc; padding:12px 0; background:rgba(99,102,241,0.08); border-radius:10px;">${code}</div>
    `),
  });
  console.log(`[DEV] Verification code for ${email}: ${code}`);
}

export async function sendPasswordReset({ email, name = '', token }) {
  const link = `${APP_URL}/reset-password?token=${token}`;
  await sendEmail({
    to: email,
    subject: 'Reset your Nexa password',
    html: layout('Reset your password', `
      <p style="color:#a1a1aa; font-size:14px; margin:0 0 16px;">Hi ${name || 'there'}, we received a request to reset your Nexa password. Click below to choose a new one. This link expires in 1 hour.</p>
      <div style="text-align:center;">
        <a href="${link}" style="display:inline-block; background:linear-gradient(135deg,#6366f1,#8b5cf6); color:#fff; font-weight:600; font-size:14px; padding:12px 28px; border-radius:10px; text-decoration:none;">Reset password</a>
      </div>
      <p style="color:#52525b; font-size:12px; margin-top:16px;">Or paste this link in your browser: ${link}</p>
    `),
  });
  console.log(`[DEV] Password reset for ${email}: ${link}`);
}
