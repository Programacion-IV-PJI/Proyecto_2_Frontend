const API_BASE = "http://localhost:8080";

export async function apiFetch(url, options = {}) {
    const token = localStorage.getItem("token");

    const headers = {
        "Content-Type": "application/json",
        ...(options.headers || {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const res = await fetch(`${API_BASE}${url}`, { ...options, headers });

    if (res.status === 401) {
        localStorage.clear();
        window.location.href = "/login";
        return null;
    }

    if (!res.ok) {
        const err = await res.text();
        throw new Error(err || "Error en la petición");
    }

    const text = await res.text();
    return text ? JSON.parse(text) : null;
}