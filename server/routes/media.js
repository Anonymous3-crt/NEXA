import { Router } from 'express';
import { dbAll } from '../config/db.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();
router.use(authMiddleware);

router.get('/', async (req, res) => {
  const items = await dbAll(`
    SELECT mf.* FROM media_files mf
    JOIN conversation_participants cp ON cp.conversation_id = mf.conversation_id
    WHERE cp.user_id = ?
    ORDER BY mf.created_at DESC
  `, [req.userId]);
  res.json({ media: items });
});

export default router;
