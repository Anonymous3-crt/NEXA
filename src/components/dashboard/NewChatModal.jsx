import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiUsers, FiCheck } from 'react-icons/fi';
import { useDashboard } from '../../contexts/DashboardContext';
import { getInitials } from '../../utils/format';

export default function NewChatModal() {
  const { newChatOpen, setNewChatOpen, contacts, createConversation } = useDashboard();
  const [name, setName] = useState('');
  const [selected, setSelected] = useState([]);
  const [creating, setCreating] = useState(false);

  const close = () => {
    setName('');
    setSelected([]);
    setCreating(false);
    setNewChatOpen(false);
  };

  const toggle = (id) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const isGroup = selected.length > 1;

  const handleCreate = async () => {
    if (selected.length === 0 || creating) return;
    setCreating(true);
    const chosen = contacts.filter((c) => selected.includes(c.id));
    const finalName = name.trim() || chosen.map((c) => c.name).join(', ');
    try {
      await createConversation({ name: finalName, participantIds: selected, isGroup });
      close();
    } catch {
      /* toast handled in context */
    }
    setCreating(false);
  };

  return (
    <AnimatePresence>
      {newChatOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={close} />
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            className="relative w-full max-w-md rounded-2xl border border-white/[0.08] bg-[#0d0d15]/95 backdrop-blur-2xl shadow-2xl shadow-black/50 overflow-hidden"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
              <div>
                <h3 className="text-sm font-semibold text-white">New chat</h3>
                <p className="text-xs text-zinc-500 mt-0.5">Choose who to start a conversation with</p>
              </div>
              <button
                onClick={close}
                className="p-2 rounded-lg text-zinc-500 hover:text-white hover:bg-white/[0.06] transition-all"
                aria-label="Close"
              >
                <FiX size={16} />
              </button>
            </div>

            <div className="px-5 py-4 space-y-4">
              {isGroup && (
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-zinc-600">Group name</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={`${selected.length} participants`}
                    className="mt-1.5 w-full bg-white/[0.04] border border-white/[0.06] rounded-xl px-4 py-2.5 text-sm text-white outline-none transition-all duration-300 focus:border-indigo-500/30 focus:bg-white/[0.06] placeholder:text-zinc-600"
                  />
                </div>
              )}

              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <FiUsers size={13} />
                <span>{isGroup ? 'Group chat' : 'Direct message'}</span>
              </div>

              {contacts.length === 0 ? (
                <p className="text-sm text-zinc-500 py-8 text-center">
                  No contacts yet. They&apos;ll appear here once you add them.
                </p>
              ) : (
                <div className="max-h-[40vh] overflow-y-auto space-y-1 no-scrollbar">
                  {contacts.map((c) => {
                    const isSelected = selected.includes(c.id);
                    return (
                      <button
                        key={c.id}
                        onClick={() => toggle(c.id)}
                        className={`flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-150 ${
                          isSelected ? 'bg-indigo-500/10 border border-indigo-500/25' : 'border border-transparent hover:bg-white/[0.04]'
                        }`}
                      >
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold shrink-0"
                          style={{ background: c.color }}
                        >
                          {getInitials(c.name)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="block text-sm text-white truncate">{c.name}</span>
                          <span className="block text-xs text-zinc-500 truncate">{c.email}</span>
                        </div>
                        <span
                          className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all ${
                            isSelected ? 'gradient-bg text-white' : 'border border-white/[0.12] text-transparent'
                          }`}
                        >
                          <FiCheck size={11} />
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="px-5 py-4 border-t border-white/[0.06]">
              <button
                onClick={handleCreate}
                disabled={selected.length === 0 || creating}
                className="w-full px-4 py-2.5 rounded-xl gradient-bg text-white text-sm font-semibold shadow-lg transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed enabled:hover:shadow-xl enabled:hover:scale-[1.02] enabled:active:scale-[0.98]"
              >
                {creating ? 'Creating…' : isGroup ? `Start group chat (${selected.length})` : selected.length === 1 ? 'Start chat' : 'Select a contact'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
