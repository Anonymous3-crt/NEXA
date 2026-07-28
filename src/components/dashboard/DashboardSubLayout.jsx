import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiMessageCircle, FiUser, FiSettings, FiBell, FiArchive,
  FiStar, FiImage, FiPhone, FiUsers, FiHelpCircle, FiMenu, FiX,
} from 'react-icons/fi';
import { useDashboard } from '../../contexts/DashboardContext';

const navItems = [
  { icon: FiMessageCircle, label: 'Messages', path: '/dashboard' },
  { icon: FiUser, label: 'Profile', path: '/dashboard/profile' },
  { icon: FiSettings, label: 'Settings', path: '/dashboard/settings' },
  { icon: FiBell, label: 'Notifications', path: '/dashboard/notifications' },
  { icon: FiArchive, label: 'Archived', path: '/dashboard/archived' },
  { icon: FiStar, label: 'Starred', path: '/dashboard/starred' },
  { icon: FiImage, label: 'Media', path: '/dashboard/media' },
  { icon: FiPhone, label: 'Calls', path: '/dashboard/calls' },
  { icon: FiUsers, label: 'Contacts', path: '/dashboard/contacts' },
  { icon: FiHelpCircle, label: 'Help', path: '/dashboard/help' },
];

export default function DashboardSubLayout({ children, title, subtitle, action }) {
  const { pathname } = useLocation();
  const { currentUser, setProfileOpen } = useDashboard();
  const [mobileNav, setMobileNav] = useState(false);

  return (
    <div className="h-screen flex bg-[#0a0a0f] overflow-hidden">
      <motion.aside
        initial={false}
        animate={{ width: mobileNav ? 280 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="lg:w-64 lg:min-w-[16rem] h-full border-r border-white/[0.05] bg-[#0a0a0f] overflow-hidden shrink-0 fixed lg:relative z-40"
      >
        <div className="w-64 h-full flex flex-col">
          <div className="flex items-center justify-between px-4 py-4 border-b border-white/[0.05]">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center shadow-lg">
                <FiMessageCircle className="text-white text-sm" />
              </div>
              <span className="text-lg font-bold text-white">Nexa</span>
            </Link>
            <button onClick={() => setMobileNav(false)} className="lg:hidden p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-white/[0.05] transition-all">
              <FiX size={18} />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto p-3 space-y-0.5 no-scrollbar">
            {navItems.map((item) => {
              const isActive = pathname === item.path || (item.path !== '/dashboard' && pathname.startsWith(item.path));
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileNav(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                    isActive
                      ? 'bg-indigo-500/10 text-indigo-400 font-medium border border-indigo-500/20'
                      : 'text-zinc-400 hover:text-white hover:bg-white/[0.05] border border-transparent'
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                  {item.path === '/dashboard/notifications' && (
                    <span className="ml-auto w-5 h-5 rounded-full gradient-bg flex items-center justify-center text-[9px] text-white font-bold">3</span>
                  )}
                </Link>
              );
            })}
          </nav>
          <div className="p-3 border-t border-white/[0.05]">
            <button
              onClick={() => setProfileOpen(true)}
              className="flex items-center gap-3 w-full px-3.5 py-2.5 rounded-xl hover:bg-white/[0.05] transition-all"
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{ background: currentUser.color }}>
                {currentUser.initials}
              </div>
              <div className="flex-1 text-left min-w-0">
                <div className="text-sm text-white truncate">{currentUser.name}</div>
                <div className="text-[10px] text-emerald-400">Online</div>
              </div>
            </button>
          </div>
        </div>
      </motion.aside>

      {mobileNav && (
        <div className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden" onClick={() => setMobileNav(false)} />
      )}

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <div className="sticky top-0 z-20 flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/[0.05] bg-[#0a0a0f]/80 backdrop-blur-lg">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileNav(true)} className="lg:hidden p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.05] transition-all">
              <FiMenu size={20} />
            </button>
            <div>
              <h1 className="text-base font-semibold text-white">{title}</h1>
              {subtitle && <p className="text-xs text-zinc-500">{subtitle}</p>}
            </div>
          </div>
          {action}
        </div>
        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
