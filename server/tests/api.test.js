import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import os from 'os';
import path from 'path';
import fs from 'fs';

const dbPath = path.join(os.tmpdir(), `nexa-test-${Date.now()}.db`);
process.env.NEXA_DB_PATH = dbPath;

const { default: app } = await import('../app.js');
const { seedIfEmpty } = await import('../config/db.js');

let server;
let baseUrl;

before(async () => {
  await seedIfEmpty();
  server = app.listen(0);
  await new Promise((resolve) => server.once('listening', resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  server?.close();
  if (fs.existsSync(dbPath)) fs.rmSync(dbPath, { force: true });
});

async function request(pathname, { method = 'GET', body, token } = {}) {
  const res = await fetch(`${baseUrl}${pathname}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => null);
  return { status: res.status, data };
}

test('health endpoint responds ok', async () => {
  const { status, data } = await request('/api/health');
  assert.equal(status, 200);
  assert.equal(data.status, 'ok');
});

test('login with seeded user succeeds', async () => {
  const { status, data } = await request('/api/auth/login', {
    method: 'POST',
    body: { email: 'alex@nexa.app', password: 'password123' },
  });
  assert.equal(status, 200);
  assert.equal(data.success, true);
  assert.ok(data.token);
  assert.equal(data.user.name, 'Alex Rivera');
});

test('login with wrong password fails', async () => {
  const { status, data } = await request('/api/auth/login', {
    method: 'POST',
    body: { email: 'alex@nexa.app', password: 'wrong-password' },
  });
  assert.equal(status, 401);
  assert.equal(data.success, false);
});

test('protected route rejects missing token', async () => {
  const { status } = await request('/api/conversations');
  assert.equal(status, 401);
});

test('signup → verify → login flow works', async () => {
  const email = `flow-${Date.now()}@nexa.test`;
  const { status: s1, data: signup } = await request('/api/auth/signup', {
    method: 'POST',
    body: { name: 'Flow Tester', email, password: 'password123' },
  });
  assert.equal(s1, 201);
  assert.equal(signup.success, true);
  assert.ok(signup.devCode, 'dev code should be returned in non-production');

  const { status: s2 } = await request('/api/auth/verify-email', {
    method: 'POST',
    body: { email, code: signup.devCode },
  });
  assert.equal(s2, 200);

  const { status: s3, data: login } = await request('/api/auth/login', {
    method: 'POST',
    body: { email, password: 'password123' },
  });
  assert.equal(s3, 200);
  assert.equal(login.success, true);
  assert.ok(login.token);
});

test('duplicate email signup rejected', async () => {
  const { status, data } = await request('/api/auth/signup', {
    method: 'POST',
    body: { name: 'Dup', email: 'alex@nexa.app', password: 'password123' },
  });
  assert.equal(status, 409);
  assert.equal(data.success, false);
});

test('conversations, message send and list work', async () => {
  const { data: login } = await request('/api/auth/login', {
    method: 'POST',
    body: { email: 'alex@nexa.app', password: 'password123' },
  });
  const token = login.token;

  const { status: s1, data: convList } = await request('/api/conversations', { token });
  assert.equal(s1, 200);
  assert.ok(convList.conversations.length > 0);
  const convId = convList.conversations[0].id;

  const text = `smoke ${Date.now()}`;
  const { status: s2, data: sent } = await request(`/api/messages/${convId}`, {
    method: 'POST',
    body: { text },
    token,
  });
  assert.equal(s2, 201);
  assert.equal(sent.message.text, text);

  const { status: s3, data: list } = await request(`/api/messages/${convId}`, { token });
  assert.equal(s3, 200);
  assert.ok(list.messages.some((m) => m.id === sent.message.id));
});

test('user profile update round-trips', async () => {
  const { data: login } = await request('/api/auth/login', {
    method: 'POST',
    body: { email: 'alex@nexa.app', password: 'password123' },
  });
  const token = login.token;

  const { status, data } = await request('/api/auth/me', {
    method: 'PUT',
    body: { bio: 'Built by tests' },
    token,
  });
  assert.equal(status, 200);
  assert.equal(data.user.bio, 'Built by tests');
});
