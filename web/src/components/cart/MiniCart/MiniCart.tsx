import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import "./MiniCart.css";

interface MiniCartProps {
  isOpen: boolean;
  onClose: () => void;
}

const FREE_SHIPPING_THRESHOLD = 122.35;
const GIFT_WRAP_PRICE = 10.0;

export const MiniCart: React.FC<MiniCartProps> = ({ isOpen, onClose }) => {
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
    <>

      <div className={`mini-cart-backdrop ${isOpen ? "open" : ""}`} onClick={onClose} />


      <div className={`mini-cart-sidebar ${isOpen ? "open" : ""}`}>
        <div className="mini-cart-header">
          <h2 className="mini-cart-title">Shopping Cart</h2>
          <button className="mini-cart-close" onClick={onClose} aria-label="Close cart">
            <X size={24} />
          </button>
        </div>


        {remainingForFreeShipping > 0 ? (
          <div className="mini-cart-shipping-banner">
            Buy <strong>${remainingForFreeShipping.toFixed(2)}</strong> more and get <strong>Free Shipping</strong>
          </div>
        ) : (
          <div className="mini-cart-shipping-banner success">
            🎉 You've qualified for <strong>Free Shipping!</strong>
          </div>
        )}


        <div className="mini-cart-items">
          {cart.length === 0 ? (
            <div className="mini-cart-empty">
              <p>Your cart is empty</p>
              <Link to="/shop" onClick={onClose} className="mini-cart-shop-link">
                Continue Shopping
              </Link>
            </div>
          ) : (
            cart.map(item => (
              <div key={`${item._id}-${item.selectedSize}-${item.selectedColor}`} className="mini-cart-item">
                <Link to={`/product/${item._id}`} onClick={onClose} className="mini-cart-item-image">
                  <img src={item.images[0]} alt={item.name} />
                </Link>

                <div className="mini-cart-item-info">
                  <Link to={`/product/${item._id}`} onClick={onClose} className="mini-cart-item-name">
                    {item.name}
                  </Link>
                  <div className="mini-cart-item-meta">
                    {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                    {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                  </div>
                  <div className="mini-cart-item-price">${item.price.toFixed(2)}</div>

                  <div className="mini-cart-item-actions">
                    <div className="mini-cart-qty">
                      <button onClick={() => handleQuantityChange(item._id, -1)} aria-label="Decrease quantity">
                        <Minus size={14} />
                      </button>
                      <span>{item.quantity.toString().padStart(2, "0")}</span>
                      <button onClick={() => handleQuantityChange(item._id, 1)} aria-label="Increase quantity">
                        <Plus size={14} />
                      </button>
                    </div>
                    <button
                      className="mini-cart-remove"
                      onClick={() => removeFromCart(item._id)}
                      aria-label="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <>

            <div className="mini-cart-gift-wrap">
              <label className="mini-cart-checkbox">
                <input type="checkbox" checked={giftWrap} onChange={e => setGiftWrap(e.target.checked)} />
                <span>
                  For <strong>${GIFT_WRAP_PRICE.toFixed(2)}</strong> Please Wrap The Product
                </span>
              </label>
            </div>


            <div className="mini-cart-footer">
              <div className="mini-cart-subtotal">
                <span>Subtotal</span>
                <span className="mini-cart-subtotal-amount">${total.toFixed(2)}</span>
              </div>

              <Link to="/checkout" onClick={onClose} className="mini-cart-checkout-btn">
                Checkout
              </Link>

              <Link to="/cart" onClick={onClose} className="mini-cart-view-cart">
                View Cart
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};
