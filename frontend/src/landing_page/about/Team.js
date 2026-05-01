import React from "react";

function Team() {
  return (
    <div className="container">
      <div className="row p-3 mt-5 border-top">
        <h1 className="text-center ">People</h1>
      </div>

      <div
        className="row p-3 text-muted"
        style={{ lineHeight: "1.8", fontSize: "1.2em" }}
      >
        <div className="col-12 col-md-6 p-3 text-center">
          <img
            src="https://picsum.photos/seed/founder/400/400"
            style={{ borderRadius: "50%", width: "60%", border: "4px solid var(--primary-color)" }}
            className="shadow-lg mb-4"
            alt="Ayush Saini"
          />
          <h4 className="fw-bold">Ayush Saini</h4>
          <h6 className="text-muted">Founder, CEO</h6>
        </div>

        <div className="col-6 p-3">
          <p>
            Ayush bootstrapped and founded MarketPlus360 in 2024 to overcome the
            hurdles he faced during his decade long stint as a trader. Today,
            MarketPlus360 has changed the landscape of the Indian broking
            industry.
          </p>
          <p>
            He is a member of the SEBI Secondary Market Advisory Committee
            (SMAC) and the Market Data Advisory Committee (MDAC).
          </p>
          <p>Playing basketball is his zen.</p>
          <p>
            Connect on <a href="">Homepage</a> / <a href="">TradingQnA</a> /{" "}
            <a href="">Twitter</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Team;
