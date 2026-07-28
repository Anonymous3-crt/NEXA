import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiHelpCircle, FiSearch, FiChevronRight, FiExternalLink } from 'react-icons/fi';
import DashboardSubLayout from '../../components/dashboard/DashboardSubLayout';
import { api } from '../../api';
import { usePageTitle } from '../../hooks/usePageTitle';

export default function HelpPage() {
  usePageTitle('Help Center — Nexa');
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    api.help.list().then(d => {
      setArticles(d.articles || []);
      setCategories(d.categories || []);
    }).catch(() => {});
  }, []);

  const filtered = articles.filter(
    (a) =>
      a.title.toLowerCase().includes(search.toLowerCase()) &&
      (!activeCategory || a.category === activeCategory)
  );

  return (
    <DashboardSubLayout title="Help Center" subtitle="Find answers and support">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-2 px-4 py-3 rounded-2xl glass max-w-lg">
          <FiSearch className="text-zinc-500 text-sm shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search help articles..."
            className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-zinc-600"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <motion.button
            onClick={() => setActiveCategory(null)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`px-4 py-1.5 rounded-xl text-xs font-medium transition-all ${!activeCategory ? 'bg-indigo-500/20 text-indigo-400' : 'glass text-zinc-400 hover:text-white'}`}
          >
            All
          </motion.button>
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`px-4 py-1.5 rounded-xl text-xs font-medium transition-all ${activeCategory === cat ? 'bg-indigo-500/20 text-indigo-400' : 'glass text-zinc-400 hover:text-white'}`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-60 text-center">
            <FiHelpCircle className="text-zinc-500 text-2xl mb-3" />
            <p className="text-sm text-zinc-500">No articles found</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {filtered.map((article, i) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                whileHover={{ y: -4 }}
                className="glass rounded-2xl p-5 transition-all duration-300 glow-card cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <span className="text-xl shrink-0">{article.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs text-indigo-400 font-medium">{article.category}</span>
                      <span className="text-[10px] text-zinc-600">{article.read_time}</span>
                    </div>
                    <h3 className="text-sm font-semibold text-white mt-1">{article.title}</h3>
                    <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{article.description}</p>
                    <div className="flex items-center gap-1 mt-3 text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
                      Read article <FiChevronRight size={12} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="glass rounded-2xl p-6 text-center">
          <p className="text-sm text-zinc-400">Can&apos;t find what you&apos;re looking for?</p>
          <button className="mt-3 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-bg text-white text-sm font-medium shadow-lg hover:shadow-xl transition-all">
            Contact Support <FiExternalLink size={14} />
          </button>
        </div>
      </div>
    </DashboardSubLayout>
  );
}
