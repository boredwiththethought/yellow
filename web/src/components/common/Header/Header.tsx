import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "./Navbar";
import { MobileMenu } from "./MobileMenu";
import { SearchIcon, HeartIcon, CartIcon, MenuIcon } from "../../../vector";
import { useCart } from "../../../context/CartContext";
import { useWishlist } from "../../../context/WishlistContext";
import { UserMenu } from "./UserMenu";

export const Header = () => {
  const { getCartCount } = useCart();
  const { getWishlistCount } = useWishlist();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartItemsCount = getCartCount();
  const wishlistCount = getWishlistCount();

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-3 md:py-4">
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="rounded-full p-2 transition-colors hover:bg-gray-100 md:hidden"
              aria-label="Open menu"
            >
              <MenuIcon className="h-6 w-6 text-gray-600" />
            </button>

            {/* Logo */}
            <Link
              to="/"
              className="text-2xl font-normal tracking-[0%] sm:text-3xl md:text-[52px]"
              style={{ fontFamily: "Volkhov" }}
            >
              FASCO
            </Link>

            {/* Desktop Navigation */}
            <Navbar />

            {/* Action buttons */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Search - hidden on small mobile */}
              <Link to="/search" className="hidden rounded-full p-2 transition-colors hover:bg-gray-100 sm:block">
                <SearchIcon className="h-5 w-5 text-gray-600" />
              </Link>

              {/* User Menu - hidden on mobile */}
              <div className="hidden sm:block">
                <UserMenu />
              </div>

              {/* Wishlist */}
              <Link to="/wishlist" className="relative rounded-full p-2 transition-colors hover:bg-gray-100">
                <HeartIcon className="h-5 w-5 text-gray-600" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                    {wishlistCount > 9 ? "9+" : wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link to="/cart" className="relative rounded-full p-2 transition-colors hover:bg-gray-100">
                <CartIcon className="h-5 w-5 text-gray-600" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] font-medium text-white">
                    {cartItemsCount > 9 ? "9+" : cartItemsCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
};

export default Header;
