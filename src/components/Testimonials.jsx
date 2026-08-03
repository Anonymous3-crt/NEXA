import { FiStar } from 'react-icons/fi';
import Reveal from './ui/Reveal';
import { testimonials } from '../data/mockData';

function Stars() {
  return (
    <div className="flex items-center gap-1 text-amber-400" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <FiStar key={i} size={13} fill="currentColor" aria-hidden="true" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative py-24 sm:py-32 scroll-mt-24 border-y border-[var(--l-border)] bg-[var(--l-bg-ivory)]/70"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl mx-auto text-center">
          <p className="eyebrow mb-5">Testimonials</p>
          <h2
            id="testimonials-heading"
            className="font-display text-4xl sm:text-5xl font-medium tracking-tight text-[var(--l-text)] leading-[1.08]"
          >
            Loved by teams who
            <br />
            <span className="text-gradient italic">ship every day</span>
          </h2>
          <p className="mt-6 text-base sm:text-lg text-[var(--l-muted)]">
            Real words from people who traded tool fatigue for a single workspace.
          </p>
        </Reveal>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {testimonials.map((t, i) => (
            <Reveal key={t.id} delay={(i % 3) * 90}>
              <figure className="glass-card p-6 sm:p-7 h-full flex flex-col">
                <Stars />
                <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-[var(--l-text)]">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 pt-5 border-t border-[var(--l-border)] flex items-center gap-3">
                  <span
                    className="grid place-items-center w-9 h-9 rounded-full text-[11px] font-semibold text-white shrink-0"
                    style={{ background: t.color }}
                  >
                    {t.initials}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[var(--l-text)]">{t.name}</p>
                    <p className="text-xs text-[var(--l-faint)] truncate">{t.role}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-medium border border-[var(--l-border)] bg-[var(--l-surface-2)] text-[var(--l-muted)] whitespace-nowrap">
                    {t.stat}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
