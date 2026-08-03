import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import Reveal from './ui/Reveal';
import { faqData } from '../data/mockData';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="relative py-24 sm:py-32 scroll-mt-24" aria-labelledby="faq-heading">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <p className="eyebrow mb-5">FAQ</p>
          <h2 id="faq-heading" className="font-display text-4xl sm:text-5xl font-medium tracking-tight text-[var(--l-text)] leading-[1.08]">
            Questions, <span className="text-gradient italic">answered</span>
          </h2>
          <p className="mt-6 text-base sm:text-lg text-[var(--l-muted)]">
            Everything you need to know before getting started.
          </p>
        </Reveal>

        <div className="mt-12 space-y-3">
          {faqData.map((faq, i) => {
            const open = openIndex === i;
            return (
              <Reveal key={faq.q} delay={i * 60}>
                <div
                  className={`rounded-2xl border transition-colors duration-300 ${
                    open
                      ? 'border-[var(--l-border-strong)] bg-[var(--l-surface)] shadow-[var(--l-shadow)]'
                      : 'border-[var(--l-border)] bg-[var(--l-surface)] hover:border-[var(--l-border-strong)]'
                  }`}
                >
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpenIndex(open ? null : i)}
                      aria-expanded={open}
                      aria-controls={`faq-answer-${i}`}
                      id={`faq-question-${i}`}
                      className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                    >
                      <span className="text-[15px] sm:text-base font-medium text-[var(--l-text)] leading-snug">
                        {faq.q}
                      </span>
                      <span
                        className={`shrink-0 w-8 h-8 rounded-full grid place-items-center border transition-all duration-300 ${
                          open
                            ? 'bg-[var(--l-lavender)] border-[var(--l-border-strong)] text-[var(--l-accent)] rotate-45'
                            : 'border-[var(--l-border)] text-[var(--l-faint)]'
                        }`}
                        aria-hidden="true"
                      >
                        <FiPlus size={14} />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`faq-answer-${i}`}
                    role="region"
                    aria-labelledby={`faq-question-${i}`}
                    className={`faq-panel ${open ? 'open' : ''}`}
                  >
                    <div>
                      <p className="px-6 pb-5 text-sm text-[var(--l-muted)] leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={100} className="mt-10 text-center">
          <p className="text-sm text-[var(--l-faint)]">
            Still have questions?{' '}
            <a href="/about" className="text-[var(--l-accent)] hover:text-[var(--l-text)] transition-colors font-medium">
              Chat with our team
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
