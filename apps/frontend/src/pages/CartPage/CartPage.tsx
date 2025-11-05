import React from "react";
import CartItem from "../../components/cart/CartItem/CartItem";
import  CartSummaryData  from "../../components/cart/CartSummary/CartSummary";
import { Header } from "../../components/common/Header/Header";
import Footer from "../../components/common/Footer/Footer";

export const CartPage: React.FC = () => {
  return (
    <div>
      <Header />
      <CartItem id={"1"} name={"Mini dress with ruffled straps"} price={14.90} color="Red" quantity={0} />
      <CartSummaryData />
      <Footer />
    </div>
  );
};

export default CartPage;
