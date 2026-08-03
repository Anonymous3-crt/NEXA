import { Router } from 'express';
import { v4 as uuid } from 'uuid';
import { dbAll, dbRun } from '../config/db.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();
router.use(authMiddleware);

router.get('/', async (req, res) => {
  const conversations = await dbAll(`
    SELECT c.*, m.text as last_message, m.created_at as last_message_time
    FROM conversations c
    JOIN conversation_participants cp ON cp.conversation_id = c.id
    LEFT JOIN messages m ON m.id = (
      SELECT m2.id FROM messages m2 WHERE m2.conversation_id = c.id ORDER BY m2.created_at DESC LIMIT 1
    )
    WHERE cp.user_id = ?
    ORDER BY COALESCE(m.created_at, c.created_at) DESC
  `, [req.userId]);

  const result = await Promise.all(conversations.map(async (c) => {
    const participants = await dbAll(`
      SELECT u.id, u.name, u.initials, u.color
      FROM users u
      JOIN conversation_participants cp ON cp.user_id = u.id
      WHERE cp.conversation_id = ?
    `, [c.id]);
    return { ...c, participants };
  }));

  res.json({ conversations: result });
});

router.post('/', async (req, res) => {
  const { name, participantIds, isGroup } = req.body;
  if (!name || !participantIds) {
    return res.status(400).json({ error: 'Name and participantIds required' });
  }

  const id = uuid();
  await dbRun('INSERT INTO conversations (id, name, is_group) VALUES (?,?,?)', [id, name, isGroup ? 1 : 0]);
  await dbRun('INSERT INTO conversation_participants (conversation_id, user_id) VALUES (?,?)', [id, req.userId]);
  for (const pid of participantIds) {
    await dbRun('INSERT OR IGNORE INTO conversation_participants (conversation_id, user_id) VALUES (?,?)', [id, pid]);
  }

  res.status(201).json({ conversation: { id, name, is_group: isGroup ? 1 : 0 } });
});

export default router;
