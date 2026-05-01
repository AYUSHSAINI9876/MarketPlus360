import React from "react";

function Stats() {
  return (
    <div className="container p-3">
      <div className="row p-5 align-items-center">
        <div className="col-12 col-md-6 p-5">
          <h1 className="fs-2 mb-5">Trust with confidence</h1>
          <h2 className="fs-4">Customer-first always</h2>
          <p className="text-muted">
            That's why 1.3+ crore customers trust MarketPlus360 with ₹3.5+ lakh crores
            worth of equity investments.
          </p>
          <h2 className="fs-4">No spam or gimmicks</h2>
          <p className="text-muted">
            No gimmicks, spam, "gamification", or annoying push notifications.
            High quality apps that you use at your pace, the way you like.
          </p>
          <h2 className="fs-4">The Zerodha universe</h2>
          <p className="text-muted">
            Not just an app, but a whole ecosystem. Our investments in 30+
            fintech startups offer you tailored services specific to your needs.
          </p>
          <h2 className="fs-4">Do better with money</h2>
          <p className="text-muted">
            With initiatives like Nudge and Kill Switch, we don't just
            facilitate transactions, but actively help you do better with your
            money.
          </p>
        </div>
        <div className="col-12 col-md-6 p-5">
          <img 
            src="https://picsum.photos/seed/ecosystem/800/600" 
            className="img-fluid rounded-3 shadow-lg" 
            style={{ width: "100%", objectFit: "cover" }}
            alt="Ecosystem"
          />
          <div className="text-center mt-5 d-flex justify-content-center gap-4">
            <a href="#" className="text-decoration-none fw-bold">
              Explore our products <i className="fa fa-long-arrow-right"></i>
            </a>
            <a href="#" className="text-decoration-none fw-bold">
              Try MarketPlus360 demo <i className="fa fa-long-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
