import React from "react";
import { SignUp } from "../../components/auth/SignUp/SignUp";
import { Toaster } from "react-hot-toast";

export const SingUpPage: React.FC = () => {
  return (
    <>
      <Toaster position="top-right" />
      <SignUp />
    </>
  );
};

export default SingUpPage;
