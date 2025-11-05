import React from "react";
import { Link } from "react-router-dom";
import { Search, User, Heart, ShoppingCart } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-black">
            FASCO
          </Link>

          {/* Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            <Link to="/" className="text-gray-600 transition-colors hover:text-black">
              Home
            </Link>
            <Link to="/shop" className="text-gray-600 transition-colors hover:text-black">
              Shop
            </Link>
            <Link to="/products" className="text-gray-600 transition-colors hover:text-black">
              Products
            </Link>
            <Link to="/pages" className="text-gray-600 transition-colors hover:text-black">
              Pages
            </Link>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            <button className="rounded-full p-2 transition-colors hover:bg-gray-100">
              <Search className="h-5 w-5 text-gray-600" />
            </button>

            <Link to="/account" className="rounded-full p-2 transition-colors hover:bg-gray-100">
              <User className="h-5 w-5 text-gray-600" />
            </Link>

            <Link to="/wishlist" className="rounded-full p-2 transition-colors hover:bg-gray-100">
              <Heart className="h-5 w-5 text-gray-600" />
            </Link>

            <Link to="/cart" className="relative rounded-full p-2 transition-colors hover:bg-gray-100">
              <ShoppingCart className="h-5 w-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                2
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
