import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

/* eslint-disable react-refresh/only-export-components */

const SocketContext = createContext(null);

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('nexa_token');
    if (!token) return;
    const s = io('/', { auth: { token }, transports: ['polling', 'websocket'] });
    s.on('connect', () => setSocket(s));
    s.on('connect_error', () => {});
    return () => { s.disconnect(); };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  return useContext(SocketContext);
}
