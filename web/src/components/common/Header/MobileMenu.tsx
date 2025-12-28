import React from "react";
import { Link, useLocation } from "react-router-dom";
import { CloseIcon, SearchIcon, UserIcon } from "../../../vector";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Cart", href: "/cart" },
  { label: "Wishlist", href: "/wishlist" },
  { label: "Checkout", href: "/checkout" }
];

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity" onClick={onClose} />

      {/* Menu Panel */}
      <div className="fixed inset-y-0 left-0 z-50 w-full max-w-xs bg-white shadow-xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4">
            <Link to="/" onClick={onClose} className="text-2xl font-normal" style={{ fontFamily: "Volkhov" }}>
              FASCO
            </Link>
            <button
              onClick={onClose}
              className="rounded-full p-2 transition-colors hover:bg-gray-100"
              aria-label="Close menu"
            >
              <CloseIcon className="h-6 w-6 text-gray-600" />
            </button>
          </div>

          {/* Search */}
          <div className="border-b border-gray-200 px-4 py-3">
            <Link
              to="/search"
              onClick={onClose}
              className="flex items-center gap-3 rounded-lg bg-gray-100 px-4 py-3 text-gray-600 transition-colors hover:bg-gray-200"
            >
              <SearchIcon className="h-5 w-5" />
              <span className="text-sm">Search products...</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-4 py-4">
            <ul className="space-y-1">
              {navItems.map(item => {
                const isActive = location.pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      onClick={onClose}
                      className={`block rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                        isActive ? "bg-black text-white" : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer - Auth Links */}
          <div className="border-t border-gray-200 px-4 py-4">
            <Link
              to="/sign-in"
              onClick={onClose}
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 transition-colors hover:bg-gray-100"
            >
              <UserIcon className="h-5 w-5" />
              <span className="text-sm font-medium">Sign In / Sign Up</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
