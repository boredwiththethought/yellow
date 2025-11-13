import { useState, useRef, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserIcon } from "../../../vector";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { useAuth } from "../../../context/AuthContext";

export const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  useClickOutside(menuRef, () => setIsOpen(false));

  const displayName = useMemo(() => {
    if (user?.firstName || user?.lastName) {
      return `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim();
    }
    return user?.email ?? "Guest";
  }, [user]);

  const AuthedMenu = (
    <>
      <div className="border-b border-gray-100 px-4 py-2">
        <p className="font-medium text-gray-900">{displayName}</p>
        {user?.email && <p className="text-xs text-gray-500">{user.email}</p>}
      </div>

      <Link
        to="/wishlist"
        onClick={() => setIsOpen(false)}
        className="block px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50 hover:text-black"
      >
        Wishlist
      </Link>
      <Link
        to="/cart"
        onClick={() => setIsOpen(false)}
        className="block px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50 hover:text-black"
      >
        Cart
      </Link>

      <div className="mt-2 border-t border-gray-100 pt-2">
        <button
          onClick={() => {
            logout();
            setIsOpen(false);
            navigate("/");
          }}
          className="block w-full px-4 py-2 text-left text-red-600 transition-colors hover:bg-gray-50 hover:text-red-700"
        >
          Sign Out
        </button>
      </div>
    </>
  );

  const GuestMenu = (
    <>
      <div className="border-b border-gray-100 px-4 py-2">
        <p className="font-medium text-gray-900">Welcome</p>
        <p className="text-xs text-gray-500">Sign in to your account</p>
      </div>
      <Link
        to="/sign-in"
        onClick={() => setIsOpen(false)}
        className="block px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50 hover:text-black"
      >
        Sign In
      </Link>
      <Link
        to="/sign-up"
        onClick={() => setIsOpen(false)}
        className="block px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50 hover:text-black"
      >
        Create Account
      </Link>
    </>
  );

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-full p-2 transition-colors hover:bg-gray-100"
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        <UserIcon className="h-5 w-5 text-gray-600" />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-56 rounded-lg border border-gray-100 bg-white py-2 shadow-lg">
          {isAuthenticated ? AuthedMenu : GuestMenu}
        </div>
      )}
    </div>
  );
};
