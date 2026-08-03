import { Router } from 'express';
import { dbGet, dbAll, dbRun } from '../config/db.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();
router.use(authMiddleware);

router.get('/', async (req, res) => {
  const contacts = await dbAll(`
    SELECT u.id, u.name, u.email, u.initials, u.color, u.username
    FROM contacts ct
    JOIN users u ON u.id = ct.contact_user_id
    WHERE ct.user_id = ?
    ORDER BY u.name ASC
  `, [req.userId]);

  res.json({ contacts });
});

router.post('/', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required' });

  const user = await dbGet('SELECT id, name, email, initials, color, username FROM users WHERE LOWER(email) = LOWER(?)', [email]);
  if (!user) return res.status(404).json({ error: 'No Nexa user found with that email' });
  if (user.id === req.userId) return res.status(400).json({ error: 'You cannot add yourself' });

  const existing = await dbGet('SELECT 1 as ok FROM contacts WHERE user_id = ? AND contact_user_id = ?', [req.userId, user.id]);
  if (existing) return res.status(409).json({ error: 'Already in your contacts' });

  await dbRun('INSERT INTO contacts VALUES (?,?,?)', [req.userId, user.id, new Date().toISOString()]);
  res.status(201).json({ contact: user });
});

export default router;
