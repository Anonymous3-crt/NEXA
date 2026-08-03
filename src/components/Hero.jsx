import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCheck, FiMic, FiFileText, FiClock } from 'react-icons/fi';

const heroAvatars = [
  { initials: 'AR', color: '#6366f1' },
  { initials: 'KM', color: '#10b981' },
  { initials: 'JS', color: '#f472b6' },
  { initials: 'TD', color: '#f59e0b' },
];

const codeLines = [
  { num: 1, text: 'const brief = await nexa.summarize("Q3_report.pdf");' },
  { num: 2, text: 'const replies = await nexa.draftReplies(brief);' },
  { num: 3, text: 'nexa.schedule(replies, { at: "09:00" });' },
];

const chatMessages = [
  {
    role: 'user',
    text: 'Summarize the investor notes and suggest next steps.',
    time: '09:02',
  },
  {
    role: 'ai',
    text: 'Drafted: 3 follow-ups, 1 meeting request, and a risk note on burn rate. Want me to schedule the review for Friday?',
    time: '09:02',
  },
];

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-1" aria-label="Nexa is typing">
      <span className="typing-dot w-1.5 h-1.5 rounded-full bg-[var(--l-accent)]" />
      <span className="typing-dot w-1.5 h-1.5 rounded-full bg-[var(--l-accent)]" />
      <span className="typing-dot w-1.5 h-1.5 rounded-full bg-[var(--l-accent)]" />
    </div>
  );
}

function AppMockup() {
  return (
    <div className="relative">
      <div className="browser-frame">
        <div className="flex items-center gap-3 px-4 h-10 border-b border-[var(--l-border)]">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--l-border-strong)]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--l-border-strong)]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--l-border-strong)]" />
          </div>
          <div className="flex-1 max-w-[15rem] mx-auto">
            <div className="flex items-center justify-center gap-1.5 h-6 rounded-md bg-[var(--l-surface-2)] text-[10px] text-[var(--l-faint)] font-mono">
              <FiClock size={9} aria-hidden="true" />
              app.nexa.ai
            </div>
          </div>
          <div className="w-10" />
        </div>

        <div className="flex">
          <aside className="hidden sm:flex flex-col w-40 border-r border-[var(--l-border)] p-3 gap-1">
            <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-[var(--l-lavender)] text-[var(--l-text)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--l-accent)]" />
              <span className="text-[11px] font-medium">Chat</span>
            </div>
            {['Docs', 'Tasks', 'Voice', 'Agents'].map((item, i) => (
              <div
                key={item}
                className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-[var(--l-faint)]"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: i % 2 ? 'var(--l-faint)' : 'transparent', border: i % 2 ? 'none' : '1px solid var(--l-border-strong)' }}
                />
                <span className="text-[11px]">{item}</span>
              </div>
            ))}
            <div className="mt-4 px-2 py-1.5 rounded-lg bg-[var(--l-surface-2)]">
              <div className="h-1.5 w-16 rounded-full bg-[var(--l-border-strong)] mb-1.5" />
              <div className="h-1.5 w-11 rounded-full bg-[var(--l-border)]" />
            </div>
          </aside>

          <div className="flex-1 p-4 space-y-3">
            {chatMessages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {m.role === 'ai' && (
                  <span className="shrink-0 mr-2 grid place-items-center w-6 h-6 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 text-white">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path
                        d="M12 3C7 3 3 6.6 3 11c0 2.4 1.2 4.6 3.1 6.1-.1 1.1.3 2.4 1.6 3.1.7.4 1.5.3 2-.1.5-.4.4-1.2.1-1.7-.2-.3-.4-.8-.3-1.3l1.9.6c.5.2 1.1.3 1.6.3 5 0 9-3.6 9-8s-4-7-9-7Zm-2.5 9.5a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Zm5 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Zm-2.5-3.5a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Z"
                        fill="#fff"
                      />
                    </svg>
                  </span>
                )}
                <div
                  className={`max-w-[78%] px-3.5 py-2.5 text-[12px] leading-relaxed rounded-2xl ${
                    m.role === 'user'
                      ? 'bg-[var(--l-surface-2)] border border-[var(--l-border)] text-[var(--l-text)] rounded-br-md'
                      : 'bg-gradient-to-br from-indigo-50 to-violet-50 landing-dark:from-indigo-500/10 landing-dark:to-violet-500/10 border border-[var(--l-border)] text-[var(--l-text)] rounded-bl-md'
                  }`}
                >
                  {m.text}
                  <div className="mt-1 text-[9px] text-[var(--l-faint)]">{m.time}</div>
                </div>
              </div>
            ))}
            <div className="flex justify-start">
              <span className="shrink-0 mr-2 grid place-items-center w-6 h-6 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 text-white">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M12 3C7 3 3 6.6 3 11c0 2.4 1.2 4.6 3.1 6.1-.1 1.1.3 2.4 1.6 3.1.7.4 1.5.3 2-.1.5-.4.4-1.2.1-1.7-.2-.3-.4-.8-.3-1.3l1.9.6c.5.2 1.1.3 1.6.3 5 0 9-3.6 9-8s-4-7-9-7Zm-2.5 9.5a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Zm5 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Zm-2.5-3.5a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Z"
                    fill="#fff"
                  />
                </svg>
              </span>
              <div className="px-3.5 py-2.5 rounded-2xl rounded-bl-md bg-gradient-to-br from-indigo-50 to-violet-50 landing-dark:from-indigo-500/10 landing-dark:to-violet-500/10 border border-[var(--l-border)]">
                <TypingIndicator />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 px-4 py-3 border-t border-[var(--l-border)]">
          <div className="flex-1 h-9 rounded-xl bg-[var(--l-surface-2)] border border-[var(--l-border)] flex items-center px-3">
            <span className="text-[11px] text-[var(--l-faint)]">Ask Nexa anything…</span>
          </div>
          <span className="grid place-items-center w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/25">
            <FiArrowRight size={14} aria-hidden="true" />
          </span>
        </div>
      </div>

      <div
        className="absolute -left-6 sm:-left-10 top-16 glass-card animate-float-y px-4 py-3 flex items-center gap-3 rounded-2xl"
        style={{ animationDelay: '0.6s' }}
      >
        <span className="grid place-items-center w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 landing-dark:text-emerald-300">
          <FiCheck size={14} aria-hidden="true" />
        </span>
        <div>
          <p className="text-xs font-medium text-[var(--l-text)]">Document summarized</p>
          <p className="text-[10px] text-[var(--l-faint)]">Q3_report.pdf · 12 pages</p>
        </div>
      </div>

      <div
        className="absolute -right-4 sm:-right-10 top-40 glass-card animate-float-y-slow px-4 py-3 flex items-center gap-3 rounded-2xl"
      >
        <span className="grid place-items-center w-8 h-8 rounded-xl bg-indigo-500/10 text-[var(--l-accent)]">
          <FiMic size={14} aria-hidden="true" />
        </span>
        <div>
          <p className="text-xs font-medium text-[var(--l-text)]">Voice → Text</p>
          <div className="flex items-end gap-[3px] h-3 mt-1">
            {[0.5, 0.9, 0.35, 0.7, 1].map((d, i) => (
              <span
                key={i}
                className="w-[3px] rounded-full bg-gradient-to-b from-indigo-400 to-violet-500"
                style={{ height: `${d * 12}px`, animation: `wave-bar 1.1s ease-in-out ${i * 0.12}s infinite` }}
              />
            ))}
          </div>
        </div>
      </div>

      <div
        className="absolute -bottom-6 left-10 glass-card animate-float-y px-4 py-3 rounded-2xl"
        style={{ animationDelay: '1.2s' }}
      >
        <div className="flex items-center gap-3">
          <span className="grid place-items-center w-8 h-8 rounded-xl bg-violet-500/10 text-[var(--l-accent-2)]">
            <FiFileText size={14} aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs font-medium text-[var(--l-text)]">3 follow-ups drafted</p>
            <p className="text-[10px] text-[var(--l-faint)]">Avg reply 2.4s</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CodeCard() {
  return (
    <div className="hidden xl:block absolute -right-16 -top-14 w-64 glass-card rounded-2xl p-4 rotate-2">
      <div className="flex items-center gap-1.5 mb-3">
        <span className="w-2 h-2 rounded-full bg-[var(--l-border-strong)]" />
        <span className="w-2 h-2 rounded-full bg-[var(--l-border-strong)]" />
        <span className="w-2 h-2 rounded-full bg-[var(--l-border-strong)]" />
        <span className="ml-2 text-[10px] font-mono text-[var(--l-faint)]">nexa/api · main</span>
      </div>
      <div className="space-y-1.5 font-mono text-[10px] leading-relaxed text-[var(--l-muted)]">
        {codeLines.map((line) => (
          <div key={line.num} className="code-line">
            <span className="code-num">{line.num}</span>
            <span>
              {line.text.split(/(nexa\.|\("|"\)|;)/g).map((part, i) =>
                part === 'nexa.' ? (
                  <span key={i} className="text-[var(--l-accent)] font-medium">
                    {part}
                  </span>
                ) : part.startsWith('"') ? (
                  <span key={i} className="text-emerald-500 landing-dark:text-emerald-300">
                    {part}
                  </span>
                ) : (
                  <span key={i}>{part}</span>
                ),
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const targets = el.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 pt-36 pb-24"
    >
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-[1.05fr_1fr] gap-16 lg:gap-12 items-center">
        <div className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
          <div className="reveal inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--l-border)] bg-[var(--l-glass)] text-[13px] text-[var(--l-muted)] mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-dot" />
            Nexa 2.0 — now with voice agents
            <FiArrowRight size={13} className="text-[var(--l-faint)]" aria-hidden="true" />
          </div>

          <h1 className="reveal font-display text-[2.75rem] sm:text-6xl lg:text-[4.25rem] leading-[1.06] font-medium tracking-tight text-[var(--l-text)]">
            One workspace.
            <br />
            <span className="text-gradient italic">Endless</span> possibilities.
          </h1>

          <p className="reveal mt-6 text-base sm:text-lg leading-relaxed text-[var(--l-muted)] max-w-lg mx-auto lg:mx-0">
            Nexa unifies chat, documents, tasks, and voice into a single elegant
            workspace — so your ideas never get lost in another tool.
          </p>

          <div className="reveal mt-9 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
            <Link to="/signup" className="btn-primary w-full sm:w-auto group">
              Get Started Free
              <FiArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
              <span className="btn-shine" aria-hidden="true" />
            </Link>
            <a href="#showcase" className="btn-secondary w-full sm:w-auto">
              See how it works
            </a>
          </div>

          <div className="reveal mt-7 flex items-center justify-center lg:justify-start gap-3">
            <div className="flex -space-x-2.5">
              {heroAvatars.map((a) => (
                <span
                  key={a.initials}
                  className="grid place-items-center w-7 h-7 rounded-full border-2 border-[var(--l-bg)] text-[9px] font-semibold text-white"
                  style={{ background: a.color }}
                >
                  {a.initials}
                </span>
              ))}
            </div>
            <p className="text-xs text-[var(--l-faint)]">
              Loved by <span className="text-[var(--l-text)] font-medium">12,000+</span> teams · no credit card required
            </p>
          </div>
        </div>

        <div className="reveal relative px-2 sm:px-0">
          <AppMockup />
          <CodeCard />
        </div>
      </div>
    </section>
  );
}
