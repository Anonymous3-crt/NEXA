import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { seedIfEmpty } from './config/db.js';
import authRoutes from './routes/auth.js';
import conversationsRoutes from './routes/conversations.js';
import messagesRoutes from './routes/messages.js';
import contactsRoutes from './routes/contacts.js';
import notificationsRoutes from './routes/notifications.js';
import archivedRoutes from './routes/archived.js';
import starredRoutes from './routes/starred.js';
import mediaRoutes from './routes/media.js';
import callsRoutes from './routes/calls.js';
import helpRoutes from './routes/help.js';
import uploadRoutes from './routes/upload.js';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : 'http://localhost:5173' }));
app.use(express.json());

if (!process.env.BLOB_READ_WRITE_TOKEN) {
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
}

app.use('/api/auth', authRoutes);
app.use('/api/conversations', conversationsRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api/contacts', contactsRoutes);
app.use('/api/notifications', notificationsRoutes);
app.use('/api/archived', archivedRoutes);
app.use('/api/starred', starredRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/calls', callsRoutes);
app.use('/api/help', helpRoutes);
app.use('/api/upload', uploadRoutes);
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use((err, req, res, _next) => {
  if (err?.message === 'File type not allowed') {
    return res.status(400).json({ error: err.message });
  }
  if (err?.status || err?.statusCode) {
    return res.status(err.status || err.statusCode).json({ error: err.message || 'Bad request' });
  }
  console.error('[API Error]', err);
  res.status(500).json({ error: 'Server error' });
});

export { seedIfEmpty };
export default app;
