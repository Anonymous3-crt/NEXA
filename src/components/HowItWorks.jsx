import { FiMessageCircle, FiZap, FiUsers } from 'react-icons/fi';
import Reveal from './ui/Reveal';
import { howItWorks } from '../data/mockData';

const stepIcons = [FiUsers, FiMessageCircle, FiZap];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 sm:py-32 scroll-mt-24" aria-labelledby="how-heading">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-2xl mx-auto">
          <p className="eyebrow mb-5">How it works</p>
          <h2 id="how-heading" className="font-display text-4xl sm:text-5xl font-medium tracking-tight text-[var(--l-text)] leading-[1.08]">
            From signup to <span className="text-gradient italic">shipping</span> in minutes
          </h2>
          <p className="mt-6 text-base sm:text-lg text-[var(--l-muted)]">
            No migrations, no training, no six-month rollout. Three steps and your team is live.
          </p>
        </Reveal>

        <div className="relative mt-16">
          <div
            className="absolute top-[52px] left-[16%] right-[16%] h-px bg-gradient-to-r from-indigo-400/25 via-violet-400/25 to-cyan-400/25 hidden lg:block"
            aria-hidden="true"
          />

          <div className="grid lg:grid-cols-3 gap-10 lg:gap-8">
            {howItWorks.map((step, i) => {
              const Icon = stepIcons[i];
              return (
                <Reveal key={step.step} delay={i * 120} className="relative text-center">
                  <div className="relative inline-grid place-items-center mb-6">
                    <span className="absolute inset-0 rounded-2xl bg-indigo-500/10 blur-xl" aria-hidden="true" />
                    <span
                      className="relative w-[104px] h-[104px] rounded-2xl grid place-items-center border border-[var(--l-border)] bg-[var(--l-surface)] shadow-[var(--l-shadow)]"
                      aria-hidden="true"
                    >
                      <Icon size={30} className="text-[var(--l-accent)]" />
                      <span className="absolute -top-2.5 -right-2.5 w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 border-2 border-[var(--l-bg)] grid place-items-center text-xs font-bold text-white">
                        {step.step}
                      </span>
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-semibold text-[var(--l-text)] tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm text-[var(--l-muted)] leading-relaxed max-w-xs mx-auto">
                    {step.desc}
                  </p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
