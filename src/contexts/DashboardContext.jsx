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
  const [newChatOpen, setNewChatOpen] = useState(false);

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

  useEffect(() => {
    if (!activeChat || socketRef.current?.connected) return;
    let active = true;
    const poll = async () => {
      try {
        const data = await api.messages.list(activeChat);
        if (!active) return;
        setMessages((prev) => {
          const existing = prev[activeChat] || [];
          const serverIds = new Set((data.messages || []).map((m) => m.id));
          const merged = [
            ...existing.filter((m) => !serverIds.has(m.id) && m.pending),
            ...(data.messages || []),
          ];
          if (merged.length === existing.length) return prev;
          return { ...prev, [activeChat]: merged };
        });
      } catch { /* ok */ }
    };
    poll();
    const timer = setInterval(poll, 3000);
    return () => { active = false; clearInterval(timer); };
  }, [activeChat, socket]);

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
    if (!chatId) {
      setActiveChat(null);
      setNotifOpen(false);
      setSettingsOpen(false);
      setProfileOpen(false);
      return;
    }
    setActiveChat(chatId);
    if (!messages[chatId]) loadMessages(chatId);
    setConversations((prev) =>
      prev.map((c) => (c.id === chatId ? { ...c, unread: 0 } : c))
    );
    setNotifOpen(false);
    setSettingsOpen(false);
    setProfileOpen(false);
    if (socketRef.current?.connected) socketRef.current.emit('join:conversation', chatId);
  }, [messages]);

  const createConversation = useCallback(async ({ name, participantIds, isGroup }) => {
    try {
      const data = await api.conversations.create({ name, participantIds, isGroup });
      const created = data.conversation;
      setConversations((prev) => [created, ...prev]);
      selectChat(created.id);
      toast(`Started "${name}"`, 'success');
      return created;
    } catch (err) {
      toast(err.message || 'Could not create conversation', 'error');
      throw err;
    }
  }, [selectChat, toast]);

  const sendMessage = useCallback(async (text) => {
    if (!activeChat || !text.trim()) return;
    const trimmed = text.trim();

    if (socketRef.current?.connected) {
      socketRef.current.emit('message:send', { conversationId: activeChat, text: trimmed });
      return;
    }

    const tempId = `temp-${Date.now()}`;
    setMessages((prev) => ({
      ...prev,
      [activeChat]: [...(prev[activeChat] || []), {
        id: tempId,
        conversation_id: activeChat,
        sender_id: currentUser?.id,
        text: trimmed,
        created_at: new Date().toISOString(),
        pending: true,
      }],
    }));

    try {
      const data = await api.messages.send(activeChat, trimmed);
      setMessages((prev) => ({
        ...prev,
        [activeChat]: (prev[activeChat] || []).map((m) => (m.id === tempId ? data.message : m)),
      }));
    } catch (err) {
      setMessages((prev) => ({
        ...prev,
        [activeChat]: (prev[activeChat] || []).filter((m) => m.id !== tempId),
      }));
      toast(err.message || 'Could not send message', 'error');
    }
  }, [activeChat, currentUser, toast]);

  const appendMessage = useCallback((message) => {
    setMessages((prev) => {
      const existing = prev[message.conversation_id] || [];
      if (existing.some((m) => m.id === message.id)) return prev;
      return { ...prev, [message.conversation_id]: [...existing, message] };
    });
  }, []);

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
        notifications, markNotifRead, newChatOpen, setNewChatOpen, createConversation,
        loadContacts, appendMessage,
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
