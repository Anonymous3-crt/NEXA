import Reveal from './ui/Reveal';
import { useCases } from '../data/mockData';

export default function UseCases() {
  return (
    <section id="use-cases" className="relative py-24 sm:py-32 scroll-mt-24" aria-labelledby="cases-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[0.9fr_1.1fr] gap-14 lg:gap-20">
        <div className="lg:sticky lg:top-32 self-start">
          <Reveal>
            <p className="eyebrow mb-5">Use cases</p>
            <h2 id="cases-heading" className="font-display text-4xl sm:text-5xl font-medium tracking-tight text-[var(--l-text)] leading-[1.08]">
              Built for every way
              <br />
              <span className="text-gradient italic">you work</span>
            </h2>
            <p className="mt-6 text-base sm:text-lg text-[var(--l-muted)] leading-relaxed max-w-md">
              However your day flows, Nexa meets you there — the same engine, tailored
              to the details of your craft.
            </p>
          </Reveal>
          <Reveal delay={120} className="mt-8 flex items-center gap-3 rounded-2xl border border-[var(--l-border)] bg-[var(--l-surface)] px-5 py-4 max-w-md">
            <span className="text-2xl" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--l-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 2 4.5 5.5v5.8c0 4.6 3.2 8.3 7.5 9.7 4.3-1.4 7.5-5.1 7.5-9.7V5.5L12 2Z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </span>
            <p className="text-sm text-[var(--l-muted)]">
              Every use case works out of the box on the free plan.
            </p>
          </Reveal>
        </div>

        <div className="flex flex-col gap-3 sm:gap-4">
          {useCases.map((uc, i) => {
            const Icon = uc.icon;
            return (
              <Reveal key={uc.id} delay={i * 80}>
                <article className="glass-card card-spotlight p-6 sm:p-7 flex flex-col sm:flex-row gap-5 sm:items-center">
                  <div className="flex items-center gap-4 shrink-0">
                    <span
                      className="w-12 h-12 rounded-xl grid place-items-center shrink-0"
                      style={{ background: uc.tint, border: `1px solid ${uc.color}24`, color: uc.color }}
                    >
                      <Icon size={20} />
                    </span>
                    <div className="sm:hidden">
                      <p className="font-display text-lg font-semibold text-[var(--l-text)]">{uc.title}</p>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="hidden sm:block font-display text-lg font-semibold text-[var(--l-text)]">
                      {uc.title}
                    </p>
                    <p className="mt-1.5 text-sm text-[var(--l-muted)] leading-relaxed">{uc.desc}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {uc.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-full text-[11px] font-medium border border-[var(--l-border)] bg-[var(--l-surface-2)] text-[var(--l-muted)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span
                    className="hidden sm:grid place-items-center w-9 h-9 rounded-full border border-[var(--l-border)] text-sm text-[var(--l-faint)] shrink-0"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
