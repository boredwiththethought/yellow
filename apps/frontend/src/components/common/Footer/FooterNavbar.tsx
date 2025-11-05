import React from "react";
import { Link } from "react-router-dom";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Products", href: "/products" },
  { label: "Pages", href: "/pages" }
];
// footer navigate nav links
export const FooterNavbar: React.FC = () => {
  return (
    <div className="container mx-auto flex flex-col gap-[50px]">
      <div className="flex items-center justify-between px-4 py-6">
        <Link
          to="/"
          className="text-[32px] leading-[100%] font-normal tracking-[0px] text-[#484848]"
          style={{ fontFamily: "Volkhov" }}
        >
          FASCO
        </Link>
        <nav>
          <ul className="flex items-center gap-[70px]">
            {navLinks.map(link => (
              <li key={link.label}>
                <Link
                  to={link.href}
                  className="text-[16px] leading-[100%] font-normal tracking-[0px] text-[#484848] hover:underline"
                  style={{ fontFamily: "Poppins" }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <p
        className="text-center text-[12px] leading-[26px] font-normal tracking-[0px] text-[#484848]"
        style={{ fontFamily: "Poppins" }}
      >
        Copyright © 2022 FASCO . All Rights Reserved.
      </p>
    </div>
  );
};
