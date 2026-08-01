import { useEffect } from 'react';
import { usePageTitle } from '../hooks/usePageTitle';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMenu, FiMessageCircle, FiSettings, FiUser } from 'react-icons/fi';
import { DashboardProvider, useDashboard } from '../contexts/DashboardContext';
import Sidebar from '../components/dashboard/Sidebar';
import ChatWindow from '../components/dashboard/ChatWindow';
import NotificationCenter from '../components/dashboard/NotificationCenter';
import SettingsDrawer from '../components/dashboard/SettingsDrawer';
import UserProfileCard from '../components/dashboard/UserProfileCard';
import NewChatModal from '../components/dashboard/NewChatModal';

function DashboardInner() {
  const {
    currentUser, setSidebarOpen,
    setSettingsOpen, setProfileOpen,
    notifOpen, setNotifOpen,
  } = useDashboard();

  return (
    <div className="h-screen flex bg-[#0a0a0f] overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/[0.05] bg-[#0a0a0f]/50 backdrop-blur-sm lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.05] transition-all"
          >
            <FiMenu size={20} />
          </button>
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg gradient-bg flex items-center justify-center">
              <FiMessageCircle className="text-white text-xs" />
            </div>
            <span className="text-sm font-bold text-white">Nexa</span>
          </Link>
          <div className="flex items-center gap-1">
            <NotificationCenter />
            <button
              onClick={() => setProfileOpen(true)}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.05] transition-all"
            >
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-[10px] font-bold"
                style={{ background: currentUser.color }}
              >
                {currentUser.initials}
              </div>
            </button>
          </div>
        </div>
        <ChatWindow />
      </div>

      <div className="hidden lg:flex flex-col items-center gap-2 w-16 py-4 border-l border-white/[0.05] bg-[#0a0a0f]/80">
        <button className="relative w-10 h-10 rounded-xl flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/[0.06] transition-all">
          <FiMessageCircle size={18} />
        </button>
        <div className="relative w-10 h-10 rounded-xl flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/[0.06] transition-all">
          <NotificationCenter />
        </div>
        <button
          onClick={() => setSettingsOpen(true)}
          className="w-10 h-10 rounded-xl flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/[0.06] transition-all"
        >
          <FiSettings size={18} />
        </button>
        <button
          onClick={() => setProfileOpen(true)}
          className="w-10 h-10 rounded-xl flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/[0.06] transition-all"
        >
          <FiUser size={18} />
        </button>
      </div>

      <SettingsDrawer />
      <UserProfileCard />
      <NewChatModal />
    </div>
  );
}

export default function Dashboard() {
  usePageTitle('Messages — Nexa');
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('nexa_token')) navigate('/login', { replace: true });
  }, []);
  return (
    <DashboardProvider>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="h-screen"
      >
        <DashboardInner />
      </motion.div>
    </DashboardProvider>
  );
}
