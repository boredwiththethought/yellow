import React from "react";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import CartItem from "../../components/cart/CartItem/CartItem";
import CartSummary from "../../components/cart/CartSummary/CartSummary";

const CartPage: React.FC = () => {
  return (
    <MainLayout showNewsletter={true}>
      {/* Breadcrumb */}
      <div className="border-b">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center gap-2 text-sm">
            <a href="/" className="text-gray-600 hover:text-black">
              Home
            </a>
            <span className="text-gray-400">/</span>
            <span className="text-black">Your Shopping Cart</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-12">
        {/* Title */}
        <h1 className="mb-2 text-center text-3xl font-bold">Shopping Cart</h1>
        <div className="mb-12 flex items-center justify-center gap-2 text-sm">
          <a href="/" className="text-gray-600 hover:text-black">
            Home
          </a>
          <span className="text-gray-400">/</span>
          <span className="text-black">Your Shopping Cart</span>
        </div>

        {/* Cart Content */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left: Cart Items */}
          <div className="lg:col-span-2">
            <div className="rounded-lg border bg-white">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 border-b px-6 py-4 font-medium">
                <div className="col-span-5">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-3 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              {/* Cart Items */}
              <CartItem
                id="1"
                name="Mini Dress With Ruffled Straps"
                price={14.9}
                image="/images/products/red-dress.jpg"
                color="Red"
                size="M"
                quantity={1}
              />
            </div>
          </div>

          {/* Right: Cart Summary */}
          <div className="lg:col-span-1">
            <CartSummary />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CartPage;
