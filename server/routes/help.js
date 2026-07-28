import { Router } from 'express';
import { dbAll } from '../config/db.js';

const router = Router();

router.get('/', function(req, res) {
  const articles = dbAll('SELECT * FROM help_articles ORDER BY category, created_at ASC');
  const categories = [...new Set(articles.map(a => a.category))];
  res.json({ articles, categories });
});

export default router;
