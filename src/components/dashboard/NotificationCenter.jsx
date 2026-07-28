import { motion, AnimatePresence } from 'framer-motion';
import { FiBell, FiX, FiCheck } from 'react-icons/fi';
import { useDashboard } from '../../contexts/DashboardContext';

export default function NotificationCenter() {
  const { notifOpen, setNotifOpen, notifications, markNotifRead } = useDashboard();
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <>
      <button
        onClick={() => setNotifOpen(!notifOpen)}
        className="relative p-2 rounded-lg text-zinc-500 hover:text-white hover:bg-white/[0.06] transition-all"
      >
        <FiBell size={18} />
        {unread > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full gradient-bg flex items-center justify-center text-[9px] text-white font-bold"
          >
            {unread}
          </motion.span>
        )}
      </button>

      <AnimatePresence>
        {notifOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-4 top-16 z-50 glass-strong rounded-2xl shadow-2xl border border-white/[0.08] w-80 max-h-96 overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.05]">
              <span className="text-sm font-semibold text-white">Notifications</span>
              <button
                onClick={() => setNotifOpen(false)}
                className="p-1 rounded-lg text-zinc-500 hover:text-white hover:bg-white/[0.06] transition-all"
              >
                <FiX size={14} />
              </button>
            </div>
            <div className="overflow-y-auto max-h-80 no-scrollbar">
              {notifications.length === 0 ? (
                <div className="p-6 text-center text-sm text-zinc-500">No notifications</div>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`flex items-start gap-3 px-4 py-3 transition-colors ${
                      !n.read ? 'bg-indigo-500/5' : 'hover:bg-white/[0.03]'
                    }`}
                  >
                    <span className="text-base shrink-0 mt-0.5">{n.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-medium text-white">{n.title}</span>
                        <span className="text-[10px] text-zinc-600 shrink-0">{n.time}</span>
                      </div>
                      <p className="text-xs text-zinc-400 mt-0.5 line-clamp-2">{n.desc}</p>
                    </div>
                    {!n.read && (
                      <button
                        onClick={() => markNotifRead(n.id)}
                        className="p-1 rounded-lg text-zinc-500 hover:text-white hover:bg-white/[0.06] transition-all shrink-0 mt-0.5"
                      >
                        <FiCheck size={12} />
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
