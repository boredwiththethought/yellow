import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Square } from "lucide-react";

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
    <div className="container mx-auto flex pt-[30px] pb-[100px] px-4">
      <div className=" flex flex-col ml-auto">
        <div className="border-[rgba(0, 0, 0, 0.39)] flex items-center gap-3 border-b pb-5">
          <Square
            className="cursor-pointer"
            onInput={() => setGiftWrap(!giftWrap)}
            onClick={() => setGiftWrap(!giftWrap)}
            aria-checked={giftWrap}
            fill={giftWrap ? "black" : "none"}
          />
          <div className="flex items-center gap-1">
            <p
              style={{ fontFamily: "Poppins" }}
              className="text-center align-middle text-[22px] leading-[42px] font-normal tracking-[0px] text-[#8A8A8A] capitalize"
            >
              For
            </p>{" "}
            <span
              style={{ fontFamily: "Poppins" }}
              className="text-center align-middle text-[22px] leading-[42px] font-normal tracking-[0px] capitalize"
            >
              {giftWrap ? "$0.00" : "$10.00"}
            </span>{" "}
            <span
              style={{ fontFamily: "Poppins" }}
              className="text-center align-middle text-[22px] leading-[42px] font-normal tracking-[0px] text-[#8A8A8A] capitalize"
            >
              please wrap the product
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between pt-11">
          <span
            style={{ fontFamily: "Volkhov" }}
            className="text-center align-middle text-[22px] leading-8 font-normal tracking-[0px] capitalize"
          >
            Subtotal
          </span>
          <span
            style={{ fontFamily: "Volkhov" }}
            className="text-center align-middle text-[22px] leading-[32px] font-normal tracking-[0px] capitalize"
          >
            ${total}
          </span>
        </div>
        <Link to="/checkout" className="mt-7 flex justify-center rounded-xl bg-black py-6">
          <button
            className="text-[16px] leading-[100%] font-normal tracking-[0px] text-white"
            style={{ fontFamily: "Poppins" }}
          >
            Checkout
          </button>
        </Link>
        <Link
          to="./cart"
          className="cursor-pointer pt-3.5 text-center align-middle text-[22px] leading-8 font-normal tracking-[0px] capitalize underline decoration-solid decoration-0"
          onClick={() => {}}
          style={{ fontFamily: "Volkhov" }}
        >
          View Cart
        </Link>
      </div>
    </div>
  );
};

export default CartSummary;
