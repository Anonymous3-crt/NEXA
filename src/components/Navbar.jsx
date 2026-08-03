import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX, FiArrowRight, FiSearch, FiCommand, FiSun, FiMoon } from 'react-icons/fi';
import { navLinks } from '../data/mockData';
import { useCommandPalette } from './ui/CommandPaletteContext';

const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform);

function Logo({ onClick }) {
  return (
    <Link to="/" onClick={onClick} className="flex items-center gap-2.5 group" aria-label="Nexa home">
      <span className="relative grid place-items-center w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/25 transition-transform duration-300 group-hover:scale-105">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 3C7 3 3 6.6 3 11c0 2.4 1.2 4.6 3.1 6.1-.1 1.1.3 2.4 1.6 3.1.7.4 1.5.3 2-.1.5-.4.4-1.2.1-1.7-.2-.3-.4-.8-.3-1.3l1.9.6c.5.2 1.1.3 1.6.3 5 0 9-3.6 9-8s-4-7-9-7Zm-2.5 9.5a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Zm5 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Zm-2.5-3.5a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Z"
            fill="#fff"
          />
        </svg>
      </span>
      <span className="font-display text-2xl font-semibold tracking-tight text-[var(--l-text)]">
        Nexa
      </span>
    </Link>
  );
}

function ThemeToggle({ theme, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      className="relative grid place-items-center w-9 h-9 rounded-full border border-[var(--l-border)] text-[var(--l-muted)] hover:text-[var(--l-text)] hover:border-[var(--l-border-strong)] transition-all duration-300"
    >
      <span
        className="absolute inset-0 rounded-full grid place-items-center transition-opacity duration-300"
        style={{ opacity: theme === 'light' ? 1 : 0, transform: theme === 'light' ? 'rotate(0)' : 'rotate(90deg)' }}
      >
        <FiSun size={15} aria-hidden="true" />
      </span>
      <span
        className="absolute inset-0 rounded-full grid place-items-center transition-opacity duration-300"
        style={{ opacity: theme === 'dark' ? 1 : 0, transform: theme === 'dark' ? 'rotate(0)' : 'rotate(-90deg)' }}
      >
        <FiMoon size={15} aria-hidden="true" />
      </span>
    </button>
  );
}

export default function Navbar({ theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { setOpen } = useCommandPalette();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.href.replace('#', '')))
      .filter(Boolean);
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (!visible.length) return;
        const top = visible.reduce((a, b) =>
          a.boundingClientRect.top < b.boundingClientRect.top ? a : b,
        );
        setActiveSection(top.target.id);
      },
      { rootMargin: '-15% 0px -60% 0px', threshold: 0 },
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-4 sm:px-6 pt-3 sm:pt-4">
      <nav
        aria-label="Main navigation"
        className={`glass-nav mx-auto max-w-6xl rounded-full px-4 sm:px-5 ${
          scrolled ? '' : 'bg-transparent !shadow-none !backdrop-blur-none'
        }`}
        style={!scrolled ? { background: 'transparent', borderColor: 'transparent' } : undefined}
      >
        <div className="flex items-center justify-between h-14 sm:h-16">
          <Logo />

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative px-3.5 py-2 text-sm rounded-full transition-colors duration-300 ${
                    isActive
                      ? 'text-[var(--l-text)] font-medium'
                      : 'text-[var(--l-muted)] hover:text-[var(--l-text)] hover:bg-[var(--l-surface-2)]'
                  }`}
                >
                  <span className="relative">{link.label}</span>
                </a>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="flex items-center gap-2 px-3 py-2 text-sm text-[var(--l-muted)] hover:text-[var(--l-text)] rounded-full border border-[var(--l-border)] bg-[var(--l-glass)] hover:border-[var(--l-border-strong)] transition-all duration-300"
              aria-label="Open command palette"
            >
              <FiSearch size={14} />
              <span className="hidden xl:inline">Search</span>
              <kbd className="hidden xl:flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-[var(--l-surface-2)] text-[10px] text-[var(--l-faint)] font-mono">
                <FiCommand size={9} aria-hidden="true" />
                {isMac ? 'K' : 'Ctrl K'}
              </kbd>
            </button>
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            <Link
              to="/login"
              className="px-3.5 py-2 text-sm text-[var(--l-muted)] hover:text-[var(--l-text)] rounded-full transition-colors duration-300"
            >
              Log in
            </Link>
            <Link to="/signup" className="btn-primary !py-2 group">
              Get Started
              <FiArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
              <span className="btn-shine" aria-hidden="true" />
            </Link>
          </div>

          <div className="flex items-center gap-1.5 lg:hidden">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="p-2 text-[var(--l-muted)] hover:text-[var(--l-text)] rounded-lg transition-colors"
              aria-label="Open command palette"
            >
              <FiSearch size={18} />
            </button>
            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-menu"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              className="p-2 text-[var(--l-muted)] hover:text-[var(--l-text)] rounded-lg transition-colors"
            >
              {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>

        <div id="mobile-nav-menu" className={`mobile-menu lg:hidden ${mobileOpen ? 'open' : ''}`}>
          <div>
            <div className="pt-2 pb-4 border-t border-[var(--l-border)]">
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={closeMobile}
                    className="px-3 py-2.5 text-sm text-[var(--l-muted)] hover:text-[var(--l-text)] rounded-lg hover:bg-[var(--l-surface-2)] transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
              <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-[var(--l-border)]">
                <Link to="/signup" onClick={closeMobile} className="btn-primary w-full">
                  Get Started Free
                  <span className="btn-shine" aria-hidden="true" />
                </Link>
                <Link to="/login" onClick={closeMobile} className="btn-secondary w-full">
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
