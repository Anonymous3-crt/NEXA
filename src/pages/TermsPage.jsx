import { usePageTitle } from '../hooks/usePageTitle';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const sections = [
  { title: 'Acceptance of Terms', content: 'By accessing or using Nexa, you agree to be bound by these Terms of Service. If you do not agree with any part, you may not use our services. Continued use constitutes acceptance of any updates.' },
  { title: 'Account Registration', content: 'You must provide accurate information when creating an account. You are responsible for maintaining the confidentiality of your credentials and for all activities under your account. Notify us immediately of unauthorized use.' },
  { title: 'Acceptable Use', content: 'You agree not to use Nexa for any unlawful purpose, to harass others, distribute malware, or infringe on intellectual property rights. We reserve the right to suspend accounts violating these terms.' },
  { title: 'AI Services', content: 'Nexa AI features are provided as-is with continuous improvement. While we strive for accuracy, AI-generated content should be reviewed before use. We are not liable for decisions made based on AI suggestions.' },
  { title: 'Content Ownership', content: 'You retain full ownership of your content. Nexa does not claim any rights to your messages, files, or data. You grant us a limited license to process your content solely for providing our services.' },
  { title: 'Service Level', content: 'We aim for 99.9% uptime but do not guarantee uninterrupted service. Maintenance and updates may cause temporary downtime. We will notify you in advance whenever possible.' },
  { title: 'Limitation of Liability', content: 'Nexa shall not be liable for indirect, incidental, or consequential damages. Our total liability is limited to the amount paid by you in the 12 months preceding a claim.' },
  { title: 'Termination', content: 'You may terminate your account at any time. We may suspend or terminate accounts for violations of these terms. Upon termination, your data will be deleted per our privacy policy.' },
];

export default function TermsPage() {
  usePageTitle('Terms of Service — Nexa');
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Navbar />
      <div className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px]" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Terms of Service</h1>
            <p className="text-zinc-400">Last updated: January 2025</p>
          </motion.div>
          <div className="space-y-8">
            {sections.map((section, i) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -3, scale: 1.01 }}
                className="glass rounded-2xl p-6 transition-all duration-300 glow-card"
              >
                <h2 className="text-lg font-semibold text-white mb-3">{section.title}</h2>
                <p className="text-sm text-zinc-400 leading-relaxed">{section.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
