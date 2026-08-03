import { FiCheck, FiMinus, FiX, FiArrowRight } from 'react-icons/fi';
import Reveal from './ui/Reveal';
import { comparison } from '../data/mockData';

function Cell({ value }) {
  if (value === true) {
    return (
      <span className="inline-grid place-items-center w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/25" aria-label="Included">
        <FiCheck size={12} className="text-emerald-500 landing-dark:text-emerald-300" />
      </span>
    );
  }
  if (value === 'partial') {
    return (
      <span className="inline-grid place-items-center w-6 h-6 rounded-full bg-amber-500/10 border border-amber-500/25" aria-label="Partially included">
        <FiMinus size={12} className="text-amber-500 landing-dark:text-amber-300" />
      </span>
    );
  }
  return (
    <span className="inline-grid place-items-center w-6 h-6 rounded-full bg-[var(--l-surface-2)] border border-[var(--l-border)]" aria-label="Not included">
      <FiX size={12} className="text-[var(--l-faint)]" />
    </span>
  );
}

export default function Comparison() {
  return (
    <section className="relative py-24 sm:py-32" aria-labelledby="comparison-heading">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-2xl mx-auto">
          <p className="eyebrow mb-5">Why Nexa</p>
          <h2 id="comparison-heading" className="font-display text-4xl sm:text-5xl font-medium tracking-tight text-[var(--l-text)] leading-[1.08]">
            Five tools, one workspace —{' '}
            <span className="text-gradient italic">or one Nexa</span>
          </h2>
          <p className="mt-6 text-base sm:text-lg text-[var(--l-muted)]">
            Every switch between tools costs context, attention, and a subscription.
            Here&apos;s what you give up keeping things fragmented.
          </p>
        </Reveal>

        <Reveal delay={120} className="mt-14">
          <div className="rounded-2xl border border-[var(--l-border)] overflow-hidden bg-[var(--l-surface)] shadow-[var(--l-shadow)]">
            <div className="grid grid-cols-[1fr_auto_auto] items-center gap-3 sm:gap-6 px-5 sm:px-8 py-5 border-b border-[var(--l-border)] bg-[var(--l-surface-2)]/70">
              <span className="text-xs text-[var(--l-faint)] uppercase tracking-wider">Capability</span>
              <span className="text-sm font-semibold text-[var(--l-text)] whitespace-nowrap w-[104px] sm:w-[120px] text-center">
                Nexa
              </span>
              <span className="text-sm font-medium text-[var(--l-faint)] whitespace-nowrap w-[104px] sm:w-[120px] text-center">
                5 separate tools
              </span>
            </div>

            {comparison.map((row, i) => (
              <div
                key={row.feature}
                className={`grid grid-cols-[1fr_auto_auto] items-center gap-3 sm:gap-6 px-5 sm:px-8 py-4 ${
                  i % 2 === 1 ? 'bg-[var(--l-surface-2)]/40' : ''
                }`}
              >
                <span className="text-sm text-[var(--l-muted)]">{row.feature}</span>
                <span className="flex justify-center w-[104px] sm:w-[120px]">
                  <Cell value={row.nexa} />
                </span>
                <span className="flex justify-center w-[104px] sm:w-[120px]">
                  <Cell value={row.others} />
                </span>
              </div>
            ))}

            <div className="grid grid-cols-[1fr_auto_auto] items-center gap-3 sm:gap-6 px-5 sm:px-8 py-5 border-t border-[var(--l-border)] bg-[var(--l-surface-2)]/70">
              <span className="text-sm text-[var(--l-muted)]">Monthly cost (team of 10)</span>
              <span className="text-sm font-bold text-[var(--l-text)] text-center w-[104px] sm:w-[120px]">
                $150
              </span>
              <span className="text-sm font-bold text-[var(--l-faint)] line-through text-center w-[104px] sm:w-[120px]">
                $480+
              </span>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <p className="text-sm text-[var(--l-faint)]">
              Curious how your stack compares? Send us your tool list and we&apos;ll map it.
            </p>
            <a href="#pricing" className="inline-flex items-center gap-1.5 text-sm text-[var(--l-accent)] hover:text-[var(--l-text)] font-medium transition-colors">
              See pricing
              <FiArrowRight size={14} aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
