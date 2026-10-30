const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

async function request(path, options = {}) {
  if (!BASE_URL) {
    throw new Error('Configure EXPO_PUBLIC_API_URL no arquivo .env e reinicie o Expo.');
  }

  const response = await fetch(`${BASE_URL.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Erro HTTP ${response.status}`);
  }
  if (response.status === 204) return null;
  return response.json();
}

function send(method, body) {
  return {
    method,
    body: JSON.stringify(body),
  };
}

export const api = {
  list: (resource) => request(resource),
  create: (resource, body) => request(resource, send('POST', body)),
  update: (resource, id, body) => request(`${resource}/${id}`, send('PUT', body)),
  remove: (resource, id) => request(`${resource}/${id}`, { method: 'DELETE' }),
};
