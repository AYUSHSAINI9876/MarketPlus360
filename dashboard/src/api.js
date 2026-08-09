import axios from "axios";

export const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3005";
export const WEB_URL = process.env.REACT_APP_WEB_URL || "http://localhost:3000";

const TOKEN_KEY = "mp360_token";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

const api = axios.create({
  baseURL: `${API_URL}/api`,
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearToken();
      window.location.href = `${WEB_URL}/login`;
    }
    return Promise.reject(error);
  }
);

export default api;
