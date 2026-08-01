import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMoon, FiSun, FiVolume2, FiGlobe, FiMonitor, FiShield, FiUsers, FiLock, FiEye, FiDownload } from 'react-icons/fi';
import DashboardSubLayout from '../../components/dashboard/DashboardSubLayout';
import { useDashboard } from '../../contexts/DashboardContext';
import { useToast } from '../../components/ui/Toast';
import { usePageTitle } from '../../hooks/usePageTitle';

const settingsStore = {
  get(k, def) { const v = localStorage.getItem('nexa_' + k); return v !== null ? JSON.parse(v) : def; },
  set(k, v) { localStorage.setItem('nexa_' + k, JSON.stringify(v)); },
  clear() {
    const keys = ['sound_messages', 'sound_calls', 'previews', 'notif_group', 'privacy_receipts', 'privacy_encryption', 'privacy_online', 'privacy_dms', 'motion_reduced'];
    keys.forEach((k) => localStorage.removeItem('nexa_' + k));
  },
};

const DEFAULT_TOGGLES = {
  messageSounds: true,
  callSounds: true,
  messagePreviews: false,
  groupNotifs: true,
  readReceipts: true,
  encryption: true,
  onlineStatus: true,
  allowDMs: false,
  reducedMotion: false,
};

export default function SettingsPage() {
  usePageTitle('Settings — Nexa');
  const { theme, toggleTheme } = useDashboard();
  const toast = useToast();
  const [activeTab, setActiveTab] = useState('general');
  const [toggles, setToggles] = useState(() => ({
    messageSounds: settingsStore.get('sound_messages', true),
    callSounds: settingsStore.get('sound_calls', true),
    messagePreviews: settingsStore.get('previews', false),
    groupNotifs: settingsStore.get('notif_group', true),
    readReceipts: settingsStore.get('privacy_receipts', true),
    encryption: settingsStore.get('privacy_encryption', true),
    onlineStatus: settingsStore.get('privacy_online', true),
    allowDMs: settingsStore.get('privacy_dms', false),
    reducedMotion: settingsStore.get('motion_reduced', false),
  }));

  const toggle = (key) => {
    setToggles((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      settingsStore.set(key.replace(/([A-Z])/g, '_$1').toLowerCase(), next[key]);
      return next;
    });
  };

  const saveSettings = () => {
    toast('Settings saved', 'success');
  };

  const resetDefaults = () => {
    settingsStore.clear();
    setToggles(DEFAULT_TOGGLES);
    toast('Settings reset to defaults', 'info');
  };

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
      { icon: FiVolume2, label: 'Message sounds', toggle: true, enabled: toggles.messageSounds, onToggle: () => toggle('messageSounds') },
      { icon: FiVolume2, label: 'Call sounds', toggle: true, enabled: toggles.callSounds, onToggle: () => toggle('callSounds') },
      { icon: FiEye, label: 'Message previews', toggle: true, enabled: toggles.messagePreviews, onToggle: () => toggle('messagePreviews') },
      { icon: FiUsers, label: 'Group notifications', toggle: true, enabled: toggles.groupNotifs, onToggle: () => toggle('groupNotifs') },
    ],
    privacy: [
      { icon: FiShield, label: 'Read receipts', toggle: true, enabled: toggles.readReceipts, onToggle: () => toggle('readReceipts') },
      { icon: FiLock, label: 'End-to-end encryption', toggle: true, enabled: toggles.encryption, onToggle: () => toggle('encryption') },
      { icon: FiEye, label: 'Show online status', toggle: true, enabled: toggles.onlineStatus, onToggle: () => toggle('onlineStatus') },
      { icon: FiUsers, label: 'Allow DMs from anyone', toggle: true, enabled: toggles.allowDMs, onToggle: () => toggle('allowDMs') },
    ],
    appearance: [
      { icon: theme === 'dark' ? FiMoon : FiSun, label: 'Theme', action: (
        <button onClick={toggleTheme} className="flex items-center gap-2 px-3 py-1.5 rounded-lg glass text-xs text-zinc-300 hover:bg-white/[0.06] transition-all">
          {theme === 'dark' ? <FiMoon size={12} /> : <FiSun size={12} />}
          {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
        </button>
      )},
      { icon: FiMonitor, label: 'Font size', value: 'Medium', type: 'select' },
      { icon: FiVolume2, label: 'Reduced motion', toggle: true, enabled: toggles.reducedMotion, onToggle: () => toggle('reducedMotion') },
    ],
  };

  return (
    <DashboardSubLayout title="Settings" subtitle="Manage your preferences">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex gap-1 p-1 glass rounded-2xl w-fit">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id ? 'bg-indigo-500/20 text-indigo-400 shadow-sm' : 'text-zinc-400 hover:text-white'
              }`}
            >
              {tab.label}
            </motion.button>
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
                      <motion.div
                        whileTap={{ scale: 0.9 }}
                        onClick={item.onToggle}
                        className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${item.enabled ? 'bg-indigo-500/40' : 'bg-zinc-700'}`}
                      >
                        <motion.div
                          layout
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                          className={`w-4 h-4 rounded-full absolute top-0.5 shadow ${item.enabled ? 'bg-indigo-400 right-0.5' : 'bg-zinc-500 left-0.5'}`}
                        />
                      </motion.div>
                    )}
                    {item.value && <span className="text-xs text-zinc-500">{item.value}</span>}
                    {item.action}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex justify-end gap-3 pt-2">
          <button onClick={resetDefaults} className="px-5 py-2.5 rounded-xl glass text-sm text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-all">
            Reset to Defaults
          </button>
          <motion.button onClick={saveSettings} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="px-5 py-2.5 rounded-xl gradient-bg text-white text-sm font-medium shadow-lg hover:shadow-xl transition-all">
            Save Settings
          </motion.button>
        </motion.div>
      </div>
    </DashboardSubLayout>
  );
}
