import { motion } from 'framer-motion';
import { FiX, FiMail, FiClock, FiCalendar, FiCamera } from 'react-icons/fi';
import { useDashboard } from '../../contexts/DashboardContext';

export default function UserProfileCard() {
  const { currentUser, profileOpen, setProfileOpen } = useDashboard();

  if (!profileOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={() => setProfileOpen(false)}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="relative glass-strong rounded-3xl p-8 shadow-2xl border border-white/[0.08] w-full max-w-sm text-center"
      >
        <button
          onClick={() => setProfileOpen(false)}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-white/[0.06] transition-all"
        >
          <FiX size={16} />
        </button>
        <div className="relative inline-block mb-4">
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto shadow-xl"
            style={{ background: currentUser.color }}
          >
            {currentUser.initials}
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-indigo-500 flex items-center justify-center shadow-lg border-2 border-[#0a0a0f]"
          >
            <FiCamera size={12} className="text-white" />
          </motion.button>
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-[#0a0a0f]" />
        </div>
        <h3 className="text-xl font-bold text-white mb-1">{currentUser.name}</h3>
        <p className="text-sm text-zinc-400 mb-6">{currentUser.email}</p>
        <div className="space-y-3 text-left">
          {[
            { icon: FiMail, label: 'Email', value: currentUser.email },
            { icon: FiClock, label: 'Local time', value: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
            { icon: FiCalendar, label: 'Member since', value: 'January 2025' },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.03]">
              <Icon className="text-indigo-400 text-sm shrink-0" />
              <div>
                <div className="text-[10px] text-zinc-600">{label}</div>
                <div className="text-xs text-zinc-300">{value}</div>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full mt-6 py-3 rounded-xl glass text-sm text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-all">
          Edit Profile
        </button>
      </motion.div>
    </motion.div>
  );
}
