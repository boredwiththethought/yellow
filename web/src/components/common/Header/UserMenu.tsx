import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { UserIcon } from "../../../vector";
import { useClickOutside } from "../../../hooks/useClickOutside";

interface UserMenuProps {
  userName?: string;
}

export const UserMenu = ({ userName = "User" }: UserMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useClickOutside(menuRef, () => setIsOpen(false));

  const menuItems = [
    { label: "Profile", href: "/profile" },
    { label: "Orders", href: "/orders" },
    { label: "Wishlist", href: "/wishlist" },
    { label: "Settings", href: "/settings" }
  ];

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-full p-2 transition-colors hover:bg-gray-100"
      >
        <UserIcon className="h-6 w-6" />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-48 rounded-lg border border-gray-100 bg-white py-2 shadow-lg">
          <div className="border-b border-gray-100 px-4 py-2">
            <p className="font-medium text-gray-900">{userName}</p>
            <p className="text-sm text-gray-500">Welcome back!</p>
          </div>

          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50 hover:text-black"
            >
              {item.label}
            </Link>
          ))}

          <div className="mt-2 border-t border-gray-100 pt-2">
            <button
              onClick={() => {
                setIsOpen(false);
                // TODO: Implement logout
                console.log("Logging out...");
              }}
              className="block w-full px-4 py-2 text-left text-red-600 transition-colors hover:bg-gray-50 hover:text-red-700"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
