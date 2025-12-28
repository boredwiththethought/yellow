import React from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface buyButton {
  text: string;
  url: string;
}

export const Deals: React.FC = () => {
  return (
    <div className="w-full bg-[#FAFAFA]">
      <div className="relative container mx-auto flex gap-9 px-4 pt-[100px] pb-[145px]">
        <div className="flex flex-col gap-[50px]">
          <div className="flex flex-col gap-5">
            <h2 style={{ fontFamily: "Volkhov" }} className="text-[46px] leading-[100%] font-normal tracking-[0%]">
              Deals Of The Month
            </h2>
            <p
              style={{ fontFamily: "Poppins" }}
              className="text-[16px] leading-[26px] font-normal tracking-[0%] text-[#8A8A8A]"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing <br /> elit. Scelerisque duis ultrices sollicitudin
              aliquam sem. <br /> Scelerisque duis ultrices sollicitudin{" "}
            </p>
          </div>
          <Link to="/checkout " className="self-start pt-5">
            <button
              className="cursor-pointer rounded-[10px] bg-black px-[70px] py-5 text-center text-[16px] leading-[100%] font-normal tracking-[0%] text-white"
              style={{ fontFamily: "Poppins" }}
            >
              SHOP NOW
            </button>
          </Link>
          <div className="flex flex-col gap-[15px]">
            <p
              className="text-[28px] leading-[100%] font-medium tracking-[0%] text-[#484848]"
              style={{ fontFamily: "Poppins" }}
            >
              Hurry, Before It’s Too Late!
            </p>
            <div className="flex items-center gap-[30px]">
              <div className="flex flex-col items-center gap-[15px]">
                <div className="rounded-[10px] bg-white px-3 py-[22px]">
                  <p
                    style={{ fontFamily: "Digital Numbers" }}
                    className="text-[32px] leading-[100%] font-normal tracking-[0%] text-[#484848]"
                  >
                    02
                  </p>
                </div>
                <p
                  style={{ fontFamily: "Poppins" }}
                  className="text-center text-[24px] leading-[120%] font-normal tracking-[0%] text-[#484848]"
                >
                  Days
                </p>
              </div>
              <div className="flex flex-col items-center gap-[15px]">
                <div className="rounded-[10px] bg-white px-3 py-[22px]">
                  <p
                    style={{ fontFamily: "Digital Numbers" }}
                    className="text-[32px] leading-[100%] font-normal tracking-[0%] text-[#484848]"
                  >
                    06
                  </p>
                </div>
                <p
                  style={{ fontFamily: "Poppins" }}
                  className="text-center text-[24px] leading-[120%] font-normal tracking-[0%] text-[#484848]"
                >
                  Hr
                </p>
              </div>
              <div className="flex flex-col items-center gap-[15px]">
                <div className="rounded-[10px] bg-white px-3 py-[22px]">
                  <p
                    style={{ fontFamily: "Digital Numbers" }}
                    className="text-[32px] leading-[100%] font-normal tracking-[0%] text-[#484848]"
                  >
                    05
                  </p>
                </div>
                <p
                  style={{ fontFamily: "Poppins" }}
                  className="text-center text-[24px] leading-[120%] font-normal tracking-[0%] text-[#484848]"
                >
                  Mins
                </p>
              </div>
              <div className="flex flex-col items-center gap-[15px]">
                <div className="rounded-[10px] bg-white px-3 py-[22px]">
                  <p
                    style={{ fontFamily: "Digital Numbers" }}
                    className="text-[32px] leading-[100%] font-normal tracking-[0%] text-[#484848]"
                  >
                    30
                  </p>
                </div>
                <p
                  style={{ fontFamily: "Poppins" }}
                  className="text-center text-[24px] leading-[120%] font-normal tracking-[0%] text-[#484848]"
                >
                  Sec
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <div className="flex flex-1 gap-6">
            <div className="flex items-end gap-4">
              <div className="cursor-pointer rounded-full bg-white px-5 py-5">
                <ChevronLeft />
              </div>
              <div className="cursor-pointer rounded-full bg-white px-5 py-5">
                <ChevronRight />
              </div>
            </div>
            <div className="relative">
              <img src="/images/home/Deal/image.png" alt="Deal" />
              <div className="absolute bottom-6 left-6 flex flex-col items-start gap-2 bg-white px-[42px] py-8">
                <div className="flex items-center gap-2">
                  <p
                    style={{ fontFamily: "Poppins" }}
                    className="text-[16px] leading-[150%] font-normal tracking-[0%] text-[#484848]"
                  >
                    01
                  </p>
                  <div className="w-[27px] border border-[#484848]"></div>
                  <p
                    style={{ fontFamily: "Poppins" }}
                    className="text-[16px] leading-[150%] font-normal tracking-[0%] text-[#484848]"
                  >
                    Spring Sale
                  </p>
                </div>
                <p
                  style={{ fontFamily: "Poppins" }}
                  className="text-[28px] leading-[120%] font-normal tracking-[0%] text-[#484848]"
                >
                  30% OFF
                </p>
              </div>
            </div>
            <img src="/images/home/Deal/deal-2.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deals;
