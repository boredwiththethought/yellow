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
      <div className="relative mt-[150px] w-full overflow-hidden min-h-[600px]">
        <div className="absolute inset-0">
          <svg 
            className="w-full h-full" 
            preserveAspectRatio="none"
            viewBox="0 0 1000 1000"
          >
            <polygon 
              points="0,0 500,0 450,1000 0,1000" 
              fill="#F8F8F8"
            />
            
            <polygon 
              points="500,0 1000,0 1000,1000 450,1000" 
              fill="#DADADA"
            />
            
            <line 
              x1="500" 
              y1="0" 
              x2="450" 
              y2="1000" 
              stroke="black" 
              strokeWidth="2"
            />
          </svg>
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
          {/* Left Side - Image */}
          <div className="relative flex items-center justify-center overflow-hidden">
            <img 
              src="/images/home/main-product/main-1.png" 
              alt="Peaky Blinders" 
              className="relative z-10 h-full w-[700px]  object-contain "
              onError={(e) => {
                e.currentTarget.src = 'https://via.placeholder.com/400x600?text=Product+Image';
              }}
            />
          </div>

          {/* Right Side - Product Info */}
          <div className="relative flex flex-col items-start justify-center gap-5 px-12 py-16 lg:px-20">
            {/* Collection */}
            <p className="text-base font-normal text-[#767676]" style={{ fontFamily: "Poppins" }}>
              {product.collection}
            </p>

            {/* Product Name */}
            <h1 className="text-[46px] font-normal leading-tight text-[#484848]" style={{ fontFamily: "Volkhov" }}>
              {product.name}
            </h1>

            {/* Description Label */}
            <span className="text-base font-normal text-black underline" style={{ fontFamily: "Poppins" }}>
              DESCRIPTION
            </span>

            {/* Description Text */}
            <p className="max-w-[515px] text-base font-normal leading-relaxed text-[#767676]" style={{ fontFamily: "Poppins" }}>
              {product.description}
            </p>

            {/* Size */}
            <div className="flex items-center gap-3.5">
              <span className="text-base font-normal text-[#767676]" style={{ fontFamily: "Poppins" }}>
                Size:
              </span>
              <span className="rounded-[10px] bg-black px-5 py-1.5 text-base font-normal text-white" style={{ fontFamily: "Poppins" }}>
                {product.size}
              </span>
            </div>

            {/* Price */}
            <div className="flex items-end gap-[0.25px]">
              <span className="text-[28px] font-medium leading-none" style={{ fontFamily: "Poppins" }}>
                {product.priceCurrency}
              </span>
              <span className="text-[28px] font-medium leading-none" style={{ fontFamily: "Poppins" }}>
                {product.price}
              </span>
              <span className="text-[24px] font-medium leading-none" style={{ fontFamily: "Poppins" }}>
                {product.priceCent}
              </span>
            </div>

            {/* Buy Button */}
            <button className="cursor-pointer rounded-[10px] bg-black px-[70px] py-5 text-base font-normal text-white transition-colors hover:bg-gray-800" style={{ fontFamily: "Poppins" }}>
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto flex w-full flex-wrap justify-between gap-8 px-6 py-[70px] lg:flex-nowrap">
        {/* High Quality */}
        <div className="flex items-center gap-3">
          <img 
            src="/images/home/main-product/review/quality.svg" 
            alt="High Quality" 
            className="h-12 w-12"
            onError={(e) => {
              e.currentTarget.src = 'https://via.placeholder.com/48?text=HQ';
            }}
          />
          <div className="flex flex-col gap-1.5">
            <p className="text-xl font-medium leading-tight text-[#484848]" style={{ fontFamily: "Poppins" }}>
              High Quality
            </p>
            <span className="text-base font-normal leading-relaxed text-[#484848]" style={{ fontFamily: "Poppins" }}>
              crafted from top materials
            </span>
          </div>
        </div>

        {/* Warranty Protection */}
        <div className="flex items-center gap-3">
          <img 
            src="/images/home/main-product/review/r-2.svg" 
            alt="Warranty" 
            className="h-12 w-12"
            onError={(e) => {
              e.currentTarget.src = 'https://via.placeholder.com/48?text=WP';
            }}
          />
          <div className="flex flex-col gap-1.5">
            <p className="text-xl font-medium leading-tight text-[#484848]" style={{ fontFamily: "Poppins" }}>
              Warranty Protection
            </p>
            <span className="text-base font-normal leading-relaxed text-[#484848]" style={{ fontFamily: "Poppins" }}>
              Over 2 years
            </span>
          </div>
        </div>

        {/* Free Shipping */}
        <div className="flex items-center gap-3">
          <img 
            src="/images/home/main-product/review/r-3.svg" 
            alt="Free Shipping" 
            className="h-12 w-12"
            onError={(e) => {
              e.currentTarget.src = 'https://via.placeholder.com/48?text=FS';
            }}
          />
          <div className="flex flex-col gap-1.5">
            <p className="text-xl font-medium leading-tight text-[#484848]" style={{ fontFamily: "Poppins" }}>
              Free Shipping
            </p>
            <span className="text-base font-normal leading-relaxed text-[#484848]" style={{ fontFamily: "Poppins" }}>
              Order over 150 $
            </span>
          </div>
        </div>

        {/* 24/7 Support */}
        <div className="flex items-center gap-3">
          <img 
            src="/images/home/main-product/review/r-4.svg" 
            alt="Support" 
            className="h-12 w-12"
            onError={(e) => {
              e.currentTarget.src = 'https://via.placeholder.com/48?text=24/7';
            }}
          />
          <div className="flex flex-col gap-1.5">
            <p className="text-xl font-medium leading-tight text-[#484848]" style={{ fontFamily: "Poppins" }}>
              24 / 7 Support
            </p>
            <span className="text-base font-normal leading-relaxed text-[#484848]" style={{ fontFamily: "Poppins" }}>
              Dedicated support
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainProduct;