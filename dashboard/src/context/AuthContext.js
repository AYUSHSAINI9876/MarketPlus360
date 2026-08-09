import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import api, { getToken, clearToken, WEB_URL } from "../api";

const AuthContext = createContext({
  user: null,
  isLoading: true,
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setIsLoading(false);
      return;
    }

    api
      .get("/auth/me")
      .then((res) => setUser(res.data.user))
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false));
  }, []);

  const logout = useCallback(() => {
    clearToken();
    setUser(null);
    window.location.href = `${WEB_URL}/login`;
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
