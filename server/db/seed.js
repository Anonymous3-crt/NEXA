import bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import { dbRun, dbGet } from '../config/db.js';

const now = () => new Date().toISOString();

async function insertUser(id, name, email, hash, username, initials, color) {
  await dbRun('INSERT INTO users (id, name, email, password_hash, username, initials, color, bio, company, location, website, phone, verified, created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
    [id, name, email, hash, username, initials, color, '', '', '', '', '', 1, now()]);
}

export async function seedDatabase() {
  const existing = await dbGet('SELECT COUNT(*) as count FROM users');
  if (existing.count > 0) return;

  const meId = uuid();
  const aliceId = uuid();
  const bobId = uuid();
  const carolId = uuid();
  const daveId = uuid();
  const hash = bcrypt.hashSync('password123', 10);

  await insertUser(meId, 'Alex Rivera', 'alex@nexa.app', hash, 'alex', 'AR', '#6366f1');
  await insertUser(aliceId, 'Alice Chen', 'alice@nexa.app', hash, 'alice', 'AC', '#8b5cf6');
  await insertUser(bobId, 'Bob Smith', 'bob@nexa.app', hash, 'bob', 'BS', '#06b6d4');
  await insertUser(carolId, 'Carol Davis', 'carol@nexa.app', hash, 'carol', 'CD', '#ec4899');
  await insertUser(daveId, 'Dave Park', 'dave@nexa.app', hash, 'dave', 'DP', '#f59e0b');

  await dbRun('INSERT INTO contacts VALUES (?,?,?)', [meId, aliceId, new Date().toISOString()]);
  await dbRun('INSERT INTO contacts VALUES (?,?,?)', [meId, bobId, new Date().toISOString()]);
  await dbRun('INSERT INTO contacts VALUES (?,?,?)', [meId, carolId, new Date().toISOString()]);
  await dbRun('INSERT INTO contacts VALUES (?,?,?)', [meId, daveId, new Date().toISOString()]);

  for (const { id, name, group } of [
    { id: uuid(), name: 'Alice Chen', group: false },
    { id: uuid(), name: 'Bob Smith', group: false },
    { id: uuid(), name: 'Design Team', group: true },
    { id: uuid(), name: 'General', group: true },
  ]) {
    await dbRun('INSERT INTO conversations VALUES (?,?,?,?)', [id, name, group ? 1 : 0, new Date().toISOString()]);
    await dbRun('INSERT INTO conversation_participants VALUES (?,?,?)', [id, meId, new Date().toISOString()]);
  }

  const conv1 = (await dbGet('SELECT id FROM conversations WHERE name = ?', ['Alice Chen'])).id;
  const conv2 = (await dbGet('SELECT id FROM conversations WHERE name = ?', ['Bob Smith'])).id;
  const conv3 = (await dbGet('SELECT id FROM conversations WHERE name = ?', ['Design Team'])).id;
  const conv4 = (await dbGet('SELECT id FROM conversations WHERE name = ?', ['General'])).id;

  await dbRun('INSERT INTO conversation_participants VALUES (?,?,?)', [conv1, aliceId, new Date().toISOString()]);
  await dbRun('INSERT INTO conversation_participants VALUES (?,?,?)', [conv2, bobId, new Date().toISOString()]);
  await dbRun('INSERT INTO conversation_participants VALUES (?,?,?)', [conv3, aliceId, new Date().toISOString()]);
  await dbRun('INSERT INTO conversation_participants VALUES (?,?,?)', [conv3, carolId, new Date().toISOString()]);
  await dbRun('INSERT INTO conversation_participants VALUES (?,?,?)', [conv4, aliceId, new Date().toISOString()]);
  await dbRun('INSERT INTO conversation_participants VALUES (?,?,?)', [conv4, bobId, new Date().toISOString()]);
  await dbRun('INSERT INTO conversation_participants VALUES (?,?,?)', [conv4, carolId, new Date().toISOString()]);
  await dbRun('INSERT INTO conversation_participants VALUES (?,?,?)', [conv4, daveId, new Date().toISOString()]);

  const messages = [
    [conv1, aliceId, 'Hey! How is the project going?', '2025-01-15T09:00:00'],
    [conv1, meId, 'Going great! Almost done with the redesign.', '2025-01-15T09:02:00'],
    [conv1, aliceId, 'Awesome! Can you share the mockups?', '2025-01-15T09:05:00'],
    [conv2, bobId, 'The API endpoints are ready for testing.', '2025-01-15T10:00:00'],
    [conv2, meId, 'Perfect, I will integrate them today.', '2025-01-15T10:05:00'],
    [conv3, aliceId, 'New design system is looking clean!', '2025-01-15T11:00:00'],
    [conv3, carolId, 'Love the new color palette.', '2025-01-15T11:05:00'],
    [conv3, meId, 'Thanks! The dark mode is my favorite.', '2025-01-15T11:10:00'],
    [conv4, daveId, 'Good morning team!', '2025-01-15T08:00:00'],
    [conv4, meId, 'Morning everyone!', '2025-01-15T08:10:00'],
  ];

  for (const [convId, senderId, text, time] of messages) {
    await dbRun('INSERT INTO messages (id, conversation_id, sender_id, text, created_at) VALUES (?,?,?,?,?)', [uuid(), convId, senderId, text, time]);
  }

  const notifications = [
    [meId, 'message', 'Alice Chen', 'Sent you a new message', '💬', 0],
    [meId, 'mention', 'Bob Smith', 'Mentioned you in Design Team', '@', 0],
    [meId, 'system', 'Weekly report ready', 'Your team stats are available', '📊', 0],
    [meId, 'message', 'Carol Davis', 'Shared a file with you', '📁', 1],
  ];

  for (const [userId, type, title, desc, icon, read] of notifications) {
    await dbRun('INSERT INTO notifications VALUES (?,?,?,?,?,?,?,?)', [uuid(), userId, type, title, desc, icon, read, now()]);
  }

  await dbRun('INSERT INTO archived_conversations VALUES (?,?,?,?,?,?,?,?,?)', [uuid(), meId, conv1, 'Alice Chen', 'AC', '#8b5cf6', 'Awesome! Can you share the mockups?', 2, now()]);
  await dbRun('INSERT INTO archived_conversations VALUES (?,?,?,?,?,?,?,?,?)', [uuid(), meId, conv2, 'Bob Smith', 'BS', '#06b6d4', 'Perfect, I will integrate them today.', 2, now()]);

  const starredTexts = [
    { sender: aliceId, conv: conv1, name: 'Alice Chen', color: '#8b5cf6', text: 'Hey! How is the project going?' },
    { sender: daveId, conv: conv4, name: 'Dave Park', color: '#f59e0b', text: 'Good morning team!' },
  ];
  for (const s of starredTexts) {
    await dbRun('INSERT INTO starred_messages VALUES (?,?,?,?,?,?,?,?)', [uuid(), meId, s.conv, s.sender, s.text, s.name, s.color, now()]);
  }

  const mediaData = [
    { name: 'Screenshot_2025-01-15.png', type: 'image', size: '2.4 MB', preview: '🖼️', conv: conv1, sender: aliceId },
    { name: 'Project_Proposal.pdf', type: 'document', size: '1.1 MB', preview: '📄', conv: conv1, sender: aliceId },
    { name: 'Team_Photo.jpg', type: 'image', size: '3.8 MB', preview: '🖼️', conv: conv3, sender: carolId },
    { name: 'Demo_Video.mp4', type: 'video', size: '24 MB', preview: '🎥', conv: conv4, sender: daveId },
  ];
  for (const m of mediaData) {
    await dbRun('INSERT INTO media_files VALUES (?,?,?,?,?,?,?,?)', [uuid(), m.conv, m.sender, m.name, m.type, m.size, m.preview, now()]);
  }

  const calls = [
    { caller: aliceId, type: 'incoming', duration: '12:34', missed: 0 },
    { caller: bobId, type: 'outgoing', duration: '5:22', missed: 0 },
    { caller: carolId, type: 'video', duration: '18:07', missed: 0 },
    { caller: aliceId, type: 'incoming', duration: '', missed: 1 },
    { caller: carolId, type: 'incoming', duration: '3:45', missed: 0, group: 1 },
  ];
  for (const c of calls) {
    await dbRun('INSERT INTO call_logs VALUES (?,?,?,?,?,?,?,?,?)', [uuid(), meId, c.caller, c.type, c.duration, c.missed, c.group || 0, 0, now()]);
  }

  const helpData = [
    { cat: 'Getting Started', title: 'How to create your account', desc: 'Learn how to sign up and set up your profile in minutes.', icon: '🚀', read: '3 min read' },
    { cat: 'Getting Started', title: 'Navigating the dashboard', desc: 'A tour of the Nexa dashboard and its key features.', icon: '🧭', read: '4 min read' },
    { cat: 'Messages', title: 'Sending messages and files', desc: 'How to send text messages, images, and documents.', icon: '💬', read: '2 min read' },
    { cat: 'Messages', title: 'Using emoji and reactions', desc: 'Express yourself with emojis and message reactions.', icon: '😄', read: '2 min read' },
    { cat: 'Calls', title: 'Making voice and video calls', desc: 'How to start calls and manage your call history.', icon: '📞', read: '3 min read' },
    { cat: 'Calls', title: 'Troubleshooting call issues', desc: 'Fix common problems with voice and video calls.', icon: '🔧', read: '5 min read' },
    { cat: 'Security', title: 'End-to-end encryption explained', desc: 'How Nexa keeps your conversations private and secure.', icon: '🔒', read: '4 min read' },
    { cat: 'Security', title: 'Two-factor authentication', desc: 'Add an extra layer of security to your account.', icon: '🛡️', read: '3 min read' },
    { cat: 'Account', title: 'Managing your profile settings', desc: 'Update your personal information and preferences.', icon: '⚙️', read: '3 min read' },
    { cat: 'Account', title: 'How to reset your password', desc: 'Steps to reset your password if you forget it.', icon: '🔑', read: '2 min read' },
  ];
  for (const h of helpData) {
    await dbRun('INSERT INTO help_articles VALUES (?,?,?,?,?,?,?)', [uuid(), h.cat, h.title, h.desc, h.icon, h.read, now()]);
  }

  console.log('Database seeded');
}
