import { companies } from '../data/mockData';

export default function TrustedBy() {
  return (
    <section className="relative px-5 sm:px-8 py-16 border-y border-[var(--l-border)] bg-[var(--l-bg-alt)]/60">
      <div className="max-w-6xl mx-auto">
        <p className="reveal text-center text-xs tracking-[0.22em] uppercase text-[var(--l-faint)] mb-9">
          Trusted by teams at
        </p>
        <div className="reveal marquee-mask">
          <div className="marquee-track items-center">
            {[...companies, ...companies].map((c, i) => (
              <span
                key={`${c.name}-${i}`}
                className="flex items-center gap-2.5 text-[var(--l-muted)] opacity-70 hover:opacity-100 transition-opacity duration-300"
              >
                <span
                  className="grid place-items-center w-7 h-7 rounded-lg border border-[var(--l-border-strong)] text-[11px] font-semibold"
                  style={{ color: c.color, background: 'var(--l-surface)' }}
                >
                  {c.symbol}
                </span>
                <span className="font-display text-lg font-semibold tracking-tight">{c.name}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
