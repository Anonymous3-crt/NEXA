const BASE_URL = '/api';

function getToken() {
  return localStorage.getItem('nexa_token');
}

async function request(path, options = {}) {
  const token = getToken();
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}

export function setToken(token) {
  if (token) localStorage.setItem('nexa_token', token);
  else localStorage.removeItem('nexa_token');
}

export function getStoredUser() {
  try {
    const raw = localStorage.getItem('nexa_user');
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

export function setStoredUser(user) {
  if (user) localStorage.setItem('nexa_user', JSON.stringify(user));
  else localStorage.removeItem('nexa_user');
}

export const api = {
  auth: {
    signup: (body) => request('/auth/signup', { method: 'POST', body: JSON.stringify(body) }),
    login: (body) => request('/auth/login', { method: 'POST', body: JSON.stringify(body) }),
    getMe: () => request('/auth/me'),
    updateMe: (body) => request('/auth/me', { method: 'PUT', body: JSON.stringify(body) }),
  },
  conversations: {
    list: () => request('/conversations'),
    create: (body) => request('/conversations', { method: 'POST', body: JSON.stringify(body) }),
  },
  messages: {
    list: (conversationId) => request(`/messages/${conversationId}`),
    send: (conversationId, text) => request(`/messages/${conversationId}`, { method: 'POST', body: JSON.stringify({ text }) }),
  },
  contacts: {
    list: () => request('/contacts'),
  },
  notifications: {
    list: () => request('/notifications'),
    markRead: (id) => request(`/notifications/${id}/read`, { method: 'PUT' }),
  },
  archived: {
    list: () => request('/archived'),
  },
  starred: {
    list: () => request('/starred'),
  },
  media: {
    list: () => request('/media'),
  },
  calls: {
    list: () => request('/calls'),
  },
  help: {
    list: () => request('/help'),
  },
};
