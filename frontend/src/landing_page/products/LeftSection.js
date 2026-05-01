import React from "react";

function LeftSection({
  imageURL,
  productName,
  productDesription,
  tryDemo,
  learnMore,
  googlePlay,
  appStore,
}) {
  return (
    <div className="container py-5">
      <div className="row align-items-center">
        <div className="col-12 col-md-6 mb-4 mb-md-0 text-center">
          <img src={imageURL} className="img-fluid rounded shadow-sm" style={{ maxHeight: "400px" }} alt={productName} />
        </div>
        <div className="col-12 col-md-6 ps-md-5">
          <h1 className="fw-bold mb-4">{productName}</h1>
          <p className="text-muted fs-5 mb-4">{productDesription}</p>
          <div className="d-flex gap-4 mb-5">
            <a href={tryDemo} className="text-decoration-none fw-bold">Try Demo <i className="fas fa-arrow-right small"></i></a>
            <a href={learnMore} className="text-decoration-none fw-bold">Learn More <i className="fas fa-arrow-right small"></i></a>
          </div>
          <div className="d-flex gap-3">
             <a href={googlePlay} className="btn btn-dark px-4 py-2"><i className="fab fa-google-play me-2"></i> Play Store</a>
             <a href={appStore} className="btn btn-dark px-4 py-2"><i className="fab fa-apple me-2"></i> App Store</a>
          </div>
        </div>
      </div>
    </div>

  );
}

export default LeftSection;
