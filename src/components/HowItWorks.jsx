import { motion } from 'framer-motion';
import { FiUserPlus, FiUsers, FiMessageCircle } from 'react-icons/fi';
import { howItWorks } from '../data/mockData';

const stepIcons = [FiUserPlus, FiUsers, FiMessageCircle];

export default function HowItWorks() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px]" />
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
            How It Works
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
            Get started in <span className="gradient-text">3 simple steps</span>
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            From zero to chatting in minutes. No complicated setup required.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute top-16 left-1/3 right-1/3 h-[2px] bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-cyan-500/20 hidden lg:block" />

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {howItWorks.map((step, i) => {
              const Icon = stepIcons[i];
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="relative text-center"
                >
                  <div className="relative mb-6 inline-block">
                    <div className="w-20 h-20 rounded-2xl gradient-bg flex items-center justify-center mx-auto shadow-xl relative z-10">
                      <Icon className="text-white text-2xl" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white text-indigo-600 text-xs font-bold flex items-center justify-center shadow-lg z-20">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed max-w-xs mx-auto">{step.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
