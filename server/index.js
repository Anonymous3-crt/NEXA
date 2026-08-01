import express from 'express';
import cors from 'cors';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { initDb } from './config/db.js';
import { seedDatabase } from './db/seed.js';
import { verifyToken } from './middleware/auth.js';
import { dbGet, dbRun } from './config/db.js';
import { v4 as uuid } from 'uuid';
import { initSocket } from './socket.js';
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
const server = http.createServer(app);
const io = initSocket(server);
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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
app.use('/api/upload', uploadRoutes);
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Socket.io auth middleware
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) return next(new Error('No token provided'));
  const decoded = verifyToken(token);
  if (!decoded) return next(new Error('Invalid token'));
  socket.userId = decoded.userId;
  next();
});

io.on('connection', (socket) => {
  console.log(`User ${socket.userId} connected (${socket.id})`);

  socket.on('join:conversation', (convId) => {
    socket.join(`conv:${convId}`);
  });

  socket.on('leave:conversation', (convId) => {
    socket.leave(`conv:${convId}`);
  });

  socket.on('message:send', ({ conversationId, text }) => {
    const senderId = socket.userId;
    const id = uuid();
    const now = new Date().toISOString();
    const sender = dbGet('SELECT id, name, initials, color FROM users WHERE id = ?', [senderId]);

    dbRun('INSERT INTO messages VALUES (?,?,?,?,?)', [id, conversationId, senderId, text, now]);

    const message = { id, conversation_id: conversationId, sender_id: senderId, text, created_at: now, name: sender.name, initials: sender.initials, color: sender.color };

    io.to(`conv:${conversationId}`).emit('message:new', message);

    // Create notification for other participants
    const participants = dbGet('SELECT user_id FROM conversation_participants WHERE conversation_id = ? AND user_id != ?', [conversationId, senderId]);
    // This is simplified — in production you'd notify all participants
  });

  socket.on('disconnect', () => {
    console.log(`User ${socket.userId} disconnected`);
  });
});

server.listen(PORT, () => {
  console.log(`Nexa API running on http://localhost:${PORT}`);
});
