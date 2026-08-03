import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import Reveal from './ui/Reveal';

export default function CTA() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden" aria-labelledby="cta-heading">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="gradient-border relative overflow-hidden rounded-[2rem] px-6 sm:px-14 py-14 sm:py-20 text-center">
            <div
              className="absolute inset-0 -z-10 opacity-70"
              style={{
                background:
                  'radial-gradient(55% 60% at 50% 0%, var(--l-lavender), transparent 70%)',
              }}
              aria-hidden="true"
            />
            <div
              className="absolute inset-0 -z-10 opacity-50"
              style={{
                backgroundImage:
                  'linear-gradient(var(--l-border) 1px, transparent 1px), linear-gradient(90deg, var(--l-border) 1px, transparent 1px)',
                backgroundSize: '48px 48px',
                maskImage: 'radial-gradient(70% 70% at 50% 0%, #000, transparent 75%)',
                WebkitMaskImage: 'radial-gradient(70% 70% at 50% 0%, #000, transparent 75%)',
              }}
              aria-hidden="true"
            />

            <p className="eyebrow mb-5">Ready when you are</p>
            <h2 id="cta-heading" className="font-display text-4xl sm:text-5xl font-medium tracking-tight text-[var(--l-text)] leading-[1.08] max-w-2xl mx-auto">
              Stop switching tools.
              <br />
              <span className="text-gradient italic">Start switching minds on.</span>
            </h2>
            <p className="mt-6 text-base sm:text-lg text-[var(--l-muted)] max-w-xl mx-auto leading-relaxed">
              Join thousands of teams building faster with one intelligent workspace.
              Free for 30 days — no credit card required.
            </p>

            <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/signup" className="btn-primary !py-3.5 !px-8 text-[15px] group">
                Start building free
                <FiArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
                <span className="btn-shine" aria-hidden="true" />
              </Link>
              <Link to="/login" className="btn-secondary !py-3.5 !px-8 text-[15px]">
                I already have an account
              </Link>
            </div>

            <p className="mt-6 text-xs text-[var(--l-faint)]">
              Free forever plan available · No credit card · Cancel anytime
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
