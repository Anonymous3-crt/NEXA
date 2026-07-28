import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import { dbGet, dbRun } from '../config/db.js';
import { generateToken, authMiddleware } from '../middleware/auth.js';

const router = Router();

router.post('/signup', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }
  if (password.length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters' });
  }

  const existing = dbGet('SELECT id FROM users WHERE email = ?', [email]);
  if (existing) return res.status(409).json({ error: 'Email already registered' });

  const id = uuid();
  const initials = name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  const colors = ['#6366f1', '#8b5cf6', '#06b6d4', '#ec4899', '#f59e0b', '#10b981'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const password_hash = bcrypt.hashSync(password, 10);

  dbRun('INSERT INTO users (id, name, email, password_hash, initials, color) VALUES (?,?,?,?,?,?)', [id, name, email, password_hash, initials, color]);

  const token = generateToken(id);
  res.status(201).json({ token, user: { id, name, email, initials, color, username: null } });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const user = dbGet('SELECT * FROM users WHERE email = ?', [email]);
  if (!user || !bcrypt.compareSync(password, user.password_hash)) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const token = generateToken(user.id);
  res.json({
    token,
    user: { id: user.id, name: user.name, email: user.email, initials: user.initials, color: user.color, username: user.username },
  });
});

const userFields = 'id, name, email, initials, color, username, bio, company, location, website, phone, verified';

router.get('/me', authMiddleware, (req, res) => {
  const user = dbGet(`SELECT ${userFields} FROM users WHERE id = ?`, [req.userId]);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ user });
});

router.put('/me', authMiddleware, (req, res) => {
  const { name, username, bio, company, location, website, phone } = req.body;

  if (username) {
    const existing = dbGet('SELECT id FROM users WHERE username = ? AND id != ?', [username, req.userId]);
    if (existing) return res.status(409).json({ error: 'Username taken' });
  }

  dbRun(`UPDATE users SET
    name = COALESCE(?, name),
    username = COALESCE(?, username),
    bio = COALESCE(?, bio),
    company = COALESCE(?, company),
    location = COALESCE(?, location),
    website = COALESCE(?, website),
    phone = COALESCE(?, phone)
    WHERE id = ?`, [name || null, username || null, bio ?? null, company ?? null, location ?? null, website ?? null, phone ?? null, req.userId]);

  const user = dbGet(`SELECT ${userFields} FROM users WHERE id = ?`, [req.userId]);
  res.json({ user });
});

export default router;
