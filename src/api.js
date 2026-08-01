const BASE_URL = '/api';

function getToken() {
  return localStorage.getItem('nexa_token');
}

async function request(path, options = {}) {
  const token = getToken();
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  let res;
  try {
    res = await fetch(`${BASE_URL}${path}`, { ...options, headers });
  } catch (err) {
    console.error(`[API] Network error: ${path}`, err);
    throw new Error('Network error. Please check your connection.');
  }

  console.log(`[API] ${options.method || 'GET'} ${path} → ${res.status} ${res.statusText}`);

  const contentType = res.headers.get('content-type');
  let body = null;

  if (contentType && contentType.includes('application/json')) {
    const text = await res.text();
    if (!text) {
      console.error(`[API] Empty JSON body for ${path} (${res.status})`);
      throw new Error(res.status === 500 ? 'Server error. Please try again.' : `Unexpected response (${res.status})`);
    }
    try {
      body = JSON.parse(text);
    } catch (parseErr) {
      console.error(`[API] Invalid JSON for ${path}:`, text);
      throw new Error('Invalid server response. Please try again.');
    }
  } else {
    const text = await res.text();
    console.error(`[API] Non-JSON response for ${path} (${contentType}):`, text.slice(0, 200));
    if (res.status === 404) throw new Error('Endpoint not found. Please check the URL.');
    if (res.status >= 500) throw new Error('Server error. Please try again later.');
    throw new Error(`Unexpected response (${res.status})`);
  }

  if (!res.ok) {
    const message = body?.message || body?.error || `Request failed (${res.status})`;
    const err = new Error(message);
    err.status = res.status;
    err.data = body;
    throw err;
  }

  return body;
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
    verifyEmail: (email, code) => request('/auth/verify-email', { method: 'POST', body: JSON.stringify({ email, code }) }),
    resendVerification: (email) => request('/auth/resend-verification', { method: 'POST', body: JSON.stringify({ email }) }),
    forgotPassword: (email) => request('/auth/forgot-password', { method: 'POST', body: JSON.stringify({ email }) }),
    resetPassword: (token, newPassword) => request('/auth/reset-password', { method: 'POST', body: JSON.stringify({ token, newPassword }) }),
    getMe: () => request('/auth/me'),
    updateMe: (body) => request('/auth/me', { method: 'PUT', body: JSON.stringify(body) }),
    checkUsername: (username) => request(`/auth/check-username?username=${encodeURIComponent(username)}`),
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
    add: (email) => request('/contacts', { method: 'POST', body: JSON.stringify({ email }) }),
  },
  notifications: {
    list: () => request('/notifications'),
    markRead: (id) => request(`/notifications/${id}/read`, { method: 'PUT' }),
  },
  archived: {
    list: () => request('/archived'),
    create: (conversationId) => request('/archived', { method: 'POST', body: JSON.stringify({ conversationId }) }),
    unarchive: (id) => request(`/archived/${id}`, { method: 'DELETE' }),
  },
  starred: {
    list: () => request('/starred'),
    toggle: (body) => request('/starred/toggle', { method: 'POST', body: JSON.stringify(body) }),
  },
  media: {
    list: () => request('/media'),
  },
  calls: {
    list: () => request('/calls'),
    create: (body) => request('/calls', { method: 'POST', body: JSON.stringify(body) }),
  },
  help: {
    list: () => request('/help'),
  },
  upload: {
    file: async (file, conversationId) => {
      const token = getToken();
      const form = new FormData();
      form.append('file', file);
      if (conversationId) form.append('conversationId', conversationId);
      let res;
      try {
        res = await fetch(`${BASE_URL}/upload/chat`, {
          method: 'POST',
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          body: form,
        });
      } catch {
        throw new Error('Network error. Please check your connection.');
      }
      const text = await res.text();
      if (!text) throw new Error('Empty response from server');
      let data;
      try { data = JSON.parse(text); } catch { throw new Error('Invalid server response'); }
      if (!res.ok) throw new Error(data?.message || data?.error || 'Upload failed');
      return data;
    },
    avatar: async (file) => {
      const token = getToken();
      const form = new FormData();
      form.append('file', file);
      let res;
      try {
        res = await fetch(`${BASE_URL}/upload`, {
          method: 'POST',
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          body: form,
        });
      } catch {
        throw new Error('Network error. Please check your connection.');
      }
      const text = await res.text();
      if (!text) throw new Error('Empty response from server');
      let data;
      try { data = JSON.parse(text); } catch { throw new Error('Invalid server response'); }
      if (!res.ok) throw new Error(data?.message || data?.error || 'Upload failed');
      return data;
    },
  },
};
