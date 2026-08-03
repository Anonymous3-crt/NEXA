import app from '../server/app.js';
import { seedIfEmpty } from '../server/config/db.js';

export default async function handler(req, res) {
  await seedIfEmpty();
  return app(req, res);
}
