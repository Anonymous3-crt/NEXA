import { Router } from 'express';
import { v4 as uuid } from 'uuid';
import { dbGet, dbAll, dbRun } from '../config/db.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();
router.use(authMiddleware);

router.get('/', (req, res) => {
  const items = dbAll(`
    SELECT s.*, c.name as conversation_name
    FROM starred_messages s
    LEFT JOIN conversations c ON c.id = s.conversation_id
    WHERE s.user_id = ?
    ORDER BY s.created_at DESC
  `, [req.userId]);
  res.json({ starred: items });
});

router.post('/toggle', (req, res) => {
  const { messageId, conversationId, senderId, text } = req.body;

  let convId;
  let sid;
  let txt;
  let senderName;
  let senderColor;
  let createdAt;

  if (messageId) {
    const msg = dbGet(`
      SELECT m.conversation_id, m.sender_id, m.text, m.created_at, u.name, u.color
      FROM messages m
      JOIN users u ON u.id = m.sender_id
      WHERE m.id = ?
    `, [messageId]);
    if (!msg) return res.status(404).json({ error: 'Message not found' });
    convId = msg.conversation_id;
    sid = msg.sender_id;
    txt = msg.text;
    senderName = msg.name;
    senderColor = msg.color;
    createdAt = msg.created_at;
  } else if (conversationId && senderId && text) {
    convId = conversationId;
    sid = senderId;
    txt = text;
    const u = dbGet('SELECT name, color FROM users WHERE id = ?', [senderId]);
    senderName = u?.name || 'Unknown';
    senderColor = u?.color || '#6366f1';
    const m = dbGet('SELECT created_at FROM messages WHERE conversation_id = ? AND sender_id = ? AND text = ? ORDER BY created_at DESC LIMIT 1', [convId, sid, txt]);
    createdAt = m?.created_at || new Date().toISOString();
  } else {
    return res.status(400).json({ error: 'messageId (or conversationId + senderId + text) required' });
  }

  const isMember = dbGet('SELECT 1 as ok FROM conversation_participants WHERE conversation_id = ? AND user_id = ?', [convId, req.userId]);
  if (!isMember) return res.status(403).json({ error: 'Not a member' });

  const existing = dbGet('SELECT id FROM starred_messages WHERE user_id = ? AND conversation_id = ? AND sender_id = ? AND text = ?', [req.userId, convId, sid, txt]);
  if (existing) {
    dbRun('DELETE FROM starred_messages WHERE id = ?', [existing.id]);
    return res.json({ starred: null });
  }

  const id = uuid();
  dbRun('INSERT INTO starred_messages VALUES (?,?,?,?,?,?,?,?)', [id, req.userId, convId, sid, txt, senderName, senderColor, createdAt]);
  res.status(201).json({ starred: { id, conversation_id: convId, sender_id: sid, text: txt, sender_name: senderName, sender_color: senderColor, created_at: createdAt } });
});

export default router;
