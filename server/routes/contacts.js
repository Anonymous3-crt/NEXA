import { Router } from 'express';
import { dbAll } from '../config/db.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();
router.use(authMiddleware);

router.get('/', (req, res) => {
  const contacts = dbAll(`
    SELECT u.id, u.name, u.email, u.initials, u.color, u.username
    FROM contacts ct
    JOIN users u ON u.id = ct.contact_user_id
    WHERE ct.user_id = ?
    ORDER BY u.name ASC
  `, [req.userId]);

  res.json({ contacts });
});

export default router;
