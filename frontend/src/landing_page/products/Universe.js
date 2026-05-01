import { Link } from "react-router-dom";

function Universe() {
  return (
    <div className="container mt-5 py-5">
      <div className="row text-center">
        <h1 className="fw-bold mb-3">The MarketPlus360 Universe</h1>
        <p className="text-muted fs-5 mb-5">
          Extend your trading and investment experience even further with our
          partner platforms
        </p>

        <div className="col-12 col-md-4 p-3 mt-4">
          <img src="https://picsum.photos/seed/p1/150/50" className="img-fluid mb-3 grayscale-hover" alt="Partner 1" />
          <p className="text-small text-muted">Thematic investment platform</p>
        </div>
        <div className="col-12 col-md-4 p-3 mt-4">
          <img src="https://picsum.photos/seed/p2/150/50" className="img-fluid mb-3 grayscale-hover" alt="Partner 2" />
          <p className="text-small text-muted">Algo & strategy platform</p>
        </div>
        <div className="col-12 col-md-4 p-3 mt-4">
          <img src="https://picsum.photos/seed/p3/150/50" className="img-fluid mb-3 grayscale-hover" alt="Partner 3" />
          <p className="text-small text-muted">Options trading platform</p>
        </div>
        <div className="col-12 col-md-4 p-3 mt-4">
          <img src="https://picsum.photos/seed/p4/150/50" className="img-fluid mb-3 grayscale-hover" alt="Partner 4" />
          <p className="text-small text-muted">Investment research</p>
        </div>
        <div className="col-12 col-md-4 p-3 mt-4">
          <img src="https://picsum.photos/seed/p5/150/50" className="img-fluid mb-3 grayscale-hover" alt="Partner 5" />
          <p className="text-small text-muted">Taxation platform</p>
        </div>
        <div className="col-12 col-md-4 p-3 mt-4">
          <img src="https://picsum.photos/seed/p6/150/50" className="img-fluid mb-3 grayscale-hover" alt="Partner 6" />
          <p className="text-small text-muted">Bonds trading</p>
        </div>
        <div className="mt-5">
          <Link
            to="/signup"
            className="btn btn-primary btn-lg px-5 py-3 shadow-sm mx-auto"
            style={{ width: "fit-content", borderRadius: "4px" }}
          >
            Signup Now
          </Link>
        </div>
      </div>
    </div>
  );
}



export default Universe;
