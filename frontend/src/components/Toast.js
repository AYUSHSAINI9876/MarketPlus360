import React, { useEffect } from "react";
import "./Toast.css";

const Toast = ({ message, type = "error", onClose }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className={`app-toast app-toast-${type}`} role="alert">
      {message}
      <button className="app-toast-close" onClick={onClose} aria-label="Dismiss">
        &times;
      </button>
    </div>
  );
};

export default Toast;
