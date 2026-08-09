import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Navbar from "./landing_page/Navbar";
import Footer from "./landing_page/Footer";

const HomePage = lazy(() => import("./landing_page/home/HomePage"));
const Signup = lazy(() => import("./landing_page/signup/Signup"));
const Login = lazy(() => import("./landing_page/login/Login"));
const AboutPage = lazy(() => import("./landing_page/about/AboutPage"));
const ProductPage = lazy(() => import("./landing_page/products/ProductsPage"));
const PricingPage = lazy(() => import("./landing_page/pricing/PricingPage"));
const SupportPage = lazy(() => import("./landing_page/support/SupportPage"));
const NotFound = lazy(() => import("./landing_page/NotFound"));

const PageLoader = () => (
  <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Navbar />
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
    <Footer />
  </BrowserRouter>
);
