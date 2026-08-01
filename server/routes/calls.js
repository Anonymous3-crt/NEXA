import { Router } from 'express';
import { v4 as uuid } from 'uuid';
import { dbGet, dbAll, dbRun } from '../config/db.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();
router.use(authMiddleware);

router.get('/', (req, res) => {
  const items = dbAll(`
    SELECT c.*, u.name, u.initials, u.color
    FROM call_logs c
    JOIN users u ON u.id = c.caller_id
    WHERE c.user_id = ?
    ORDER BY c.created_at DESC
  `, [req.userId]);
  res.json({ calls: items });
});

router.post('/', (req, res) => {
  const { type = 'outgoing', duration = '0:42' } = req.body;
  const contact = dbGet(`
    SELECT u.id, u.name, u.initials, u.color
    FROM contacts c
    JOIN users u ON u.id = c.contact_user_id
    WHERE c.user_id = ?
    ORDER BY RANDOM() LIMIT 1
  `, [req.userId]);
  if (!contact) return res.status(400).json({ error: 'No contacts to call yet' });

  const id = uuid();
  dbRun('INSERT INTO call_logs VALUES (?,?,?,?,?,?,?,?,?)', [id, req.userId, contact.id, type, duration, 0, 0, 0, new Date().toISOString()]);

  res.status(201).json({ call: { id, ...contact, type, duration, missed: 0, group_call: 0, ai_call: 0, created_at: new Date().toISOString() } });
});

export default router;
