import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiArchive, FiUsers } from 'react-icons/fi';
import DashboardSubLayout from '../../components/dashboard/DashboardSubLayout';
import { api } from '../../api';
import { useToast } from '../../components/ui/Toast';
import { usePageTitle } from '../../hooks/usePageTitle';

export default function ArchivedPage() {
  usePageTitle('Archived — Nexa');
  const toast = useToast();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);
  useEffect(() => { api.archived.list().then(d => setItems(d.archived || [])).catch(() => {}).finally(() => setLoading(false)); }, []);

  const unarchive = async (item) => {
    setBusyId(item.id);
    try {
      await api.archived.unarchive(item.id);
      setItems((prev) => prev.filter((i) => i.id !== item.id));
      toast('Conversation unarchived', 'success');
    } catch (err) {
      toast(err.message, 'error');
    }
    setBusyId(null);
  };
  if (loading) return null;
  if (items.length === 0) {
    return (
      <DashboardSubLayout title="Archived Chats" subtitle="Conversations you've archived">
        <div className="flex flex-col items-center justify-center h-80 text-center">
          <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center mb-4">
            <FiArchive className="text-zinc-500 text-2xl" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-1">No archived chats</h3>
          <p className="text-sm text-zinc-500">Archived conversations will appear here.</p>
        </div>
      </DashboardSubLayout>
    );
  }

  return (
    <DashboardSubLayout title="Archived Chats" subtitle={`${items.length} archived conversations`}>
      <div className="max-w-3xl mx-auto space-y-2">
        {items.map((chat, i) => (
          <motion.div
            key={chat.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -3 }}
            className="glass rounded-2xl p-4 transition-all duration-300 hover:bg-white/[0.06] cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white text-sm font-bold shrink-0" style={{ background: chat.color }}>
                {chat.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-medium text-white">{chat.name}</span>
                  <span className="text-[10px] text-zinc-600 shrink-0">{chat.created_at ? new Date(chat.created_at).toLocaleDateString() : ''}</span>
                </div>
                <p className="text-xs text-zinc-400 mt-0.5 truncate">{chat.last_message}</p>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="flex items-center gap-1 text-[10px] text-zinc-600">
                    <FiUsers size={10} /> {chat.member_count} members
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-zinc-600">
                    <FiArchive size={10} /> Archived
                  </span>
                </div>
              </div>
              <motion.button
                onClick={() => unarchive(chat)}
                disabled={busyId === chat.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-3 py-1.5 rounded-lg glass text-xs text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-all disabled:opacity-50"
              >
                {busyId === chat.id ? 'Unarchiving…' : 'Unarchive'}
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </DashboardSubLayout>
  );
}
