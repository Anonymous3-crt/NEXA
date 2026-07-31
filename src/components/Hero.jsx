import { useRef, useCallback, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion';
import { FiArrowRight, FiGrid, FiStar, FiShield, FiZap, FiGlobe, FiChevronDown } from 'react-icons/fi';
import BackgroundEffects from './BackgroundEffects';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const glowPulse = {
  animate: {
    boxShadow: [
      '0 0 24px rgba(99,102,241,0.25), 0 4px 16px rgba(99,102,241,0.15)',
      '0 0 40px rgba(99,102,241,0.35), 0 0 60px rgba(99,102,241,0.1), 0 8px 24px rgba(99,102,241,0.2)',
      '0 0 24px rgba(99,102,241,0.25), 0 4px 16px rgba(99,102,241,0.15)',
    ],
    transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
  },
};

const avatars = [
  { src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=transparent', delay: 0 },
  { src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka&backgroundColor=transparent', delay: 0.15 },
  { src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Salem&backgroundColor=transparent', delay: 0.3 },
  { src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Abby&backgroundColor=transparent', delay: 0.45 },
  { src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Leo&backgroundColor=transparent', delay: 0.6 },
];

function GlowButton({ children, className = '' }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 100, damping: 15 });
  const springY = useSpring(y, { stiffness: 100, damping: 15 });

  const handleMouse = useCallback((e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    x.set((px - 0.5) * 8);
    y.set((py - 0.5) * -8);
  }, [x, y]);

  const handleLeave = useCallback(() => { x.set(0); y.set(0); }, [x, y]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX: springY, rotateY: springX, perspective: 600 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function TypewriterText({ text, className }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!text) return;
    setDisplayed('');
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) { clearInterval(interval); setDone(true); }
    }, 25);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <span className={className}>
      {displayed}
      {!done && <motion.span className="inline-block w-[2px] h-[1em] ml-0.5 bg-indigo-400" animate={{ opacity: [1, 0] }} transition={{ duration: 0.8, repeat: Infinity }} />}
    </span>
  );
}

function FloatingBadge({ icon: Icon, label, value, position, delay = 0, color = 'indigo' }) {
  const colorMap = {
    indigo: { bg: 'rgba(99,102,241,0.06)', border: 'rgba(99,102,241,0.1)', text: 'rgba(167,139,250,0.5)', icon: 'rgba(167,139,250,0.3)' },
    emerald: { bg: 'rgba(16,185,129,0.06)', border: 'rgba(16,185,129,0.1)', text: 'rgba(52,211,153,0.5)', icon: 'rgba(52,211,153,0.3)' },
    cyan: { bg: 'rgba(6,182,212,0.06)', border: 'rgba(6,182,212,0.1)', text: 'rgba(34,211,238,0.5)', icon: 'rgba(34,211,238,0.3)' },
    pink: { bg: 'rgba(236,72,153,0.06)', border: 'rgba(236,72,153,0.1)', text: 'rgba(244,114,182,0.5)', icon: 'rgba(244,114,182,0.3)' },
  };
  const c = colorMap[color] || colorMap.indigo;

  return (
    <motion.div
      className="absolute hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl border backdrop-blur-xl"
      style={{ background: c.bg, borderColor: c.border }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1, y: [0, -4, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: delay + position.delay || 0 }}
    >
      {Icon && <Icon className="text-xs" style={{ color: c.icon }} />}
      <span className="text-xs font-medium" style={{ color: c.text }}>{value}</span>
    </motion.div>
  );
}

function SocialProof() {
  return (
    <motion.div variants={itemVariants} className="flex items-center justify-center gap-4 mt-8">
      <div className="flex -space-x-2.5">
        {avatars.map((avatar, i) => (
          <motion.div
            key={i}
            className="w-8 h-8 rounded-full border-2 border-[#0a0a14] overflow-hidden bg-zinc-800"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 + avatar.delay, duration: 0.4 }}
          >
            <img src={avatar.src} alt="" className="w-full h-full object-cover" />
          </motion.div>
        ))}
      </div>
      <motion.div
        className="flex flex-col items-start"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.5 }}
      >
        <div className="flex items-center gap-1">
          {[1,2,3,4,5].map((i) => (
            <svg key={i} className="w-3 h-3 text-amber-400/70" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <span className="text-[11px] text-zinc-500 leading-tight">Loved by 50,000+ creators</span>
      </motion.div>
    </motion.div>
  );
}

function StatBar() {
  const stats = [
    { icon: FiStar, label: '5M+ conversations', color: 'rgba(167,139,250,0.4)' },
    { icon: FiShield, label: 'End-to-end encrypted', color: 'rgba(52,211,153,0.4)' },
    { icon: FiZap, label: '99.9% uptime', color: 'rgba(34,211,238,0.4)' },
    { icon: FiGlobe, label: '50+ languages', color: 'rgba(244,114,182,0.4)' },
  ];

  return (
    <motion.div
      variants={itemVariants}
      className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-12 sm:mt-14"
    >
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          className="flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          <stat.icon className="text-xs" style={{ color: stat.color }} />
          <span className="text-xs text-zinc-500">{stat.label}</span>
          {i < stats.length - 1 && <span className="w-[2px] h-[2px] rounded-full bg-zinc-700 mx-1" />}
        </motion.div>
      ))}
    </motion.div>
  );
}

function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.5, duration: 0.8 }}
    >
      <motion.div
        className="flex flex-col items-center gap-2"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-[10px] text-zinc-600 tracking-widest uppercase">Scroll</span>
        <FiChevronDown className="text-zinc-600 text-sm" />
      </motion.div>
    </motion.div>
  );
}

function FloatingBadges() {
  const badges = [
    { icon: FiZap, label: '10x faster', position: { top: '18%', left: '5%' }, color: 'cyan', delay: 0 },
    { icon: FiShield, label: 'Secure', position: { top: '25%', left: '8%' }, color: 'emerald', delay: 1.5 },
    { icon: FiStar, label: '4.9 rating', position: { bottom: '22%', right: '3%' }, color: 'pink', delay: 0.8 },
    { icon: FiGlobe, label: 'Global', position: { top: '12%', right: '3%' }, color: 'indigo', delay: 2 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none z-20">
      {badges.map((badge, i) => (
        <motion.div
          key={i}
          className="absolute hidden 2xl:flex items-center gap-2 px-3 py-1.5 rounded-xl border backdrop-blur-xl"
          style={{
            ...badge.position,
            background: badge.color === 'indigo' ? 'rgba(99,102,241,0.06)' : badge.color === 'emerald' ? 'rgba(16,185,129,0.06)' : badge.color === 'cyan' ? 'rgba(6,182,212,0.06)' : 'rgba(236,72,153,0.06)',
            borderColor: badge.color === 'indigo' ? 'rgba(99,102,241,0.1)' : badge.color === 'emerald' ? 'rgba(16,185,129,0.1)' : badge.color === 'cyan' ? 'rgba(6,182,212,0.1)' : 'rgba(236,72,153,0.1)',
          }}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0, y: [0, -4, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: badge.delay }}
        >
          <badge.icon className="text-xs" style={{
            color: badge.color === 'indigo' ? 'rgba(167,139,250,0.3)' : badge.color === 'emerald' ? 'rgba(52,211,153,0.3)' : badge.color === 'cyan' ? 'rgba(34,211,238,0.3)' : 'rgba(244,114,182,0.3)',
          }} />
          <span className="text-xs font-medium text-zinc-500">{badge.label}</span>
        </motion.div>
      ))}
    </div>
  );
}

export default function Hero() {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 500], [0, -80]);
  const opacityScale = useTransform(scrollY, [0, 400], [1, 0.4]);

  return (
    <motion.section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ y: bgY }}>
      <BackgroundEffects />

      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#08080d] via-[#08080d]/80 to-transparent pointer-events-none z-10" />

      <FloatingBadges />

      <motion.div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32" style={{ opacity: opacityScale }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass text-xs text-zinc-400 mb-8 border border-indigo-500/8">
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-emerald-400"
              animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
            Now in public beta — free to use
            <span className="text-zinc-600 ml-1 hidden sm:inline">· 5,782 online</span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05] tracking-tight mb-6">
            <span className="text-white">Your Intelligent</span>
            <br />
            <span className="inline-block mt-1">
              <span className="text-white">AI</span>{' '}
              <span className="gradient-text">Workspace</span>
            </span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-base sm:text-lg lg:text-xl text-zinc-400 max-w-2xl mx-auto mb-3 leading-relaxed">
            <TypewriterText text="Chat smarter, create faster, write better, and solve more with one powerful AI assistant." />
          </motion.p>

          <motion.p variants={itemVariants} className="text-sm sm:text-base text-zinc-500 max-w-xl mx-auto mb-10 leading-relaxed">
            Nexa combines intelligent conversations with a beautiful, lightning-fast interface to help you work, learn, brainstorm, and create — all in one seamless experience.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <GlowButton>
              <motion.div
                className="relative"
                animate={glowPulse.animate}
                transition={glowPulse.transition}
                style={{ borderRadius: '16px' }}
              >
                <Link
                  to="/signup"
                  className="group relative block px-7 sm:px-8 py-3.5 rounded-2xl text-white font-semibold text-sm sm:text-base shadow-xl overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  }}
                  onMouseEnter={(e) => { const t = e.currentTarget; t.style.transform = 'scale(1.04)'; const s = t.querySelector('.btn-shine'); if (s) s.style.opacity = '1'; }}
                  onMouseLeave={(e) => { const t = e.currentTarget; t.style.transform = 'scale(1)'; const s = t.querySelector('.btn-shine'); if (s) s.style.opacity = '0'; }}
                >
                  <span className="btn-shine absolute inset-0 opacity-0 transition-opacity duration-500" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)', transform: 'skewX(-20deg)' }} />
                  <span className="relative z-10 flex items-center gap-2">
                    Get Started Free
                    <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </motion.div>
            </GlowButton>
            <GlowButton>
              <motion.a
                href="#features"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                className="group relative overflow-hidden px-7 sm:px-8 py-3.5 rounded-2xl glass text-zinc-400 font-medium text-sm sm:text-base hover:text-zinc-200 hover:bg-white/[0.06] hover:border-indigo-500/15 transition-all duration-300 flex items-center gap-2 border border-white/[0.06]"
              >
                <FiGrid className="group-hover:scale-110 transition-transform text-sm" />
                Explore Features
              </motion.a>
            </GlowButton>
          </motion.div>

          <SocialProof />
          <StatBar />
        </motion.div>
      </motion.div>

      <ScrollIndicator />
    </motion.section>
  );
}
