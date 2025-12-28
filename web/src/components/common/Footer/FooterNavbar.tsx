import React from "react";
import { Link } from "react-router-dom";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Pages", href: "/pages" }
];

export const FooterNavbar: React.FC = () => {
  return (
    <div className="container mx-auto flex flex-col gap-8 px-4 sm:gap-[50px]">
      <div className="flex flex-col items-center justify-between gap-6 py-6 sm:flex-row sm:gap-0">
        <Link
          to="/"
          className="text-2xl font-normal tracking-[0px] text-[#484848] sm:text-[32px]"
          style={{ fontFamily: "Volkhov" }}
        >
          FASCO
        </Link>
        <nav>
          <ul className="flex flex-wrap items-center justify-center gap-6 sm:gap-[70px]">
            {navLinks.map(link => (
              <li key={link.label}>
                <Link
                  to={link.href}
                  className="text-sm font-normal tracking-[0px] text-[#484848] transition-colors hover:text-black hover:underline sm:text-[16px]"
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
        className="text-center text-[11px] leading-[26px] font-normal tracking-[0px] text-[#484848] sm:text-[12px]"
        style={{ fontFamily: "Poppins" }}
      >
        Copyright © {new Date().getFullYear()} FASCO. All Rights Reserved.
      </p>
    </div>
  );
};
