import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCheck, FiZap } from 'react-icons/fi';
import { plans } from '../data/mockData';

export default function CTA() {
  return (
    <section id="pricing" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-indigo-500/10 rounded-full blur-[150px]" />
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full glass text-sm text-zinc-400 mb-4">
            <FiZap className="text-indigo-400" />
            Pricing
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
            Simple, Transparent <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Start free, upgrade when you need more. No hidden fees, no surprises.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className={`relative rounded-3xl p-8 transition-all duration-500 glow-card ${
                plan.featured
                  ? 'gradient-bg text-white shadow-2xl'
                  : 'glass hover:bg-white/[0.06]'
              }`}
            >
              {plan.featured && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-white text-indigo-600 text-xs font-bold shadow-lg"
                >
                  Most Popular
                </motion.div>
              )}
              <h3 className={`text-lg font-semibold mb-1 ${plan.featured ? 'text-white/90' : 'text-white'}`}>
                {plan.name}
              </h3>
              <div className="mb-6">
                <span className={`text-4xl font-bold ${plan.featured ? 'text-white' : 'text-white'}`}>
                  {plan.price}
                </span>
                <span className={`text-sm ml-1 ${plan.featured ? 'text-white/70' : 'text-zinc-500'}`}>
                  {plan.period}
                </span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <FiCheck className={`mt-0.5 shrink-0 ${plan.featured ? 'text-white' : 'text-emerald-400'}`} />
                    <span className={plan.featured ? 'text-white/80' : 'text-zinc-400'}>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/signup"
                className={`block w-full py-3.5 rounded-2xl text-sm font-semibold text-center transition-all duration-300 ${
                  plan.featured
                    ? 'bg-white text-indigo-600 hover:bg-white/90 hover:shadow-xl'
                    : 'glass text-white hover:bg-white/[0.1]'
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to="/login"
            className="group inline-flex items-center gap-2 text-zinc-400 hover:text-white text-sm transition-colors font-medium"
          >
            Compare all features
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
