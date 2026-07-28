import { usePageTitle } from '../hooks/usePageTitle';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const sections = [
  { title: 'Information We Collect', content: 'We collect information you provide when creating an account, sending messages, uploading files, and using our AI features. This includes your name, email address, profile picture, and communication data.' },
  { title: 'How We Use Your Data', content: 'Your data is used solely to provide and improve our services. We do not sell your personal information. Messages are processed in real-time to deliver AI-powered features and are not stored permanently unless you choose to save them.' },
  { title: 'Data Encryption', content: 'All messages are encrypted end-to-end using industry-standard AES-256 encryption. This means only you and the intended recipients can read your messages. Even Nexa cannot decrypt your conversations.' },
  { title: 'Data Retention', content: 'We retain your data only as long as necessary to provide our services. You can delete your account and associated data at any time from your settings. Deleted data is permanently removed within 30 days.' },
  { title: 'Third-Party Services', content: 'Nexa integrates with select third-party services you explicitly connect. We do not share your data with third parties without your consent. Each integration requires your explicit authorization.' },
  { title: 'Your Rights', content: 'You have the right to access, correct, or delete your personal data at any time. You can export your data from settings. For any privacy concerns, contact our Data Protection team.' },
  { title: 'Cookie Policy', content: 'We use essential cookies for authentication and security. Optional analytics cookies help us improve the product. You can manage cookie preferences in your settings at any time.' },
  { title: 'Contact Us', content: 'For privacy-related inquiries, contact our Data Protection Officer at privacy@nexa.app. We respond to all requests within 48 hours.' },
];

export default function PrivacyPage() {
  usePageTitle('Privacy Policy — Nexa');
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Navbar />
      <div className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px]" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Privacy Policy</h1>
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
