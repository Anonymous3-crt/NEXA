import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FiMessageCircle, FiUser, FiSend, FiCpu, FiPaperclip, FiPhone, FiVideo,
  FiCalendar, FiFile, FiImage, FiMoreHorizontal, FiSearch, FiBell,
} from 'react-icons/fi';

const messages = [
  { role: 'ai', text: "Hello! I'm Nexa. How can I help you today?" },
  { role: 'user', text: 'Can you help me draft an email to my team about our new product launch?' },
  { role: 'ai', text: "Absolutely! I'll help you craft a compelling launch announcement." },
  { role: 'user', text: "It's called NexusFlow, launching on August 15th" },
  { role: 'ai', text: "Great name! Here's a draft for your team announcement..." },
];

const contacts = [
  { name: 'Alice Chen', active: true, avatar: 'AC', color: '#6366f1', status: 'online' },
  { name: 'Bob Smith', active: false, avatar: 'BS', color: '#8b5cf6', status: 'online' },
  { name: 'Carol Davis', active: false, avatar: 'CD', color: '#06b6d4', status: 'away' },
  { name: 'Dave Park', active: false, avatar: 'DP', color: '#ec4899', status: 'online' },
  { name: 'Eve Wilson', active: false, avatar: 'EW', color: '#f59e0b', status: 'offline' },
];

const files = [
  { name: 'design_system_v3.fig', type: 'figma', size: '12 MB', icon: '🎨' },
  { name: 'Q4_roadmap.pdf', type: 'pdf', size: '2.4 MB', icon: '📄' },
  { name: 'sprint_demo.mp4', type: 'video', size: '45 MB', icon: '🎬' },
];

export default function ProductShowcase() {
  const [activeMsg, setActiveMsg] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveMsg((prev) => (prev + 1) % messages.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="showcase" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 sm:mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass text-sm text-zinc-400 mb-4">
            Product Showcase
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
            See Nexa in <span className="gradient-text">Action</span>
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            A complete overview of the most intuitive chat experience ever built.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-5">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 glass-strong rounded-3xl p-4 glow-card"
          >
            <div className="bg-[#0a0a0f] rounded-2xl overflow-hidden border border-white/[0.05]">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.05]">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-xs text-zinc-600 ml-3 font-mono">nexa.app — dashboard</span>
              </div>
              <div className="flex h-[450px]">
                <div className="w-52 border-r border-white/[0.05] flex flex-col hidden sm:flex">
                  <div className="p-3 border-b border-white/[0.05]">
                    <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-white/[0.04] text-zinc-400 text-xs">
                      <FiSearch size={12} />
                      <span>Search chats...</span>
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
                    <div className="px-3 py-1.5 text-[10px] text-zinc-600 font-medium uppercase tracking-wider">Recent</div>
                    {contacts.map((c, i) => (
                      <div
                        key={c.name}
                        className={`flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                          i === 0 ? 'bg-white/[0.06]' : 'hover:bg-white/[0.03]'
                        }`}
                      >
                        <div className="relative w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0" style={{ background: c.color }}>
                          {c.avatar}
                          <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-[#0a0a0f] ${
                            c.status === 'online' ? 'bg-emerald-400' : c.status === 'away' ? 'bg-amber-400' : 'bg-zinc-600'
                          }`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs text-zinc-300 truncate">{c.name}</div>
                          <div className="text-[10px] text-zinc-600">Hey! How are you?</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex-1 flex flex-col">
                  <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.05]">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-[10px] font-bold">
                        AC
                      </div>
                      <div>
                        <div className="text-xs font-medium text-white">Alice Chen</div>
                        <div className="text-[10px] text-emerald-400">Online</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {[FiPhone, FiVideo, FiMoreHorizontal].map((Icon, i) => (
                        <button key={i} className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/[0.06] transition-all">
                          <Icon size={14} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex-1 p-4 space-y-3 overflow-y-auto">
                    {messages.slice(0, activeMsg + 1).map((msg, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className={`flex items-start gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                      >
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                          msg.role === 'ai' ? 'bg-gradient-to-br from-indigo-500 to-purple-600' : 'bg-zinc-800'
                        }`}>
                          {msg.role === 'ai' ? <FiCpu className="text-white text-xs" /> : <FiUser className="text-zinc-300 text-xs" />}
                        </div>
                        <div className={`max-w-[80%] px-3.5 py-2 rounded-2xl text-xs leading-relaxed ${
                          msg.role === 'ai' ? 'glass text-zinc-200' : 'gradient-bg text-white'
                        }`}>
                          {msg.text}
                        </div>
                      </motion.div>
                    ))}
                    <div className="flex items-center gap-2 pt-2">
                      <button className="p-2 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.05] transition-all">
                        <FiPaperclip size={14} />
                      </button>
                      <div className="flex-1 h-9 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center px-3">
                        <span className="text-xs text-zinc-600">Type your message...</span>
                      </div>
                      <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center">
                        <FiSend className="text-white text-xs" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass rounded-2xl p-5 glow-card"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center">
                    <FiCpu className="text-white text-sm" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">Nexa AI</div>
                    <div className="text-[10px] text-emerald-400">Active</div>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="px-3 py-1.5 rounded-lg gradient-bg text-white text-[10px] font-medium"
                >
                  Customize
                </motion.button>
              </div>
              <div className="space-y-1.5">
                {[ 
                  { label: 'Professional', desc: 'Formal tone' },
                  { label: 'Creative', desc: 'Playful style' },
                  { label: 'Concise', desc: 'Brief replies' },
                ].map((p) => (
                  <div key={p.label} className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] cursor-pointer transition-colors">
                    <div>
                      <div className="text-xs text-zinc-300">{p.label}</div>
                      <div className="text-[10px] text-zinc-600">{p.desc}</div>
                    </div>
                    <div className="w-4 h-4 rounded-full border-2 border-zinc-600" />
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="glass rounded-2xl p-5 glow-card"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <FiFile className="text-indigo-400 text-sm" />
                  <span className="text-sm font-medium text-white">Shared Files</span>
                </div>
                <span className="text-[10px] text-zinc-500">12 files</span>
              </div>
              <div className="space-y-2">
                {files.map((f) => (
                  <div key={f.name} className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] transition-colors cursor-pointer">
                    <span className="text-sm">{f.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-zinc-300 truncate">{f.name}</div>
                      <div className="text-[10px] text-zinc-600">{f.size}</div>
                    </div>
                    <button className="text-zinc-600 hover:text-zinc-400 transition-colors">
                      <FiPaperclip size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="glass rounded-2xl p-5 glow-card"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                  <FiBell className="text-emerald-400 text-sm" />
                </div>
                <div>
                  <div className="text-sm font-medium text-white">Team Activity</div>
                  <div className="text-xs text-zinc-500">5 unread notifications</div>
                </div>
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="ml-auto w-2 h-2 rounded-full bg-emerald-400"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="flex items-center gap-3"
            >
              <div className="flex-1 glass rounded-2xl p-4 glow-card flex items-center gap-3">
                <FiCalendar className="text-indigo-400 text-sm" />
                <div>
                  <div className="text-xs text-white">Team standup</div>
                  <div className="text-[10px] text-zinc-500">10:00 AM today</div>
                </div>
              </div>
              <div className="flex-1 glass rounded-2xl p-4 glow-card flex items-center gap-3">
                <FiVideo className="text-purple-400 text-sm" />
                <div>
                  <div className="text-xs text-white">Design review</div>
                  <div className="text-[10px] text-zinc-500">2:00 PM today</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
