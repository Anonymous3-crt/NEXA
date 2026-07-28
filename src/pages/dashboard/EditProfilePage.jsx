import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSave, FiCamera } from 'react-icons/fi';
import DashboardSubLayout from '../../components/dashboard/DashboardSubLayout';
import Input from '../../components/ui/Input';
import { useToast } from '../../components/ui/Toast';
import { useDashboard } from '../../contexts/DashboardContext';
import { usePageTitle } from '../../hooks/usePageTitle';

export default function EditProfilePage() {
  usePageTitle('Edit Profile — Nexa');
  const navigate = useNavigate();
  const toast = useToast();
  const { currentUser } = useDashboard();
  const [form, setForm] = useState({
    name: currentUser.name,
    email: currentUser.email,
    bio: 'Building the future of communication at Nexa.',
    company: 'Nexa Inc.',
    location: 'San Francisco, CA',
    website: 'nexa.app',
    phone: '+1 (555) 123-4567',
  });

  const handleSave = (e) => {
    e.preventDefault();
    toast('Profile updated successfully!', 'success');
    setTimeout(() => navigate('/dashboard/profile'), 1000);
  };

  return (
    <DashboardSubLayout
      title="Edit Profile"
      subtitle="Update your personal information"
      action={
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-bg text-white text-sm font-medium shadow-lg hover:shadow-xl transition-all"
        >
          <FiSave size={14} />
          Save Changes
        </button>
      }
    >
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto">
        <form onSubmit={handleSave} className="glass rounded-3xl p-6 sm:p-8 glow-card space-y-6">
          <div className="flex flex-col items-center sm:items-start sm:flex-row gap-6 pb-6 border-b border-white/[0.05]">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-xl" style={{ background: currentUser.color }}>
                {currentUser.initials}
              </div>
              <motion.button whileHover={{ scale: 1.1 }} type="button" className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-indigo-500 flex items-center justify-center shadow-lg border-2 border-[#0a0a0f]">
                <FiCamera size={12} className="text-white" />
              </motion.button>
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-lg font-semibold text-white">Profile Photo</h3>
              <p className="text-sm text-zinc-400">PNG, JPG or GIF. Max 2MB.</p>
              <button type="button" className="mt-2 px-4 py-2 rounded-xl glass text-sm text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-all">
                Upload Photo
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <Input label="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <Input label="Email address" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <div>
              <label className="block text-sm text-zinc-400 mb-2 ml-1">Bio</label>
              <textarea
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                rows={3}
                className="w-full bg-white/[0.03] border border-white/[0.06] rounded-2xl px-4 py-3 text-sm text-white outline-none transition-all duration-300 focus:border-indigo-500/30 focus:bg-white/[0.05] placeholder:text-zinc-600 resize-none"
              />
            </div>
            <Input label="Company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
            <Input label="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
            <Input label="Website" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} />
            <Input label="Phone" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </div>
        </form>
      </motion.div>
    </DashboardSubLayout>
  );
}
