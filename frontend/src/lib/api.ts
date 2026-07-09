const API_BASE = import.meta.env.VITE_API_URL;

export async function apiFetch(endpoint: string, body?: any) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error("Backend error");
  }

  return res.json();
}
