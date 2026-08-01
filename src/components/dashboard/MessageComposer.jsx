import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiPaperclip, FiMic, FiSmile, FiLoader } from 'react-icons/fi';
import { useDashboard } from '../../contexts/DashboardContext';
import { useToast } from '../ui/Toast';
import { api } from '../../api';
import EmojiPicker from './EmojiPicker';

export default function MessageComposer() {
  const [text, setText] = useState('');
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef(null);
  const toast = useToast();
  const { sendMessage, activeChat, emojiPickerOpen, setEmojiPickerOpen } = useDashboard();

  const handleSend = () => {
    if (!text.trim()) return;
    sendMessage(text);
    setText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const insertEmoji = (emoji) => {
    setText((prev) => prev + emoji);
  };

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !activeChat) return;
    setUploading(true);
    try {
      await api.upload.file(file, activeChat);
      toast('File sent', 'success');
    } catch (err) {
      toast(err.message || 'Upload failed', 'error');
    }
    setUploading(false);
    if (fileRef.current) fileRef.current.value = '';
  };

  return (
    <div className="border-t border-white/[0.05] bg-[#0a0a0f]/50 backdrop-blur-sm px-4 sm:px-6 py-3">
      <div className="flex items-end gap-2">
        <div className="flex items-center gap-1 pb-1">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setEmojiPickerOpen(!emojiPickerOpen)}
            className="relative p-2 rounded-lg text-zinc-500 hover:text-white hover:bg-white/[0.06] transition-all"
          >
            <FiSmile size={18} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => fileRef.current?.click()}
            className="p-2 rounded-lg text-zinc-500 hover:text-white hover:bg-white/[0.06] transition-all"
          >
            {uploading ? <FiLoader className="animate-spin" size={18} /> : <FiPaperclip size={18} />}
          </motion.button>
          <input ref={fileRef} type="file" onChange={handleFile} className="hidden" />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg text-zinc-500 hover:text-white hover:bg-white/[0.06] transition-all"
          >
            <FiMic size={18} />
          </motion.button>
        </div>
        <div className="flex-1 relative">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="w-full bg-white/[0.04] border border-white/[0.06] rounded-xl px-4 py-3 text-sm text-white outline-none transition-all duration-300 focus:border-indigo-500/30 focus:bg-white/[0.06] placeholder:text-zinc-600"
          />
          {emojiPickerOpen && (
            <EmojiPicker onSelect={insertEmoji} onClose={() => setEmojiPickerOpen(false)} />
          )}
        </div>
        <motion.button
          onClick={handleSend}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={!text.trim()}
          className="p-3 rounded-xl gradient-bg text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg glow-indigo"
        >
          <FiSend size={18} />
        </motion.button>
      </div>
    </div>
  );
}
