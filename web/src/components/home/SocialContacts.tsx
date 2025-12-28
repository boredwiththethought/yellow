import React from "react";

export const SocialContacts: React.FC = () => {
  return (
    <div className="container mx-auto mt-[150px] flex w-full flex-col items-center gap-[100px] px-4">
      <div className="flex flex-col items-center gap-5 text-center">
        <h1
          className="text-center text-[46px] leading-[100%] font-normal tracking-[0] text-[#484848]"
          style={{ fontFamily: "Volkhov" }}
        >
          Follow Us On Instagram
        </h1>
        <p
          className="text-center text-[16px] leading-[26px] font-normal tracking-[0] text-[#8A8A8A]"
          style={{ fontFamily: "Poppins" }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis <br /> ultrices sollicitudin aliquam
          sem. Scelerisque duis ultrices sollicitudin{" "}
        </p>
      </div>
      <div className="flex items-center">
        <img src="/images/home/social-contact/s-1.png" alt="s-1" />
        <img src="/images/home/social-contact/s-2.png" alt="s-2" />
        <img src="/images/home/social-contact/s-3.png" alt="s-3" />
        <img src="/images/home/social-contact/s-4.png" alt="s-4" />
        <img src="/images/home/social-contact/s-5.png" alt="s-5" />
      </div>
    </div>
  );
};

export default SocialContacts;
