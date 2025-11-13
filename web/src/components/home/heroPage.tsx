import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, CircleArrowUp } from "lucide-react";

export interface buttonLink {
  text: string;
  url: string;
}
interface HeroPageProps {
  title: string;
  subtitle: string;
  description: string;
  primaryButton: buttonLink;
  secondaryButton?: buttonLink;
}

export const HeroPage: React.FC<HeroPageProps> = ({ title, subtitle, description, primaryButton }) => {
  return (
    <div className="my-[100px]">
      <div className="flex flex-col gap-[100px]">
        <div className="container mx-auto flex flex-col gap-[30px] px-4">
          <div className="container mx-auto flex justify-between px-4">
            <div className="rounded-[10px] bg-[#E0E0E0] pt-[186px]">
              <img src="../../../public/images/home/hero/hero-1.png" alt="hero-1" />
            </div>
            <div className="flex flex-col gap-[35px]">
              <div className="rounded-[10px] bg-[#E0E0E0] px-[15px] pt-1.5">
                <img src="../../../public/images/home/hero/hero-2.png" alt="hero-2" />
              </div>
              <div className="flex flex-col items-center">
                <h3
                  className="text-center text-[91px] leading-[100%] font-medium tracking-[-4%] text-[#484848]"
                  style={{ fontFamily: "Poppins" }}
                >
                  {title}
                </h3>
                <h1
                  className="sale-stroke text-center text-[187px] leading-[100%] font-medium tracking-[-5.5%]"
                  style={{ fontFamily: "Poppins" }}
                >
                  {subtitle}
                </h1>
                <p
                  className="text-center text-[20px] leading-[100%] font-medium tracking-widest text-[#484848] uppercase"
                  style={{ fontFamily: "Poppins" }}
                >
                  {description}
                </p>
                <Link to={primaryButton.url} className="pt-5">
                  <button className="cursor-pointer rounded-[10px] bg-black px-[60px] py-5 text-white">
                    {primaryButton.text}
                  </button>
                </Link>
              </div>
              <div className="">
                <img src="../../../public/images/home/hero/hero-3.png" alt="hero-3" />
              </div>
            </div>
            <div className="rounded-[10px] bg-[#E0E0E0] pt-[188px] pr-20 pl-[63px]">
              <img src="../../../public/images/home/hero/hero-4.png" alt="hero-4" />
            </div>
          </div>
          <div className="container flex items-center gap-[35px]">
            <Link to="/cart" className="rounded-[10px] p-[18px]">
              <ShoppingCart className="fill-white!" />
            </Link>
            <CircleArrowUp className="cursor-pointer fill-white!" />
          </div>
        </div>
        <div className="container mx-auto flex items-center justify-between px-5">
          <img src="../../../public/images/home/model-logos/chanel.png" alt="chanel" />
          <img src="../../../public/images/home/model-logos/louis-vuitton.png" alt="louis-vuitton" />
          <img src="../../../public/images/home/model-logos/prada.png" alt="prada" />
          <img src="../../../public/images/home/model-logos/calvin-klein.png" alt="calvin-klein" />
          <img src="../../../public/images/home/model-logos/denim.png" alt="denim" />
        </div>
      </div>
    </div>
  );
};

export default HeroPage;
