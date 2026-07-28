import { motion } from 'framer-motion';
import { companies } from '../data/mockData';

const logoColors = ['#6366f1', '#8b5cf6', '#06b6d4', '#ec4899', '#f59e0b', '#10b981'];

export default function TrustedBy() {
  return (
    <section className="relative py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-zinc-500 mb-10 tracking-wider uppercase font-medium"
        >
          Trusted by developers, startups and creators worldwide
        </motion.p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
          {companies.map((company, i) => (
            <motion.div
              key={company.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.05, opacity: 0.7 }}
              className="flex items-center gap-2.5 select-none"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-[10px] font-bold"
                style={{ backgroundColor: logoColors[i % logoColors.length] + '20', color: logoColors[i % logoColors.length] }}
              >
                {company.symbol}
              </div>
              <span className="text-lg font-semibold text-zinc-600 tracking-tight">
                {company.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
