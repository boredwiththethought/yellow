import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Gift } from "lucide-react";

interface CartSummaryProps {
  subtotal?: number;
  shipping?: number;
  discount?: number;
}

const CartSummary: React.FC<CartSummaryProps> = ({ subtotal = 100.0, shipping = 0, discount = 0 }) => {
  const [giftWrap, setGiftWrap] = useState(false);
  const giftWrapPrice = 10.0;

  const total = subtotal + shipping - discount + (giftWrap ? giftWrapPrice : 0);

  return (
    <div className="sticky top-4 rounded-lg border bg-white p-6">
      {/* Gift Wrap Option */}
      <div className="mb-6 flex items-center gap-3 rounded-lg border p-4">
        <input
          type="checkbox"
          id="gift-wrap"
          checked={giftWrap}
          onChange={e => setGiftWrap(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
        />
        <label htmlFor="gift-wrap" className="flex flex-1 cursor-pointer items-center gap-2">
          <Gift className="h-5 w-5 text-gray-600" />
          <span className="text-sm">
            For <span className="font-medium">${giftWrapPrice.toFixed(2)}</span> Please Wrap The Product.
          </span>
        </label>
      </div>

      {/* Summary */}
      <div className="mb-6 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium text-black">${subtotal.toFixed(2)}</span>
        </div>

        {shipping > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Shipping</span>
            <span className="font-medium text-black">${shipping.toFixed(2)}</span>
          </div>
        )}

        {discount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Discount</span>
            <span className="font-medium text-green-600">-${discount.toFixed(2)}</span>
          </div>
        )}

        {giftWrap && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Gift Wrap</span>
            <span className="font-medium text-black">${giftWrapPrice.toFixed(2)}</span>
          </div>
        )}
      </div>

      {/* Total */}
      <div className="mb-6 flex items-center justify-between border-t pt-4">
        <span className="font-medium text-gray-900">Total</span>
        <span className="text-2xl font-bold text-black">${total.toFixed(2)}</span>
      </div>

      {/* Checkout Button */}
      <Link
        to="/checkout"
        className="mb-3 block w-full rounded-lg bg-black py-3 text-center font-medium text-white transition-colors hover:bg-gray-800"
      >
        Checkout
      </Link>

      {/* View Cart Link */}
      <Link to="/cart" className="block w-full text-center text-sm text-gray-600 underline hover:text-black">
        View Cart
      </Link>
    </div>
  );
};

export default CartSummary;
