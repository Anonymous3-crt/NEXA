import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiArrowLeft } from 'react-icons/fi';
import AuthLayout from '../../components/auth/AuthLayout';
import Input from '../../components/ui/Input';
import { useToast } from '../../components/ui/Toast';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) { setError('Email is required'); return; }
    if (!/\S+@\S+\.\S+/.test(email)) { setError('Invalid email'); return; }
    setError('');
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSent(true);
    toast('Reset link sent! Check your inbox.', 'success');
  };

  return (
    <AuthLayout title="Forgot password?" subtitle="No worries, we'll send you reset instructions">
      {!sent ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email address"
            type="email"
            icon={FiMail}
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(''); }}
            error={error}
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
                Sending...
              </>
            ) : (
              'Send reset link'
            )}
          </motion.button>
        </form>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-4"
        >
          <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4 shadow-lg">
            <FiMail className="text-white text-2xl" />
          </div>
          <p className="text-white font-medium mb-1">Check your email</p>
          <p className="text-sm text-zinc-400 mb-6">
            We sent a reset link to <span className="text-zinc-300">{email}</span>
          </p>
          <motion.button
            onClick={() => { setSent(false); setEmail(''); }}
            whileHover={{ scale: 1.02 }}
            className="px-6 py-3 rounded-2xl glass text-sm text-zinc-300 hover:bg-white/[0.06] transition-all"
          >
            Use a different email
          </motion.button>
        </motion.div>
      )}

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
