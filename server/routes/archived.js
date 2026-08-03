import { Router } from 'express';
import { v4 as uuid } from 'uuid';
import { dbGet, dbAll, dbRun } from '../config/db.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();
router.use(authMiddleware);

router.get('/', async (req, res) => {
  const items = await dbAll('SELECT * FROM archived_conversations WHERE user_id = ? ORDER BY created_at DESC', [req.userId]);
  res.json({ archived: items });
});

router.post('/', async (req, res) => {
  const { conversationId } = req.body;
  if (!conversationId) return res.status(400).json({ error: 'conversationId required' });

  const conv = await dbGet('SELECT * FROM conversations WHERE id = ?', [conversationId]);
  if (!conv) return res.status(404).json({ error: 'Conversation not found' });

  const isMember = await dbGet('SELECT 1 as ok FROM conversation_participants WHERE conversation_id = ? AND user_id = ?', [conversationId, req.userId]);
  if (!isMember) return res.status(403).json({ error: 'Not a member' });

  const existing = await dbGet('SELECT id FROM archived_conversations WHERE user_id = ? AND conversation_id = ?', [req.userId, conversationId]);
  if (existing) return res.status(409).json({ error: 'Conversation already archived' });

  const last = await dbGet('SELECT text FROM messages WHERE conversation_id = ? ORDER BY created_at DESC LIMIT 1', [conversationId]);
  const memberCount = (await dbGet('SELECT COUNT(*) as count FROM conversation_participants WHERE conversation_id = ?', [conversationId])).count;

  let name = conv.name;
  let initials = '';
  let color = '#6366f1';

  if (!conv.is_group) {
    const other = await dbGet(`
      SELECT u.name, u.initials, u.color
      FROM users u
      JOIN conversation_participants cp ON cp.user_id = u.id
      WHERE cp.conversation_id = ? AND u.id != ?
      LIMIT 1
    `, [conversationId, req.userId]);
    if (other) {
      name = other.name;
      initials = other.initials;
      color = other.color;
    }
  }
  if (!initials) {
    initials = name.split(/\s+/).map(w => w[0]).join('').toUpperCase().slice(0, 2);
  }

  const id = uuid();
  await dbRun('INSERT INTO archived_conversations VALUES (?,?,?,?,?,?,?,?,?)', [id, req.userId, conversationId, name, initials, color, last?.text || '', memberCount, new Date().toISOString()]);

  res.status(201).json({ archived: { id, conversation_id: conversationId, name, initials, color, last_message: last?.text || '', member_count: memberCount } });
});

router.delete('/:id', async (req, res) => {
  await dbRun('DELETE FROM archived_conversations WHERE id = ? AND user_id = ?', [req.params.id, req.userId]);
  res.json({ success: true });
});

export default router;
