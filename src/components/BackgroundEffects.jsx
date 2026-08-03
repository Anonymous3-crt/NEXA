import { useCallback, useRef } from 'react';

function SoftBlobs() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <div
        className="absolute -top-40 left-[8%] w-[42rem] h-[42rem] rounded-full animate-drift"
        style={{
          background: 'radial-gradient(circle, var(--l-lavender) 0%, transparent 62%)',
          opacity: 0.9,
        }}
      />
      <div
        className="absolute top-[30%] -right-48 w-[38rem] h-[38rem] rounded-full animate-drift"
        style={{
          background: 'radial-gradient(circle, var(--l-blush) 0%, transparent 60%)',
          animationDelay: '-8s',
        }}
      />
      <div
        className="absolute -bottom-48 left-[28%] w-[40rem] h-[40rem] rounded-full animate-drift"
        style={{
          background: 'radial-gradient(circle, var(--l-paleblue) 0%, transparent 62%)',
          animationDelay: '-15s',
        }}
      />
    </div>
  );
}

function CurvedLines() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden hidden lg:block" aria-hidden="true">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="none" fill="none">
        <path
          d="M-40 640 C 320 520, 700 780, 1080 620 S 1520 420, 1600 500"
          stroke="var(--l-border-strong)"
          strokeWidth="1"
          opacity="0.35"
        />
        <path
          d="M-40 700 C 340 580, 740 840, 1120 680 S 1520 480, 1600 560"
          stroke="var(--l-border)"
          strokeWidth="1"
          opacity="0.5"
        />
      </svg>
    </div>
  );
}

function SoftDots() {
  const dots = [
    { top: '18%', left: '72%', size: 5 },
    { top: '62%', left: '8%', size: 4 },
    { top: '78%', left: '88%', size: 6 },
    { top: '38%', left: '94%', size: 3 },
  ];
  return (
    <div className="absolute inset-0 pointer-events-none hidden md:block" aria-hidden="true">
      {dots.map((d, i) => (
        <span
          key={i}
          className="absolute rounded-full animate-pulse-dot"
          style={{
            top: d.top,
            left: d.left,
            width: d.size,
            height: d.size,
            background: 'var(--l-accent)',
            opacity: 0.35,
            animationDelay: `${i * 0.8}s`,
          }}
        />
      ))}
    </div>
  );
}

function MouseGlow() {
  const ref = useRef(null);

  const onMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
      style={{
        background:
          'radial-gradient(560px circle at var(--mx, 50%) var(--my, 50%), var(--l-glow), transparent 60%)',
      }}
    />
  );
}

export default function BackgroundEffects() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <SoftBlobs />
      <CurvedLines />
      <SoftDots />
      <MouseGlow />
    </div>
  );
}
