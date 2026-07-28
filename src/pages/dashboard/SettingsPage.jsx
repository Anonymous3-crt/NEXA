import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMoon, FiSun, FiVolume2, FiGlobe, FiMonitor, FiShield, FiUsers, FiLock, FiEye, FiDownload } from 'react-icons/fi';
import DashboardSubLayout from '../../components/dashboard/DashboardSubLayout';
import { useDashboard } from '../../contexts/DashboardContext';

export default function SettingsPage() {
  const { theme, toggleTheme } = useDashboard();
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', label: 'General' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'privacy', label: 'Privacy' },
    { id: 'appearance', label: 'Appearance' },
  ];

  const sections = {
    general: [
      { icon: FiGlobe, label: 'Language', value: 'English (US)', type: 'select' },
      { icon: FiMonitor, label: 'Default view', value: 'Messages', type: 'select' },
      { icon: FiDownload, label: 'Download location', value: '~/Downloads/Nexa', type: 'text' },
    ],
    notifications: [
      { icon: FiVolume2, label: 'Message sounds', toggle: true, enabled: true },
      { icon: FiVolume2, label: 'Call sounds', toggle: true, enabled: true },
      { icon: FiEye, label: 'Message previews', toggle: true, enabled: false },
      { icon: FiUsers, label: 'Group notifications', toggle: true, enabled: true },
    ],
    privacy: [
      { icon: FiShield, label: 'Read receipts', toggle: true, enabled: true },
      { icon: FiLock, label: 'End-to-end encryption', toggle: true, enabled: true },
      { icon: FiEye, label: 'Show online status', toggle: true, enabled: true },
      { icon: FiUsers, label: 'Allow DMs from anyone', toggle: true, enabled: false },
    ],
    appearance: [
      { icon: theme === 'dark' ? FiMoon : FiSun, label: 'Theme', action: (
        <button onClick={toggleTheme} className="flex items-center gap-2 px-3 py-1.5 rounded-lg glass text-xs text-zinc-300 hover:bg-white/[0.06] transition-all">
          {theme === 'dark' ? <FiMoon size={12} /> : <FiSun size={12} />}
          {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
        </button>
      )},
      { icon: FiMonitor, label: 'Font size', value: 'Medium', type: 'select' },
      { icon: FiVolume2, label: 'Reduced motion', toggle: true, enabled: false },
    ],
  };

  return (
    <DashboardSubLayout title="Settings" subtitle="Manage your preferences">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex gap-1 p-1 glass rounded-2xl w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id ? 'bg-indigo-500/20 text-indigo-400 shadow-sm' : 'text-zinc-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-3xl p-6 glow-card">
          <div className="space-y-1">
            {sections[activeTab].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between px-4 py-3.5 rounded-xl hover:bg-white/[0.03] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="text-indigo-400 text-sm shrink-0" />
                    <span className="text-sm text-zinc-300">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.toggle !== undefined && (
                      <div className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${item.enabled ? 'bg-indigo-500/40' : 'bg-zinc-700'}`}>
                        <div className={`w-4 h-4 rounded-full absolute top-0.5 shadow transition-all ${item.enabled ? 'bg-indigo-400 right-0.5' : 'bg-zinc-500 left-0.5'}`} />
                      </div>
                    )}
                    {item.value && <span className="text-xs text-zinc-500">{item.value}</span>}
                    {item.action}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <div className="flex justify-end gap-3 pt-2">
          <button className="px-5 py-2.5 rounded-xl glass text-sm text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-all">
            Reset to Defaults
          </button>
          <button className="px-5 py-2.5 rounded-xl gradient-bg text-white text-sm font-medium shadow-lg hover:shadow-xl transition-all">
            Save Settings
          </button>
        </div>
      </div>
    </DashboardSubLayout>
  );
}
