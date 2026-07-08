const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

async function request(method, path, body) {
  const token = localStorage.getItem("admin_token");
  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined
  });

  if (!res.ok) {
    const payload = await res.json().catch(() => ({ message: res.statusText }));
    const err = new Error(payload.message ?? "Request failed");
    err.errors = payload.errors;
    throw err;
  }

  if (res.status === 204) return null;
  return res.json();
}

export const api = {
  get: (path) => request("GET", path),
  post: (path, body) => request("POST", path, body),
  put: (path, body) => request("PUT", path, body),
  patch: (path, body) => request("PATCH", path, body),
  del: (path) => request("DELETE", path)
};
