import { Link } from "react-router-dom";
import { NavbarHome } from "./NavbarHome";

export const HeaderHome = () => {
  return (
    <header className="top-0 z-40 border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Main Header */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link
            to="/"
            className="text-[52px] leading-[100%] font-normal tracking-[0%]"
            style={{ fontFamily: "Volkhov" }}
          >
            FASCO
          </Link>
        </div>
        <NavbarHome />
      </div>
    </header>
  );
};

export default HeaderHome;
