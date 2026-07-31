import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuid } from 'uuid';
import { dbRun } from '../config/db.js';
import { authMiddleware } from '../middleware/auth.js';

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

  const id = uuid();
  const name = req.file.originalname;
  const type = req.file.mimetype.startsWith('image/') ? 'image' : req.file.mimetype.startsWith('video/') ? 'video' : 'document';
  const size = `${(req.file.size / 1024 / 1024).toFixed(1)} MB`;
  const preview = type === 'image' ? '🖼️' : type === 'video' ? '🎥' : '📄';

  dbRun('INSERT INTO media_files VALUES (?,?,?,?,?,?,?,?)', [id, conversationId, req.userId, name, type, size, preview, new Date().toISOString()]);

  res.json({ file: { id, name, type, size, preview, url: `/uploads/${req.file.filename}` } });
});

export default router;
