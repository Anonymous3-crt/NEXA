import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiImage, FiSearch } from 'react-icons/fi';
import DashboardSubLayout from '../../components/dashboard/DashboardSubLayout';
import { mediaItems } from '../../data/mockData';

const mediaTypes = ['all', 'image', 'document', 'video'];

export default function MediaPage() {
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? mediaItems : mediaItems.filter((m) => m.type === filter);

  if (mediaItems.length === 0) {
    return (
      <DashboardSubLayout title="Media Gallery" subtitle="Files shared in conversations">
        <div className="flex flex-col items-center justify-center h-80 text-center">
          <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center mb-4">
            <FiImage className="text-zinc-500 text-2xl" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-1">No media files</h3>
          <p className="text-sm text-zinc-500">Shared images, videos, and documents appear here.</p>
        </div>
      </DashboardSubLayout>
    );
  }

  return (
    <DashboardSubLayout title="Media Gallery" subtitle={`${mediaItems.length} files shared`}>
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex gap-2">
          {mediaTypes.map((t) => (
            <motion.button
              key={t}
              onClick={() => setFilter(t)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`px-4 py-1.5 rounded-xl text-xs font-medium capitalize transition-all ${
                filter === t ? 'bg-indigo-500/20 text-indigo-400' : 'glass text-zinc-400 hover:text-white'
              }`}
            >
              {t}
            </motion.button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="glass rounded-2xl overflow-hidden transition-all duration-300 glow-card cursor-pointer"
            >
              <div className="h-32 flex items-center justify-center text-4xl bg-white/[0.02]">{item.preview}</div>
              <div className="p-3">
                <p className="text-xs text-white truncate">{item.name}</p>
                <div className="flex items-center justify-between mt-1.5">
                  <span className="text-[10px] text-zinc-600">{item.size}</span>
                  <span className="text-[10px] text-zinc-600">{item.time}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardSubLayout>
  );
}
