import axios from "axios";

export const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3005";
export const DASHBOARD_URL = process.env.REACT_APP_DASHBOARD_URL || "http://localhost:3001";

const api = axios.create({
  baseURL: `${API_URL}/api`,
  timeout: 10000,
});

export default api;

export function redirectToDashboard(token) {
  window.location.href = `${DASHBOARD_URL}/auth/callback#token=${encodeURIComponent(token)}`;
}
