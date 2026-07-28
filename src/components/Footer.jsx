import { motion } from 'framer-motion';
import {
  FiMessageCircle, FiGithub, FiTwitter, FiLinkedin, FiHeart, FiArrowUp,
} from 'react-icons/fi';

const footerLinks = {
  Product: ['Features', 'Pricing', 'Integrations', 'Changelog', 'API Status'],
  Company: ['About', 'Blog', 'Careers', 'Press Kit', 'Brand'],
  Resources: ['Documentation', 'API Reference', 'Community', 'Support', 'Status'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Security', 'Cookies', 'GDPR'],
};

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/[0.05] bg-[#0a0a0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <a href="#" className="flex items-center gap-2.5 mb-4 group">
              <motion.div
                whileHover={{ scale: 1.05, rotate: -5 }}
                className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center shadow-lg"
              >
                <FiMessageCircle className="text-white text-lg" />
              </motion.div>
              <span className="text-xl font-bold text-white tracking-tight">Nexa</span>
            </a>
            <p className="text-sm text-zinc-500 leading-relaxed mb-6 max-w-xs">
              Premium AI-powered chat platform for modern teams. Built with love for the future of communication.
            </p>
            <div className="flex gap-3">
              {[
                { icon: FiGithub, href: '#' },
                { icon: FiTwitter, href: '#' },
                { icon: FiLinkedin, href: '#' },
              ].map(({ icon: Icon, href }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-xl glass flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/[0.1] transition-all"
                  aria-label="Social link"
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-white mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/[0.05] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-zinc-600 flex items-center gap-1.5">
            <FiHeart className="text-indigo-400" size={14} />
            {new Date().getFullYear()} Nexa. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-zinc-600 hover:text-zinc-400 transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-zinc-600 hover:text-zinc-400 transition-colors">Terms of Service</a>
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-9 h-9 rounded-xl glass flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/[0.1] transition-all"
              aria-label="Scroll to top"
            >
              <FiArrowUp size={16} />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
