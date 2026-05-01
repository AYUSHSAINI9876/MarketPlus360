import React from "react";

function RightSection({ imageURL, productName, productDesription, learnMore }) {
  return (
    <div className="container py-5">
      <div className="row align-items-center">
        <div className="col-12 col-md-6 pe-md-5 order-2 order-md-1">
          <h1 className="fw-bold mb-4">{productName}</h1>
          <p className="text-muted fs-5 mb-4">{productDesription}</p>
          <div>
            <a href={learnMore} className="text-decoration-none fw-bold">Learn More <i className="fas fa-arrow-right small"></i></a>
          </div>
        </div>
        <div className="col-12 col-md-6 mb-4 mb-md-0 text-center order-1 order-md-2">
          <img src={imageURL} className="img-fluid rounded shadow-sm" style={{ maxHeight: "400px" }} alt={productName} />
        </div>
      </div>
    </div>

  );
}

export default RightSection;
