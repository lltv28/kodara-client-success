async function request(url, options = {}) {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (res.status === 401 && !url.includes('/api/auth/')) {
    window.location.href = '/login';
    return;
  }

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}

export const api = {
  login: (email, password) => request('/api/auth/login', { method: 'POST', body: { email, password } }),
  logout: () => request('/api/auth/logout', { method: 'POST' }),
  me: () => request('/api/auth/me'),

  getClients: () => request('/api/clients'),
  getClient: (id) => request(`/api/clients/${id}`),
  createClient: (data) => request('/api/clients', { method: 'POST', body: data }),
  updateClient: (id, data) => request(`/api/clients/${id}`, { method: 'PUT', body: data }),

  getDeliverables: (clientId) => request(`/api/clients/${clientId}/deliverables`),
  generate: (clientId, types) => request(`/api/clients/${clientId}/generate`, { method: 'POST', body: { types } }),
};
