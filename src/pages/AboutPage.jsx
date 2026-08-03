import { usePageTitle } from '../hooks/usePageTitle';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHeart, FiZap, FiShield, FiGlobe, FiArrowRight } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const values = [
  { icon: FiHeart, title: 'Built with Love', desc: 'Every pixel is crafted with care for the best user experience.' },
  { icon: FiZap, title: 'Lightning Fast', desc: 'Optimized for speed with sub-second response times.' },
  { icon: FiShield, title: 'Privacy First', desc: 'Your data belongs to you. End-to-end encryption by default.' },
  { icon: FiGlobe, title: 'Global by Design', desc: 'Supporting 50+ languages with cultural awareness built in.' },
];

export default function AboutPage() {
  usePageTitle('About — Nexa');
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Navbar />
      <div className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px]" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm text-zinc-400 mb-6">
            <FiHeart className="text-indigo-400" />
            About Nexa
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Our mission is to redefine <span className="gradient-text">communication</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Nexa was founded in 2024 with a simple belief: that AI-powered communication should feel natural, secure, and delightful. We are building the future of how teams connect.
          </motion.p>
        </div>
      </div>

      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/[0.05]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Our Values</h2>
            <p className="text-zinc-400">The principles that guide everything we build.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="glass rounded-2xl p-6 text-center transition-all duration-300 glow-card"
                >
                  <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mx-auto mb-4">
                    <Icon className="text-white text-lg" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{v.title}</h3>
                  <p className="text-sm text-zinc-400">{v.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/[0.05]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-white mb-4">Ready to get started?</h2>
            <p className="text-zinc-400 mb-8">Join thousands of teams already using Nexa.</p>
            <Link to="/login" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl gradient-bg text-white font-semibold shadow-xl glow-indigo hover:scale-105 transition-all">
              Get Started Free <FiArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
