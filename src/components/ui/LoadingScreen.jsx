import { motion } from 'framer-motion';
import { FiMessageCircle } from 'react-icons/fi';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0a0f]">
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center shadow-xl glow-lg"
      >
        <FiMessageCircle className="text-white text-2xl" />
      </motion.div>
      <motion.p
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="mt-4 text-sm text-zinc-500"
      >
        Loading...
      </motion.p>
    </div>
  );
}
