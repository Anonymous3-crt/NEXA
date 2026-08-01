import { Server } from 'socket.io';

let io = null;

export function initSocket(server) {
  io = new Server(server, { cors: { origin: '*', methods: ['GET', 'POST'] } });
  return io;
}

export function getIO() {
  return io;
}
