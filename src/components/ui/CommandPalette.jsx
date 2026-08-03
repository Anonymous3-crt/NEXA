import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiSearch, FiHome, FiLayout, FiInfo, FiShield, FiFileText, FiLogIn, FiUserPlus,
  FiZap, FiMessageSquare, FiHelpCircle, FiTag, FiLink, FiArrowUp, FiArrowRight, FiCornerDownLeft,
  FiBriefcase, FiStar,
} from 'react-icons/fi';
import { CommandPaletteContext, useCommandPalette } from './CommandPaletteContext';

const PAGES = [
  { id: 'home', label: 'Home', keywords: 'landing start hero', icon: FiHome, to: '/' },
  { id: 'dashboard', label: 'Messages', keywords: 'dashboard chat inbox conversations', icon: FiMessageSquare, to: '/dashboard' },
  { id: 'about', label: 'About', keywords: 'company team story mission', icon: FiInfo, to: '/about' },
  { id: 'login', label: 'Log in', keywords: 'signin auth account access', icon: FiLogIn, to: '/login' },
  { id: 'signup', label: 'Sign up', keywords: 'register create account join', icon: FiUserPlus, to: '/signup' },
  { id: 'privacy', label: 'Privacy', keywords: 'policy data protection', icon: FiShield, to: '/privacy' },
  { id: 'terms', label: 'Terms', keywords: 'legal conditions agreement', icon: FiFileText, to: '/terms' },
];

const SECTIONS = [
  { id: 'features', label: 'Features', keywords: 'capabilities ai tools', icon: FiZap, section: 'features' },
  { id: 'showcase', label: 'Product Showcase', keywords: 'demo preview product', icon: FiLayout, section: 'showcase' },
  { id: 'how', label: 'How it works', keywords: 'steps workflow getting started', icon: FiArrowRight, section: 'how-it-works' },
  { id: 'cases', label: 'Use cases', keywords: 'developers students creators businesses', icon: FiBriefcase, section: 'use-cases' },
  { id: 'reviews', label: 'Testimonials', keywords: 'reviews love quotes social proof', icon: FiStar, section: 'testimonials' },
  { id: 'pricing', label: 'Pricing', keywords: 'plans cost tiers price', icon: FiTag, section: 'pricing' },
  { id: 'faq', label: 'FAQ', keywords: 'questions answers help resources', icon: FiHelpCircle, section: 'faq' },
];

const ACTIONS = [
  {
    id: 'copy',
    label: 'Copy link to this page',
    keywords: 'share url clipboard link copy',
    icon: FiLink,
    run: async (setToast) => {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setToast('Link copied to clipboard');
      } catch {
        setToast('Could not copy link');
      }
    },
  },
  {
    id: 'top',
    label: 'Scroll to top',
    keywords: 'scroll up top',
    icon: FiArrowUp,
    run: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
  },
];

function Highlight({ text, q }) {
  if (!q) return text;
  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <span className="rounded bg-indigo-500/30 text-white px-0.5">{text.slice(idx, idx + q.length)}</span>
      {text.slice(idx + q.length)}
    </>
  );
}

function PalettePanel() {
  const { setOpen } = useCommandPalette();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState('');
  const inputRef = useRef(null);
  const toastTimer = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
    return () => clearTimeout(toastTimer.current);
  }, []);

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    const match = (item) => !q || item.label.toLowerCase().includes(q) || item.keywords.includes(q);
    return [
      { title: 'Pages', items: PAGES.filter(match) },
      { title: 'On this page', items: SECTIONS.filter(match) },
      { title: 'Actions', items: ACTIONS.filter(match) },
    ].filter((g) => g.items.length > 0);
  }, [query]);

  const flattened = useMemo(() => groups.flatMap((g) => g.items), [groups]);

  const notify = useCallback((msg) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(''), 2200);
  }, []);

  const execute = useCallback(
    (item) => {
      setOpen(false);
      if (item.to) {
        if (pathname !== item.to) navigate(item.to);
      } else if (item.section) {
        if (pathname !== '/') {
          navigate('/');
          setTimeout(() => document.getElementById(item.section)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 300);
        } else {
          document.getElementById(item.section)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else if (item.run) {
        item.run(notify);
      }
    },
    [navigate, pathname, setOpen, notify],
  );

  const onQueryChange = (e) => {
    setQuery(e.target.value);
    setActive(0);
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, flattened.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === 'Enter' && flattened[active]) {
      e.preventDefault();
      execute(flattened[active]);
    }
  };

  let globalIndex = -1;

  return (
    <motion.div
      initial={{ opacity: 0, y: -16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
      className="relative w-[min(620px,100%)] rounded-2xl border border-white/[0.08] bg-[#0d0d15]/95 backdrop-blur-2xl shadow-2xl shadow-black/50 overflow-hidden"
    >
      <div className="flex items-center gap-3 px-4 border-b border-white/[0.06]">
        <FiSearch className="text-zinc-500 shrink-0" size={16} />
        <input
          ref={inputRef}
          value={query}
          onChange={onQueryChange}
          onKeyDown={onKeyDown}
          placeholder="Search pages, sections, actions…"
          className="w-full bg-transparent py-4 text-sm text-white placeholder-zinc-600 outline-none"
        />
        <kbd className="shrink-0 px-2 py-1 rounded-md bg-white/[0.06] text-[10px] text-zinc-500 font-mono">ESC</kbd>
      </div>

      <div className="max-h-[55vh] overflow-y-auto py-2">
        {flattened.length === 0 && (
          <div className="px-4 py-10 text-center">
            <p className="text-sm text-zinc-500">No results for “{query}”</p>
            <p className="text-xs text-zinc-700 mt-1">Try “messages”, “pricing” or “copy link”</p>
          </div>
        )}
        {groups.map((group) => (
          <div key={group.title}>
            <div className="px-4 pt-2.5 pb-1.5 text-[10px] uppercase tracking-widest text-zinc-600">
              {group.title}
            </div>
            {group.items.map((item) => {
              globalIndex += 1;
              const i = globalIndex;
              const isActive = i === active;
              return (
                <button
                  key={`${group.title}-${item.id}`}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => execute(item)}
                  className={`flex w-full items-center gap-3 mx-2 mb-0.5 px-3 py-2.5 text-left text-sm rounded-xl transition-all duration-150 ${
                    isActive
                      ? 'bg-white/[0.07] text-white border border-white/[0.08]'
                      : 'text-zinc-400 border border-transparent hover:bg-white/[0.04]'
                  }`}
                >
                  <span
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                      isActive ? 'bg-gradient-to-br from-indigo-500/30 to-purple-500/20 text-indigo-300' : 'bg-white/[0.04] text-zinc-500'
                    }`}
                  >
                    <item.icon size={15} />
                  </span>
                  <span className="flex-1 truncate">
                    <Highlight text={item.label} q={query.trim()} />
                  </span>
                  <FiCornerDownLeft className={`shrink-0 text-xs ${isActive ? 'text-indigo-400' : 'text-zinc-700'}`} />
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between px-4 py-2.5 border-t border-white/[0.06] text-[10px] text-zinc-600">
        <span className="flex items-center gap-3 font-mono">
          <span><kbd className="px-1.5 py-0.5 rounded bg-white/[0.06] text-zinc-500">↑↓</kbd> Navigate</span>
          <span><kbd className="px-1.5 py-0.5 rounded bg-white/[0.06] text-zinc-500">↵</kbd> Select</span>
          <span><kbd className="px-1.5 py-0.5 rounded bg-white/[0.06] text-zinc-500">⌘K</kbd> Toggle</span>
        </span>
        {toast && (
          <motion.span
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-emerald-400"
          >
            {toast}
          </motion.span>
        )}
      </div>
    </motion.div>
  );
}

function PaletteOverlay() {
  const { open, setOpen } = useCommandPalette();

  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [setOpen]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[300] flex items-start justify-center px-4 pt-24"
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <PalettePanel />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function CommandPalette({ children }) {
  const [open, setOpen] = useState(false);
  const value = useMemo(() => ({ open, setOpen }), [open]);
  return (
    <CommandPaletteContext.Provider value={value}>
      {children}
      <PaletteOverlay />
    </CommandPaletteContext.Provider>
  );
}
