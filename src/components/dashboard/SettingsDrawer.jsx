import { motion, AnimatePresence } from 'framer-motion';
import {
  FiX, FiMoon, FiSun, FiVolume2, FiMessageSquare, FiShield,
  FiGlobe, FiMonitor, FiChevronRight,
} from 'react-icons/fi';
import { useDashboard } from '../../contexts/DashboardContext';

export default function SettingsDrawer() {
  const { settingsOpen, setSettingsOpen, theme, toggleTheme } = useDashboard();

  const settingsGroups = [
    {
      title: 'Preferences',
      items: [
        { icon: theme === 'dark' ? FiMoon : FiSun, label: 'Theme', action: (
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg glass text-xs text-zinc-300 hover:bg-white/[0.06] transition-all"
          >
            {theme === 'dark' ? <FiMoon size={12} /> : <FiSun size={12} />}
            {theme === 'dark' ? 'Dark' : 'Light'}
          </button>
        )},
        { icon: FiVolume2, label: 'Sound', action: (
          <div className="w-10 h-5 rounded-full bg-indigo-500/30 relative cursor-pointer">
            <div className="w-4 h-4 rounded-full bg-indigo-400 absolute top-0.5 right-0.5 shadow" />
          </div>
        )},
        { icon: FiGlobe, label: 'Language', value: 'English' },
      ],
    },
    {
      title: 'Chat',
      items: [
        { icon: FiMessageSquare, label: 'Message preview', action: (
          <div className="w-10 h-5 rounded-full bg-indigo-500/30 relative cursor-pointer">
            <div className="w-4 h-4 rounded-full bg-indigo-400 absolute top-0.5 right-0.5 shadow" />
          </div>
        )},
        { icon: FiMonitor, label: 'Enter to send', action: (
          <div className="w-10 h-5 rounded-full bg-zinc-700 relative cursor-pointer">
            <div className="w-4 h-4 rounded-full bg-zinc-500 absolute top-0.5 left-0.5 shadow" />
          </div>
        )},
      ],
    },
    {
      title: 'Privacy',
      items: [
        { icon: FiShield, label: 'Read receipts', value: 'On', action: (
          <div className="w-10 h-5 rounded-full bg-indigo-500/30 relative cursor-pointer">
            <div className="w-4 h-4 rounded-full bg-indigo-400 absolute top-0.5 right-0.5 shadow" />
          </div>
        )},
      ],
    },
  ];

  return (
    <AnimatePresence>
      {settingsOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex"
          onClick={() => setSettingsOpen(false)}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="relative ml-auto w-full max-w-md h-full bg-[#0a0a0f]/95 backdrop-blur-2xl border-l border-white/[0.06] shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.05]">
              <h2 className="text-lg font-bold text-white">Settings</h2>
              <button
                onClick={() => setSettingsOpen(false)}
                className="p-2 rounded-lg text-zinc-500 hover:text-white hover:bg-white/[0.06] transition-all"
              >
                <FiX size={18} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-8 no-scrollbar">
              {settingsGroups.map((group) => (
                <div key={group.title}>
                  <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">
                    {group.title}
                  </h3>
                  <div className="space-y-1">
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={item.label}
                          className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-white/[0.03] transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <Icon className="text-indigo-400 text-sm shrink-0" />
                            <span className="text-sm text-zinc-300">{item.label}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {item.value && (
                              <span className="text-xs text-zinc-500">{item.value}</span>
                            )}
                            {item.action}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}

              <div className="pt-4 border-t border-white/[0.05]">
                <div className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-white/[0.03] transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <FiShield className="text-zinc-500 text-sm shrink-0" />
                    <span className="text-sm text-zinc-400">Privacy & Security</span>
                  </div>
                  <FiChevronRight className="text-zinc-600 text-sm" />
                </div>
                <div className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-white/[0.03] transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <FiGlobe className="text-zinc-500 text-sm shrink-0" />
                    <span className="text-sm text-zinc-400">Keyboard shortcuts</span>
                  </div>
                  <FiChevronRight className="text-zinc-600 text-sm" />
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-white/[0.05] text-center">
              <p className="text-xs text-zinc-600">Nexa v2.4.1</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
