import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiCpu, FiStar } from 'react-icons/fi';
import { useDashboard } from '../../contexts/DashboardContext';
import { useToast } from '../ui/Toast';
import { api } from '../../api';
import { formatTime, getInitials, getColor } from '../../utils/format';
import ChatHeader from './ChatHeader';
import MessageComposer from './MessageComposer';

function AttachmentCard({ attach }) {
  if (!attach) return null;
  const emoji = attach.type === 'image' ? '🖼️' : attach.type === 'video' ? '🎥' : '📄';
  if (attach.type === 'image') {
    return (
      <a href={attach.url} target="_blank" rel="noopener noreferrer" className="block mb-1.5">
        <img
          src={attach.url}
          alt={attach.name}
          className="max-w-[260px] max-h-60 rounded-xl border border-white/[0.06] object-cover hover:opacity-90 transition-opacity"
        />
      </a>
    );
  }
  return (
    <a
      href={attach.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 mb-1.5 px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] transition-all max-w-[260px]"
    >
      <span className="text-lg shrink-0">{emoji}</span>
      <span className="flex-1 min-w-0">
        <span className="block text-xs text-white truncate">{attach.name}</span>
        <span className="block text-[10px] text-zinc-500">{attach.size}</span>
      </span>
    </a>
  );
}

function MessageBubble({ msg, currentUser }) {
  const isUser = msg.sender_id === currentUser?.id;
  const initials = getInitials(msg.sender_initials || msg.initials || (isUser ? currentUser?.name : null));
  const color = msg.sender_color || msg.color || getColor(msg.sender_id);
  const time = formatTime(msg.created_at || msg.time);
  const [starred, setStarred] = useState(false);
  const toast = useToast();
  let attach = null;
  try {
    attach = msg.attachment ? JSON.parse(msg.attachment) : null;
  } catch {
    /* invalid attachment JSON */
  }

  const toggleStar = async (e) => {
    e.stopPropagation();
    try {
      const data = await api.starred.toggle({ messageId: msg.id });
      setStarred(!!data.starred);
      toast(data.starred ? 'Message starred' : 'Message unstarred', data.starred ? 'success' : 'info');
    } catch (err) {
      toast(err.message, 'error');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`group flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : ''}`}
    >
      <div
        className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-[10px] font-bold text-white"
        style={{ background: color }}
      >
        {initials}
      </div>
      <div className="max-w-[70%]">
        <div
          className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
            isUser
              ? 'gradient-bg text-white rounded-tr-md'
              : 'glass text-zinc-200 rounded-tl-md'
          }`}
        >
          <AttachmentCard attach={attach} />
          {msg.text}
        </div>
        <div className={`flex items-center gap-1.5 text-[10px] text-zinc-600 mt-1 ${isUser ? 'flex-row-reverse' : ''}`}>
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <motion.button
              onClick={toggleStar}
              whileTap={{ scale: 0.85 }}
              className={`p-1 rounded-md transition-colors ${
                starred
                  ? 'text-amber-400'
                  : 'text-zinc-600 hover:text-amber-400'
              }`}
              aria-label={starred ? 'Unstar message' : 'Star message'}
            >
              <FiStar className={starred ? 'fill-amber-400' : ''} size={11} />
            </motion.button>
          </span>
          <span className={isUser ? 'text-right' : 'text-left'}>{time}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function ChatWindow() {
  const { activeChat, messages, conversations, currentUser } = useDashboard();
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
          <MessageBubble key={msg.id} msg={msg} currentUser={currentUser} />
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
