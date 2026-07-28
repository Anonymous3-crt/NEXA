import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initDb } from './config/db.js';
import { seedDatabase } from './db/seed.js';
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
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

initDb().then(() => {
  seedDatabase();
  console.log('Server ready');
});

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
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Nexa API running on http://localhost:${PORT}`);
});
