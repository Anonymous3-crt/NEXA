import { Router } from 'express';
import { dbAll } from '../config/db.js';
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

export default router;
