import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';
import DashboardSubLayout from '../../components/dashboard/DashboardSubLayout';
import { api } from '../../api';
import { usePageTitle } from '../../hooks/usePageTitle';

export default function StarredPage() {
  usePageTitle('Starred — Nexa');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { api.starred.list().then(d => setItems(d.starred || [])).catch(() => {}).finally(() => setLoading(false)); }, []);
  if (loading) return null;
  if (items.length === 0) {
    return (
      <DashboardSubLayout title="Starred Messages" subtitle="Your bookmarked messages">
        <div className="flex flex-col items-center justify-center h-80 text-center">
          <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center mb-4">
            <FiStar className="text-zinc-500 text-2xl" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-1">No starred messages</h3>
          <p className="text-sm text-zinc-500">Star messages to find them easily later.</p>
        </div>
      </DashboardSubLayout>
    );
  }

  return (
    <DashboardSubLayout title="Starred Messages" subtitle={`${items.length} bookmarked messages`}>
      <div className="max-w-3xl mx-auto space-y-2">
        {items.map((msg, i) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -3 }}
            className="glass rounded-2xl p-4 transition-all duration-300 hover:bg-white/[0.06] cursor-pointer"
          >
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold shrink-0" style={{ background: msg.sender_color }}>
                {msg.sender_name.split(' ').map(w => w[0]).join('')}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white">{msg.sender_name}</span>
                    <span className="text-[10px] text-zinc-600">in</span>
                    <span className="text-xs text-indigo-400">{msg.conversation_id ? msg.conversation_id.slice(0, 8) : 'Chat'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiStar className="text-amber-400 fill-amber-400 text-xs" />
                    <span className="text-[10px] text-zinc-600">{msg.created_at ? new Date(msg.created_at).toLocaleDateString() : ''}</span>
                  </div>
                </div>
                <p className="text-sm text-zinc-300 mt-1.5 leading-relaxed">&ldquo;{msg.text}&rdquo;</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </DashboardSubLayout>
  );
}
