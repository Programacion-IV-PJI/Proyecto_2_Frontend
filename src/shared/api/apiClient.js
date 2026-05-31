const API_BASE = "http://localhost:8080";

export async function apiFetch(path, options = {}) {
    const token = localStorage.getItem("token");
    const headers = { "Content-Type": "application/json", ...options.headers };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
    if (!res.ok) {
        const err = await res.text();
        throw new Error(err || res.statusText);
    }
    const text = await res.text();
    return text ? JSON.parse(text) : null;
}