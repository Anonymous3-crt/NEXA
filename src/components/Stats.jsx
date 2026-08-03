import { useEffect, useRef, useState } from 'react';
import { stats } from '../data/mockData';

function useCountUp(target, started, duration = 1600) {
  const [value, setValue] = useState(0);
  const raf = useRef(null);

  useEffect(() => {
    if (!started) return;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(target * eased);
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [started, target, duration]);

  return value;
}

function StatItem({ stat, started, index }) {
  const value = useCountUp(stat.value, started);

  return (
    <div className={`reveal relative px-2 py-6 sm:py-8 text-center ${index > 0 ? 'sm:border-l border-[var(--l-border)]' : ''}`}>
      <div className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-[var(--l-text)] tabular-nums">
        {stat.value % 1 === 0 ? Math.round(value).toLocaleString() : value.toFixed(1)}
        <span className="text-gradient">{stat.suffix}</span>
      </div>
      <div className="mt-2 text-[13px] text-[var(--l-muted)]">{stat.label}</div>
      {stat.note && (
        <div className="mt-1 text-[10px] uppercase tracking-wider text-[var(--l-faint)]">
          {stat.note}
        </div>
      )}
    </div>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = ref.current;
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
      { threshold: 0.3 },
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative py-10 sm:py-14"
      aria-label="Product statistics"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <StatItem key={stat.label} stat={stat} started={started} index={i} />
        ))}
      </div>
    </section>
  );
}
