import React from "react";
import { Link } from "react-router-dom";
import type { ThankYouProps } from "./types";

const ThankYouPage: React.FC<ThankYouProps> = ({ orderNumber, customerName }) => {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Main Content */}
      <div className="flex flex-1 items-center justify-center px-4 py-20">
        <div className="w-full max-w-3xl text-center">
          <h1
            className="mb-8 text-center text-7xl text-[106.79px] leading-[100%] tracking-[0] text-black md:text-8xl lg:text-9xl"
            style={{ fontFamily: "rage-italic" }}
          >
            Thank You
          </h1>

          {/* Description */}
          <div className="space-y-3">
            <p className="font-poppins text-center text-lg text-[30.82px] leading-[100%] font-medium tracking-[0] text-gray-400 md:text-xl">
              If you liked this project, then give it a <span className="inline-block text-2xl">👍</span>
            </p>

            <p className="font-poppins text-center text-base text-[30.82px] leading-[100%] font-medium tracking-[0] text-gray-400 md:text-lg">
              Don't forget to share your reviews in comment section.
            </p>
          </div>

          {/* Optional: Order Info если передали */}
          {orderNumber && (
            <div className="mt-10 inline-block rounded-lg bg-gray-50 p-6">
              <p className="mb-1 text-sm text-gray-600">Order Number</p>
              <p className="text-2xl font-bold text-black">#{orderNumber}</p>
              {customerName && <p className="mt-2 text-gray-500">Thank you, {customerName}!</p>}
            </div>
          )}

          {/* Back to Home Button */}
          <div className="mt-12">
            <Link
              to="/"
              className="inline-block rounded-lg bg-black px-8 py-3 font-medium text-white transition-colors hover:bg-gray-800"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>

      {/* Promo Banner */}
      <div className="bg-gray-800 py-8 md:py-10">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            {/* Left Side */}
            <div className="flex flex-col items-center gap-3 text-center md:flex-row md:text-left">
              <span className="text-base font-medium text-white md:text-lg">
                Get More Premium & High Quality Designs For
              </span>
              <div className="relative inline-block">
                <span className="inline-block -rotate-2 transform rounded-lg border-4 border-cyan-400 px-6 py-2 text-3xl font-bold text-white transition-transform hover:rotate-0 md:text-4xl">
                  FREE
                </span>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3">
              <img src="../../../public/images/thankyou/to-right.png" className="text-2xl md:text-3xl" />
              <div className="text-center">
                <a
                  href="https://community.example.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-base font-medium text-white transition-colors hover:text-cyan-400 md:text-lg"
                >
                  <span className="underline">Get'em From</span>
                  <br />
                  <span className="underline">Our Community</span>
                </a>
              </div>
              <img src="../../../public/images/thankyou/to-left.png" className="text-2xl md:text-3xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
