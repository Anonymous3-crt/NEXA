import ScrollReveal from './ScrollReveal';

export default function SectionHeader({ label, title, highlight, subtitle, className = '', delay = 0 }) {
  return (
    <ScrollReveal delay={delay} className={`text-center mb-16 sm:mb-20 ${className}`}>
      {label && (
        <span className="inline-block px-4 py-1.5 rounded-full glass text-sm text-zinc-400 mb-4">
          {label}
        </span>
      )}
      <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
        {title}{highlight && <span className="gradient-text"> {highlight}</span>}
      </h2>
      {subtitle && (
        <p className="text-lg text-zinc-400 max-w-2xl mx-auto">{subtitle}</p>
      )}
    </ScrollReveal>
  );
}
