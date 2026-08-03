import { useState } from 'react';
import { FiArrowUp, FiArrowRight, FiCheck, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';

const footerColumns = {
  Product: [
    { label: 'Features', href: '#features' },
    { label: 'Showcase', href: '#showcase' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Changelog', href: '#' },
    { label: 'Status', href: '#' },
  ],
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Press kit', href: '#' },
  ],
  Resources: [
    { label: 'Documentation', href: '#' },
    { label: 'API reference', href: '#' },
    { label: 'Community', href: '#' },
    { label: 'Help center', href: '#' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Security', href: '#' },
    { label: 'Cookie policy', href: '#' },
  ],
};

const socials = [
  { icon: FiGithub, label: 'GitHub', href: 'https://github.com' },
  { icon: FiTwitter, label: 'Twitter / X', href: 'https://x.com' },
  { icon: FiLinkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const onSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative border-t border-[var(--l-border)] bg-[var(--l-bg-alt)]/60" aria-label="Site footer">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/30 to-transparent" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-12">
          <div className="col-span-2 lg:col-span-2">
            <a href="/" className="flex items-center gap-2.5 mb-5" aria-label="Nexa home">
              <span className="grid place-items-center w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/25">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M12 3C7 3 3 6.6 3 11c0 2.4 1.2 4.6 3.1 6.1-.1 1.1.3 2.4 1.6 3.1.7.4 1.5.3 2-.1.5-.4.4-1.2.1-1.7-.2-.3-.4-.8-.3-1.3l1.9.6c.5.2 1.1.3 1.6.3 5 0 9-3.6 9-8s-4-7-9-7Zm-2.5 9.5a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Zm5 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Zm-2.5-3.5a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Z"
                    fill="#fff"
                  />
                </svg>
              </span>
              <span className="font-display text-2xl font-semibold tracking-tight text-[var(--l-text)]">Nexa</span>
            </a>
            <p className="text-sm text-[var(--l-muted)] leading-relaxed max-w-xs">
              The intelligent workspace for modern teams. Chat, code, and documents —
              together at last.
            </p>
            <div className="mt-6">
              <p className="text-xs font-medium text-[var(--l-text)] mb-3">Product updates, once a month</p>
              {subscribed ? (
                <p className="flex items-center gap-2 text-sm text-emerald-500 landing-dark:text-emerald-300">
                  <FiCheck size={14} aria-hidden="true" />
                  You&apos;re on the list. See you soon.
                </p>
              ) : (
                <form onSubmit={onSubscribe} className="flex items-center gap-2">
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="flex-1 min-w-0 rounded-xl bg-[var(--l-surface)] border border-[var(--l-border)] px-3.5 py-2.5 text-sm text-[var(--l-text)] placeholder:text-[var(--l-faint)] focus:border-indigo-500/50 focus:outline-none transition-colors"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe to newsletter"
                    className="btn-primary !p-2.5 shrink-0"
                  >
                    <FiArrowRight size={14} aria-hidden="true" />
                    <span className="btn-shine" aria-hidden="true" />
                  </button>
                </form>
              )}
            </div>
            <div className="mt-6 flex gap-2.5">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-xl grid place-items-center text-[var(--l-faint)] bg-[var(--l-surface)] border border-[var(--l-border)] hover:text-[var(--l-text)] hover:border-[var(--l-border-strong)] hover:-translate-y-0.5 transition-all duration-300"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerColumns).map(([title, links]) => (
            <nav key={title} aria-label={`${title} links`}>
              <h3 className="text-[13px] font-semibold text-[var(--l-text)] mb-4">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      {...(link.href.startsWith('#') || link.href.startsWith('/')
                        ? {}
                        : { target: '_blank', rel: 'noopener noreferrer' })}
                      className="text-[13px] text-[var(--l-muted)] hover:text-[var(--l-text)] transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 pt-7 border-t border-[var(--l-border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-[var(--l-faint)]">
            © {new Date().getFullYear()} Nexa Labs, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5 text-[11px] text-[var(--l-faint)]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-dot" aria-hidden="true" />
              All systems operational
            </span>
            <span className="text-[var(--l-border-strong)]">·</span>
            <span className="text-[11px] text-[var(--l-faint)]">hello@nexa.app</span>
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              className="w-9 h-9 rounded-xl grid place-items-center text-[var(--l-faint)] bg-[var(--l-surface)] border border-[var(--l-border)] hover:text-[var(--l-text)] hover:border-[var(--l-border-strong)] hover:-translate-y-0.5 transition-all duration-300"
            >
              <FiArrowUp size={15} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
