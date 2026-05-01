import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (mobile.length !== 10) {
      alert("Please enter a valid 10 digit mobile number");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3005/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile }),
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        // Redirect to dashboard (port 3001)
        window.location.href = "http://localhost:3001";
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (err) {
      alert("Error connecting to server. Make sure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5 mt-5 mb-5">
      <div className="row text-center justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="signup-card">
            <h1 className="fw-bold mb-4">Signup now</h1>
            <p className="text-muted mb-5 fs-5">Or track your existing application.</p>
            <form onSubmit={handleSignup}>
              <div className="mb-4 text-start">
                <label className="form-label fw-600 text-muted small text-uppercase">Mobile Number</label>
                <div className="input-group input-group-lg">
                  <span className="input-group-text bg-white border-end-0 text-muted">+91</span>
                  <input 
                    type="text" 
                    className="form-control border-start-0" 
                    placeholder="Enter your 10 digit mobile number" 
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    required
                  />
                </div>
                <div className="mt-2 text-muted small">You will receive an OTP on this number</div>
              </div>
              <button 
                type="submit" 
                className="btn btn-primary w-100 py-3 fs-5 mb-4"
                disabled={loading}
              >
                {loading ? "Processing..." : "Continue"}
              </button>
              <div className="text-center">
                <a href="#" className="text-decoration-none small">Want to open a corporate, NRI, or HUF account?</a>
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
