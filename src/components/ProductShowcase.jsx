import { useRef, useState } from 'react';
import { FiCheck, FiCopy, FiCpu, FiFileText, FiImage, FiMessageSquare, FiTerminal } from 'react-icons/fi';
import Reveal from './ui/Reveal';
import { showcaseTabs } from '../data/mockData';

const tabIcons = {
  chat: FiMessageSquare,
  code: FiTerminal,
  docs: FiFileText,
  images: FiImage,
};

const codeLines = [
  { num: 1, text: 'import { Nexa } from "@nexa/sdk";', cls: 'text-violet-400' },
  { num: 2, text: '', cls: '' },
  { num: 3, text: 'const nexa = new Nexa({ apiKey: process.env.NEXA_KEY });', cls: 'text-zinc-300' },
  { num: 4, text: '', cls: '' },
  { num: 5, text: 'const result = await nexa.analyze({', cls: 'text-zinc-300' },
  { num: 6, text: '  file: "Q4_report.pdf",', cls: 'text-emerald-400' },
  { num: 7, text: '  question: "What drove the growth in September?",', cls: 'text-emerald-400' },
  { num: 8, text: '  citeSources: true,', cls: 'text-emerald-400' },
  { num: 9, text: '});', cls: 'text-zinc-300' },
  { num: 10, text: '', cls: '' },
  { num: 11, text: '// "Revenue grew 24% — driven by the EU expansion" (p. 12, 14)', cls: 'text-zinc-500 italic' },
];

const docLines = [
  { width: 'w-full', tone: 'bg-[var(--l-border)]', h: 'h-2.5' },
  { width: 'w-5/6', tone: 'bg-[var(--l-border)]', h: 'h-2.5' },
  { width: 'w-full', tone: 'bg-[var(--l-border-strong)]', h: 'h-2' },
  { width: 'w-2/3', tone: 'bg-[var(--l-border-strong)]', h: 'h-2' },
  { width: 'w-11/12', tone: 'bg-[var(--l-border-strong)]', h: 'h-2' },
  { width: 'w-full', tone: 'bg-[var(--l-border-strong)]', h: 'h-2' },
  { width: 'w-3/4', tone: 'bg-[var(--l-border)]', h: 'h-2' },
];

const imageGrid = [
  { label: 'Launch hero', tone: 'from-indigo-200 to-violet-100 landing-dark:from-indigo-500/40 landing-dark:to-violet-500/25', icon: '🚀' },
  { label: 'Product shot', tone: 'from-cyan-200 to-sky-100 landing-dark:from-cyan-500/35 landing-dark:to-blue-500/20', icon: '📸' },
  { label: 'OG thumbnail', tone: 'from-pink-200 to-rose-100 landing-dark:from-pink-500/35 landing-dark:to-rose-500/20', icon: '🖼️' },
  { label: 'Social banner', tone: 'from-emerald-200 to-teal-100 landing-dark:from-emerald-500/35 landing-dark:to-teal-500/20', icon: '🎨' },
];

function ChatPane() {
  return (
    <div className="flex flex-col gap-3 p-4 sm:p-6" aria-hidden="true">
      <div className="flex items-start gap-2.5 self-start max-w-[85%]">
        <span className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 grid place-items-center shrink-0">
          <FiCpu size={11} className="text-white" />
        </span>
        <div className="px-4 py-2.5 rounded-2xl rounded-tl-sm bg-[var(--l-surface-2)] border border-[var(--l-border)] text-[13px] text-[var(--l-muted)] leading-relaxed">
          Here&apos;s the launch brief summarized — 6 key points, including the September growth story.
        </div>
      </div>
      <div className="flex items-start gap-2.5 self-end max-w-[80%]">
        <div className="px-4 py-2.5 rounded-2xl rounded-tr-sm bg-gradient-to-br from-indigo-500 to-violet-600 text-[13px] text-white shadow-lg shadow-indigo-500/20">
          Great — draft the team announcement from this, keep it under 150 words.
        </div>
        <span className="w-7 h-7 rounded-full bg-[var(--l-accent)] grid place-items-center text-[10px] font-bold text-white shrink-0">AR</span>
      </div>
      <div className="flex items-start gap-2.5 self-start max-w-[85%]">
        <span className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 grid place-items-center shrink-0">
          <FiCpu size={11} className="text-white" />
        </span>
        <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-[var(--l-surface-2)] border border-[var(--l-border)] text-[13px] text-[var(--l-muted)] leading-relaxed">
          <div className="font-medium text-[var(--l-text)] mb-1.5">Ready for launch 🎉</div>
          <div className="text-[var(--l-muted)]">Team — we&apos;re shipping on August 15. The brief is summarized, the copy is drafted, and the design system is locked. Full details in the workspace thread.</div>
          <div className="mt-2.5 flex items-center gap-2 text-[11px] text-emerald-500 landing-dark:text-emerald-300">
            <FiCheck size={11} /> Matches your team&apos;s tone · 148 words
          </div>
        </div>
      </div>
    </div>
  );
}

function CodePane() {
  return (
    <div className="p-4 sm:p-6" aria-hidden="true">
      <div className="rounded-xl bg-[#0f0f14] border border-[var(--l-border)] overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.07]">
          <div className="flex items-center gap-2 text-[11px] text-zinc-500 font-mono">
            <FiCopy size={11} className="text-zinc-600" />
            analyze.js
          </div>
          <span className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2 py-0.5">
            Generated
          </span>
        </div>
        <div className="p-4 sm:p-5 space-y-1.5 font-mono text-[12px] leading-relaxed">
          {codeLines.map((l) => (
            <div key={l.num} className="code-line">
              <span className="code-num !text-zinc-700">{l.num}</span>
              {l.text ? <span className={l.cls}>{l.text}</span> : <span className="flex-1" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DocsPane() {
  return (
    <div className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4" aria-hidden="true">
      <div className="flex-1 rounded-xl bg-[var(--l-surface-2)] border border-[var(--l-border)] p-4 space-y-2.5">
        <div className="flex items-center gap-2 mb-3">
          <FiFileText size={13} className="text-[var(--l-accent)]" />
          <span className="text-[11px] text-[var(--l-muted)] font-mono">Q4_report.pdf</span>
          <span className="ml-auto text-[10px] text-[var(--l-faint)]">24 pages</span>
        </div>
        {docLines.map((l, i) => (
          <div key={i} className={`${l.width} ${l.tone} ${l.h} rounded-full`} />
        ))}
      </div>
      <div className="flex-1 rounded-xl bg-indigo-50 border border-indigo-200 landing-dark:bg-indigo-500/10 landing-dark:border-indigo-500/25 p-4">
        <div className="text-[11px] font-medium text-[var(--l-text)] mb-3">Answer with citations</div>
        <p className="text-[12px] text-[var(--l-muted)] leading-relaxed mb-3">
          Revenue grew 24% in September, driven primarily by the EU expansion and the new
          self-serve onboarding flow.
        </p>
        <div className="flex flex-wrap gap-1.5">
          {['p.12', 'p.14', 'p.18'].map((p) => (
            <span key={p} className="text-[10px] text-[var(--l-accent)] bg-[var(--l-lavender)] border border-[var(--l-border)] rounded-md px-2 py-0.5 font-mono">
              {p}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ImagesPane() {
  return (
    <div className="p-4 sm:p-6 grid grid-cols-2 gap-3" aria-hidden="true">
      {imageGrid.map((img) => (
        <div key={img.label} className={`rounded-xl border border-[var(--l-border)] p-3 bg-gradient-to-br ${img.tone}`}>
          <div className="aspect-video rounded-lg bg-white/40 landing-dark:bg-black/25 grid place-items-center text-2xl mb-2.5">
            {img.icon}
          </div>
          <div className="text-[11px] text-[var(--l-text)] font-medium">{img.label}</div>
          <div className="text-[9px] text-[var(--l-faint)]">1,024 × 1,024 · refined twice</div>
        </div>
      ))}
    </div>
  );
}

const panes = {
  chat: <ChatPane />,
  code: <CodePane />,
  docs: <DocsPane />,
  images: <ImagesPane />,
};

export default function ProductShowcase() {
  const [active, setActive] = useState('chat');
  const tabRefs = useRef({});

  const onKeyDown = (e, index) => {
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(e.key)) return;
    e.preventDefault();
    const ids = showcaseTabs.map((t) => t.id);
    let next = index;
    if (e.key === 'ArrowRight') next = (index + 1) % ids.length;
    if (e.key === 'ArrowLeft') next = (index - 1 + ids.length) % ids.length;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = ids.length - 1;
    setActive(ids[next]);
    tabRefs.current[ids[next]]?.focus();
  };

  return (
    <section id="showcase" className="relative py-24 sm:py-32 scroll-mt-24 overflow-hidden" aria-labelledby="showcase-heading">
      <div
        className="absolute top-1/3 -right-40 w-[34rem] h-[34rem] rounded-full blur-[120px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.07), transparent 65%)' }}
        aria-hidden="true"
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="eyebrow mb-5">Showcase</p>
          <h2 id="showcase-heading" className="font-display text-4xl sm:text-5xl font-medium tracking-tight text-[var(--l-text)] leading-[1.08]">
            One prompt, <span className="text-gradient italic">four workflows</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-12 items-start">
          <Reveal>
            <div role="tablist" aria-label="Product capabilities" className="flex flex-wrap gap-1.5 mb-8">
              {showcaseTabs.map((tab, i) => {
                const Icon = tabIcons[tab.id];
                const isActive = active === tab.id;
                return (
                  <button
                    key={tab.id}
                    ref={(el) => { tabRefs.current[tab.id] = el; }}
                    role="tab"
                    id={`tab-${tab.id}`}
                    aria-selected={isActive}
                    aria-controls={`panel-${tab.id}`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActive(tab.id)}
                    onKeyDown={(e) => onKeyDown(e, i)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-[13px] transition-all duration-300 ${
                      isActive
                        ? 'bg-[var(--l-surface)] border border-[var(--l-border-strong)] text-[var(--l-text)] font-medium shadow-[var(--l-shadow)]'
                        : 'text-[var(--l-faint)] border border-transparent hover:text-[var(--l-muted)]'
                    }`}
                  >
                    <Icon size={13} className={isActive ? 'text-[var(--l-accent)]' : ''} aria-hidden="true" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {showcaseTabs.map((tab) => (
              <div
                key={tab.id}
                role="tabpanel"
                id={`panel-${tab.id}`}
                aria-labelledby={`tab-${tab.id}`}
                hidden={active !== tab.id}
                className={active === tab.id ? 'tab-pane active' : 'tab-pane'}
              >
                <h3 className="text-xl sm:text-2xl font-semibold text-[var(--l-text)] tracking-tight">{tab.title}</h3>
                <p className="mt-3 text-sm sm:text-base text-[var(--l-muted)] leading-relaxed">{tab.description}</p>
                <ul className="mt-5 space-y-2.5">
                  {tab.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2.5 text-sm text-[var(--l-muted)]">
                      <span className="w-[18px] h-[18px] rounded-full bg-emerald-500/10 border border-emerald-500/25 grid place-items-center" aria-hidden="true">
                        <FiCheck size={10} className="text-emerald-500 landing-dark:text-emerald-300" />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Reveal>

          <Reveal delay={140}>
            <div className="browser-frame">
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[var(--l-border)] bg-[var(--l-surface-2)]/60">
                <div className="flex gap-1.5" aria-hidden="true">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                </div>
                <div className="mx-auto flex items-center gap-1.5 px-3 py-1 rounded-md bg-[var(--l-surface)] border border-[var(--l-border)]">
                  <span className="text-[10px] text-[var(--l-faint)] font-mono">nexa.app/workspace</span>
                </div>
                <span className="w-2.5" />
              </div>
              <div className="min-h-[360px] sm:min-h-[400px] bg-gradient-to-b from-[var(--l-surface-2)]/40 to-transparent">
                {showcaseTabs.map((tab) => (
                  <div key={tab.id} hidden={active !== tab.id} className={active === tab.id ? 'tab-pane active' : 'tab-pane'}>
                    {panes[tab.id]}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
