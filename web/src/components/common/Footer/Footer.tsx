import React from "react";
import FooterButton from "./FooterButton";
import { FooterNavbar } from "./FooterNavbar";

const Footer: React.FC = () => {
  return (
    <footer className="container mx-auto mt-[150px] bg-white px-4 py-6">
      <div className="flex flex-col gap-12">
        <div className="flex items-center justify-around">
          <img src="/images/footer/footer-man.png" alt="show-man-footer" />
          <div className="flex flex-col items-center justify-center gap-[30px]">
            <div className="flex flex-1 flex-col gap-[30px] p-10 drop-shadow-md">
              <div className="flex flex-col items-center justify-center gap-5 text-center">
                <h2
                  className="text-center text-[46px] leading-[100%] font-normal tracking-[0%] text-[#484848]"
                  style={{ fontFamily: "Volkhov" }}
                >
                  Subscribe To Our Newsletter
                </h2>
                <p
                  className="text-center text-[16px] leading-[26px] font-normal tracking-[0%] text-[#8A8A8A]"
                  style={{ fontFamily: "Poppins" }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis <br /> ultrices sollicitudin
                  aliquam sem. Scelerisque duis ultrices sollicitudin{" "}
                </p>
              </div>
              <div className="flex w-full max-w-md">
                <p
                  className="pl-5 text-[22px] leading-[26px] font-normal tracking-[0%] text-[#8A8A8A]"
                  style={{ fontFamily: "Poppins" }}
                >
                  michael@ymail.com
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <FooterButton text="Subscribe Now" onClick={() => alert("Subscribed!")} />
            </div>
          </div>
          <img src="/images/footer/foter-girl.png" alt="show-woman-footer" />
        </div>
        <FooterNavbar />
      </div>
    </footer>
  );
};

export default Footer;
