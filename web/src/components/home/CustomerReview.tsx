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
      id: 2,
      reviewText:
        "Items That I ordered were the best investment I ever made. I can't say enough about your quality service.",
      rating: 5,
      personName: "Suzan B.",
      personRole: "UI Designer"
    },
    {
      id: 1,
      reviewText:
        "You won't regret it. I would like to personally thank you for your outstanding product. Absolutely wonderful!",
      rating: 5,
      personName: "James K.",
      personRole: "Traveler"
    },
    {
      id: 3,
      reviewText:
        "Just what I was looking for. Thank you for making it painless, pleasant and most of all hassle free! All products are great.",
      rating: 5,
      personName: "Megen W.",
      personRole: "UI Designer"
    }
  ]);


  const [centerIdx, setCenterIdx] = useState(0);
  const total = reviews.length;


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
    <div className="mt-20 w-full bg-[#FAFAFA] md:mt-[150px] mb-[150px]">
      <div className="container mx-auto flex flex-col items-center gap-10 px-4 md:gap-[70px]">
   
        <div className="flex flex-col items-center gap-3 pt-[60px] md:gap-5 md:pt-[100px]">
          <h1
            style={{ fontFamily: "Volkhov" }}
            className="text-center text-[28px] leading-[100%] font-normal tracking-[0] text-[#484848] md:text-[46px]"
          >
            This Is What Our Customers Say
          </h1>
          <p
            className="max-w-[90%] text-center text-[14px] leading-[22px] font-normal tracking-[0] text-[#8A8A8A] md:max-w-full md:text-[16px] md:leading-[26px]"
            style={{ fontFamily: "Poppins" }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis
          </p>
        </div>

       
        <div className="relative flex w-full flex-col items-center pb-[60px] md:pb-[100px]">
          <div
            className="review-carousel-wrapper relative flex w-full justify-center"
            style={{ overflow: "hidden", minHeight: "400px" }}
          >
            <div
              className="review-container relative"
              style={{
                display: "flex",
                alignItems: "center",
                position: "relative",
                width: "100%",
                maxWidth: "1000px",
                height: "auto",
                minHeight: "400px"
              }}
            >
              {[left, center, right].map(idx => {
                const review = reviews[idx];
                const isCenter = idx === center;

                // Card dimensions based on position
                const cardWidth = isCenter ? 864 : 648;
                const cardHeight = isCenter ? 400 : 300;
                const paddingY = isCenter ? 70 : 50;
                const paddingX = isCenter ? 50 : 50;
                const imgSize = isCenter ? 260 : 200;

                let style: React.CSSProperties = {
                  transition: "all 0.5s cubic-bezier(.4,0,.2,1)",
                  zIndex: isCenter ? 2 : 1,
                  position: "absolute",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: `${cardWidth}px`,
                  height: `${cardHeight}px`,
                  paddingTop: `${paddingY}px`,
                  paddingBottom: `${paddingY}px`,
                  paddingLeft: `${paddingX}px`,
                  paddingRight: `${paddingX}px`
                };

                if (idx === left) {
                  style = {
                    ...style,
                    left: "50%",
                    transform: "translateX(-110%) translateY(-50%)",
                    opacity: 0.7
                  };
                }
                if (isCenter) {
                  style = {
                    ...style,
                    left: "50%",
                    transform: "translateX(-50%) translateY(-50%)",
                    opacity: 1
                  };
                }
                if (idx === right) {
                  style = {
                    ...style,
                    left: "50%",
                    transform: "translateX(10%) translateY(-50%)",
                    opacity: 0.7
                  };
                }

                return (
                  <div
                    key={review.id}
                    className="flex flex-row items-center gap-[83px] rounded-lg bg-white shadow-lg"
                    style={style}
                  >
               
                    <div className="relative shrink-0">
                 
                      <div
                        className="absolute bg-[#D9D9D9]"
                        style={{
                          width: `${imgSize}px`,
                          height: `${imgSize}px`,
                          top: "20px",
                          left: "-20px",
                          zIndex: 0
                        }}
                      />
                   
                      <img
                        src={`/images/home/review/r-${review.id}.png`}
                        alt={review.personName}
                        className="relative object-cover transition-all duration-500"
                        style={{
                          width: `${imgSize}px`,
                          height: `${imgSize}px`,
                          zIndex: 1
                        }}
                      />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <p
                        className="pb-[30px] text-base leading-none font-normal tracking-normal text-[#484848] md:text-left md:text-[16px]"
                        style={{ fontFamily: "Poppins" }}
                      >
                        {review.reviewText}
                      </p>
                      <div className="flex justify-center gap-1 md:justify-start">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span
                            key={i}
                            className={i < review.rating ? "text-xl text-yellow-400" : "text-xl text-gray-300"}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-col items-start gap-[15px] pt-[30px]">
                        <div className="h-px w-[230px] bg-[#484848]"></div>
                        <p
                          className="text-[32px] leading-none font-normal tracking-normal text-[#484848]"
                          style={{ fontFamily: "Volkhov" }}
                        >
                          {review.personName}
                        </p>
                        <p
                          className="text-base leading-none font-normal tracking-normal text-[#484848]"
                          style={{ fontFamily: "Poppins" }}
                        >
                          {review.personRole}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

     
          <div className="mt-8 flex flex-row justify-center gap-6 md:gap-8">
            <button
              aria-label="Previous review"
              onClick={handleLeft}
              className="nav-button left cursor-pointer rounded-full bg-white px-5 py-3 text-xl font-bold shadow-md transition-colors hover:bg-gray-100 md:px-6 md:py-4"
            >
              &#8592;
            </button>
            <button
              aria-label="Next review"
              onClick={handleRight}
              className="nav-button right cursor-pointer rounded-full bg-white px-5 py-3 text-xl font-bold shadow-md transition-colors hover:bg-gray-100 md:px-6 md:py-4"
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
