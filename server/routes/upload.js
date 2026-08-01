import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuid } from 'uuid';
import { dbGet, dbRun } from '../config/db.js';
import { authMiddleware } from '../middleware/auth.js';
import { getIO } from '../socket.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UPLOADS_DIR = path.join(__dirname, '..', 'uploads');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${uuid()}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = /\.(png|jpg|jpeg|gif|webp|svg|pdf|doc|docx|xls|xlsx|mp4|webm|mp3|wav|zip|rar)$/i;
    if (allowed.test(path.extname(file.originalname))) return cb(null, true);
    cb(new Error('File type not allowed'));
  },
});

const router = Router();
router.use(authMiddleware);

router.post('/', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file provided' });
  const file = {
    id: uuid(),
    name: req.file.originalname,
    filename: req.file.filename,
    size: req.file.size,
    mimetype: req.file.mimetype,
    url: `/uploads/${req.file.filename}`,
    userId: req.userId,
  };
  res.json({ file });
});

router.post('/chat', authMiddleware, upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file provided' });
  const { conversationId } = req.body;
  if (!conversationId) return res.status(400).json({ error: 'conversationId required' });

  const isMember = dbGet('SELECT 1 as ok FROM conversation_participants WHERE conversation_id = ? AND user_id = ?', [conversationId, req.userId]);
  if (!isMember) return res.status(403).json({ error: 'Not a member' });

  const id = uuid();
  const messageId = uuid();
  const now = new Date().toISOString();
  const name = req.file.originalname;
  const type = req.file.mimetype.startsWith('image/') ? 'image' : req.file.mimetype.startsWith('video/') ? 'video' : 'document';
  const size = `${(req.file.size / 1024 / 1024).toFixed(1)} MB`;
  const attachment = { type, name, size, url: `/uploads/${req.file.filename}` };

  dbRun('INSERT INTO media_files VALUES (?,?,?,?,?,?,?,?)', [id, conversationId, req.userId, name, type, size, type === 'image' ? '🖼️' : type === 'video' ? '🎥' : '📄', now]);
  dbRun('INSERT INTO messages (id, conversation_id, sender_id, text, attachment, created_at) VALUES (?,?,?,?,?,?)', [messageId, conversationId, req.userId, name, JSON.stringify(attachment), now]);

  const sender = dbGet('SELECT id, name, initials, color FROM users WHERE id = ?', [req.userId]);
  const message = {
    id: messageId,
    conversation_id: conversationId,
    sender_id: req.userId,
    text: name,
    attachment: JSON.stringify(attachment),
    created_at: now,
    name: sender.name,
    initials: sender.initials,
    color: sender.color,
  };

  getIO()?.to(`conv:${conversationId}`).emit('message:new', message);

  res.json({ message });
});

export default router;
