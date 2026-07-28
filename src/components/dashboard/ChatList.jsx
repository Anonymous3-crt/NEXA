import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch } from 'react-icons/fi';
import { useDashboard } from '../../contexts/DashboardContext';

function ChatItem({ chat }) {
  const { activeChat, selectChat } = useDashboard();
  const isActive = activeChat === chat.id;

  return (
    <motion.button
      layout
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      onClick={() => selectChat(chat.id)}
      className={`relative w-full text-left px-4 py-3 rounded-xl transition-all duration-200 ${
        isActive
          ? 'bg-indigo-500/10 border border-indigo-500/20'
          : 'hover:bg-white/[0.04] border border-transparent'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="relative shrink-0">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-white text-sm font-bold"
            style={{ background: chat.color }}
          >
            {chat.initials}
          </div>
          {chat.online && (
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#0a0a0f]" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-medium text-white truncate">{chat.name}</span>
            <span className="text-[10px] text-zinc-500 shrink-0">{chat.time}</span>
          </div>
          <div className="flex items-center justify-between gap-2 mt-0.5">
            <span className="text-xs text-zinc-500 truncate">{chat.lastMessage}</span>
            {chat.unread > 0 && (
              <span className="w-5 h-5 rounded-full gradient-bg flex items-center justify-center text-[10px] text-white font-bold shrink-0">
                {chat.unread}
              </span>
            )}
          </div>
        </div>
      </div>
      {chat.ai && (
        <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded-md bg-emerald-500/10 text-[9px] text-emerald-400 font-medium">
          AI
        </div>
      )}
    </motion.button>
  );
}

export default function ChatList() {
  const { conversations, activeChat } = useDashboard();

  return (
    <div className="flex-1 overflow-y-auto px-3 py-2 space-y-0.5 no-scrollbar">
      {conversations.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-40 text-zinc-600">
          <FiSearch className="text-xl mb-2 opacity-50" />
          <p className="text-xs">No conversations found</p>
        </div>
      ) : (
        <AnimatePresence mode="popLayout">
          {conversations.map((chat) => (
            <ChatItem key={chat.id} chat={chat} />
          ))}
        </AnimatePresence>
      )}
    </div>
  );
}
