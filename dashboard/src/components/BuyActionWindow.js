import React, { useState, useContext } from "react";
import api from "../api";

import GeneralContext from "./GeneralContext";

import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid, price = 0, mode = "BUY" }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(price);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { closeBuyWindow, closeSellWindow, triggerRefresh, showToast } = useContext(GeneralContext);

  const closeWindow = () => (mode === "BUY" ? closeBuyWindow() : closeSellWindow());

  const handleOrderClick = async () => {
    const qty = Number(stockQuantity);
    const orderPrice = Number(stockPrice);

    if (!Number.isInteger(qty) || qty <= 0) {
      showToast("Quantity must be a positive whole number.", "error");
      return;
    }
    if (!Number.isFinite(orderPrice) || orderPrice <= 0) {
      showToast("Price must be greater than zero.", "error");
      return;
    }

    setIsSubmitting(true);
    try {
      await api.post("/orders", { name: uid, qty, price: orderPrice, mode });
      showToast(`${mode} order for ${qty} ${uid} placed successfully.`, "success");
      triggerRefresh();
      closeWindow();
    } catch (err) {
      showToast(err.response?.data?.message || "Order could not be placed.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelClick = () => {
    closeWindow();
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
              min="1"
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
              min="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons mt-4">
        <span className="small text-muted">Order value: ₹{(stockQuantity * stockPrice).toFixed(2)}</span>
        <div className="mt-3">
          <button
            className={`btn ${mode === "BUY" ? "btn-primary" : "btn-danger"} me-2`}
            onClick={handleOrderClick}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Placing..." : mode}
          </button>
          <button className="btn btn-outline-secondary" onClick={handleCancelClick} disabled={isSubmitting}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
