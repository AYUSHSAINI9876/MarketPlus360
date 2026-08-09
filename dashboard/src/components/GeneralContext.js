import React, { useState, useCallback } from "react";

import BuyActionWindow from "./BuyActionWindow";
import Toast from "./Toast";

const GeneralContext = React.createContext({
  openBuyWindow: (uid, price) => {},
  closeBuyWindow: () => {},
  openSellWindow: (uid, price) => {},
  closeSellWindow: () => {},
  refreshKey: 0,
  triggerRefresh: () => {},
  showToast: (message, type) => {},
});

export const GeneralContextProvider = (props) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [isSellWindowOpen, setIsSellWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");
  const [selectedStockPrice, setSelectedStockPrice] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);
  const [toast, setToast] = useState({ message: "", type: "success" });

  const handleOpenBuyWindow = (uid, price = 0) => {
    setIsBuyWindowOpen(true);
    setSelectedStockUID(uid);
    setSelectedStockPrice(price);
  };

  const handleCloseBuyWindow = () => {
    setIsBuyWindowOpen(false);
    setSelectedStockUID("");
  };

  const handleOpenSellWindow = (uid, price = 0) => {
    setIsSellWindowOpen(true);
    setSelectedStockUID(uid);
    setSelectedStockPrice(price);
  };

  const handleCloseSellWindow = () => {
    setIsSellWindowOpen(false);
    setSelectedStockUID("");
  };

  const triggerRefresh = useCallback(() => {
    setRefreshKey((key) => key + 1);
  }, []);

  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type });
  }, []);

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow: handleOpenBuyWindow,
        closeBuyWindow: handleCloseBuyWindow,
        openSellWindow: handleOpenSellWindow,
        closeSellWindow: handleCloseSellWindow,
        refreshKey,
        triggerRefresh,
        showToast,
      }}
    >
      {props.children}
      {isBuyWindowOpen && <BuyActionWindow uid={selectedStockUID} price={selectedStockPrice} />}
      {isSellWindowOpen && <BuyActionWindow uid={selectedStockUID} price={selectedStockPrice} mode="SELL" />}
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: "", type: "success" })} />
    </GeneralContext.Provider>
  );
};


export default GeneralContext;
