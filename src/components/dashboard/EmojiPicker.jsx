import { motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';

const emojis = [
  '😀', '😂', '🥰', '😎', '🤔', '😅', '👍', '❤️', '🔥', '✨',
  '🎉', '💯', '🙌', '👏', '🎨', '💡', '🚀', '⭐', '💪', '🤝',
  '😊', '🥺', '😤', '🤩', '😇', '🙏', '💜', '🖤', '💛', '🧡',
  '👋', '✌️', '🤞', '💅', '🎶', '🌈', '🍕', '☕', '🎮', '📱',
];

export default function EmojiPicker({ onSelect, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="absolute bottom-16 left-0 z-50 glass-strong rounded-2xl p-4 shadow-2xl border border-white/[0.08] w-72"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-zinc-400 font-medium">Emoji</span>
        <button
          onClick={onClose}
          className="p-1 rounded-lg text-zinc-500 hover:text-white hover:bg-white/[0.06] transition-all"
        >
          <FiX size={14} />
        </button>
      </div>
      <div className="grid grid-cols-8 gap-1">
        {emojis.map((emoji) => (
          <motion.button
            key={emoji}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              onSelect(emoji);
              onClose();
            }}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/[0.08] transition-colors text-lg"
          >
            {emoji}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
