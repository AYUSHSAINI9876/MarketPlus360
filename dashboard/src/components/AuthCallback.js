import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setToken } from "../api";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash || "";
    const match = hash.match(/token=([^&]+)/);
    const token = match ? decodeURIComponent(match[1]) : null;

    if (token) {
      setToken(token);
    }

    window.history.replaceState(null, "", "/auth/callback");
    navigate("/", { replace: true });
  }, [navigate]);

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Signing you in...</span>
      </div>
    </div>
  );
};

export default AuthCallback;
