import api from "./api";

export async function loginUser(data: { email: string; password: string }) {
  const res = await api.post("/auth/login", data);
  return res.data;
}

export async function logoutUser() {
  const token = localStorage.getItem("token");
  if (token) {
    await api.post("/auth/logout", null, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}

export async function getCurrentUser() {
  const res = await api.get("/auth/me");
  return res.data.user;
}
  