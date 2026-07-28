import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMessageCircle, FiShield, FiZap } from 'react-icons/fi';

const floatingIcons = [
  { Icon: FiMessageCircle, x: '10%', y: '20%', color: '#6366f1', delay: 0 },
  { Icon: FiZap, x: '85%', y: '30%', color: '#8b5cf6', delay: 1 },
  { Icon: FiShield, x: '15%', y: '70%', color: '#06b6d4', delay: 2 },
  { Icon: FiMessageCircle, x: '75%', y: '75%', color: '#6366f1', delay: 0.5 },
];

export default function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0f] p-4 sm:p-6">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[100px]" />
      </div>

      {floatingIcons.map(({ Icon, x, y, color, delay }) => (
        <motion.div
          key={delay}
          className="absolute hidden lg:block pointer-events-none"
          style={{ left: x, top: y }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ delay, duration: 1.5 }}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, delay, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Icon size={28} style={{ color }} />
          </motion.div>
        </motion.div>
      ))}

      <div className="relative z-10 w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Link to="/" className="inline-flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center shadow-lg">
              <FiMessageCircle className="text-white text-xl" />
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">Nexa</span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass rounded-3xl p-6 sm:p-8 border border-white/[0.06]"
        >
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-white mb-1">{title}</h1>
            <p className="text-sm text-zinc-400">{subtitle}</p>
          </div>
          {children}
        </motion.div>
      </div>
    </div>
  );
}
