import { FiSearch, FiX } from 'react-icons/fi';
import { useDashboard } from '../../contexts/DashboardContext';

export default function SearchBar() {
  const { searchQuery, setSearchQuery } = useDashboard();

  return (
    <div className="px-4 py-2">
      <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] transition-all duration-300 focus-within:border-indigo-500/30 focus-within:bg-white/[0.06]">
        <FiSearch className="text-zinc-500 text-sm shrink-0" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search conversations..."
          className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-zinc-600"
        />
        {searchQuery && (
          <button onClick={() => setSearchQuery('')} className="p-0.5 text-zinc-500 hover:text-zinc-300 transition-colors">
            <FiX size={14} />
          </button>
        )}
      </div>
    </div>
  );
}
