CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  username TEXT UNIQUE,
  initials TEXT NOT NULL,
  color TEXT NOT NULL DEFAULT '#6366f1',
  bio TEXT DEFAULT '',
  company TEXT DEFAULT '',
  location TEXT DEFAULT '',
  website TEXT DEFAULT '',
  phone TEXT DEFAULT '',
  verified INTEGER DEFAULT 0,
  avatar TEXT DEFAULT '',
  verification_code TEXT,
  reset_token TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS conversations (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  is_group INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS conversation_participants (
  conversation_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  joined_at TEXT DEFAULT (datetime('now')),
  PRIMARY KEY (conversation_id, user_id),
  FOREIGN KEY (conversation_id) REFERENCES conversations(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS messages (
  id TEXT PRIMARY KEY,
  conversation_id TEXT NOT NULL,
  sender_id TEXT NOT NULL,
  text TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (conversation_id) REFERENCES conversations(id),
  FOREIGN KEY (sender_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS contacts (
  user_id TEXT NOT NULL,
  contact_user_id TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now')),
  PRIMARY KEY (user_id, contact_user_id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (contact_user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS notifications (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'info',
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT DEFAULT '📢',
  read INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS archived_conversations (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  conversation_id TEXT NOT NULL,
  name TEXT NOT NULL,
  initials TEXT DEFAULT '',
  color TEXT DEFAULT '#6366f1',
  last_message TEXT DEFAULT '',
  member_count INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS starred_messages (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  conversation_id TEXT NOT NULL,
  sender_id TEXT NOT NULL,
  text TEXT NOT NULL,
  sender_name TEXT NOT NULL,
  sender_color TEXT DEFAULT '#6366f1',
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS media_files (
  id TEXT PRIMARY KEY,
  conversation_id TEXT NOT NULL,
  sender_id TEXT NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'image',
  size TEXT NOT NULL DEFAULT '0 B',
  preview TEXT DEFAULT '📄',
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (conversation_id) REFERENCES conversations(id),
  FOREIGN KEY (sender_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS call_logs (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  caller_id TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'incoming',
  duration TEXT DEFAULT '',
  missed INTEGER DEFAULT 0,
  group_call INTEGER DEFAULT 0,
  ai_call INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (caller_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS help_articles (
  id TEXT PRIMARY KEY,
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT DEFAULT '📖',
  read_time TEXT DEFAULT '2 min read',
  created_at TEXT DEFAULT (datetime('now'))
);
