import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiArrowLeft, FiRefreshCw } from 'react-icons/fi';
import AuthLayout from '../../components/auth/AuthLayout';
import { useToast } from '../../components/ui/Toast';
import { usePageTitle } from '../../hooks/usePageTitle';

export default function EmailVerification() {
  usePageTitle('Verify Email — Nexa');
  const navigate = useNavigate();
  const toast = useToast();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [timer, setTimer] = useState(30);
  const inputsRef = useRef([]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (i, value) => {
    if (value.length > 1) return;
    const next = [...code];
    next[i] = value;
    setCode(next);
    if (value && i < 5) inputsRef.current[i + 1]?.focus();
  };

  const handleKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !code[i] && i > 0) {
      inputsRef.current[i - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    if (code.some((c) => !c)) { toast('Please enter the full code', 'error'); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2000));
    setLoading(false);
    toast('Email verified!', 'success');
    setTimeout(() => navigate('/create-username'), 1200);
  };

  const handleResend = async () => {
    setResending(true);
    await new Promise((r) => setTimeout(r, 1000));
    setResending(false);
    setTimer(30);
    toast('New code sent!', 'success');
  };

  return (
    <AuthLayout title="Check your email" subtitle="We sent a 6-digit code to your email">
      <div className="space-y-6">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center shadow-lg">
            <FiMail className="text-white text-2xl" />
          </div>
        </div>

        <div className="flex justify-center gap-2 sm:gap-3">
          {code.map((digit, i) => (
            <motion.input
              key={i}
              ref={(el) => (inputsRef.current[i] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              whileFocus={{ scale: 1.05 }}
              className="w-11 h-12 sm:w-12 sm:h-14 text-center text-lg font-semibold text-white rounded-2xl glass border border-white/[0.06] outline-none transition-all duration-200 focus:border-indigo-500/40 focus:bg-white/[0.05]"
            />
          ))}
        </div>

        <motion.button
          onClick={handleSubmit}
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
              Verifying...
            </>
          ) : (
            'Verify email'
          )}
        </motion.button>

        <div className="text-center">
          {timer > 0 ? (
            <p className="text-sm text-zinc-500">
              Resend code in <span className="text-zinc-300 font-medium">{timer}s</span>
            </p>
          ) : (
            <motion.button
              onClick={handleResend}
              disabled={resending}
              whileHover={{ scale: 1.02 }}
              className="inline-flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 transition-colors disabled:opacity-50"
            >
              <FiRefreshCw className={resending ? 'animate-spin' : ''} size={14} />
              {resending ? 'Sending...' : 'Resend code'}
            </motion.button>
          )}
        </div>
      </div>

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
