import { Router } from 'express';
import { dbAll, dbRun } from '../config/db.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();
router.use(authMiddleware);

router.get('/', (req, res) => {
  const notifications = dbAll('SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC', [req.userId]);
  res.json({ notifications });
});

router.put('/:id/read', (req, res) => {
  dbRun('UPDATE notifications SET read = 1 WHERE id = ? AND user_id = ?', [req.params.id, req.userId]);
  res.json({ success: true });
});

export default router;
