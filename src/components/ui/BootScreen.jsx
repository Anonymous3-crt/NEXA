import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageCircle } from 'react-icons/fi';

const MESSAGES = [
  'Establishing secure connection',
  'Loading your workspace',
  'Warming up neural cores',
  'Polishing pixels',
];

export default function BootScreen() {
  const [step, setStep] = useState(0);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const msg = setInterval(() => setStep((s) => Math.min(s + 1, MESSAGES.length - 1)), 380);
    const prog = setInterval(() => setPct((p) => Math.min(100, p + Math.ceil(Math.random() * 9))), 130);
    return () => {
      clearInterval(msg);
      clearInterval(prog);
    };
  }, []);

  return (
    <motion.div
      exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#0a0a0f] overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.07), transparent 60%)', filter: 'blur(90px)' }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-40"
          style={{ background: 'linear-gradient(to top, #08080d, transparent)' }}
        />
      </div>

      <div className="relative flex flex-col items-center">
        <div className="relative flex items-center justify-center mb-2">
          <span className="boot-ring absolute w-28 h-28" />
          <span className="boot-ring-slow absolute w-44 h-44" />
          <motion.div
            animate={{ scale: [1, 1.07, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="relative w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center shadow-xl glow-lg"
          >
            <FiMessageCircle className="text-white text-3xl" />
          </motion.div>
        </div>

        <div className="flex items-baseline gap-1 mt-10">
          <span className="text-2xl font-bold tracking-[0.35em] text-white">NEXA</span>
          <span className="text-2xl font-bold gradient-text">.</span>
        </div>

        <AnimatePresence mode="wait">
          <motion.p
            key={step}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="mt-3 text-xs text-zinc-500 font-mono"
          >
            {MESSAGES[step]}
          </motion.p>
        </AnimatePresence>

        <div className="relative w-52 h-[3px] rounded-full bg-white/[0.05] mt-6 overflow-hidden">
          <motion.div
            className="relative h-full rounded-full aurora-progress"
            animate={{ width: `${pct}%` }}
            transition={{ type: 'spring', stiffness: 60, damping: 20 }}
          >
            <span className="progress-shine rounded-full" />
          </motion.div>
        </div>

        <motion.span
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="mt-4 text-[10px] text-zinc-600 font-mono tabular-nums"
        >
          {pct}%
        </motion.span>
      </div>
    </motion.div>
  );
}
