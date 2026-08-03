import http from 'http';
import { v4 as uuid } from 'uuid';
import { dbGet, dbRun } from './config/db.js';
import { verifyToken } from './middleware/auth.js';
import { initSocket } from './socket.js';
import app, { seedIfEmpty } from './app.js';

const server = http.createServer(app);
const io = initSocket(server);
const PORT = process.env.PORT || 3001;

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

  socket.on('message:send', async ({ conversationId, text }) => {
    const senderId = socket.userId;
    const id = uuid();
    const now = new Date().toISOString();

    const sender = await dbGet('SELECT id, name, initials, color FROM users WHERE id = ?', [senderId]);
    if (!sender) return;

    await dbRun('INSERT INTO messages (id, conversation_id, sender_id, text, created_at) VALUES (?,?,?,?,?)', [id, conversationId, senderId, text, now]);

    const message = { id, conversation_id: conversationId, sender_id: senderId, text, created_at: now, name: sender.name, initials: sender.initials, color: sender.color };

    io.to(`conv:${conversationId}`).emit('message:new', message);
  });

  socket.on('disconnect', () => {
    console.log(`User ${socket.userId} disconnected`);
  });
});

seedIfEmpty()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Nexa API running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to initialize database:', err);
    process.exit(1);
  });
