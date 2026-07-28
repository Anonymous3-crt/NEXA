import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiGithub, FiTwitter } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import AuthLayout from '../../components/auth/AuthLayout';
import Input from '../../components/ui/Input';
import { useToast } from '../../components/ui/Toast';

export default function SignUp() {
  const navigate = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 8) e.password = 'At least 8 characters';
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    toast('Account created! Check your email to verify.', 'success');
    setTimeout(() => navigate('/verify-email'), 1200);
  };

  return (
    <AuthLayout title="Create your account" subtitle="Start your journey with Nexa">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Full name"
          icon={FiUser}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          error={errors.name}
        />
        <Input
          label="Email address"
          type="email"
          icon={FiMail}
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          error={errors.email}
        />
        <Input
          label="Password"
          type="password"
          icon={FiLock}
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          error={errors.password}
        />
        <Input
          label="Confirm password"
          type="password"
          icon={FiLock}
          value={form.confirm}
          onChange={(e) => setForm({ ...form, confirm: e.target.value })}
          error={errors.confirm}
        />

        <label className="flex items-start gap-2 text-sm text-zinc-400 cursor-pointer">
          <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-white/5 accent-indigo-500 mt-0.5 shrink-0" />
          <span>I agree to the <Link to="#" className="text-indigo-400 hover:text-indigo-300">Terms of Service</Link> and <Link to="#" className="text-indigo-400 hover:text-indigo-300">Privacy Policy</Link></span>
        </label>

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={loading ? {} : { scale: 1.01 }}
          whileTap={loading ? {} : { scale: 0.99 }}
          className="w-full py-3.5 rounded-2xl gradient-bg text-white font-semibold text-sm shadow-lg glow-indigo disabled:opacity-60 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
              />
              Creating account...
            </>
          ) : (
            'Create account'
          )}
        </motion.button>
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/[0.06]" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-[#0a0a0f] px-4 text-zinc-500">or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: FcGoogle, label: 'Google' },
          { icon: FiGithub, label: 'GitHub' },
          { icon: FiTwitter, label: 'Twitter' },
        ].map(({ icon: Icon, label }) => (
          <motion.button
            key={label}
            type="button"
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center gap-2 py-3 rounded-2xl glass text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-all text-sm"
          >
            <Icon className="text-lg" />
            <span className="hidden sm:inline">{label}</span>
          </motion.button>
        ))}
      </div>

      <p className="text-center text-sm text-zinc-500 mt-6">
        Already have an account?{' '}
        <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
