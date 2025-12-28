import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../../components/common/Header/Header";
import Footer from "../../components/common/Footer/Footer";
import { useCart } from "../../context/CartContext";
import { Minus, Plus, Trash2, ShoppingBag, Package } from "lucide-react";

const FREE_SHIPPING_THRESHOLD = 122.35;
const GIFT_WRAP_PRICE = 10.0;

export const CartPage: React.FC = () => {
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const [giftWrap, setGiftWrap] = useState(false);

  const subtotal = getCartTotal();
  const total = subtotal + (giftWrap ? GIFT_WRAP_PRICE : 0);
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - total);

  const handleQuantityChange = (productId: string, delta: number) => {
    const item = cart.find(i => i._id === productId);
    if (item) {
      const newQty = item.quantity + delta;
      if (newQty <= 0) {
        removeFromCart(productId);
      } else {
        updateQuantity(productId, newQty);
      }
    }
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-4 sm:py-8">
          {/* Breadcrumb */}
          <div className="mb-4 text-xs text-gray-500 sm:mb-6 sm:text-sm" style={{ fontFamily: "Poppins" }}>
            <Link to="/shop" className="hover:underline">
              Shop
            </Link>{" "}
            / <span>Cart</span>
          </div>

          <h1 className="mb-6 text-2xl font-bold sm:mb-8 sm:text-3xl" style={{ fontFamily: "Volkhov" }}>
            Shopping Cart
          </h1>

          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center sm:py-16">
              <ShoppingBag size={48} className="mb-4 text-gray-300 sm:h-16 sm:w-16" />
              <p className="mb-2 text-base font-medium text-gray-600 sm:text-lg" style={{ fontFamily: "Poppins" }}>
                Your cart is empty
              </p>
              <p className="mb-6 text-xs text-gray-500 sm:text-sm" style={{ fontFamily: "Poppins" }}>
                Looks like you haven't added anything to your cart yet
              </p>
              <Link
                to="/shop"
                className="inline-block rounded bg-black px-6 py-2.5 text-sm text-white transition-colors hover:bg-gray-800 sm:px-8 sm:py-3"
                style={{ fontFamily: "Poppins" }}
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
              <div className="lg:col-span-2">
                {remainingForFreeShipping > 0 ? (
                  <div
                    className="mb-6 rounded-lg p-4 text-center text-sm"
                    style={{
                      background: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
                      color: "#92400e",
                      fontFamily: "Poppins",
                      borderBottom: "2px solid #fcd34d"
                    }}
                  >
                    <Package size={20} className="mb-2 inline-block" />
                    <p>
                      Buy <strong>${remainingForFreeShipping.toFixed(2)}</strong> more and get{" "}
                      <strong>Free Shipping</strong>
                    </p>
                  </div>
                ) : (
                  <div
                    className="mb-6 rounded-lg p-4 text-center text-sm"
                    style={{
                      background: "linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)",
                      color: "#065f46",
                      fontFamily: "Poppins",
                      borderBottom: "2px solid #6ee7b7"
                    }}
                  >
                    🎉 You've qualified for <strong>Free Shipping!</strong>
                  </div>
                )}

                <div className="space-y-3 sm:space-y-4">
                  {cart.map(item => (
                    <div
                      key={`${item._id}-${item.selectedSize}-${item.selectedColor}`}
                      className="flex gap-3 rounded-lg border border-gray-200 bg-white p-3 shadow-sm transition-shadow hover:shadow-md sm:gap-4 sm:p-4"
                    >
                      <Link
                        to={`/product/${item._id}`}
                        className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-100 sm:h-32 sm:w-32"
                      >
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="h-full w-full object-cover transition-transform hover:scale-105"
                        />
                      </Link>

                      <div className="flex min-w-0 flex-1 flex-col justify-between">
                        <div>
                          <Link to={`/product/${item._id}`}>
                            <h3
                              className="mb-1 truncate text-sm font-semibold text-gray-900 hover:text-gray-600 sm:mb-2 sm:text-base"
                              style={{ fontFamily: "Poppins" }}
                            >
                              {item.name}
                            </h3>
                          </Link>
                          <div
                            className="mb-2 flex flex-wrap gap-2 text-xs text-gray-600 sm:mb-3 sm:gap-4 sm:text-sm"
                            style={{ fontFamily: "Poppins" }}
                          >
                            {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                            {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                          </div>
                          <p className="text-base font-bold text-gray-900 sm:text-lg" style={{ fontFamily: "Poppins" }}>
                            ${item.price.toFixed(2)}
                          </p>
                        </div>

                        <div className="mt-2 flex flex-wrap items-center justify-between gap-2 sm:mt-0">
                          <div className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-2 py-1.5 sm:gap-3 sm:px-3 sm:py-2">
                            <button
                              onClick={() => handleQuantityChange(item._id, -1)}
                              className="flex items-center justify-center text-gray-600 transition-colors hover:text-gray-900"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={14} className="sm:h-4 sm:w-4" />
                            </button>
                            <span
                              className="min-w-6 text-center text-sm font-semibold text-gray-900 sm:min-w-8"
                              style={{ fontFamily: "Poppins" }}
                            >
                              {item.quantity.toString().padStart(2, "0")}
                            </span>
                            <button
                              onClick={() => handleQuantityChange(item._id, 1)}
                              className="flex items-center justify-center text-gray-600 transition-colors hover:text-gray-900"
                              aria-label="Increase quantity"
                            >
                              <Plus size={14} className="sm:h-4 sm:w-4" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item._id)}
                            className="flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50 sm:gap-2 sm:px-3 sm:py-2 sm:text-sm"
                            style={{ fontFamily: "Poppins" }}
                            aria-label="Remove item"
                          >
                            <Trash2 size={16} className="sm:h-[18px] sm:w-[18px]" />
                            <span className="xs:inline hidden sm:inline">Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="sticky top-20 rounded-lg border border-gray-200 bg-gray-50 p-4 shadow-sm sm:p-6">
                  <h2
                    className="mb-3 text-lg font-semibold text-gray-900 sm:mb-4 sm:text-xl"
                    style={{ fontFamily: "Volkhov" }}
                  >
                    Order Summary
                  </h2>

                  <div className="space-y-2 border-b border-gray-200 pb-3 sm:space-y-3 sm:pb-4">
                    <div className="flex justify-between text-xs sm:text-sm" style={{ fontFamily: "Poppins" }}>
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xs sm:text-sm" style={{ fontFamily: "Poppins" }}>
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium text-gray-900">
                        {total >= FREE_SHIPPING_THRESHOLD ? "Free" : "Calculated at checkout"}
                      </span>
                    </div>
                  </div>

                  <div className="border-b border-gray-200 py-3 sm:py-4">
                    <label className="flex cursor-pointer items-start gap-3" style={{ fontFamily: "Poppins" }}>
                      <input
                        type="checkbox"
                        checked={giftWrap}
                        onChange={e => setGiftWrap(e.target.checked)}
                        className="mt-0.5 h-4 w-4 cursor-pointer rounded accent-black"
                      />
                      <span className="text-xs text-gray-700 sm:text-sm">
                        Gift wrap for <strong className="text-gray-900">${GIFT_WRAP_PRICE.toFixed(2)}</strong>
                      </span>
                    </label>
                  </div>

                  <div
                    className="mt-3 mb-4 flex justify-between text-base font-bold sm:mt-4 sm:mb-6 sm:text-lg"
                    style={{ fontFamily: "Poppins" }}
                  >
                    <span className="text-gray-900">Total</span>
                    <span className="text-gray-900">${total.toFixed(2)}</span>
                  </div>

                  <Link
                    to="/checkout"
                    className="mb-3 block w-full rounded-lg bg-black py-2.5 text-center text-sm font-semibold text-white transition-all hover:bg-gray-800 hover:shadow-lg sm:py-3"
                    style={{ fontFamily: "Poppins" }}
                  >
                    Proceed to Checkout
                  </Link>

                  <Link
                    to="/shop"
                    className="block w-full text-center text-xs font-medium text-gray-600 underline transition-colors hover:text-gray-900 sm:text-sm"
                    style={{ fontFamily: "Poppins" }}
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
