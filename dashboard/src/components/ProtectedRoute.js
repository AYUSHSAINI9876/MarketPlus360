import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { WEB_URL } from "../api";

const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      window.location.href = `${WEB_URL}/login`;
    }
  }, [isLoading, user]);

  if (isLoading || !user) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
