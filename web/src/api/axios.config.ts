import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  withCredentials: false
});


api.interceptors.request.use(config => {
  try {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers = config.headers || {};
      (config.headers as any).Authorization = `Bearer ${token}`;
    }
  } catch {}
  return config;
});

export default api;
