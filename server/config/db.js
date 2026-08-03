import initSqlJs from 'sql.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createClient } from '@libsql/client';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = process.env.NEXA_DB_PATH || path.join(__dirname, '..', 'db', 'nexa.db');

const isRemote = !!process.env.TURSO_URL;
let db = null;
let remote = null;
let ready = null;

function ensureInit() {
  if (!ready) ready = initDb();
  return ready;
}

async function initLocal() {
  const SQL = await initSqlJs();
  if (fs.existsSync(DB_PATH)) {
    const buffer = fs.readFileSync(DB_PATH);
    db = new SQL.Database(buffer);
  } else {
    db = new SQL.Database();
  }
  db.run('PRAGMA foreign_keys = ON');
}

async function initRemote() {
  remote = createClient({
    url: process.env.TURSO_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });
  await remote.execute('PRAGMA foreign_keys = ON');
}

function saveLocal() {
  if (!db) return;
  const data = db.export();
  fs.writeFileSync(DB_PATH, Buffer.from(data));
}

export async function initDb() {
  if (isRemote) {
    await initRemote();
  } else {
    await initLocal();
  }

  const schema = fs.readFileSync(path.join(__dirname, '..', 'db', 'schema.sql'), 'utf-8');
  await dbRunSchema(schema);

  const migrations = [
    'ALTER TABLE users ADD COLUMN avatar TEXT DEFAULT ""',
    'ALTER TABLE users ADD COLUMN verification_code TEXT',
    'ALTER TABLE users ADD COLUMN reset_token TEXT',
    'ALTER TABLE messages ADD COLUMN attachment TEXT',
  ];
  for (const sql of migrations) {
    try {
      await dbRunSchema(sql);
    } catch {
      /* column already exists */
    }
  }

  if (!isRemote) saveLocal();
  console.log('Database initialized');
}

async function dbRunSchema(sql) {
  if (isRemote) {
    await remote.execute(sql);
  } else {
    db.run(sql);
  }
}

export function dbGet(sql, params = []) {
  return ensureInit().then(() => {
    if (isRemote) {
      return remote.execute({ sql, args: params }).then((r) => r.rows[0] ?? null);
    }
    const stmt = db.prepare(sql);
    stmt.bind(params);
    let row = null;
    if (stmt.step()) row = stmt.getAsObject();
    stmt.free();
    return row;
  });
}

export function dbAll(sql, params = []) {
  return ensureInit().then(() => {
    if (isRemote) {
      return remote.execute({ sql, args: params }).then((r) => r.rows);
    }
    const stmt = db.prepare(sql);
    stmt.bind(params);
    const rows = [];
    while (stmt.step()) rows.push(stmt.getAsObject());
    stmt.free();
    return rows;
  });
}

export function dbRun(sql, params = []) {
  return ensureInit().then(() => {
    if (isRemote) {
      return remote.execute({ sql, args: params });
    }
    db.run(sql, params);
    saveLocal();
  });
}

export async function seedIfEmpty() {
  const row = await dbGet('SELECT COUNT(*) as count FROM users');
  if (!row || row.count === 0) {
    const { seedDatabase } = await import('../db/seed.js');
    await seedDatabase();
  }
}
