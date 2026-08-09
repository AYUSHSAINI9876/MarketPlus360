import React, { useState, useEffect, useContext } from "react";
import api from "../api";
import GeneralContext from "./GeneralContext";

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { refreshKey } = useContext(GeneralContext);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    api
      .get("/orders")
      .then((res) => {
        if (isMounted) setAllOrders(res.data);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [refreshKey]);

  if (isLoading) {
    return (
      <div className="orders-container">
        <h3 className="title">Loading orders...</h3>
      </div>
    );
  }

  return (
    <div className="orders-container">
      {allOrders.length > 0 ? (
        <>
          <h3 className="title">Orders ({allOrders.length})</h3>
          <div className="order-table">
            <table>
              <thead>
                <tr>
                  <th>Instrument</th>
                  <th>Qty.</th>
                  <th>Price</th>
                  <th>Mode</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {allOrders.map((order, index) => (
                  <tr key={index}>
                    <td>{order.name}</td>
                    <td>{order.qty}</td>
                    <td>{order.price.toFixed(2)}</td>
                    <td>
                      <span className={`badge ${order.mode === "BUY" ? "bg-primary" : "bg-danger"}`}>
                        {order.mode}
                      </span>
                    </td>
                    <td><span className="text-success">Executed</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="no-orders text-center mt-5">
          <p className="text-muted fs-4">You haven't placed any orders today</p>
        </div>
      )}
    </div>
  );
};

export default Orders;
