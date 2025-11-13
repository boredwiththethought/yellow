import React from "react";

interface FooterButtonProps {
  text: string;
  onClick?: () => void;
}

const FooterButton: React.FC<FooterButtonProps> = ({ text, onClick }) => {
  return (
    <button
      className="shadow-[0px_20px_35px_0px_#00000026 cursor-pointer rounded-[10px] bg-black px-11 py-5 text-center text-[16px] leading-[100%] font-normal tracking-[0px] text-white"
      style={{ fontFamily: "Poppins" }}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default FooterButton;
