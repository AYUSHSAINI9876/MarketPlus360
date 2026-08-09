import React, { useState } from "react";
import { Link } from "react-router-dom";
import api, { redirectToDashboard } from "../../api";
import Toast from "../../components/Toast";

function Login() {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!/^[6-9]\d{9}$/.test(mobile) || !password) {
      setError("Please enter a valid mobile number and password.");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("/auth/login", { mobile, password });
      redirectToDashboard(response.data.token);
    } catch (err) {
      setError(err.response?.data?.message || "Could not log in. Please make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5 mt-5 mb-5">
      <Toast message={error} type="error" onClose={() => setError("")} />
      <div className="row text-center justify-content-center">
        <div className="col-12 col-md-8 col-lg-5">
          <div className="signup-card">
            <h1 className="fw-bold mb-4">Login</h1>
            <p className="text-muted mb-5 fs-5">Welcome back to MarketPlus360.</p>
            <form onSubmit={handleLogin}>
              <div className="mb-3 text-start">
                <label className="form-label fw-600 text-muted small text-uppercase">Mobile Number</label>
                <div className="input-group input-group-lg">
                  <span className="input-group-text bg-white border-end-0 text-muted">+91</span>
                  <input
                    type="text"
                    className="form-control border-start-0"
                    placeholder="Enter your 10 digit mobile number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    required
                  />
                </div>
              </div>
              <div className="mb-4 text-start">
                <label className="form-label fw-600 text-muted small text-uppercase">Password</label>
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary w-100 py-3 fs-5 mb-4"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
              <div className="text-center">
                <span className="small text-muted">New here? </span>
                <Link to="/signup" className="text-decoration-none small">Create an account</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
