import React, { useState, useEffect, useContext } from "react";
import api from "../api";
import GeneralContext from "./GeneralContext";
import { VerticalGraph } from "./VerticalGraph";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { refreshKey } = useContext(GeneralContext);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    api
      .get("/holdings")
      .then((res) => {
        if (isMounted) setAllHoldings(res.data);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [refreshKey]);

  const labels = allHoldings.map((subArray) => subArray["name"]);

  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings.map((stock) => stock.price),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const totalInvestment = allHoldings.reduce((sum, stock) => sum + stock.avg * stock.qty, 0);
  const currentValue = allHoldings.reduce((sum, stock) => sum + stock.price * stock.qty, 0);
  const pnl = currentValue - totalInvestment;
  const pnlPercent = totalInvestment > 0 ? (pnl / totalInvestment) * 100 : 0;

  if (isLoading) {
    return <h3 className="title">Loading holdings...</h3>;
  }

  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      {allHoldings.length === 0 ? (
        <p className="text-muted mt-4">You don't have any holdings yet. Buy a stock from the watchlist to get started.</p>
      ) : (
        <>
          <div className="order-table">
            <table>
              <tr>
                <th>Instrument</th>
                <th>Qty.</th>
                <th>Avg. cost</th>
                <th>LTP</th>
                <th>Cur. val</th>
                <th>P&L</th>
                <th>Net chg.</th>
                <th>Day chg.</th>
              </tr>

              {allHoldings.map((stock, index) => {
                const curValue = stock.price * stock.qty;
                const isProfit = curValue - stock.avg * stock.qty >= 0.0;
                const profClass = isProfit ? "profit" : "loss";
                const dayClass = stock.isLoss ? "loss" : "profit";

                return (
                  <tr key={index}>
                    <td>{stock.name}</td>
                    <td>{stock.qty}</td>
                    <td>{stock.avg.toFixed(2)}</td>
                    <td>{stock.price.toFixed(2)}</td>
                    <td>{curValue.toFixed(2)}</td>
                    <td className={profClass}>
                      {(curValue - stock.avg * stock.qty).toFixed(2)}
                    </td>
                    <td className={profClass}>{stock.net}</td>
                    <td className={dayClass}>{stock.day}</td>
                  </tr>
                );
              })}
            </table>
          </div>

          <div className="row">
            <div className="col">
              <h5>{totalInvestment.toFixed(2)}</h5>
              <p>Total investment</p>
            </div>
            <div className="col">
              <h5>{currentValue.toFixed(2)}</h5>
              <p>Current value</p>
            </div>
            <div className="col">
              <h5 className={pnl >= 0 ? "profit" : "loss"}>
                {pnl.toFixed(2)} ({pnlPercent.toFixed(2)}%)
              </h5>
              <p>P&L</p>
            </div>
          </div>
          <VerticalGraph data={data} />
        </>
      )}
    </>
  );
};

export default Holdings;
