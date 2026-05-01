import React from "react";

function Footer() {
  return (
    <footer className="bg-light border-top mt-5 py-5">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-3 mb-4">
            <h4 className="fw-800 text-primary mb-3">MarketPlus360</h4>
            <p className="text-muted small">
              &copy; 2010 - 2024, Not MarketPlus360 Broking Ltd. All rights reserved.
            </p>
            <div className="d-flex gap-3 mt-3">
              <a href="#" className="text-muted"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-muted"><i className="fab fa-facebook"></i></a>
              <a href="#" className="text-muted"><i className="fab fa-instagram"></i></a>
              <a href="#" className="text-muted"><i className="fab fa-linkedin"></i></a>
            </div>
          </div>
          <div className="col-6 col-md-3 mb-4">
            <h6 className="fw-bold mb-3">Company</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="#">About</a></li>
              <li className="mb-2"><a href="#">Products</a></li>
              <li className="mb-2"><a href="#">Pricing</a></li>
              <li className="mb-2"><a href="#">Referral programme</a></li>
              <li className="mb-2"><a href="#">Careers</a></li>
            </ul>
          </div>
          <div className="col-6 col-md-3 mb-4">
            <h6 className="fw-bold mb-3">Support</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="#">Contact</a></li>
              <li className="mb-2"><a href="#">Support portal</a></li>
              <li className="mb-2"><a href="#">Z-Connect blog</a></li>
              <li className="mb-2"><a href="#">List of charges</a></li>
              <li className="mb-2"><a href="#">Downloads & resources</a></li>
            </ul>
          </div>
          <div className="col-12 col-md-3 mb-4">
            <h6 className="fw-bold mb-3">Account</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="#">Open an account</a></li>
              <li className="mb-2"><a href="#">Fund transfer</a></li>
              <li className="mb-2"><a href="#">60 day challenge</a></li>
            </ul>
          </div>
        </div>
        <hr className="my-4" />
        <div className="text-muted" style={{ fontSize: "12px" }}>
          <p>
            MarketPlus360 Broking Ltd.: Member of NSE & BSE – SEBI Registration no.:
            INZ000031633 CDSL: Depository services through MarketPlus360 Securities
            Pvt. Ltd. – SEBI Registration no.: IN-DP-100-2015
          </p>
          <p>
            Investments in securities market are subject to market risks; read
            all the related documents carefully before investing.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

