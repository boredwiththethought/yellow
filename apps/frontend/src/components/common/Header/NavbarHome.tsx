import { Link } from "react-router-dom";
import type { NavItem } from "../../../types/navigation.types";

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Deals", href: "/deals" },
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "Packages", href: "/packages" },
  { label: "Sign In", href: "/signin" }
];
const signUpItem: NavItem = { label: "Sign Up", href: "/signup" };

export const NavbarHome = () => {
  return (
    <nav className="flex items-center gap-[58px]">
      {navItems.map((item, index) => (
        <Link
          key={index}
          to={item.href}
          className="text-[16px] leading-[100%] font-normal tracking-[0%] text-[#484848]"
          style={{ fontFamily: "Poppins" }}
        >
          {item.label}
        </Link>
      ))}
      <Link
        to={signUpItem.href}
        className="rounded-[10px] border border-[#000000] bg-black px-[45px] py-5 text-center text-[16px] leading-[100%] font-normal tracking-[0%] text-white"
        style={{ fontFamily: "Poppins" }}
      >
        {signUpItem.label}
      </Link>
    </nav>
  );
};
