import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiEdit2, FiMail, FiClock, FiCalendar, FiCamera, FiCheck, FiX } from 'react-icons/fi';
import DashboardSubLayout from '../../components/dashboard/DashboardSubLayout';
import { useDashboard } from '../../contexts/DashboardContext';
import { usePageTitle } from '../../hooks/usePageTitle';

export default function ProfilePage() {
  usePageTitle('Profile — Nexa');
  const { currentUser, contacts } = useDashboard();
  const stats = [
    { label: 'Messages', value: '2,847' },
    { label: 'Contacts', value: contacts.length },
    { label: 'Calls', value: '156' },
    { label: 'Files', value: '89' },
  ];

  return (
    <DashboardSubLayout title="Profile" subtitle="Your personal information">
      <div className="max-w-4xl mx-auto space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-3xl p-6 sm:p-8 glow-card">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-xl" style={{ background: currentUser.color }}>
                {currentUser.initials}
              </div>
              <motion.button whileHover={{ scale: 1.1 }} className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center shadow-lg border-2 border-[#0a0a0f]">
                <FiCamera size={14} className="text-white" />
              </motion.button>
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-[#0a0a0f]" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-2xl font-bold text-white">{currentUser.name}</h2>
              <p className="text-sm text-zinc-400">{currentUser.email}</p>
              <p className="text-xs text-emerald-400 mt-1">Active now</p>
              <Link to="/dashboard/edit-profile" className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-xl gradient-bg text-white text-sm font-medium hover:shadow-xl transition-all">
                <FiEdit2 size={14} />
                Edit Profile
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            {stats.map((s) => (
              <motion.div
                key={s.label}
                whileHover={{ y: -3, scale: 1.02 }}
                className="glass rounded-2xl p-4 text-center transition-all duration-300 cursor-default"
              >
                <div className="text-xl font-bold gradient-text">{s.value}</div>
                <div className="text-xs text-zinc-500 mt-1">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass rounded-2xl p-6 glow-card">
            <h3 className="text-sm font-semibold text-white mb-4">Account Details</h3>
            <div className="space-y-3">
              {[
                { icon: FiMail, label: 'Email', value: currentUser.email },
                { icon: FiClock, label: 'Local Time', value: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
                { icon: FiCalendar, label: 'Member Since', value: 'January 2025' },
              ].map(({ icon: Icon, label, value }) => (
                <motion.div
                  key={label}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.03] transition-colors cursor-default"
                >
                  <Icon className="text-indigo-400 text-sm shrink-0" />
                  <div>
                    <div className="text-[10px] text-zinc-600">{label}</div>
                    <div className="text-sm text-zinc-300">{value}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass rounded-2xl p-6 glow-card">
            <h3 className="text-sm font-semibold text-white mb-4">Quick Actions</h3>
            <div className="space-y-2">
              {[
                { label: 'Two-factor authentication', status: 'Enabled', color: 'text-emerald-400' },
                { label: 'Email notifications', status: 'Enabled', color: 'text-emerald-400' },
                { label: 'Push notifications', status: 'Disabled', color: 'text-zinc-500' },
                { label: 'End-to-end encryption', status: 'Active', color: 'text-emerald-400' },
              ].map(({ label, status, color }) => (
                <motion.div
                  key={label}
                  whileHover={{ x: 4 }}
                  className="flex items-center justify-between px-4 py-3 rounded-xl bg-white/[0.03] transition-colors cursor-default"
                >
                  <span className="text-sm text-zinc-300">{label}</span>
                  <span className={`text-xs ${color}`}>{status}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardSubLayout>
  );
}
