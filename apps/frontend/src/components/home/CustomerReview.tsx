import React from "react";
import { useState } from "react";
import "./CustomerReview.css";

interface someReview {
  id: number;
  reviewText: string;
  rating: number;
  personName: string;
  personRole: string;
}

const CustomerReview = () => {
  const [reviews] = useState<someReview[]>([
    {
      id: 1,
      reviewText: "Great service!",
      rating: 5,
      personName: "John Doe",
      personRole: "Customer"
    },
    {
      id: 2,
      reviewText: "Very satisfied with the product.",
      rating: 4,
      personName: "Jane Smith",
      personRole: "Customer"
    },
    {
      id: 3,
      reviewText: "Will definitely recommend to others.",
      rating: 5,
      personName: "Alice Johnson",
      personRole: "Customer"
    }
  ]);

  // Carousel state
  const [centerIdx, setCenterIdx] = useState(0);
  const total = reviews.length;

  // Get indices for left, center, right
  const getIndices = () => {
    const left = (centerIdx - 1 + total) % total;
    const right = (centerIdx + 1) % total;
    return { left, center: centerIdx, right };
  };

  const handleLeft = () => {
    setCenterIdx(prev => (prev - 1 + total) % total);
  };
  const handleRight = () => {
    setCenterIdx(prev => (prev + 1) % total);
  };

  const { left, center, right } = getIndices();

  return (
    <div className="mt-[150px] w-full bg-[#FAFAFA]">
      <div className="container mx-auto flex flex-col items-center gap-[70px]">
        <div className="flex flex-col items-center gap-5 pt-[100px]">
          <h1
            style={{ fontSize: "Volkhov" }}
            className="text-center text-[46px] leading-[100%] font-normal tracking-[0] text-[#484848]"
          >
            This Is What Our Customers Say
          </h1>
          <p
            className="text-center text-[16px] leading-[26px] font-normal tracking-[0] text-[#8A8A8A]"
            style={{ fontFamily: "Poppins" }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis
          </p>
        </div>
        <div className="relative flex w-full flex-col items-center pb-[100px]">
          {/* Carousel with overflow hidden to prevent overlap */}
          <div
            className="review-carousel-wrapper relative flex w-full justify-center"
            style={{ overflow: "hidden", minHeight: 380 }}
          >
            <div
              className="review-container"
              style={{ display: "flex", alignItems: "center", position: "relative", width: 900, height: 340 }}
            >
              {[left, center, right].map(idx => {
                let className =
                  "review bg-white rounded-lg shadow-md p-8 flex flex-col items-center w-[320px] absolute";
                if (idx === center) className += " central-review";
                else className += " side-review";
                // Positioning: left, center, right
                let style: React.CSSProperties = {
                  transition: "all 0.5s cubic-bezier(.4,0,.2,1)",
                  zIndex: idx === center ? 2 : 1
                };
                if (idx === left)
                  style = { ...style, left: "50%", transform: "translateX(-110%) scale(0.8)", opacity: 0.7, zIndex: 1 };
                if (idx === center)
                  style = { ...style, left: "50%", transform: "translateX(-50%) scale(1.2)", opacity: 1, zIndex: 2 };
                if (idx === right)
                  style = { ...style, left: "50%", transform: "translateX(10%) scale(0.8)", opacity: 0.7, zIndex: 1 };
                const review = reviews[idx];
                return (
                  <div key={review.id} className={className} style={style}>
                    <img
                      src={`https://i.pravatar.cc/100?img=${review.id + 10}`}
                      alt={review.personName}
                      className="mb-4 h-20 w-20 rounded-full"
                    />
                    <div className="mb-2 flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={i < review.rating ? "text-yellow-400" : "text-gray-300"}>
                          ★
                        </span>
                      ))}
                    </div>
                    <p className="mb-4 text-center text-gray-700">{review.reviewText}</p>
                    <div className="text-center">
                      <div className="font-semibold text-[#484848]">{review.personName}</div>
                      <div className="text-sm text-[#8A8A8A]">{review.personRole}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Navigation Buttons below carousel */}
          <div className="mt-8 flex flex-row justify-center gap-8">
            <button
              aria-label="Previous review"
              onClick={handleLeft}
              className="nav-button left rounded-full bg-gray-200 px-6 py-2 text-xl font-bold hover:bg-gray-300"
              style={{ zIndex: 2 }}
            >
              &#8592;
            </button>
            <button
              aria-label="Next review"
              onClick={handleRight}
              className="nav-button right rounded-full bg-gray-200 px-6 py-2 text-xl font-bold hover:bg-gray-300"
              style={{ zIndex: 2 }}
            >
              &#8594;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerReview;
