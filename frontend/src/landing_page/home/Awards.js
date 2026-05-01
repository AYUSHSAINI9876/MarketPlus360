import React from "react";

function Awards() {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12 col-md-6 p-5">
          <img
            src="https://picsum.photos/seed/broker/800/600"
            className="img-fluid rounded-3 shadow-lg"
            alt="Largest Broker in India"
            style={{ width: "100%", objectFit: "cover" }}
          />
        </div>
        <div className="col-12 col-md-6 p-5 mt-md-5">
          <h1 className="fw-bold mb-4">Largest stock broker in India</h1>
          <p className="mb-5 text-muted">
            2+ million MarketPlus360 clients contribute to over 15% of all retail
            order volumes in India daily by trading and investing in:
          </p>
          <div className="row">
            <div className="col-6">
              <ul className="list-unstyled">
                <li className="mb-2"><i className="fas fa-check-circle text-primary me-2"></i> Futures and Options</li>
                <li className="mb-2"><i className="fas fa-check-circle text-primary me-2"></i> Commodity derivatives</li>
                <li className="mb-2"><i className="fas fa-check-circle text-primary me-2"></i> Currency derivatives</li>
              </ul>
            </div>
            <div className="col-6">
              <ul className="list-unstyled">
                <li className="mb-2"><i className="fas fa-check-circle text-primary me-2"></i> Stocks & IPOs</li>
                <li className="mb-2"><i className="fas fa-check-circle text-primary me-2"></i> Direct mutual funds</li>
                <li className="mb-2"><i className="fas fa-check-circle text-primary me-2"></i> Bonds and Govt. Securities</li>
              </ul>
            </div>
          </div>
          <div className="mt-5 pt-3">
            <img
              src="https://picsum.photos/seed/partners/600/120"
              className="img-fluid opacity-75 rounded"
              style={{ width: "80%" }}
              alt="Press and Media Partners"
            />
          </div>
        </div>

      </div>
    </div>
  );
}

export default Awards;
