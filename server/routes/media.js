import { Router } from 'express';
import { dbAll } from '../config/db.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();
router.use(authMiddleware);

router.get('/', (req, res) => {
  const items = dbAll('SELECT * FROM media_files ORDER BY created_at DESC');
  res.json({ media: items });
});

export default router;
