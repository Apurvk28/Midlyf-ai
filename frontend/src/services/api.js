const API_BASE_URL = "http://localhost:5001/api";

const getAuthHeaders = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (userInfo && userInfo.token) {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInfo.token}`,
    };
  }
  return { "Content-Type": "application/json" };
};

export const loginCall = async (email, password) => {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Login failed");
  return await res.json();
};

export const registerCall = async (name, email, password) => {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  if (!res.ok) throw new Error("Registration failed");
  return await res.json();
};

export const getFutureMeReply = async (message) => {
  const res = await fetch(`${API_BASE_URL}/future-me`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ message }),
  });
  if (!res.ok) throw new Error("API error");
  return (await res.json()).reply;
};

export const getFutureMeHistory = async () => {
  const res = await fetch(`${API_BASE_URL}/future-me/history`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to load history");
  return await res.json();
};

export const getToxicCheck = async (message) => {
  const res = await fetch(`${API_BASE_URL}/features/toxic`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ message }),
  });
  if (!res.ok) throw new Error("API error");
  return await res.json();
};

export const getLifePrediction = async (data) => {
  const res = await fetch(`${API_BASE_URL}/features/life`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("API error");
  return await res.json();
};

export const getScenario = async (scenario) => {
  const res = await fetch(`${API_BASE_URL}/features/scenario`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ scenario }),
  });
  if (!res.ok) throw new Error("API error");
  return await res.json();
};

export const getRealityCheck = async (data) => {
  const res = await fetch(`${API_BASE_URL}/features/reality`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("API error");
  return await res.json();
};
