
import React from "react";
import { Routes, Route } from "react-router-dom";


import CartPage from "./pages/CartPage/CartPage";
import ThankYouPage from "./pages/ThankYouPage/ThankYouPage";
import HomePage from "./pages/HomePage/HomePage";
import ScrollToTop from "./components/ScrollToTop";
import ShopPage from "./pages/ShopPage/ShopPage";

const App: React.FC = () => {
  return (
    <div className="app">
      <ScrollToTop />
      <Routes>
        {/* Главная - показываем Home Page */}
        <Route path="/" element={<HomePage />} />

        {/* Cart Page */}
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/cart" element={<CartPage />} />

        {/* Thank You Page */}
        <Route path="/thank-you" element={<ThankYouPage />} />
      </Routes>
    </div>
  );
};

export default App;
