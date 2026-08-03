import { Router } from 'express';
import { v4 as uuid } from 'uuid';
import { dbGet, dbAll, dbRun } from '../config/db.js';
import { authMiddleware } from '../middleware/auth.js';
import { getIO } from '../socket.js';

const router = Router();
router.use(authMiddleware);

router.get('/:conversationId', async (req, res) => {
  const isMember = await dbGet('SELECT 1 as ok FROM conversation_participants WHERE conversation_id = ? AND user_id = ?', [req.params.conversationId, req.userId]);
  if (!isMember) return res.status(403).json({ error: 'Not a member' });

  const messages = await dbAll(`
    SELECT m.*, u.name as sender_name, u.initials as sender_initials, u.color as sender_color
    FROM messages m
    JOIN users u ON u.id = m.sender_id
    WHERE m.conversation_id = ?
    ORDER BY m.created_at ASC
  `, [req.params.conversationId]);

  res.json({ messages });
});

router.post('/:conversationId', async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'Text is required' });

  const isMember = await dbGet('SELECT 1 as ok FROM conversation_participants WHERE conversation_id = ? AND user_id = ?', [req.params.conversationId, req.userId]);
  if (!isMember) return res.status(403).json({ error: 'Not a member' });

  const id = uuid();
  const now = new Date().toISOString();
  await dbRun('INSERT INTO messages (id, conversation_id, sender_id, text, created_at) VALUES (?,?,?,?,?)', [id, req.params.conversationId, req.userId, text, now]);

  const message = await dbGet(`
    SELECT m.*, u.name as sender_name, u.initials as sender_initials, u.color as sender_color
    FROM messages m
    JOIN users u ON u.id = m.sender_id
    WHERE m.id = ?
  `, [id]);

  getIO()?.to(`conv:${req.params.conversationId}`).emit('message:new', message);

  res.status(201).json({ message });
});

export default router;
