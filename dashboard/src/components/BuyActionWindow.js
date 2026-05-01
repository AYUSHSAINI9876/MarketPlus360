import React, { useState, useContext } from "react";
import axios from "axios";

import GeneralContext from "./GeneralContext";

import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid, mode = "BUY" }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const { closeBuyWindow, closeSellWindow } = useContext(GeneralContext);

  const handleOrderClick = () => {
    axios.post("http://localhost:3005/newOrder", {
      name: uid,
      qty: stockQuantity,
      price: stockPrice,
      mode: mode,
    });

    if (mode === "BUY") {
      closeBuyWindow();
    } else {
      closeSellWindow();
    }
  };

  const handleCancelClick = () => {
    if (mode === "BUY") {
      closeBuyWindow();
    } else {
      closeSellWindow();
    }
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <h4 className={mode === "BUY" ? "text-primary" : "text-danger"}>
          {mode} {uid}
        </h4>
        <div className="inputs mt-3">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              className="form-control"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              className="form-control"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons mt-4">
        <span className="small text-muted">Margin required ₹{(stockQuantity * stockPrice * 0.2).toFixed(2)}</span>
        <div className="mt-3">
          <button 
            className={`btn ${mode === "BUY" ? "btn-primary" : "btn-danger"} me-2`} 
            onClick={handleOrderClick}
          >
            {mode}
          </button>
          <button className="btn btn-outline-secondary" onClick={handleCancelClick}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;

