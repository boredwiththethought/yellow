import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import CartPage from "./pages/CartPage/CartPage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import ThankYouPage from "./pages/ThankYouPage/ThankYouPage";
import HomePage from "./pages/HomePage/HomePage";
import ScrollToTop from "./components/ScrollToTop";
import ShopPage from "./pages/ShopPage/ShopPage";
import WishlistPage from "./pages/WishlistPage/WishlistPage";
import ProductPage from "./pages/ProductPage/ProductPage";
import { MiniCart } from "./components/cart/MiniCart";

import SingInPage from "./pages/auth/SingInPage";
import SingUpPage from "./pages/auth/SingUpPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ConfirmationPage from "./pages/auth/ConfirmationPage";
import EnterNewPasswordPage from "./pages/auth/EnterNewPasswordPage";

const App: React.FC = () => {
  const [miniCartOpen, setMiniCartOpen] = useState(false);

  return (
    <div className="app">
      <ScrollToTop />
      <Routes>

        <Route path="/" element={<HomePage />} />


        <Route path="/shop" element={<ShopPage />} />
        <Route path="/product/:id" element={<ProductPage onAddToCart={() => setMiniCartOpen(true)} />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />

        <Route path="/thank-you" element={<ThankYouPage />} />

 
        <Route path="/sign-in" element={<SingInPage />} />
        <Route path="/sign-up" element={<SingUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/enter-new-password" element={<EnterNewPasswordPage />} />
      </Routes>

      <MiniCart isOpen={miniCartOpen} onClose={() => setMiniCartOpen(false)} />
    </div>
  );
};

export default App;
