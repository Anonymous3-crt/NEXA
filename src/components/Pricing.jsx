import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiCheck, FiArrowRight } from 'react-icons/fi';
import Reveal from './ui/Reveal';
import { plans } from '../data/mockData';

function Price({ plan, yearly }) {
  if (plan.priceMonthly === 0) {
    return (
      <div className="flex items-baseline gap-1.5">
        <span className="font-display text-5xl font-semibold tracking-tight text-[var(--l-text)]">$0</span>
        <span className="text-sm text-[var(--l-faint)]">forever</span>
      </div>
    );
  }
  const value = yearly ? plan.priceYearly : plan.priceMonthly;
  return (
    <div className="flex items-baseline gap-1.5">
      <span className="font-display text-5xl font-semibold tracking-tight text-[var(--l-text)]">
        {plan.priceLabel}{value}
      </span>
      <span className="text-sm text-[var(--l-faint)]">{plan.period}</span>
    </div>
  );
}

export default function Pricing() {
  const [yearly, setYearly] = useState(true);

  return (
    <section id="pricing" className="relative py-24 sm:py-32 scroll-mt-24 overflow-hidden" aria-labelledby="pricing-heading">
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[42rem] h-[42rem] rounded-full blur-[140px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.08), transparent 65%)' }}
        aria-hidden="true"
      />
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-2xl mx-auto">
          <p className="eyebrow mb-5">Pricing</p>
          <h2 id="pricing-heading" className="font-display text-4xl sm:text-5xl font-medium tracking-tight text-[var(--l-text)] leading-[1.08]">
            Start free. <span className="text-gradient italic">Scale when you&apos;re ready.</span>
          </h2>
          <p className="mt-6 text-base sm:text-lg text-[var(--l-muted)]">
            No hidden fees, no per-seat surprises. Cancel anytime.
          </p>
        </Reveal>

        <Reveal delay={80} className="mt-8 flex justify-center">
          <div className="billing-toggle" role="group" aria-label="Billing period">
            <span
              className="thumb"
              style={{ width: yearly ? 'calc(50% + 1px)' : 'calc(50% - 1px)', left: yearly ? '50%' : '0.25rem' }}
              aria-hidden="true"
            />
            <button
              type="button"
              onClick={() => setYearly(false)}
              className={!yearly ? 'active' : ''}
              aria-pressed={!yearly}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setYearly(true)}
              className={yearly ? 'active' : ''}
              aria-pressed={yearly}
            >
              Yearly
              <span className="ml-1.5 text-[10px] font-semibold text-emerald-500 landing-dark:text-emerald-300">−20%</span>
            </button>
          </div>
        </Reveal>

        <div className="mt-12 grid md:grid-cols-3 gap-5 lg:gap-6 items-stretch">
          {plans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 100} className="h-full">
              <div
                className={`h-full flex flex-col rounded-3xl p-7 sm:p-8 transition-all duration-400 ${
                  plan.featured
                    ? 'gradient-border shadow-[0_32px_80px_-32px_rgba(99,102,241,0.35)]'
                    : 'glass-card'
                }`}
              >
                {plan.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 text-[11px] font-semibold text-white shadow-lg shadow-indigo-500/30">
                    Most popular
                  </span>
                )}
                <h3 className="font-display text-lg font-semibold text-[var(--l-text)]">{plan.name}</h3>
                <p className="mt-1.5 text-[13px] text-[var(--l-muted)] leading-relaxed min-h-[2.5rem]">
                  {plan.description}
                </p>
                <div className="mt-5">
                  <Price plan={plan} yearly={yearly} />
                </div>

                <ul className="mt-7 space-y-3 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[13.5px] text-[var(--l-muted)]">
                      <span className="mt-0.5 inline-grid place-items-center w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 shrink-0" aria-hidden="true">
                        <FiCheck size={10} className="text-emerald-500 landing-dark:text-emerald-300" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  to="/signup"
                  className={`mt-8 w-full ${plan.featured ? 'btn-primary' : 'btn-secondary'} !py-3`}
                >
                  {plan.cta}
                  {plan.featured && (
                    <>
                      <FiArrowRight size={14} aria-hidden="true" />
                      <span className="btn-shine" aria-hidden="true" />
                    </>
                  )}
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} className="mt-10 text-center">
          <p className="text-sm text-[var(--l-faint)]">
            All plans include our core context engine. Need something custom?{' '}
            <a href="/about" className="text-[var(--l-accent)] hover:text-[var(--l-text)] transition-colors font-medium">
              Talk to us
            </a>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
