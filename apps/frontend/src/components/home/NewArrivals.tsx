import React from "react";
import { useNavigate } from "react-router-dom";

export interface gridItems {
  id: number;
  name: string;
  subName: string;
  review: string;
  rating?: number;
  subReview?: string;
  price: string;
  soldOut?: boolean;
}

const categoryData: Record<string, gridItems[]> = {
  gridWomensFashion: [
    {
      id: 1,
      name: "Shiny Dress",
      subName: "Al Karam",
      rating: 5,
      review: "(4.1k) Customer Reviews",
      price: "$95.50",
      soldOut: false
    },
    {
      id: 2,
      name: "Long Dress",
      subName: "Al Karam",
      rating: 5,
      review: "(4.1k) Customer Reviews",
      price: "$95.50",
      soldOut: false
    },
    {
      id: 3,
      name: "Full Sweater",
      subName: "Al Karam",
      rating: 5,
      review: "(4.1k) Customer Reviews",
      price: "$95.50",
      soldOut: false
    },

    {
      id: 4,
      name: "White Dress",
      subName: "Al Karam",
      rating: 5,
      review: "(4.1k) Customer Reviews",
      price: "$95.50",
      soldOut: false
    },
    {
      id: 5,
      name: "Colorful Dress",
      subName: "Al Karam",
      rating: 5,
      review: "(4.1k) Customer Reviews",
      price: "$95.50",
      soldOut: false
    },
    {
      id: 6,
      name: "White Shirt",
      subName: "Al Karam",
      rating: 5,
      review: "(4.1k) Customer Reviews",
      price: "$95.50",
      soldOut: false
    }
  ]
};

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(star => (
        <svg
          key={star}
          className="h-4 w-4"
          fill={star <= Math.floor(rating) ? "#FFC107" : star - 0.5 <= rating ? "url(#half)" : "#E0E0E0"}
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="half">
              <stop offset="50%" stopColor="#FFC107" />
              <stop offset="50%" stopColor="#E0E0E0" />
            </linearGradient>
          </defs>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

export default function NewArrivals() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = React.useState<
    | "gridMensFashion"
    | "gridWomensFashion"
    | "gridWomenAccessories"
    | "gridMensAccessories"
    | "gridDiscountDeals"
    | null
  >(() => "gridWomensFashion");
  const btnRefs = {
    gridMensFashion: React.useRef<HTMLButtonElement>(null),
    gridWomensFashion: React.useRef<HTMLButtonElement>(null),
    gridWomenAccessories: React.useRef<HTMLButtonElement>(null),
    gridMensAccessories: React.useRef<HTMLButtonElement>(null),
    gridDiscountDeals: React.useRef<HTMLButtonElement>(null)
  };
  const handleCategoryClick = (key: Exclude<typeof activeIndex, null>) => {
    setActiveIndex(key);
    btnRefs[key]?.current?.focus();
  };
  React.useEffect(() => {
    if (activeIndex && btnRefs[activeIndex]?.current) {
      btnRefs[activeIndex].current.focus();
    }
  }, [activeIndex]);

  const currentItems = activeIndex ? categoryData[activeIndex] : [];
  return (
    <div className="container mx-auto flex flex-col items-center gap-[50px] bg-white px-4 pt-[150px]">
      <div className="flex flex-col items-center gap-5 text-center">
        <h2
          className="text-center text-[46px] leading-[100%] font-normal tracking-[0px] text-[#484848]"
          style={{ fontFamily: "Volkhov" }}
        >
          New Arrivals
        </h2>
        <p
          style={{ fontFamily: "Poppins" }}
          className="text-center text-[16px] leading-[26px] font-normal tracking-[0px] text-[#8A8A8A]"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis <br /> ultrices sollicitudin aliquam
          sem. Scelerisque duis ultrices sollicitudin{" "}
        </p>
      </div>
      <div className="flex flex-col items-center gap-[50px]">
        <div className="flex flex-col items-center gap-[50px]">
          <div className="flex items-center gap-[30px]">
            <button
              ref={btnRefs.gridMensFashion}
              tabIndex={0}
              onClick={() => handleCategoryClick("gridMensFashion")}
              style={{ fontFamily: "Poppins" }}
              className={`cursor-pointer rounded-[10px] px-[50px] py-5 text-center text-[16px] leading-[100%] font-normal tracking-[0px] ${
                activeIndex === "gridMensFashion"
                  ? "bg-black text-white"
                  : "bg-[#FAFAFA] text-[#8A8A8A] hover:bg-gray-100 hover:text-black"
              } `}
            >
              Men's Fashion
            </button>
            <button
              ref={btnRefs.gridWomensFashion}
              tabIndex={0}
              onClick={() => handleCategoryClick("gridWomensFashion")}
              style={{ fontFamily: "Poppins" }}
              className={`cursor-pointer rounded-[10px] px-[50px] py-5 text-center text-[16px] leading-[100%] font-normal tracking-[0px] ${
                activeIndex === "gridWomensFashion"
                  ? "bg-black text-white"
                  : "bg-[#FAFAFA] text-[#8A8A8A] hover:bg-gray-100 hover:text-black"
              } `}
            >
              Women's Fashion
            </button>
            <button
              ref={btnRefs.gridWomenAccessories}
              tabIndex={0}
              onClick={() => handleCategoryClick("gridWomenAccessories")}
              style={{ fontFamily: "Poppins" }}
              className={`cursor-pointer rounded-[10px] px-[50px] py-5 text-center text-[16px] leading-[100%] font-normal tracking-[0px] ${
                activeIndex === "gridWomenAccessories"
                  ? "bg-black text-white"
                  : "bg-[#FAFAFA] text-[#8A8A8A] hover:bg-gray-100 hover:text-black"
              } `}
            >
              Women's Accessories
            </button>
            <button
              ref={btnRefs.gridMensAccessories}
              tabIndex={0}
              onClick={() => handleCategoryClick("gridMensAccessories")}
              style={{ fontFamily: "Poppins" }}
              className={`cursor-pointer rounded-[10px] px-[50px] py-5 text-center text-[16px] leading-[100%] font-normal tracking-[0px] ${
                activeIndex === "gridMensAccessories"
                  ? "bg-black text-white"
                  : "bg-[#FAFAFA] text-[#8A8A8A] hover:bg-gray-100 hover:text-black"
              } `}
            >
              Men's Accessories
            </button>
            <button
              ref={btnRefs.gridDiscountDeals}
              tabIndex={0}
              onClick={() => handleCategoryClick("gridDiscountDeals")}
              style={{ fontFamily: "Poppins" }}
              className={`cursor-pointer rounded-[10px] px-[50px] py-5 text-center text-[16px] leading-[100%] font-normal tracking-[0px] ${
                activeIndex === "gridDiscountDeals"
                  ? "bg-black text-white"
                  : "bg-[#FAFAFA] text-[#8A8A8A] hover:bg-gray-100 hover:text-black"
              } `}
            >
              Discount Deals
            </button>
          </div>
        </div>
      </div>
      {activeIndex === "gridMensFashion" && (
        <div>
          <h1>Men's Fashion</h1>
        </div>
      )}
      {activeIndex === "gridWomensFashion" && (
        <div className="grid grid-cols-3 grid-rows-2 gap-[60px]">
          {currentItems
            .filter(item => item.id === 1)
            .map(item => (
              <div
                key={item.id}
                className="flex flex-col gap-5 rounded-[10px] bg-white px-[25px] pt-[15px] pb-[35px] shadow-2xl"
              >
                <img src="../../../public/images/home/arrivals/grid-1.png" alt={`grid-women-fashion-${item.id}`} />
                <div className="flex flex-col items-start gap-6">
                  <div className="flex w-full flex-1 items-start justify-between">
                    <div className="flex flex-col items-start gap-0.5">
                      <h4
                        className="text-[20px] leading-[100%] font-medium tracking-[0px] text-[#484848]"
                        style={{ fontFamily: "Poppins" }}
                      >
                        {item.name}
                      </h4>
                      <p
                        className="text-[12px] leading-3 font-medium tracking-[0px] text-[#8A8A8A]"
                        style={{ fontFamily: "Poppins" }}
                      >
                        {item.subName}
                      </p>
                    </div>
                    <StarRating rating={item.rating ?? 0} />
                  </div>
                  <p
                    style={{ fontFamily: "Poppins" }}
                    className="text-[12px] leading-[100%] font-medium tracking-[0px] text-[#484848]"
                  >
                    {item.review}
                  </p>
                  <div className="flex w-full items-center justify-between">
                    <span
                      style={{ fontFamily: "Poppins" }}
                      className="text-[24px] leading-5 font-medium tracking-[-0.01em] text-[#484848]"
                    >
                      {item.price}
                    </span>
                    {item.soldOut !== undefined && (
                      <span
                        className="text-right text-[12px] leading-5 font-normal tracking-[-0.01em] text-[#FF4646]"
                        style={{ fontFamily: "Poppins" }}
                      >
                        {item.soldOut === false ? "Almost Sold Out" : "In Stock"}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          {currentItems
            .filter(item => item.id === 2)
            .map(item => (
              <div
                key={item.id}
                className="flex flex-col gap-5 rounded-[10px] bg-white px-[25px] pt-[15px] pb-[35px] shadow-2xl"
              >
                <img src="../../../public/images/home/arrivals/grid-2.png" alt={`grid-women-fashion-${item.id}`} />
                <div className="flex flex-col items-start gap-6">
                  <div className="flex w-full flex-1 items-start justify-between">
                    <div className="flex flex-col items-start gap-0.5">
                      <h4
                        className="text-[20px] leading-[100%] font-medium tracking-[0px] text-[#484848]"
                        style={{ fontFamily: "Poppins" }}
                      >
                        {item.name}
                      </h4>
                      <p
                        className="text-[12px] leading-3 font-medium tracking-[0px] text-[#8A8A8A]"
                        style={{ fontFamily: "Poppins" }}
                      >
                        {item.subName}
                      </p>
                    </div>
                    <StarRating rating={item.rating ?? 0} />
                  </div>
                  <p
                    style={{ fontFamily: "Poppins" }}
                    className="text-[12px] leading-[100%] font-medium tracking-[0px] text-[#484848]"
                  >
                    {item.review}
                  </p>
                  <div className="flex w-full items-center justify-between">
                    <span
                      style={{ fontFamily: "Poppins" }}
                      className="text-[24px] leading-5 font-medium tracking-[-0.01em] text-[#484848]"
                    >
                      {item.price}
                    </span>
                    {item.soldOut !== undefined && (
                      <span
                        className="text-right text-[12px] leading-5 font-normal tracking-[-0.01em] text-[#FF4646]"
                        style={{ fontFamily: "Poppins" }}
                      >
                        {item.soldOut === false ? "Almost Sold Out" : "In Stock"}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          {currentItems
            .filter(item => item.id === 3)
            .map(item => (
              <div
                key={item.id}
                className="flex flex-col gap-5 rounded-[10px] bg-white px-[25px] pt-[15px] pb-[35px] shadow-2xl"
              >
                <img src="../../../public/images/home/arrivals/grid-3.png" alt={`grid-women-fashion-${item.id}`} />
                <div className="flex flex-col items-start gap-6">
                  <div className="flex w-full flex-1 items-start justify-between">
                    <div className="flex flex-col items-start gap-0.5">
                      <h4
                        className="text-[20px] leading-[100%] font-medium tracking-[0px] text-[#484848]"
                        style={{ fontFamily: "Poppins" }}
                      >
                        {item.name}
                      </h4>
                      <p
                        className="text-[12px] leading-3 font-medium tracking-[0px] text-[#8A8A8A]"
                        style={{ fontFamily: "Poppins" }}
                      >
                        {item.subName}
                      </p>
                    </div>
                    <StarRating rating={item.rating ?? 0} />
                  </div>
                  <p
                    style={{ fontFamily: "Poppins" }}
                    className="text-[12px] leading-[100%] font-medium tracking-[0px] text-[#484848]"
                  >
                    {item.review}
                  </p>
                  <div className="flex w-full items-center justify-between">
                    <span
                      style={{ fontFamily: "Poppins" }}
                      className="text-[24px] leading-5 font-medium tracking-[-0.01em] text-[#484848]"
                    >
                      {item.price}
                    </span>
                    {item.soldOut !== undefined && (
                      <span
                        className="text-right text-[12px] leading-5 font-normal tracking-[-0.01em] text-[#FF4646]"
                        style={{ fontFamily: "Poppins" }}
                      >
                        {item.soldOut === false ? "Almost Sold Out" : "In Stock"}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          {currentItems
            .filter(item => item.id === 4)
            .map(item => (
              <div
                key={item.id}
                className="flex flex-col gap-5 rounded-[10px] bg-white px-[25px] pt-[15px] pb-[35px] shadow-2xl"
              >
                <img src="../../../public/images/home/arrivals/grid-4.png" alt={`grid-women-fashion-${item.id}`} />
                <div className="flex flex-col items-start gap-6">
                  <div className="flex w-full flex-1 items-start justify-between">
                    <div className="flex flex-col items-start gap-0.5">
                      <h4
                        className="text-[20px] leading-[100%] font-medium tracking-[0px] text-[#484848]"
                        style={{ fontFamily: "Poppins" }}
                      >
                        {item.name}
                      </h4>
                      <p
                        className="text-[12px] leading-3 font-medium tracking-[0px] text-[#8A8A8A]"
                        style={{ fontFamily: "Poppins" }}
                      >
                        {item.subName}
                      </p>
                    </div>
                    <StarRating rating={item.rating ?? 0} />
                  </div>
                  <p
                    style={{ fontFamily: "Poppins" }}
                    className="text-[12px] leading-[100%] font-medium tracking-[0px] text-[#484848]"
                  >
                    {item.review}
                  </p>
                  <div className="flex w-full items-center justify-between">
                    <span
                      style={{ fontFamily: "Poppins" }}
                      className="text-[24px] leading-5 font-medium tracking-[-0.01em] text-[#484848]"
                    >
                      {item.price}
                    </span>
                    {item.soldOut !== undefined && (
                      <span
                        className="text-right text-[12px] leading-5 font-normal tracking-[-0.01em] text-[#FF4646]"
                        style={{ fontFamily: "Poppins" }}
                      >
                        {item.soldOut === false ? "Almost Sold Out" : "In Stock"}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          {currentItems
            .filter(item => item.id === 5)
            .map(item => (
              <div
                key={item.id}
                className="flex flex-col gap-5 rounded-[10px] bg-white px-[25px] pt-[15px] pb-[35px] shadow-2xl"
              >
                <img src="../../../public/images/home/arrivals/grid-5.png" alt={`grid-women-fashion-${item.id}`} />
                <div className="flex flex-col items-start gap-6">
                  <div className="flex w-full flex-1 items-start justify-between">
                    <div className="flex flex-col items-start gap-0.5">
                      <h4
                        className="text-[20px] leading-[100%] font-medium tracking-[0px] text-[#484848]"
                        style={{ fontFamily: "Poppins" }}
                      >
                        {item.name}
                      </h4>
                      <p
                        className="text-[12px] leading-3 font-medium tracking-[0px] text-[#8A8A8A]"
                        style={{ fontFamily: "Poppins" }}
                      >
                        {item.subName}
                      </p>
                    </div>
                    <StarRating rating={item.rating ?? 0} />
                  </div>
                  <p
                    style={{ fontFamily: "Poppins" }}
                    className="text-[12px] leading-[100%] font-medium tracking-[0px] text-[#484848]"
                  >
                    {item.review}
                  </p>
                  <div className="flex w-full items-center justify-between">
                    <span
                      style={{ fontFamily: "Poppins" }}
                      className="text-[24px] leading-5 font-medium tracking-[-0.01em] text-[#484848]"
                    >
                      {item.price}
                    </span>
                    {item.soldOut !== undefined && (
                      <span
                        className="text-right text-[12px] leading-5 font-normal tracking-[-0.01em] text-[#FF4646]"
                        style={{ fontFamily: "Poppins" }}
                      >
                        {item.soldOut === false ? "Almost Sold Out" : "In Stock"}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          {currentItems
            .filter(item => item.id === 6)
            .map(item => (
              <div
                key={item.id}
                className="flex flex-col gap-5 rounded-[10px] bg-white px-[25px] pt-[15px] pb-[35px] shadow-2xl"
              >
                <img src="../../../public/images/home/arrivals/grid-6.png" alt={`grid-women-fashion-${item.id}`} />
                <div className="flex flex-col items-start gap-6">
                  <div className="flex w-full flex-1 items-start justify-between">
                    <div className="flex flex-col items-start gap-0.5">
                      <h4
                        className="text-[20px] leading-[100%] font-medium tracking-[0px] text-[#484848]"
                        style={{ fontFamily: "Poppins" }}
                      >
                        {item.name}
                      </h4>
                      <p
                        className="text-[12px] leading-3 font-medium tracking-[0px] text-[#8A8A8A]"
                        style={{ fontFamily: "Poppins" }}
                      >
                        {item.subName}
                      </p>
                    </div>
                    <StarRating rating={item.rating ?? 0} />
                  </div>
                  <p
                    style={{ fontFamily: "Poppins" }}
                    className="text-[12px] leading-[100%] font-medium tracking-[0px] text-[#484848]"
                  >
                    {item.review}
                  </p>
                  <div className="flex w-full items-center justify-between">
                    <span
                      style={{ fontFamily: "Poppins" }}
                      className="text-[24px] leading-5 font-medium tracking-[-0.01em] text-[#484848]"
                    >
                      {item.price}
                    </span>
                    {item.soldOut !== undefined && (
                      <span
                        className="text-right text-[12px] leading-5 font-normal tracking-[-0.01em] text-[#FF4646]"
                        style={{ fontFamily: "Poppins" }}
                      >
                        {item.soldOut === false ? "Almost Sold Out" : "In Stock"}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
      <button
        className="cursor-pointer rounded-[10px] bg-black px-[62px] py-5 hover:bg-gray-800 focus:bg-gray-800"
        style={{ fontFamily: "Poppins" }}
        onClick={() => navigate("/shop-page")}
      >
        <span className="text-center text-[16px] leading-[100%] font-normal tracking-[0px] text-white">View More</span>
      </button>
    </div>
  );
}
