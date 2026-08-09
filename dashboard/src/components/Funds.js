import React, { useState, useEffect, useContext } from "react";
import api from "../api";
import GeneralContext from "./GeneralContext";

const Funds = () => {
  const [funds, setFunds] = useState({ balance: 0 });
  const [amount, setAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useContext(GeneralContext);

  const loadFunds = () => {
    api.get("/funds").then((res) => setFunds(res.data));
  };

  useEffect(loadFunds, []);

  const handleAdjust = async (action) => {
    const value = Number(amount);
    if (!Number.isFinite(value) || value <= 0) {
      showToast("Enter a valid amount.", "error");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await api.post(`/funds/${action}`, { amount: value });
      setFunds(res.data);
      setAmount("");
      showToast(action === "add" ? "Funds added successfully." : "Funds withdrawn successfully.", "success");
    } catch (err) {
      showToast(err.response?.data?.message || "Could not update funds.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="funds">
        <p>Simulated paper-trading balance &mdash; no real money is involved.</p>
        <div className="d-flex align-items-center gap-2 flex-wrap">
          <input
            type="number"
            min="1"
            step="0.01"
            className="form-control"
            style={{ maxWidth: "200px", display: "inline-block" }}
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button className="btn btn-green" disabled={isSubmitting} onClick={() => handleAdjust("add")}>
            Add funds
          </button>
          <button className="btn btn-blue" disabled={isSubmitting} onClick={() => handleAdjust("withdraw")}>
            Withdraw
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <span>
            <p>Equity</p>
          </span>

          <div className="table">
            <div className="data">
              <p>Available margin</p>
              <p className="imp colored">{funds.balance?.toFixed(2) ?? "0.00"}</p>
            </div>
            <div className="data">
              <p>Used margin</p>
              <p className="imp">0.00</p>
            </div>
            <div className="data">
              <p>Available cash</p>
              <p className="imp">{funds.balance?.toFixed(2) ?? "0.00"}</p>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="commodity">
            <p>You don't have a commodity account</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Funds;
