import { useCallback, useRef } from 'react';
import { FiCheck, FiLock, FiFileText, FiZap, FiSend, FiMoreHorizontal } from 'react-icons/fi';
import Reveal from './ui/Reveal';
import { features } from '../data/mockData';

function MiniVisual({ visual }) {
  if (visual === 'chat') {
    return (
      <div className="mt-6 flex flex-col gap-2.5" aria-hidden="true">
        <div className="flex items-start gap-2 self-start max-w-[85%]">
          <span className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 grid place-items-center shrink-0">
            <FiZap size={10} className="text-white" />
          </span>
          <div className="px-3.5 py-2.5 rounded-2xl rounded-tl-sm bg-[var(--l-surface-2)] border border-[var(--l-border)] text-[12px] text-[var(--l-muted)] leading-relaxed">
            I drafted the announcement for you — want me to tailor the tone for the design channel?
          </div>
        </div>
        <div className="flex items-start gap-2 self-end max-w-[75%]">
          <div className="px-3.5 py-2.5 rounded-2xl rounded-tr-sm bg-gradient-to-br from-indigo-500 to-violet-600 text-[12px] text-white shadow-lg shadow-indigo-500/20">
            Yes — make it more casual, then send it.
          </div>
          <span className="w-6 h-6 rounded-full bg-[var(--l-accent)] grid place-items-center text-[9px] font-bold text-white shrink-0">AR</span>
        </div>
        <div className="flex items-center gap-1.5 w-fit" aria-hidden="true">
          <span className="typing-dot w-1.5 h-1.5 rounded-full bg-[var(--l-faint)]" />
          <span className="typing-dot w-1.5 h-1.5 rounded-full bg-[var(--l-faint)]" />
          <span className="typing-dot w-1.5 h-1.5 rounded-full bg-[var(--l-faint)]" />
        </div>
      </div>
    );
  }

  if (visual === 'lock') {
    return (
      <div className="mt-6 flex items-center gap-3" aria-hidden="true">
        <span className="relative w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 grid place-items-center">
          <FiLock size={18} className="text-emerald-500 landing-dark:text-emerald-300" />
          <span className="absolute -inset-2 rounded-3xl border border-emerald-500/15 animate-pulse-dot" />
        </span>
        <div className="space-y-1.5 flex-1">
          <div className="h-2 rounded-full bg-[var(--l-border)] w-3/4" />
          <div className="h-2 rounded-full bg-[var(--l-border)] w-1/2" />
        </div>
        <div className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/15 text-[10px] text-emerald-500 landing-dark:text-emerald-300 font-medium">
          E2E
        </div>
      </div>
    );
  }

  if (visual === 'voice') {
    return (
      <div className="mt-6 flex items-end justify-center gap-1.5 h-16" aria-hidden="true">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
          <span
            key={i}
            className="eq-bar"
            style={{ animationDelay: `${i * 0.09}s`, height: '12px' }}
          />
        ))}
      </div>
    );
  }

  if (visual === 'groups') {
    const members = ['#6366f1', '#8b5cf6', '#06b6d4', '#ec4899', '#f59e0b'];
    return (
      <div className="mt-6" aria-hidden="true">
        <div className="flex -space-x-2.5 mb-3">
          {members.map((c, i) => (
            <span
              key={i}
              className="w-9 h-9 rounded-full border-2 border-[var(--l-surface)] grid place-items-center text-[10px] font-bold text-white"
              style={{ background: c }}
            >
              {['JT', 'AL', 'MR', 'EN', 'DP'][i]}
            </span>
          ))}
          <span className="w-9 h-9 rounded-full border-2 border-[var(--l-surface)] bg-[var(--l-surface-2)] grid place-items-center text-[10px] text-[var(--l-muted)]">
            +12
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-dot" />
          <span className="text-[11px] text-[var(--l-faint)]">8 people are typing in #design</span>
        </div>
      </div>
    );
  }

  if (visual === 'files') {
    const files = [
      { name: 'Q4_roadmap.pdf', type: 'PDF · 2.4 MB', color: '#f87171' },
      { name: 'brand_assets.zip', type: 'ZIP · 18 MB', color: '#38bdf8' },
      { name: 'launch_brief.md', type: 'MD · 28 KB', color: '#34d399' },
    ];
    return (
      <div className="mt-6 space-y-2" aria-hidden="true">
        {files.map((f) => (
          <div key={f.name} className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-[var(--l-surface-2)] border border-[var(--l-border)]">
            <FiFileText size={14} style={{ color: f.color }} />
            <div className="flex-1 min-w-0">
              <div className="text-[12px] text-[var(--l-text)] truncate">{f.name}</div>
              <div className="text-[10px] text-[var(--l-faint)]">{f.type}</div>
            </div>
            <span className="text-[10px] text-[var(--l-accent)] font-medium">Analyzed</span>
          </div>
        ))}
      </div>
    );
  }

  if (visual === 'workflow') {
    return (
      <div className="mt-6 space-y-2.5" aria-hidden="true">
        {[
          { icon: FiSend, text: 'New mention in #launch', time: 'Triggered' },
          { icon: FiZap, text: 'Draft reply with team context', time: 'Generated' },
          { icon: FiCheck, text: 'Sent · logged to workspace', time: 'Completed' },
        ].map((s, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className={`w-7 h-7 rounded-lg grid place-items-center ${i === 2 ? 'bg-emerald-500/10 text-emerald-500 landing-dark:text-emerald-300 border border-emerald-500/20' : 'bg-[var(--l-surface-2)] text-[var(--l-muted)] border border-[var(--l-border)]'}`}>
              <s.icon size={12} />
            </span>
            <div className="flex-1">
              <div className="text-[12px] text-[var(--l-text)]">{s.text}</div>
              <div className="text-[10px] text-[var(--l-faint)]">{s.time}</div>
            </div>
            {i < 2 && <FiMoreHorizontal size={12} className="text-[var(--l-faint)]" />}
          </div>
        ))}
      </div>
    );
  }

  const bars = [32, 48, 40, 62, 55, 74, 68, 88];
  return (
    <div className="mt-6 flex items-end gap-2 h-24" aria-hidden="true">
      {bars.map((h, i) => (
        <div key={i} className="flex-1 rounded-t-md bg-gradient-to-t from-indigo-400/25 to-violet-400/55" style={{ height: `${h}%` }} />
      ))}
    </div>
  );
}

function SpotlightCard({ feature }) {
  const ref = useRef(null);

  const onMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
  }, []);

  const Icon = feature.icon;

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={`glass-card card-spotlight p-6 sm:p-7 group h-full ${feature.span}`}
    >
      <div className="flex items-start justify-between">
        <span
          className="w-11 h-11 rounded-xl grid place-items-center transition-transform duration-300 group-hover:scale-105"
          style={{ background: feature.tint, border: `1px solid ${feature.color}24`, color: feature.color }}
        >
          <Icon size={19} />
        </span>
        <span
          className="w-7 h-7 rounded-lg grid place-items-center text-[var(--l-faint)] group-hover:text-[var(--l-muted)] group-hover:bg-[var(--l-surface-2)] transition-all duration-300"
          aria-hidden="true"
        >
          <FiMoreHorizontal size={14} />
        </span>
      </div>
      <h3 className="mt-5 text-lg font-semibold text-[var(--l-text)] tracking-tight">{feature.title}</h3>
      <p className="mt-2 text-sm text-[var(--l-muted)] leading-relaxed max-w-md">{feature.desc}</p>
      <MiniVisual visual={feature.visual} />
    </div>
  );
}

export default function Features() {
  return (
    <section id="features" className="relative py-24 sm:py-32 scroll-mt-24" aria-labelledby="features-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="eyebrow mb-5">Features</p>
          <h2 id="features-heading" className="font-display text-4xl sm:text-5xl font-medium tracking-tight text-[var(--l-text)] leading-[1.08]">
            Everything your team needs,
            <br />
            <span className="text-gradient italic">nothing you don&apos;t</span>
          </h2>
          <p className="mt-6 text-base sm:text-lg text-[var(--l-muted)] leading-relaxed">
            Seven capabilities, one context engine. Built to replace the patchwork of
            tools your team juggles every day.
          </p>
        </Reveal>

        <div className="mt-14 grid lg:grid-cols-3 gap-4 sm:gap-5">
          {features.map((feature, i) => (
            <Reveal key={feature.id} delay={(i % 3) * 90}>
              <SpotlightCard feature={feature} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl px-6 py-5 border border-[var(--l-border)] bg-[var(--l-surface)]">
          <div className="flex items-center gap-3">
            <FiCheck size={16} className="text-emerald-500 shrink-0" aria-hidden="true" />
            <p className="text-sm text-[var(--l-muted)]">
              Every plan includes our full context engine — no feature gating on the basics.
            </p>
          </div>
          <span className="text-sm text-[var(--l-accent)] font-medium whitespace-nowrap">
            See it in action ↓
          </span>
        </Reveal>
      </div>
    </section>
  );
}
