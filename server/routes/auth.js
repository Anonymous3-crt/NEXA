import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import { dbGet, dbRun } from '../config/db.js';
import { generateToken, authMiddleware } from '../middleware/auth.js';

const router = Router();

const isProd = process.env.NODE_ENV === 'production';

function generateCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function devOnly(value) {
  return isProd ? undefined : value;
}

router.post('/signup', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'Name, email, and password are required' });
  }
  if (password.length < 8) {
    return res.status(400).json({ success: false, message: 'Password must be at least 8 characters' });
  }

  const existing = dbGet('SELECT id FROM users WHERE email = ?', [email]);
  if (existing) return res.status(409).json({ success: false, message: 'Email already registered' });

  const id = uuid();
  const initials = name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  const colors = ['#6366f1', '#8b5cf6', '#06b6d4', '#ec4899', '#f59e0b', '#10b981'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const password_hash = bcrypt.hashSync(password, 10);
  const verificationCode = generateCode();

  dbRun('INSERT INTO users (id, name, email, password_hash, initials, color, verification_code) VALUES (?,?,?,?,?,?,?)', [id, name, email, password_hash, initials, color, verificationCode]);
  console.log(`[DEV] Verification code for ${email}: ${verificationCode}`);

  const token = generateToken(id);
  res.status(201).json({
    success: true,
    message: 'Account created. Verify your email to continue.',
    token,
    user: { id, name, email, initials, color, username: null, verified: 0 },
    devCode: devOnly(verificationCode),
  });
});

router.post('/verify-email', (req, res) => {
  const { email, code } = req.body;
  if (!email || !code) return res.status(400).json({ success: false, message: 'Email and code are required' });

  const user = dbGet('SELECT id, verification_code, verified FROM users WHERE email = ?', [email]);
  if (!user) return res.status(404).json({ success: false, message: 'No account found for this email' });
  if (user.verified === 1) return res.json({ success: true, message: 'Email already verified' });
  if (!user.verification_code || user.verification_code !== String(code)) {
    return res.status(400).json({ success: false, message: 'Invalid or expired code' });
  }

  dbRun('UPDATE users SET verified = 1, verification_code = NULL WHERE id = ?', [user.id]);
  res.json({ success: true, message: 'Email verified successfully' });
});

router.post('/resend-verification', (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ success: false, message: 'Email is required' });

  const user = dbGet('SELECT id, verified FROM users WHERE email = ?', [email]);
  if (!user) return res.status(404).json({ success: false, message: 'No account found for this email' });
  if (user.verified === 1) return res.status(400).json({ success: false, message: 'Email already verified' });

  const code = generateCode();
  dbRun('UPDATE users SET verification_code = ? WHERE id = ?', [code, user.id]);
  console.log(`[DEV] Verification code for ${email}: ${code}`);

  res.json({ success: true, message: 'New code sent', devCode: devOnly(code) });
});

router.post('/forgot-password', (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ success: false, message: 'Email is required' });

  const user = dbGet('SELECT id FROM users WHERE email = ?', [email]);
  if (!user) {
    return res.json({ success: true, message: 'If that email exists, a reset link has been sent.' });
  }

  const resetToken = uuid();
  dbRun('UPDATE users SET reset_token = ? WHERE id = ?', [resetToken, user.id]);
  console.log(`[DEV] Password reset for ${email}: http://localhost:3001/reset-password?token=${resetToken}`);

  res.json({ success: true, message: 'If that email exists, a reset link has been sent.', devToken: devOnly(resetToken) });
});

router.post('/reset-password', (req, res) => {
  const { token, newPassword } = req.body;
  if (!token || !newPassword) return res.status(400).json({ success: false, message: 'Token and new password are required' });
  if (newPassword.length < 8) return res.status(400).json({ success: false, message: 'Password must be at least 8 characters' });

  const user = dbGet('SELECT id FROM users WHERE reset_token = ?', [token]);
  if (!user) return res.status(400).json({ success: false, message: 'Invalid or expired reset link' });

  const password_hash = bcrypt.hashSync(newPassword, 10);
  dbRun('UPDATE users SET password_hash = ?, reset_token = NULL WHERE id = ?', [password_hash, user.id]);

  res.json({ success: true, message: 'Password reset successfully' });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  let user;
  try {
    user = dbGet('SELECT * FROM users WHERE email = ?', [email]);
  } catch (err) {
    console.error('Login DB error:', err);
    return res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }

  if (!user || !bcrypt.compareSync(password, user.password_hash)) {
    return res.status(401).json({ success: false, message: 'Invalid email or password' });
  }

  if (user.verified !== 1) {
    return res.status(403).json({ success: false, message: 'Please verify your email before signing in', needsVerification: true });
  }

  const token = generateToken(user.id);
  res.json({
    success: true,
    message: 'Login successful',
    token,
    user: { id: user.id, name: user.name, email: user.email, initials: user.initials, color: user.color, username: user.username },
  });
});

const userFields = 'id, name, email, initials, color, username, bio, company, location, website, phone, verified, avatar';

router.get('/check-username', (req, res) => {
  const { username } = req.query;
  if (!username || username.length < 3) return res.json({ success: true, available: false });
  const existing = dbGet('SELECT id FROM users WHERE username = ?', [username]);
  res.json({ success: true, available: !existing });
});

router.get('/me', authMiddleware, (req, res) => {
  const user = dbGet(`SELECT ${userFields} FROM users WHERE id = ?`, [req.userId]);
  if (!user) return res.status(404).json({ success: false, message: 'User not found' });
  res.json({ success: true, user });
});

router.put('/me', authMiddleware, (req, res) => {
  const { name, username, bio, company, location, website, phone, avatar } = req.body;

  if (username) {
    const existing = dbGet('SELECT id FROM users WHERE username = ? AND id != ?', [username, req.userId]);
    if (existing) return res.status(409).json({ success: false, message: 'Username taken' });
  }

  dbRun(`UPDATE users SET
    name = COALESCE(?, name),
    username = COALESCE(?, username),
    bio = COALESCE(?, bio),
    company = COALESCE(?, company),
    location = COALESCE(?, location),
    website = COALESCE(?, website),
    phone = COALESCE(?, phone),
    avatar = COALESCE(?, avatar)
    WHERE id = ?`, [name || null, username || null, bio ?? null, company ?? null, location ?? null, website ?? null, phone ?? null, avatar || null, req.userId]);

  const user = dbGet(`SELECT ${userFields} FROM users WHERE id = ?`, [req.userId]);
  res.json({ success: true, user });
});

export default router;
