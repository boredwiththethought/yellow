import React from "react";
import { SignIn } from "../../components/auth/SignIn/SignIn";
import { Toaster } from "react-hot-toast";

export const SingInPage: React.FC = () => {
  return (
    <>
      <Toaster position="top-right" />
      <SignIn />
    </>
  );
};

export default SingInPage;
