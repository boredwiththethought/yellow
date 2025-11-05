import { Link } from "react-router-dom";
import { Dropdown } from "./Dropdown";
import type { NavItem } from "../../../types/navigation.types";

const navItems: NavItem[] = [
  {
    label: "Home",
    href: "/"
  },
  {
    label: "Shop",
    href: "/shop"
  },
  {
    label: "Products",
    href: "/products"
  },
  {
    label: "Pages",
    href: "#",
    subMenu: [
      {
        label: "Shop Page",
        href: "/shop",
        description: "Browse our products "
      },
      {
        label: "Product Page",
        href: "/product",
        description: "View our product details"
      },
      {
        label: "Minicart",
        href: "/cart",
        description: "View your shopping cart"
      },
      {
        label: "Cart Page",
        href: "/cart",
        description: "View your shopping cart"
      },
      {
        label: "Checkout",
        href: "/checkout",
        description: "Secure your purchase"
      }
    ]
  },

];

export const Navbar = () => {
  return (
    <nav className="hidden items-center gap-8 md:flex">
      {navItems.map((item, index) => (
        <div key={index}>
          {item.subMenu ? (
            <Dropdown label={item.label} items={item.subMenu} />
          ) : (
            <Link to={item.href} className="font-medium text-gray-700 transition-colors hover:text-black">
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
};
