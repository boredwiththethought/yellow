import React, { useState } from "react";
import { Minus, Plus, ChevronRight } from "lucide-react";
import type { CartItem } from "../../../types/cart.types";
import type { CartItemProps } from "./types";

const CartItem: React.FC<CartItemProps> = ({ id, name, price, color, quantity, onRemove, onUpdateQuantity }) => {
  const [itemQuantity, setItemQuantity] = useState(quantity);

  const handleDecrease = () => {
    if (itemQuantity > 1) {
      const newQuantity = itemQuantity - 1;
      setItemQuantity(newQuantity);
      onUpdateQuantity?.(id, newQuantity);
    }
  };

  const handleIncrease = () => {
    const newQuantity = itemQuantity + 1;
    setItemQuantity(newQuantity);
    onUpdateQuantity?.(id, newQuantity);
  };

  return (
    <div className="container mx-auto mt-20 flex flex-col gap-[65px]">
      <div className="flex flex-col items-center justify-center gap-6">
        <h3
          className="text-center align-middle text-[42px] leading-8 font-normal tracking-[0px] text-black capitalize"
          style={{ fontFamily: "Volkhnov" }}
        >
          Shopping Cart
        </h3>
        <div className="flex items-center gap-3.5">
          <p
            className="text-center align-middle text-[15px] leading-[22.5px] font-normal tracking-[0px]"
            style={{ fontFamily: "Jost" }}
          >
            Home
          </p>
          <ChevronRight />
          <p
            className="text-center align-middle text-[16px] leading-6 font-normal tracking-[0px]"
            style={{ fontFamily: "Jost" }}
          >
            Your Shopping Cart
          </p>
        </div>
      </div>
      <div className="container flex flex-col gap-[35px] px-5 pt-16">
        <div className="flex items-center justify-between">
          <p
            className="text-center align-middle text-[22px] leading-8 font-normal tracking-[0px] capitalize"
            style={{ fontFamily: "Volkhov" }}
          >
            Product
          </p>
          <p
            className="text-center align-middle text-[22px] leading-8 font-normal tracking-[0px] capitalize"
            style={{ fontFamily: "Volkhov" }}
          >
            Price
          </p>
          <p
            className="text-center align-middle text-[22px] leading-8 font-normal tracking-[0px] capitalize"
            style={{ fontFamily: "Volkhov" }}
          >
            Quantity
          </p>
          <p
            className="text-center align-middle text-[22px] leading-8 font-normal tracking-[0px] capitalize"
            style={{ fontFamily: "Volkhov" }}
          >
            Total
          </p>
        </div>
        <div className="borde-[1px] border-[rgba(0, 0, 0, 0.39)] flex items-start border-t border-b pt-[35px] pb-11">
          <div className="flex items-start gap-[22px]">
            <img src="../../../../public/images/cart/Product Image.png" alt="product-item" />
            <div className="flex flex-col items-start gap-3.5">
              <span
                className="w-[200px] align-middle text-[22px] leading-[100%] font-normal tracking-[0px] capitalize"
                style={{ fontFamily: "Volkhov" }}
              >
                {name}
              </span>
              <span
                style={{ fontFamily: "Poppins" }}
                className="text-center align-middle text-[22px] leading-[42px] font-normal tracking-[0px] text-[#8A8A8A] capitalize"
              >
                Color: {color}
              </span>
              <button
                className="text-center align-middle text-[22px] leading-[42px] font-normal tracking-[0px] text-[#8A8A8A] capitalize underline decoration-solid decoration-0"
                style={{ fontFamily: "Poppins" }}
                onClick={() => onRemove?.(id)}
              >
                Remove
              </button>
            </div>
          </div>
          <span
            className="pl-[100px] text-center align-middle text-[22px] leading-8 font-normal tracking-[0px] capitalize"
            style={{ fontFamily: "Volkhov" }}
          >
            ${price}
          </span>
          <div className="ml-[375px] flex items-center gap-[19px] border border-[#8A8A8A] px-2.5 py-2">
            <Minus className="cursor-pointer" onClick={handleDecrease} />
            <span
              className="mx-4 text-center align-middle text-[25.02px] leading-[100%] font-normal tracking-[0px] text-[#8A8A8A] capitalize"
              style={{ fontFamily: "Poppins" }}
            >
              {itemQuantity}
            </span>
            <Plus className="cursor-pointer" onClick={handleIncrease} />
          </div>
          <div className="ml-[370px]">
            <span
              className="text-center align-middle text-[22px] leading-8 font-normal tracking-[0px] text-black capitalize"
              style={{ fontFamily: "Volkhov" }}
            >
              ${(price * itemQuantity).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
