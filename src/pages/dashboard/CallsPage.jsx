import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPhone, FiPhoneIncoming, FiPhoneOutgoing, FiVideo } from 'react-icons/fi';
import DashboardSubLayout from '../../components/dashboard/DashboardSubLayout';
import { api } from '../../api';
import { useToast } from '../../components/ui/Toast';
import { usePageTitle } from '../../hooks/usePageTitle';

const iconMap = {
  incoming: FiPhoneIncoming,
  outgoing: FiPhoneOutgoing,
  video: FiVideo,
};

const colorMap = {
  incoming: 'text-emerald-400',
  outgoing: 'text-blue-400',
  video: 'text-purple-400',
};

const labelMap = {
  incoming: 'Incoming',
  outgoing: 'Outgoing',
  video: 'Video',
};

export default function CallsPage() {
  usePageTitle('Calls — Nexa');
  const toast = useToast();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [calling, setCalling] = useState(false);
  useEffect(() => { api.calls.list().then(d => setItems(d.calls || [])).catch(() => {}).finally(() => setLoading(false)); }, []);

  const newCall = async () => {
    setCalling(true);
    try {
      const data = await api.calls.create({ type: 'outgoing' });
      setItems((prev) => [data.call, ...prev]);
      toast(`Calling ${data.call.name}…`, 'success');
    } catch (err) {
      toast(err.message, 'error');
    }
    setCalling(false);
  };
  if (loading) return null;
  if (items.length === 0) {
    return (
      <DashboardSubLayout title="Calls" subtitle="Your call history">
        <div className="flex flex-col items-center justify-center h-80 text-center">
          <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center mb-4">
            <FiPhone className="text-zinc-500 text-2xl" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-1">No call history</h3>
          <p className="text-sm text-zinc-500">Your voice and video calls will appear here.</p>
        </div>
      </DashboardSubLayout>
    );
  }

  return (
    <DashboardSubLayout
      title="Calls"
      subtitle="Call history"
      action={
        <motion.button
          onClick={newCall}
          disabled={calling}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-bg text-white text-sm font-medium shadow-lg hover:shadow-xl transition-all disabled:opacity-60"
        >
          <FiPhone size={14} />
          {calling ? 'Calling…' : 'New Call'}
        </motion.button>
      }
    >
      <div className="max-w-3xl mx-auto space-y-2">
        {items.map((call, i) => {
          const Icon = iconMap[call.type] || FiPhone;
          return (
            <motion.div
              key={call.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ y: -3 }}
              className="glass rounded-2xl p-4 transition-all duration-300 hover:bg-white/[0.06] cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white text-sm font-bold shrink-0" style={{ background: call.color }}>
                  {call.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-white">{call.name}</span>
                      {call.group_call ? <span className="px-1.5 py-0.5 rounded bg-indigo-500/10 text-[9px] text-indigo-400">Group</span> : null}
                      {call.ai_call ? <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-[9px] text-emerald-400">AI</span> : null}
                    </div>
                    <span className="text-[10px] text-zinc-600">{call.created_at ? new Date(call.created_at).toLocaleDateString() : ''}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <div className={`flex items-center gap-1 text-xs ${call.missed ? 'text-red-400' : colorMap[call.type] || 'text-zinc-400'}`}>
                      <Icon size={12} />
                      <span>{labelMap[call.type] || 'Call'}</span>
                    </div>
                    {call.duration ? <span className="text-xs text-zinc-600">{call.duration}</span> : null}
                    {call.missed ? <span className="text-xs text-red-400 font-medium">Missed</span> : null}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="w-8 h-8 rounded-lg glass flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-all">
                    <FiPhone size={14} />
                  </button>
                  <button className="w-8 h-8 rounded-lg glass flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-all">
                    <FiVideo size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </DashboardSubLayout>
  );
}
