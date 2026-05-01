import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="container p-5 mb-5 mt-5">
      <div className="row text-center justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <img
            src="https://picsum.photos/seed/trading/1200/600"
            alt="MarketPlus360 Trading Platform"
            className="img-fluid mb-5 rounded-3 shadow-lg"
            style={{ maxWidth: "90%", border: "1px solid #eee" }}
          />

          <h1 className="display-4 fw-bold mb-3" style={{ color: "var(--secondary-color)" }}>
            Invest in everything
          </h1>
          <p className="fs-5 text-muted mb-5">
            Online platform to invest in stocks, derivatives, mutual funds, and more.
            Trusted by millions of users for its speed and simplicity.
          </p>
          <Link
            to="/signup"
            className="btn btn-primary px-5 py-3 fs-5"
            style={{ borderRadius: "4px" }}
          >
            Signup Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;

