import { motion } from 'framer-motion';
import { integrations } from '../data/mockData';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function Integrations() {
  return (
    <section id="integrations" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px]" />
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
            Integrations
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
            Works with your <span className="gradient-text">favorite tools</span>
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Seamlessly connects with the tools you already use. No complex setup required.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {integrations.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.name}
                variants={cardVariants}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group glass rounded-2xl p-6 sm:p-8 cursor-default transition-all duration-300 hover:bg-white/[0.06] hover:border-white/[0.15]"
              >
                <div className="w-12 h-12 rounded-xl glass flex items-center justify-center mb-5 shadow-lg group-hover:bg-white/[0.08] transition-colors">
                  <Icon className="text-indigo-400 text-xl" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.name}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
