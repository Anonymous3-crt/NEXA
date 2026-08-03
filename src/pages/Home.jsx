import { usePageTitle } from '../hooks/usePageTitle';
import { useTheme } from '../hooks/useTheme';
import BackgroundEffects from '../components/BackgroundEffects';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import TrustedBy from '../components/TrustedBy';
import Stats from '../components/Stats';
import Features from '../components/Features';
import ProductShowcase from '../components/ProductShowcase';
import HowItWorks from '../components/HowItWorks';
import UseCases from '../components/UseCases';
import Comparison from '../components/Comparison';
import Testimonials from '../components/Testimonials';
import Pricing from '../components/Pricing';
import FAQ from '../components/FAQ';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

export default function Home() {
  usePageTitle('Nexa — Premium AI Chat');

  const { theme, toggle } = useTheme();

  return (
    <main data-landing-theme={theme} className="relative min-h-screen bg-[var(--l-bg)] text-[var(--l-text)] transition-colors duration-300 overflow-x-clip">
      <BackgroundEffects />
      <Navbar theme={theme} onToggleTheme={toggle} />
      <Hero />
      <TrustedBy />
      <Stats />
      <Features />
      <ProductShowcase />
      <HowItWorks />
      <UseCases />
      <Comparison />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
