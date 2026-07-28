import { Router } from 'express';
import { dbAll } from '../config/db.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();
router.use(authMiddleware);

router.get('/', (req, res) => {
  const items = dbAll('SELECT * FROM archived_conversations WHERE user_id = ? ORDER BY created_at DESC', [req.userId]);
  res.json({ archived: items });
});

export default router;
