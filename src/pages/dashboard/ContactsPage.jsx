import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUsers, FiSearch, FiUserPlus, FiMail, FiMessageCircle, FiX } from 'react-icons/fi';
import DashboardSubLayout from '../../components/dashboard/DashboardSubLayout';
import { useDashboard } from '../../contexts/DashboardContext';
import { useToast } from '../../components/ui/Toast';
import { usePageTitle } from '../../hooks/usePageTitle';
import { api } from '../../api';

export default function ContactsPage() {
  usePageTitle('Contacts — Nexa');
  const navigate = useNavigate();
  const toast = useToast();
  const { contacts, loadContacts, createConversation } = useDashboard();
  const [search, setSearch] = useState('');
  const [adding, setAdding] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [addingBusy, setAddingBusy] = useState(false);
  const filtered = contacts.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));

  const addContact = async () => {
    if (!newEmail.trim()) { toast('Enter an email address', 'error'); return; }
    setAddingBusy(true);
    try {
      await api.contacts.add(newEmail.trim());
      await loadContacts();
      setNewEmail('');
      setAdding(false);
      toast('Contact added!', 'success');
    } catch (err) {
      toast(err.message, 'error');
    }
    setAddingBusy(false);
  };

  const startChat = async (contact) => {
    try {
      await createConversation({ name: contact.name, participantIds: [contact.id], isGroup: false });
      navigate('/dashboard');
    } catch {
      /* toast handled in context */
    }
  };

  return (
    <DashboardSubLayout
      title="Contacts"
      subtitle={`${contacts.length} contacts`}
      action={
        <motion.button
          onClick={() => setAdding(!adding)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-bg text-white text-sm font-medium shadow-lg hover:shadow-xl transition-all"
        >
          <FiUserPlus size={14} />
          Add Contact
        </motion.button>
      }
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {adding && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl p-4 flex items-center gap-2 max-w-md"
          >
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addContact()}
              placeholder="friend@example.com"
              className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-zinc-600"
            />
            <button
              onClick={addContact}
              disabled={addingBusy}
              className="px-4 py-2 rounded-xl gradient-bg text-white text-xs font-medium disabled:opacity-50"
            >
              {addingBusy ? 'Adding…' : 'Add'}
            </button>
            <button onClick={() => setAdding(false)} className="p-2 rounded-lg text-zinc-500 hover:text-white hover:bg-white/[0.06] transition-all" aria-label="Cancel">
              <FiX size={15} />
            </button>
          </motion.div>
        )}

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
                    <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-[#0a0a0f] bg-zinc-600" />
                  </div>
                  <h3 className="text-sm font-semibold text-white">{contact.name}</h3>
                  <p className="text-xs text-zinc-500 mt-0.5">{contact.role || 'Team Member'}</p>
                  <p className="text-[10px] text-zinc-600 mt-1">{contact.email}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <span className="text-[10px] capitalize text-zinc-600">offline</span>
                  </div>
                  <div className="flex gap-2 mt-4 w-full">
                    <button
                      onClick={() => startChat(contact)}
                      className="flex-1 py-2 rounded-xl glass text-xs text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-all flex items-center justify-center gap-1.5"
                    >
                      <FiMessageCircle size={12} /> Chat
                    </button>
                    <a
                      href={`mailto:${contact.email}`}
                      className="flex-1 py-2 rounded-xl glass text-xs text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-all flex items-center justify-center gap-1.5"
                    >
                      <FiMail size={12} /> Email
                    </a>
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
