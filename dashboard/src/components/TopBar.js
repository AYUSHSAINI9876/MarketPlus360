import React from "react";
import Menu from "./Menu";

const TopBar = () => {
  return (
    <div className="topbar-container">
      <div className="indices-container">
        <div className="index-item">
          <span className="index-label">NIFTY 50</span>
          <span className="index-points">22,453.30</span>
          <span className="index-change loss">-152.20 (-0.67%)</span>
        </div>
        <div className="index-item">
          <span className="index-label">SENSEX</span>
          <span className="index-points">73,878.15</span>
          <span className="index-change loss">-506.30 (-0.68%)</span>
        </div>
      </div>
      <Menu />
    </div>
  );
};

export default TopBar;

