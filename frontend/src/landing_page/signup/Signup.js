import React, { useState } from "react";
import { Link } from "react-router-dom";
import api, { redirectToDashboard } from "../../api";
import Toast from "../../components/Toast";

function Signup() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      setError("Please enter a valid 10 digit mobile number.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("/auth/signup", { name, mobile, password });
      redirectToDashboard(response.data.token);
    } catch (err) {
      setError(err.response?.data?.message || "Could not sign up. Please make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5 mt-5 mb-5">
      <Toast message={error} type="error" onClose={() => setError("")} />
      <div className="row text-center justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="signup-card">
            <h1 className="fw-bold mb-4">Signup now</h1>
            <p className="text-muted mb-5 fs-5">Create your paper-trading account.</p>
            <form onSubmit={handleSignup}>
              <div className="mb-3 text-start">
                <label className="form-label fw-600 text-muted small text-uppercase">Full Name</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
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
              <div className="mb-3 text-start">
                <label className="form-label fw-600 text-muted small text-uppercase">Password</label>
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4 text-start">
                <label className="form-label fw-600 text-muted small text-uppercase">Confirm Password</label>
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary w-100 py-3 fs-5 mb-4"
                disabled={loading}
              >
                {loading ? "Creating account..." : "Continue"}
              </button>
              <div className="text-center">
                <span className="small text-muted">Already have an account? </span>
                <Link to="/login" className="text-decoration-none small">Login</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="row text-center mt-5">
        <div className="col-12 col-md-10 mx-auto text-muted small px-5">
          I allow MarketPlus360 to contact me for account opening and other purposes via Call, SMS, WhatsApp or Email.
        </div>
      </div>
    </div>
  );
}

export default Signup;
