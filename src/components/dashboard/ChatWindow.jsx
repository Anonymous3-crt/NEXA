import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiCpu } from 'react-icons/fi';
import { useDashboard } from '../../contexts/DashboardContext';
import ChatHeader from './ChatHeader';
import MessageComposer from './MessageComposer';

function MessageBubble({ msg }) {
  const isUser = msg.sender === 'user';
  const isAi = msg.sender === 'ai';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : ''}`}
    >
      <div
        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
          isAi
            ? 'bg-gradient-to-br from-emerald-500 to-teal-600'
            : isUser
              ? 'bg-indigo-500'
              : 'bg-zinc-800'
        }`}
      >
        {isAi ? (
          <FiCpu className="text-white text-xs" />
        ) : (
          <FiUser className={isUser ? 'text-white text-xs' : 'text-zinc-300 text-xs'} />
        )}
      </div>
      <div className="max-w-[70%]">
        <div
          className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
            isUser
              ? 'gradient-bg text-white rounded-tr-md'
              : 'glass text-zinc-200 rounded-tl-md'
          }`}
        >
          {msg.text}
        </div>
        <div className={`text-[10px] text-zinc-600 mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
          {msg.time}
        </div>
      </div>
    </motion.div>
  );
}

export default function ChatWindow() {
  const { activeChat, messages, conversations } = useDashboard();
  const bottomRef = useRef(null);
  const chat = conversations.find((c) => c.id === activeChat);
  const chatMessages = activeChat ? messages[activeChat] || [] : [];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages.length]);

  if (!activeChat || !chat) {
    return <EmptyState />;
  }

  return (
    <div className="flex-1 flex flex-col h-full min-w-0">
      <ChatHeader chat={chat} />
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 no-scrollbar">
        {chatMessages.map((msg) => (
          <MessageBubble key={msg.id} msg={msg} />
        ))}
        <div ref={bottomRef} />
      </div>
      <MessageComposer />
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center h-full px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-sm"
      >
        <div className="w-20 h-20 rounded-3xl gradient-bg flex items-center justify-center mx-auto mb-6 shadow-xl glow-lg">
          <FiCpu className="text-white text-3xl" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">Welcome to Nexa</h3>
        <p className="text-sm text-zinc-400 leading-relaxed mb-6">
          Select a conversation from the sidebar or start a new chat to begin messaging with AI-powered assistance.
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {['Start a chat', 'Browse channels', 'Invite team'].map((text) => (
            <span
              key={text}
              className="px-3.5 py-1.5 rounded-lg glass text-xs text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-all cursor-default"
            >
              {text}
            </span>
          ))}
        </div>
        <div className="mt-8 grid grid-cols-3 gap-3">
          {['💬', '⚡', '🔒'].map((emoji, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="glass rounded-xl p-3 text-center"
            >
              <div className="text-xl mb-1">{emoji}</div>
              <div className="text-[10px] text-zinc-500">
                {['Smart AI', 'Instant', 'Secure'][i]}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export { EmptyState };
