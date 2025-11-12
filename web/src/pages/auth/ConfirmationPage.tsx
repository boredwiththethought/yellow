import React from "react";
import { ConfirmationCode } from "../../components/auth/ConfirmationCode/ConfirmationCode";
import { Toaster } from "react-hot-toast";

export const ConfirmationPage: React.FC = () => {
  return (
    <>
      <Toaster position="top-right" />
      <ConfirmationCode />
    </>
  );
};

export default ConfirmationPage;
