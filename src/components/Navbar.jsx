import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiMessageCircle, FiArrowRight, FiSearch } from 'react-icons/fi';
import { navLinks } from '../data/mockData';
import { useCommandPalette } from './ui/CommandPaletteContext';

const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('');
  const { setOpen } = useCommandPalette();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? Math.min(window.scrollY / total, 1) : 0);

      const sections = navLinks.map((l) => l.href.replace('#', ''));
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 200) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/[0.05] shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/[0.03] overflow-hidden">
        <motion.div
          className="relative h-full aurora-progress"
          style={{ scaleX: scrollProgress, transformOrigin: 'left' }}
        >
          <span className="progress-shine" />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link to="/" className="flex items-center gap-2.5 group">
            <motion.div
              whileHover={{ scale: 1.05, rotate: -5 }}
              className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center shadow-lg transition-transform"
            >
              <FiMessageCircle className="text-white text-lg" />
            </motion.div>
            <span className="text-xl font-bold text-white tracking-tight">
              Nexa
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1" role="navigation" aria-label="Main navigation">
            {navLinks.map((link) => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative px-4 py-2 text-sm rounded-xl transition-all duration-300 ${
                    isActive
                      ? 'text-white'
                      : 'text-zinc-400 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-xl bg-white/[0.06]"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
            <div className="flex items-center gap-2 ml-4 pl-4 border-l border-white/[0.06]">
              <span className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/[0.06] border border-emerald-500/10">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-glow" />
                <span className="text-[10px] text-emerald-400 font-medium">All systems live</span>
              </span>
              <button
                onClick={() => setOpen(true)}
                className="hidden md:flex items-center gap-2 px-3 py-2 text-sm text-zinc-400 hover:text-white rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-indigo-500/25 transition-all duration-300"
                aria-label="Open search"
              >
                <FiSearch size={14} />
                <span className="text-zinc-500">Search</span>
                <kbd className="px-1.5 py-0.5 rounded-md bg-white/[0.06] text-[10px] text-zinc-500 font-mono">
                  {isMac ? '⌘K' : 'Ctrl K'}
                </kbd>
              </button>
              <Link
                to="/login"
                className="px-4 py-2 text-sm text-zinc-400 hover:text-white rounded-xl transition-all duration-300 hover:bg-white/[0.05]"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="group relative px-5 py-2.5 rounded-xl gradient-bg text-white text-sm font-semibold shadow-lg glow-indigo flex items-center gap-2 transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95"
              >
                Get Started
                <FiArrowRight className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setOpen(true)}
              className="md:hidden p-2 text-zinc-400 hover:text-white rounded-xl hover:bg-white/[0.05] transition-all"
              aria-label="Open search"
            >
              <FiSearch size={18} />
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden relative z-50 p-2 text-zinc-400 hover:text-white rounded-xl hover:bg-white/[0.05] transition-all"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="absolute right-0 top-0 bottom-0 w-72 bg-[#0a0a0f]/95 backdrop-blur-2xl border-l border-white/[0.06] shadow-2xl"
            >
              <div className="flex items-center justify-between p-4 border-b border-white/[0.06]">
                <Link to="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
                  <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
                    <FiMessageCircle className="text-white text-sm" />
                  </div>
                  <span className="text-lg font-bold text-white">Nexa</span>
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-white/[0.05] transition-all"
                >
                  <FiX size={20} />
                </button>
              </div>
              <div className="p-4 space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3 text-sm text-zinc-400 hover:text-white rounded-xl hover:bg-white/[0.05] transition-all"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/[0.06] space-y-2">
                <Link
                  to="/signup"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full px-4 py-3 text-sm font-semibold text-center text-white rounded-xl gradient-bg"
                >
                  Get Started Free
                </Link>
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full px-4 py-3 text-sm text-center text-zinc-400 rounded-xl glass hover:bg-white/[0.06] transition-all"
                >
                  Log in
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
