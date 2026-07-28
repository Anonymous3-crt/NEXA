import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiFilter } from 'react-icons/fi';
import DashboardSubLayout from '../../components/dashboard/DashboardSubLayout';
import { useDashboard } from '../../contexts/DashboardContext';
import { usePageTitle } from '../../hooks/usePageTitle';

export default function NotificationsPage() {
  usePageTitle('Notifications — Nexa');
  const { notifications, markNotifRead } = useDashboard();
  const [filter, setFilter] = useState('all');
  const filters = ['all', 'unread', 'mentions', 'system'];

  return (
    <DashboardSubLayout
      title="Notifications"
      subtitle="Stay updated with your activity"
      action={
        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="flex items-center gap-2 px-4 py-2 rounded-xl glass text-sm text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-all">
          <FiFilter size={14} />
          Filter
        </motion.button>
      }
    >
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex gap-2">
          {filters.map((f) => (
            <motion.button
              key={f}
              onClick={() => setFilter(f)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`px-4 py-1.5 rounded-xl text-xs font-medium capitalize transition-all ${
                filter === f ? 'bg-indigo-500/20 text-indigo-400' : 'glass text-zinc-400 hover:text-white'
              }`}
            >
              {f}
            </motion.button>
          ))}
        </div>

        <motion.div layout className="space-y-2">
          {filtered.map((n, i) => (
            <motion.div
              key={n.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className={`glass rounded-2xl p-4 transition-all duration-300 hover:bg-white/[0.06] ${
                !n.read ? 'border-l-2 border-l-indigo-500' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-lg shrink-0 mt-0.5">{n.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium text-white">{n.title}</span>
                    <span className="text-[10px] text-zinc-600 shrink-0">{n.created_at ? new Date(n.created_at).toLocaleDateString() : ''}</span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-1">{n.description || n.desc}</p>
                </div>
                {!n.read && (
                  <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => markNotifRead(n.id)} className="p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-white/[0.06] transition-all">
                    <FiCheck size={14} />
                  </motion.button>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </DashboardSubLayout>
  );
}
