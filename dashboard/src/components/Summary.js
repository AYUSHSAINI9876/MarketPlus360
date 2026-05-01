import React from "react";

const Summary = () => {
  return (
    <div className="summary-container">
      <div className="username mb-4">
        <h2 className="fw-bold">Hi, Ayush!</h2>
        <p className="text-muted">Welcome back to your trading dashboard.</p>
      </div>

      <div className="row">
        <div className="col">
          <div className="title">
             <i className="fa fa-pie-chart section-icon"></i> Equity
          </div>
          <div className="d-flex align-items-center justify-content-between mt-4">
            <div>
              <h5 className="mb-0">3.74k</h5>
              <p>Margin available</p>
            </div>
            <div className="text-end">
              <p className="mb-1">Margins used: <strong>0</strong></p>
              <p className="mb-0">Opening balance: <strong>3.74k</strong></p>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="title">
             <i className="fa fa-briefcase section-icon"></i> Holdings (13)
          </div>
          <div className="d-flex align-items-center justify-content-between mt-4">
            <div>
              <h5 className="mb-0 profit">1.55k <small className="fs-6">+5.20%</small></h5>
              <p>P&L</p>
            </div>
            <div className="text-end">
              <p className="mb-1">Current Value: <strong>31.43k</strong></p>
              <p className="mb-0">Investment: <strong>29.88k</strong></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;

