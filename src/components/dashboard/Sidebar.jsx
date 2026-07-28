import { motion } from 'framer-motion';
import { FiSearch, FiMessageCircle } from 'react-icons/fi';
import { useDashboard } from '../../contexts/DashboardContext';
import ChatList from './ChatList';
import SearchBar from './SearchBar';

export default function Sidebar() {
  const { sidebarOpen } = useDashboard();

  return (
    <motion.aside
      initial={false}
      animate={{ width: sidebarOpen ? 320 : 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="relative h-full border-r border-white/[0.05] bg-[#0a0a0f] overflow-hidden shrink-0"
    >
      <div className="w-[320px] h-full flex flex-col">
        <div className="flex items-center gap-3 px-5 pt-5 pb-3">
          <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center shadow-lg shrink-0">
            <FiMessageCircle className="text-white text-sm" />
          </div>
          <span className="text-lg font-bold text-white tracking-tight">Nexa</span>
        </div>
        <SearchBar />
        <ChatList />
      </div>
    </motion.aside>
  );
}
