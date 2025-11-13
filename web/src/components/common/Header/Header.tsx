import { Link } from "react-router-dom";
import { Navbar } from "./Navbar";
import { SearchIcon, HeartIcon, CartIcon } from "../../../vector";
import { useCart } from "../../../context/CartContext";
import { useWishlist } from "../../../context/WishlistContext";
import { UserMenu } from "./UserMenu";

export const Header = () => {
  const { getCartCount } = useCart();
  const { getWishlistCount } = useWishlist();

  const cartItemsCount = getCartCount();
  const wishlistCount = getWishlistCount();

  return (
    <header className="top-0 z-40 border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4">

        <div className="flex items-center justify-between py-4">

          <Link
            to="/"
            className="text-[52px] leading-[100%] font-normal tracking-[0%]"
            style={{ fontFamily: "Volkhov" }}
          >
            FASCO
          </Link>


          <Navbar />


          <div className="flex items-center gap-2">

            <Link to="/search" className="rounded-full p-2 transition-colors hover:bg-gray-100">
              <SearchIcon className="h-5 w-5 text-gray-600" />
            </Link>


            <UserMenu />


            <Link to="/wishlist" className="relative rounded-full p-2 transition-colors hover:bg-gray-100">
              <HeartIcon className="h-5 w-5 text-gray-600" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                  {wishlistCount}
                </span>
              )}
            </Link>


            <Link to="/cart" className="relative rounded-full p-2 transition-colors hover:bg-gray-100">
              <CartIcon className="h-5 w-5 text-gray-600" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] font-medium text-white">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
