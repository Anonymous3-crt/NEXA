import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiAtSign, FiCheck, FiX } from 'react-icons/fi';
import AuthLayout from '../../components/auth/AuthLayout';
import Input from '../../components/ui/Input';
import { useToast } from '../../components/ui/Toast';
import { usePageTitle } from '../../hooks/usePageTitle';

const takenUsernames = ['admin', 'nexa', 'test', 'user', 'root'];

export default function CreateUsername() {
  usePageTitle('Create Username — Nexa');
  const navigate = useNavigate();
  const toast = useToast();
  const [username, setUsername] = useState('');
  const [checking, setChecking] = useState(false);
  const [available, setAvailable] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = async (e) => {
    const value = e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '');
    setUsername(value);
    setError('');

    if (value.length < 3) { setAvailable(null); return; }

    setChecking(true);
    await new Promise((r) => setTimeout(r, 600));
    setChecking(false);

    if (takenUsernames.includes(value)) {
      setAvailable(false);
      setError('Username is taken');
    } else {
      setAvailable(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || username.length < 3) { setError('At least 3 characters'); return; }
    if (!available) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    toast('Welcome to Nexa! Your account is ready.', 'success');
    setTimeout(() => navigate('/'), 1200);
  };

  return (
    <AuthLayout title="Choose your username" subtitle="This will be your unique identifier on Nexa">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Input
            label="Username"
            icon={FiAtSign}
            value={username}
            onChange={handleChange}
            error={error}
          />
          {username.length >= 3 && !checking && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              {available ? (
                <FiCheck className="text-emerald-400 text-lg" />
              ) : (
                <FiX className="text-red-400 text-lg" />
              )}
            </motion.div>
          )}
          {checking && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 border-2 border-indigo-400/30 border-t-indigo-400 rounded-full"
            />
          )}
        </div>

        {available && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm text-emerald-400"
          >
            <FiCheck size={14} />
            <span>nexa.app/{username} is available</span>
          </motion.div>
        )}

        <p className="text-xs text-zinc-500">
          Letters, numbers, and underscores only. Must be at least 3 characters.
        </p>

        <motion.button
          type="submit"
          disabled={loading || !available}
          whileHover={loading || !available ? {} : { scale: 1.01 }}
          whileTap={loading || !available ? {} : { scale: 0.99 }}
          className="w-full py-3.5 rounded-2xl gradient-bg text-white font-semibold text-sm shadow-lg glow-indigo disabled:opacity-60 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
              />
              Setting up...
            </>
          ) : (
            'Complete setup'
          )}
        </motion.button>
      </form>
    </AuthLayout>
  );
}
