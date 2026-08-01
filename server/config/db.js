import initSqlJs from 'sql.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, '..', 'db', 'nexa.db');

let db = null;

export async function getDb() {
  if (db) return db;
  const SQL = await initSqlJs();
  if (fs.existsSync(DB_PATH)) {
    const buffer = fs.readFileSync(DB_PATH);
    db = new SQL.Database(buffer);
  } else {
    db = new SQL.Database();
  }
  db.run('PRAGMA foreign_keys = ON');
  return db;
}

export function saveDb() {
  if (!db) return;
  const data = db.export();
  fs.writeFileSync(DB_PATH, Buffer.from(data));
}

export async function initDb() {
  const database = await getDb();
  const schema = fs.readFileSync(path.join(__dirname, '..', 'db', 'schema.sql'), 'utf-8');
  database.run(schema);
  const migrations = [
    'ALTER TABLE users ADD COLUMN avatar TEXT DEFAULT ""',
    'ALTER TABLE users ADD COLUMN verification_code TEXT',
    'ALTER TABLE users ADD COLUMN reset_token TEXT',
    'ALTER TABLE messages ADD COLUMN attachment TEXT',
  ];
  for (const sql of migrations) {
    try {
      database.run(sql);
    } catch {
      /* column already exists */
    }
  }
  saveDb();
  console.log('Database initialized');
}

export function dbGet(sql, params = []) {
  const stmt = db.prepare(sql);
  stmt.bind(params);
  let row = null;
  if (stmt.step()) row = stmt.getAsObject();
  stmt.free();
  return row;
}

export function dbAll(sql, params = []) {
  const stmt = db.prepare(sql);
  stmt.bind(params);
  const rows = [];
  while (stmt.step()) rows.push(stmt.getAsObject());
  stmt.free();
  return rows;
}

export function dbRun(sql, params = []) {
  db.run(sql, params);
  saveDb();
}
