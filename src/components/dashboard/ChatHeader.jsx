import { motion } from 'framer-motion';
import { FiMoreHorizontal, FiPhone, FiVideo, FiInfo, FiArrowLeft, FiArchive } from 'react-icons/fi';
import { useDashboard } from '../../contexts/DashboardContext';
import { useToast } from '../ui/Toast';
import { api } from '../../api';

export default function ChatHeader({ chat }) {
  const { setSidebarOpen, activeChat, setConversations, selectChat } = useDashboard();
  const toast = useToast();

  const archiveChat = async () => {
    try {
      await api.archived.create(activeChat);
      setConversations((prev) => prev.filter((c) => c.id !== activeChat));
      selectChat(null);
      toast('Conversation archived', 'success');
    } catch (err) {
      toast(err.message, 'error');
    }
  };

  return (
    <div className="flex items-center gap-3 px-4 sm:px-6 py-3 border-b border-white/[0.05] bg-[#0a0a0f]/50 backdrop-blur-sm">
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.05] transition-all"
      >
        <FiArrowLeft size={18} />
      </button>
      <div className="relative shrink-0">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold"
          style={{ background: chat.color }}
        >
          {chat.initials}
        </div>
        {chat.online && (
          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#0a0a0f]" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-white truncate">{chat.name}</span>
          {chat.ai && (
            <span className="px-1.5 py-0.5 rounded-md bg-emerald-500/10 text-[9px] text-emerald-400 font-medium">AI</span>
          )}
          {chat.group && (
            <span className="px-1.5 py-0.5 rounded-md bg-indigo-500/10 text-[9px] text-indigo-400 font-medium">Group</span>
          )}
        </div>
        <div className="flex items-center gap-2 text-xs text-zinc-500">
          <span className={`w-1.5 h-1.5 rounded-full ${chat.online ? 'bg-emerald-400' : 'bg-zinc-600'}`} />
          {chat.online ? 'Online' : 'Offline'}
        </div>
      </div>
      <div className="flex items-center gap-1">
        {[FiPhone, FiVideo, FiInfo].map((Icon, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/[0.06] transition-all"
          >
            <Icon size={16} />
          </motion.button>
        ))}
        <motion.button
          onClick={archiveChat}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/[0.06] transition-all"
          aria-label="Archive conversation"
        >
          <FiArchive size={16} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/[0.06] transition-all"
        >
          <FiMoreHorizontal size={16} />
        </motion.button>
      </div>
    </div>
  );
}
