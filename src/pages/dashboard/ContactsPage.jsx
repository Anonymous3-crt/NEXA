import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiSearch, FiUserPlus, FiMail, FiMessageCircle } from 'react-icons/fi';
import DashboardSubLayout from '../../components/dashboard/DashboardSubLayout';
import { contacts } from '../../data/mockData';

export default function ContactsPage() {
  const [search, setSearch] = useState('');
  const filtered = contacts.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <DashboardSubLayout
      title="Contacts"
      subtitle={`${contacts.length} contacts`}
      action={
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-bg text-white text-sm font-medium shadow-lg hover:shadow-xl transition-all">
          <FiUserPlus size={14} />
          Add Contact
        </button>
      }
    >
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-2 px-4 py-3 rounded-2xl glass max-w-md">
          <FiSearch className="text-zinc-500 text-sm shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search contacts..."
            className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-zinc-600"
          />
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-60 text-center">
            <FiUsers className="text-zinc-500 text-2xl mb-3" />
            <p className="text-sm text-zinc-500">No contacts found</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((contact, i) => (
              <motion.div
                key={contact.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="glass rounded-2xl p-5 transition-all duration-300 glow-card"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-3">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-lg" style={{ background: contact.color }}>
                      {contact.initials}
                    </div>
                    <span className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-[#0a0a0f] ${
                      contact.status === 'online' ? 'bg-emerald-400' : contact.status === 'away' ? 'bg-amber-400' : 'bg-zinc-600'
                    }`} />
                  </div>
                  <h3 className="text-sm font-semibold text-white">{contact.name}</h3>
                  <p className="text-xs text-zinc-500 mt-0.5">{contact.role}</p>
                  <p className="text-[10px] text-zinc-600 mt-1">{contact.email}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <span className={`text-[10px] capitalize ${
                      contact.status === 'online' ? 'text-emerald-400' : contact.status === 'away' ? 'text-amber-400' : 'text-zinc-600'
                    }`}>
                      {contact.status}
                    </span>
                    <span className="text-[10px] text-zinc-700">·</span>
                    <span className="text-[10px] text-zinc-600">{contact.mutual} mutual</span>
                  </div>
                  <div className="flex gap-2 mt-4 w-full">
                    <button className="flex-1 py-2 rounded-xl glass text-xs text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-all flex items-center justify-center gap-1.5">
                      <FiMessageCircle size={12} /> Chat
                    </button>
                    <button className="flex-1 py-2 rounded-xl glass text-xs text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-all flex items-center justify-center gap-1.5">
                      <FiMail size={12} /> Email
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </DashboardSubLayout>
  );
}
