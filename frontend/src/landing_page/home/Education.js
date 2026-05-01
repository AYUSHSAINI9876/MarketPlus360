import React from "react";

function Education() {
  return (
    <div className="container mt-5 py-5">
      <div className="row align-items-center">
        <div className="col-12 col-md-6 mb-4">
          <img 
            src="https://picsum.photos/seed/education/800/600" 
            className="img-fluid rounded-3 shadow-lg" 
            style={{ width: "100%", objectFit: "cover" }}
            alt="Education"
          />
        </div>
        <div className="col-12 col-md-6 px-md-5">
          <h1 className="mb-4 fs-2 fw-bold">Free and open market education</h1>
          <p className="text-muted fs-5">
            Varsity, the largest online stock market education book in the world
            covering everything from the basics to advanced trading.
          </p>
          <a href="#" className="text-decoration-none fw-bold">
            Varsity <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
          </a>
          <p className="mt-5 text-muted fs-5">
            TradingQ&A, the most active trading and investment community in
            India for all your market related queries.
          </p>
          <a href="#" className="text-decoration-none fw-bold">
            TradingQ&A <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Education;
