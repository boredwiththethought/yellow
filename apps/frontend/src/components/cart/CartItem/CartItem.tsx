import React, { useState } from "react";
import { X, Minus, Plus } from "lucide-react";

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  image: string;
  color?: string;
  size?: string;
  quantity: number;
  onRemove?: (id: string) => void;
  onUpdateQuantity?: (id: string, quantity: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  price,
  image,
  color,
  size,
  quantity: initialQuantity,
  onRemove,
  onUpdateQuantity
}) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    setQuantity(newQuantity);
    onUpdateQuantity?.(id, newQuantity);
  };

  const total = price * quantity;

  return (
    <div className="grid grid-cols-12 items-center gap-4 border-b px-6 py-6 transition-colors hover:bg-gray-50">
      {/* Product Info */}
      <div className="col-span-5 flex items-center gap-4">
        {/* Image */}
        <div className="h-24 w-20 flex-shrink-0 overflow-hidden rounded bg-gray-100">
          <img src={image} alt={name} className="h-full w-full object-cover" />
        </div>

        {/* Details */}
        <div className="min-w-0 flex-1">
          <h3 className="mb-2 truncate font-medium text-black">{name}</h3>
          {color && (
            <p className="text-sm text-gray-500">
              <span className="font-medium">Color:</span> {color}
            </p>
          )}
          {size && (
            <p className="text-sm text-gray-500">
              <span className="font-medium">Size:</span> {size}
            </p>
          )}
        </div>
      </div>

      {/* Price */}
      <div className="col-span-2 text-center">
        <span className="font-medium text-black">${price.toFixed(2)}</span>
      </div>

      {/* Quantity */}
      <div className="col-span-3 flex justify-center">
        <div className="flex items-center rounded border">
          <button
            onClick={() => handleQuantityChange(quantity - 1)}
            className="p-2 transition-colors hover:bg-gray-100"
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </button>

          <input
            type="number"
            value={quantity}
            onChange={e => handleQuantityChange(Number(e.target.value))}
            className="w-12 border-x py-2 text-center focus:outline-none"
            min="1"
          />

          <button
            onClick={() => handleQuantityChange(quantity + 1)}
            className="p-2 transition-colors hover:bg-gray-100"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Total */}
      <div className="col-span-2 flex items-center justify-end gap-4 text-right">
        <span className="font-bold text-black">${total.toFixed(2)}</span>

        {/* Remove Button */}
        <button
          onClick={() => onRemove?.(id)}
          className="text-gray-400 transition-colors hover:text-red-500"
          aria-label="Remove item"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
