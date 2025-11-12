import React from "react";
import { ForgotPassword } from "../../components/auth/ForgotPassword/ForgotPassword";
import { Toaster } from "react-hot-toast";

export const ForgotPasswordPage: React.FC = () => {
  return (
    <>
      <Toaster position="top-right" />
      <ForgotPassword />
    </>
  );
};

export default ForgotPasswordPage;
