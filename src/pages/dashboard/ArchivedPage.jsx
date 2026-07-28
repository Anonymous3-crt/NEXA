import { motion } from 'framer-motion';
import { FiArchive, FiUsers, FiClock } from 'react-icons/fi';
import DashboardSubLayout from '../../components/dashboard/DashboardSubLayout';
import { archivedChats } from '../../data/mockData';

export default function ArchivedPage() {
  if (archivedChats.length === 0) {
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
    <DashboardSubLayout title="Archived Chats" subtitle={`${archivedChats.length} archived conversations`}>
      <div className="max-w-3xl mx-auto space-y-2">
        {archivedChats.map((chat, i) => (
          <motion.div
            key={chat.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass rounded-2xl p-4 transition-all duration-300 hover:bg-white/[0.06] cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white text-sm font-bold shrink-0" style={{ background: chat.color }}>
                {chat.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-medium text-white">{chat.name}</span>
                  <span className="text-[10px] text-zinc-600 shrink-0">{chat.time}</span>
                </div>
                <p className="text-xs text-zinc-400 mt-0.5 truncate">{chat.lastMessage}</p>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="flex items-center gap-1 text-[10px] text-zinc-600">
                    <FiUsers size={10} /> {chat.members} members
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-zinc-600">
                    <FiArchive size={10} /> Archived
                  </span>
                </div>
              </div>
              <button className="px-3 py-1.5 rounded-lg glass text-xs text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-all">
                Unarchive
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </DashboardSubLayout>
  );
}
