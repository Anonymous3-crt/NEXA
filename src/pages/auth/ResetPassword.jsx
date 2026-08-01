import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiLock, FiArrowLeft } from 'react-icons/fi';
import AuthLayout from '../../components/auth/AuthLayout';
import Input from '../../components/ui/Input';
import { useToast } from '../../components/ui/Toast';
import { usePageTitle } from '../../hooks/usePageTitle';
import { api } from '../../api';

export default function ResetPassword() {
  usePageTitle('Reset Password — Nexa');
  const navigate = useNavigate();
  const toast = useToast();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ password: '', confirm: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 8) e.password = 'At least 8 characters';
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (!token) { toast('Missing reset token', 'error'); return; }
    setLoading(true);
    try {
      await api.auth.resetPassword(token, form.password);
      toast('Password reset successfully!', 'success');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      toast(err.message, 'error');
    }
    setLoading(false);
  };

  return (
    <AuthLayout title="Set new password" subtitle="Must be at least 8 characters">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="New password"
          type="password"
          icon={FiLock}
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          error={errors.password}
        />
        <Input
          label="Confirm new password"
          type="password"
          icon={FiLock}
          value={form.confirm}
          onChange={(e) => setForm({ ...form, confirm: e.target.value })}
          error={errors.confirm}
        />

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
              Resetting...
            </>
          ) : (
            'Reset password'
          )}
        </motion.button>
      </form>

      <div className="text-center mt-6">
        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          <FiArrowLeft size={14} />
          Back to sign in
        </Link>
      </div>
    </AuthLayout>
  );
}
