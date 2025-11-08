import React from "react";

export interface mainProductInformation {
  id: number;
  collection?: string;
  name: string;
  description: string;
  size: string;
  price: string | number;
  priceCurrency?: string;
  priceCent?: number | string;
}

const productInfo = {
  id: 1,
  collection: "Women Collection",
  name: "Peaky Blinders",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis ultrices sollicitudin aliquam sem. Scelerisque duis ultrices sollicitudin. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis.",
  size: "M",
  price: 100,
  priceCurrency: "$",
  priceCent: ".00"
};

const MainProduct: React.FC = () => {
  const product: mainProductInformation = productInfo;
  return (
    <div className="flex flex-col">
      <div className="relative mt-[150px] grid w-full grid-cols-2">
        <div className="relative flex items-center justify-center overflow-hidden bg-[#DADADA]">
          <img src="../../../public/images/home/main-product/main-1.png" alt="" />
          {/* Левая диагональная подложка */}
          <div
            className="absolute top-0 left-0 -z-10 h-full w-full"
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% 80%, 0 100%)",
              background: "#DADADA"
            }}
          />
        </div>
        <div className="absolute top-0 left-1/2 h-[calc(100%+4%)] w-0.5 origin-top rotate-18 bg-black"></div>
        {product.id === 1 && (
          <div className="flex flex-col items-start justify-center gap-5 bg-[#DADADA]">
            <p
              className="text-[16px] leading-[100%] font-normal tracking-[0px] text-[#767676]"
              style={{ fontFamily: "Poppins" }}
            >
              {product.collection}
            </p>
            <h1
              style={{ fontFamily: "Volkhov" }}
              className="text-[46px] leading-[100%] font-normal tracking-[0px] text-[#484848]"
            >
              {product.name}
            </h1>
            <span
              className="text-[16px] leading-[100%] font-normal tracking-[0%] text-black underline decoration-solid decoration-0"
              style={{ fontFamily: "Poppins" }}
            >
              DESCRIPTION
            </span>
            <span
              style={{ fontFamily: "Poppins" }}
              className="w-[515px] text-[16px] leading-[100%] font-normal tracking-[0%] text-[#767676]"
            >
              {product.description}
            </span>
            <div className="flex items-center gap-3.5">
              <span
                className="text-[16px] leading-[100%] font-normal tracking-[0%] text-[#767676]"
                style={{ fontFamily: "Poppins" }}
              >
                Size:
              </span>
              <span
                className="rounded-[10px] bg-black px-5 py-1.5 text-[16px] leading-[100%] font-normal tracking-[0%] text-white"
                style={{ fontFamily: "Poppins" }}
              >
                {product.size}
              </span>
            </div>
            <div className="flex items-end gap-[0.25px]">
              <span className="text-[28px] leading-[100%] font-medium tracking-[0]" style={{ fontFamily: "Poppins" }}>
                {product.priceCurrency}
              </span>
              <span className="text-[28px] leading-[100%] font-medium tracking-[0]" style={{ fontFamily: "Poppins" }}>
                {product.price}
              </span>
              <span className="text-[24px] leading-[100%] font-medium tracking-[0]" style={{ fontFamily: "Poppins" }}>
                {product.priceCent}
              </span>
            </div>
            <button
              className="cursor-pointer rounded-[10px] bg-black px-[70px] py-5 text-[16px] leading-[100%] font-normal tracking-[0] text-white"
              style={{ fontFamily: "Poppins" }}
            >
              Buy Now
            </button>
          </div>
        )}
      </div>
      <div className="container mx-auto flex w-full justify-between px-6 py-[70px]">
        <div className="flex items-center gap-3">
          <img src="../../../public/images/home/main-product/review/quality.svg" alt="" />
          <div className="flex h-full flex-col items-start justify-between gap-1.5">
            <p
              style={{ fontFamily: "Poppins" }}
              className="text-[20px] leading-[100%] font-medium tracking-[0] text-[#484848]"
            >
              High Quality
            </p>
            <span
              style={{ fontFamily: "Poppins" }}
              className="text-[16px] leading-[26px] font-normal tracking-[0] text-[#484848]"
            >
              crafted from top materials
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <img src="../../../public/images/home/main-product/review/r-2.svg" alt="" />
          <div className="flex h-full flex-col items-start justify-between gap-1.5">
            <p
              style={{ fontFamily: "Poppins" }}
              className="text-[20px] leading-[100%] font-medium tracking-[0] text-[#484848]"
            >
              Warrany Protection
            </p>
            <span
              style={{ fontFamily: "Poppins" }}
              className="text-[16px] leading-[26px] font-normal tracking-[0] text-[#484848]"
            >
              Over 2 years
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <img src="../../../public/images/home/main-product/review/r-3.svg" alt="" />
          <div className="flex h-full flex-col items-start justify-between gap-1.5">
            <p
              style={{ fontFamily: "Poppins" }}
              className="text-[20px] leading-[100%] font-medium tracking-[0] text-[#484848]"
            >
              Free Shipping
            </p>
            <span
              style={{ fontFamily: "Poppins" }}
              className="text-[16px] leading-[26px] font-normal tracking-[0] text-[#484848]"
            >
              Order over 150 $
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <img src="../../../public/images/home/main-product/review/r-4.svg" alt="" />
          <div className="flex h-full flex-col items-start justify-between gap-1.5">
            <p
              style={{ fontFamily: "Poppins" }}
              className="text-[20px] leading-[100%] font-medium tracking-[0] text-[#484848]"
            >
              24 / 7 Support
            </p>
            <span
              style={{ fontFamily: "Poppins" }}
              className="text-[16px] leading-[26px] font-normal tracking-[0] text-[#484848]"
            >
              Dedicated support
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainProduct;
