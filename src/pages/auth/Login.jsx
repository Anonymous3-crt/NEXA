import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiGithub, FiTwitter } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import AuthLayout from '../../components/auth/AuthLayout';
import Input from '../../components/ui/Input';
import { useToast } from '../../components/ui/Toast';
import { usePageTitle } from '../../hooks/usePageTitle';
import { api, setToken, setStoredUser } from '../../api';

export default function Login() {
  usePageTitle('Sign In — Nexa');
  const navigate = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [needsVerification, setNeedsVerification] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.email) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email';
    if (!form.password) e.password = 'Password is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const data = await api.auth.login(form);
      setToken(data.token);
      setStoredUser(data.user);
      toast('Welcome back! Redirecting...', 'success');
      setTimeout(() => navigate('/dashboard'), 800);
    } catch (err) {
      if (err.data?.needsVerification) {
        setNeedsVerification(true);
        toast(err.message, 'warning');
      } else {
        setNeedsVerification(false);
        toast(err.message, 'error');
      }
    }
    setLoading(false);
  };

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to your Nexa account">
      <form onSubmit={handleSubmit} className="space-y-4">
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

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-zinc-400 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-white/5 accent-indigo-500" />
            Remember me
          </label>
          <Link to="/forgot-password" className="text-indigo-400 hover:text-indigo-300 transition-colors">
            Forgot password?
          </Link>
        </div>

        {needsVerification && (
          <div className="flex items-start justify-between gap-3 p-3 rounded-xl bg-amber-500/[0.08] border border-amber-500/15 text-xs text-amber-300">
            <p>Please verify your email before signing in.</p>
            <Link
              to={`/verify-email?email=${encodeURIComponent(form.email)}`}
              className="shrink-0 font-medium text-amber-200 underline underline-offset-2 hover:text-white"
            >
              Verify now
            </Link>
          </div>
        )}

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
              Signing in...
            </>
          ) : (
            'Sign in'
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
            onClick={() => toast(`${label} sign-in coming soon`, 'info')}
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
        Don&apos;t have an account?{' '}
        <Link to="/signup" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
          Create one
        </Link>
      </p>
    </AuthLayout>
  );
}
