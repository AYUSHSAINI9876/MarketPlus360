import React from "react";

function Hero() {
  return (
    <div className="container">
      <div className="row p-5 mt-5 border-bottom text-center">
        <h1>Pricing</h1>
        <h3 className="text-muted mt-3 fs-5">
          Free equity investments and flat ₹20 traday and F&O trades
        </h3>
      </div>
      <div className="row p-5 mt-5 text-center">
        <div className="col-12 col-md-4 p-4">
          <img src="https://picsum.photos/seed/equity/300/200" className="img-fluid mb-4 rounded-3 shadow-lg" alt="Equity" />
          <h1 className="fs-3 fw-bold">Free equity delivery</h1>
          <p className="text-muted">
            All equity delivery investments (NSE, BSE), are absolutely free — ₹
            0 brokerage.
          </p>
        </div>
        <div className="col-12 col-md-4 p-4">
          <img src="https://picsum.photos/seed/intraday/300/200" className="img-fluid mb-4 rounded-3 shadow-lg" alt="Intraday" />
          <h1 className="fs-3 fw-bold">Intraday and F&O trades</h1>
          <p className="text-muted">
            Flat Rs. 20 or 0.03% (whichever is lower) per executed order on
            intraday trades across equity, currency, and commodity trades.
          </p>
        </div>
        <div className="col-12 col-md-4 p-4">
          <img src="https://picsum.photos/seed/funds/300/200" className="img-fluid mb-4 rounded-3 shadow-lg" alt="MF" />
          <h1 className="fs-3 fw-bold">Free direct MF</h1>
          <p className="text-muted">
            All direct mutual fund investments are absolutely free — ₹ 0
            commissions & DP charges.
          </p>
        </div>


      </div>
    </div>
  );
}

export default Hero;
