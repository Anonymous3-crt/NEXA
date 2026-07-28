import { createContext, useContext, useState, useCallback } from 'react';
import { conversations as initialConversations, messages as initialMessages, currentUser as userData, notifications as initialNotifications } from '../data/mockData';

const DashboardContext = createContext(null);

export function DashboardProvider({ children }) {
  const [activeChat, setActiveChat] = useState(null);
  const [conversations, setConversations] = useState(initialConversations);
  const [messages, setMessages] = useState(initialMessages);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [currentUser] = useState(userData);
  const [theme, setTheme] = useState('dark');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifOpen, setNotifOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const selectChat = useCallback((chatId) => {
    setActiveChat(chatId);
    setConversations((prev) =>
      prev.map((c) => (c.id === chatId ? { ...c, unread: 0 } : c))
    );
    setNotifOpen(false);
    setSettingsOpen(false);
    setProfileOpen(false);
  }, []);

  const sendMessage = useCallback((text) => {
    if (!activeChat || !text.trim()) return;
    const newMsg = {
      id: `m${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => ({
      ...prev,
      [activeChat]: [...(prev[activeChat] || []), newMsg],
    }));
    const contact = conversations.find((c) => c.id === activeChat);
    if (contact) {
      setConversations((prev) =>
        prev.map((c) =>
          c.id === activeChat
            ? { ...c, lastMessage: text.trim(), time: 'Just now' }
            : c
        )
      );
    }
  }, [activeChat, conversations]);

  const markNotifRead = useCallback((id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
    document.documentElement.setAttribute('data-theme', theme === 'dark' ? 'light' : 'dark');
  }, [theme]);

  const filteredConversations = conversations.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardContext.Provider
      value={{
        activeChat, selectChat, conversations: filteredConversations, allConversations: conversations,
        messages, sendMessage, currentUser, theme, toggleTheme,
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
