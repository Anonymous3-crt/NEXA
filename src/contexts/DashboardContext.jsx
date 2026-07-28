import { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { api, getStoredUser } from '../api';
import { useToast } from '../components/ui/Toast';
import { useSocket } from '../socket';

const DashboardContext = createContext(null);

export function DashboardProvider({ children }) {
  const toast = useToast();
  const socket = useSocket();
  const socketRef = useRef(socket);
  socketRef.current = socket;
  const [activeChat, setActiveChat] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [currentUser, setCurrentUser] = useState(getStoredUser());
  const [theme, setTheme] = useState(() => localStorage.getItem('nexa_theme') || 'dark');
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifOpen, setNotifOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    loadConversations();
    loadNotifications();
    loadContacts();
  }, []);

  useEffect(() => {
    if (!socket) return;
    const handler = (message) => {
      setMessages(prev => ({
        ...prev,
        [message.conversation_id]: [...(prev[message.conversation_id] || []), message],
      }));
      setConversations(prev =>
        prev.map(c => c.id === message.conversation_id ? { ...c, lastMessage: message.text, time: 'Just now' } : c)
      );
    };
    socket.on('message:new', handler);
    return () => { socket.off('message:new', handler); };
  }, [socket]);

  async function loadConversations() {
    try {
      const data = await api.conversations.list();
      setConversations(data.conversations || []);
    } catch { /* ok */ }
    setLoading(false);
  }

  async function loadNotifications() {
    try {
      const data = await api.notifications.list();
      setNotifications(data.notifications || []);
    } catch { /* ok */ }
  }

  async function loadContacts() {
    try {
      const data = await api.contacts.list();
      setContacts(data.contacts || []);
    } catch { /* ok */ }
  }

  async function loadMessages(chatId) {
    try {
      const data = await api.messages.list(chatId);
      setMessages(prev => ({ ...prev, [chatId]: data.messages || [] }));
    } catch { /* ok */ }
  }

  const selectChat = useCallback((chatId) => {
    setActiveChat(chatId);
    if (!messages[chatId]) loadMessages(chatId);
    setConversations((prev) =>
      prev.map((c) => (c.id === chatId ? { ...c, unread: 0 } : c))
    );
    setNotifOpen(false);
    setSettingsOpen(false);
    setProfileOpen(false);
    if (socketRef.current) socketRef.current.emit('join:conversation', chatId);
  }, [messages]);

  const sendMessage = useCallback((text) => {
    if (!activeChat || !text.trim()) return;
    const trimmed = text.trim();
    if (socketRef.current) {
      socketRef.current.emit('message:send', { conversationId: activeChat, text: trimmed });
    } else {
      toast('Not connected to server', 'error');
    }
  }, [activeChat]);

  const markNotifRead = useCallback(async (id) => {
    try {
      await api.notifications.markRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: 1 } : n))
      );
    } catch { /* ok */ }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('nexa_theme', next);
      document.documentElement.setAttribute('data-theme', next);
      return next;
    });
  }, []);

  const filteredConversations = conversations.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardContext.Provider
      value={{
        activeChat, selectChat, conversations: filteredConversations, allConversations: conversations,
        messages, sendMessage, currentUser, theme, toggleTheme, loading, contacts,
        sidebarOpen, setSidebarOpen, notifOpen, setNotifOpen,
        settingsOpen, setSettingsOpen, profileOpen, setProfileOpen,
        emojiPickerOpen, setEmojiPickerOpen, searchQuery, setSearchQuery,
        notifications, markNotifRead,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const ctx = useContext(DashboardContext);
  if (!ctx) throw new Error('useDashboard must be used within DashboardProvider');
  return ctx;
}
