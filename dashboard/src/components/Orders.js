import React, { useState, useEffect } from "react";
import axios from "axios";

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3005/allOrders").then((res) => {
      setAllOrders(res.data);
    });
  }, []);

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
          <button className="btn btn-primary mt-3">Get started</button>
        </div>
      )}
    </div>
  );
};

export default Orders;
