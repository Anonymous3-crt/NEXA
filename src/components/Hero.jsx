import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiArrowRight, FiPlay, FiMessageCircle, FiUser, FiCpu, FiSend,
} from 'react-icons/fi';
import { BackgroundOrbs, FloatingIcons, GridPattern } from './BackgroundEffects';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const stats = [
  { value: '10K+', label: 'Active Users', icon: FiUsers },
  { value: '99.9%', label: 'Uptime', icon: FiShield },
  { value: '50+', label: 'Languages', icon: FiGlobe },
  { value: '4.9', label: 'Avg Rating', icon: FiStar },
];

const chatMessages = [
  { role: 'ai', text: 'Hey! How can I help you today?' },
  { role: 'user', text: 'Can you draft a product launch email?' },
  { role: 'ai', text: 'Absolutely! Here\'s a draft...' },
];

const contacts = [
  { name: 'Alice', online: true, color: '#6366f1' },
  { name: 'Bob', online: true, color: '#8b5cf6' },
  { name: 'Carol', online: false, color: '#06b6d4' },
  { name: 'Dave', online: true, color: '#ec4899' },
];

function RippleButton({ children, to, className = '' }) {
  const [ripples, setRipples] = useState([]);
  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples((prev) => [...prev, { x, y, id }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 600);
  };
  return (
    <Link
      to={to}
      onClick={handleClick}
      className={`relative overflow-hidden ${className}`}
    >
      {children}
      {ripples.map((r) => (
        <span
          key={r.id}
          className="absolute w-4 h-4 bg-white/30 rounded-full pointer-events-none"
          style={{
            left: r.x - 8,
            top: r.y - 8,
            animation: 'ripple 0.6s ease-out forwards',
          }}
        />
      ))}
    </Link>
  );
}

function FiUsers() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
function FiShield() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}
function FiGlobe() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}
function FiStar() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <BackgroundOrbs />
      <GridPattern />
      <FloatingIcons />

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0a0a0f] to-transparent pointer-events-none z-10" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm text-zinc-400 mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Now available in public beta
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight mb-6">
            <span className="text-white">Intelligent</span>
            <br />
            <span className="gradient-text">Conversations</span>
            <br />
            <span className="text-white">Redefined</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Experience the next generation of AI-powered chat. Context-aware, instant responses, enterprise-grade security — all wrapped in a beautifully designed interface.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <RippleButton
              to="/signup"
              className="group relative px-8 py-4 rounded-2xl gradient-bg text-white font-semibold text-base shadow-xl glow-indigo flex items-center gap-2 transition-all duration-300 hover:shadow-2xl hover:scale-105 active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-2">
                Start Chatting Free
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </span>
            </RippleButton>
            <motion.a
              href="#showcase"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="group relative overflow-hidden px-8 py-4 rounded-2xl glass text-zinc-300 font-semibold text-base hover:bg-white/[0.08] transition-all duration-300 flex items-center gap-2"
            >
              <FiPlay className="group-hover:scale-110 transition-transform" />
              See How It Works
            </motion.a>
          </motion.div>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6 items-start mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-3 glass-strong rounded-3xl p-4 glow-card"
          >
            <div className="bg-[#0a0a0f] rounded-2xl overflow-hidden border border-white/[0.05]">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.05]">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-xs text-zinc-600 ml-3 font-mono">nexa.app — chat</span>
              </div>
              <div className="flex h-[420px]">
                <div className="w-56 border-r border-white/[0.05] p-3 space-y-2 hidden sm:block">
                  <div className="text-xs text-zinc-600 font-medium px-2 pb-2 border-b border-white/[0.05]">Chats</div>
                  {contacts.map((c) => (
                    <div key={c.name} className="flex items-center gap-2.5 px-2 py-2 rounded-xl hover:bg-white/[0.04] transition-colors cursor-pointer">
                      <div className="relative w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0" style={{ background: c.color }}>
                        {c.name[0]}
                        <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-[#0a0a0f] ${c.online ? 'bg-emerald-400' : 'bg-zinc-600'}`} />
                      </div>
                      <span className="text-xs text-zinc-300">{c.name}</span>
                    </div>
                  ))}
                </div>
                <div className="flex-1 flex flex-col">
                  <div className="flex-1 p-4 space-y-3 overflow-hidden">
                    {chatMessages.map((msg, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 + i * 0.3, duration: 0.4 }}
                        className={`flex items-start gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                      >
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                          msg.role === 'ai' ? 'bg-gradient-to-br from-indigo-500 to-purple-600' : 'bg-zinc-800'
                        }`}>
                          {msg.role === 'ai' ? <FiCpu className="text-white text-xs" /> : <FiUser className="text-zinc-300 text-xs" />}
                        </div>
                        <div className={`max-w-[75%] px-3.5 py-2 rounded-2xl text-xs leading-relaxed ${
                          msg.role === 'ai' ? 'glass text-zinc-200' : 'gradient-bg text-white'
                        }`}>
                          {msg.text}
                        </div>
                      </motion.div>
                    ))}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2, duration: 0.5 }}
                      className="flex items-center gap-2 pt-2"
                    >
                      <div className="flex-1 h-9 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center px-3">
                        <span className="text-xs text-zinc-600">Type your message...</span>
                      </div>
                      <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center">
                        <FiSend className="text-white text-xs" />
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-2 space-y-4">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="glass rounded-2xl p-5 glow-card"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center">
                  <FiCpu className="text-white" />
                </div>
                <div>
                  <div className="text-sm font-medium text-white">AI Assistant</div>
                  <div className="text-xs text-zinc-500">Always active</div>
                </div>
                <span className="ml-auto w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <div className="space-y-2">
                {['Draft a response', 'Summarize thread', 'Translate message'].map((s) => (
                  <div key={s} className="text-xs text-zinc-500 px-3 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] transition-colors cursor-pointer">
                    {s}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="glass rounded-2xl p-5 glow-card"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-white">Recent Files</span>
                <span className="text-xs text-zinc-500">3 new</span>
              </div>
              <div className="space-y-2">
                {[
                  { name: 'design_system.pdf', size: '2.4 MB' },
                  { name: 'meeting_notes.md', size: '12 KB' },
                  { name: 'brand_guidelines.png', size: '4.1 MB' },
                ].map((f) => (
                  <div key={f.name} className="flex items-center gap-2 text-xs text-zinc-400 px-3 py-2 rounded-xl bg-white/[0.03]">
                    <span className="text-indigo-400">📄</span>
                    <span className="flex-1 truncate">{f.name}</span>
                    <span className="text-zinc-600">{f.size}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="glass rounded-2xl p-5 glow-card border-l-2 border-l-emerald-500/30"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                  <FiShield className="text-emerald-400" />
                </div>
                <div>
                  <div className="text-sm font-medium text-white">End-to-end encrypted</div>
                  <div className="text-xs text-emerald-400/80">Messages are private</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                whileHover={{ y: -4, scale: 1.02 }}
                className="glass rounded-2xl p-5 text-center transition-all duration-300 hover:bg-white/[0.06] glow-card cursor-default"
              >
                <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <Icon className="text-white" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold gradient-text mb-1">{stat.value}</div>
                <div className="text-sm text-zinc-500">{stat.label}</div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
