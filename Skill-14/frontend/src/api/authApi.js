const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const validationMessage =
      data?.validationErrors &&
      Object.values(data.validationErrors).length > 0 &&
      Object.values(data.validationErrors)[0];

    throw new Error(validationMessage || data?.message || "Request failed");
  }

  return data;
}

export function registerUser(payload) {
  return request("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export function loginUser(payload) {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export function fetchUserProfile({ userId, username }) {
  const params = new URLSearchParams();

  if (userId) {
    params.set("userId", userId);
  }

  if (username) {
    params.set("username", username);
  }

  return request(`/users/profile?${params.toString()}`, {
    method: "GET"
  });
}

