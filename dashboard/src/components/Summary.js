import React, { useState, useEffect, useContext } from "react";
import api from "../api";
import GeneralContext from "./GeneralContext";
import { useAuth } from "../context/AuthContext";
import { PieChartOutline, WorkOutline } from "@mui/icons-material";

const Summary = () => {
  const [holdings, setHoldings] = useState([]);
  const [funds, setFunds] = useState({ balance: 0 });
  const { refreshKey } = useContext(GeneralContext);
  const { user } = useAuth();

  useEffect(() => {
    let isMounted = true;
    Promise.all([api.get("/holdings"), api.get("/funds")]).then(([holdingsRes, fundsRes]) => {
      if (!isMounted) return;
      setHoldings(holdingsRes.data);
      setFunds(fundsRes.data);
    });
    return () => {
      isMounted = false;
    };
  }, [refreshKey]);

  const totalInvestment = holdings.reduce((sum, stock) => sum + stock.avg * stock.qty, 0);
  const currentValue = holdings.reduce((sum, stock) => sum + stock.price * stock.qty, 0);
  const pnl = currentValue - totalInvestment;
  const pnlPercent = totalInvestment > 0 ? (pnl / totalInvestment) * 100 : 0;

  return (
    <div className="summary-container">
      <div className="username mb-4">
        <h2 className="fw-bold">Hi, {user?.name || "Trader"}!</h2>
        <p className="text-muted">Welcome back to your trading dashboard.</p>
      </div>

      <div className="row">
        <div className="col">
          <div className="title">
             <PieChartOutline className="section-icon" style={{ fontSize: "1rem" }} /> Equity
          </div>
          <div className="d-flex align-items-center justify-content-between mt-4">
            <div>
              <h5 className="mb-0">{funds.balance?.toFixed(2) ?? "0.00"}</h5>
              <p>Margin available</p>
            </div>
            <div className="text-end">
              <p className="mb-1">Invested: <strong>{totalInvestment.toFixed(2)}</strong></p>
              <p className="mb-0">Current value: <strong>{currentValue.toFixed(2)}</strong></p>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="title">
             <WorkOutline className="section-icon" style={{ fontSize: "1rem" }} /> Holdings ({holdings.length})
          </div>
          <div className="d-flex align-items-center justify-content-between mt-4">
            <div>
              <h5 className={`mb-0 ${pnl >= 0 ? "profit" : "loss"}`}>
                {pnl.toFixed(2)} <small className="fs-6">({pnlPercent.toFixed(2)}%)</small>
              </h5>
              <p>P&L</p>
            </div>
            <div className="text-end">
              <p className="mb-1">Current Value: <strong>{currentValue.toFixed(2)}</strong></p>
              <p className="mb-0">Investment: <strong>{totalInvestment.toFixed(2)}</strong></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
