import React from "react";
import { EnterNewPassword } from "../../components/auth/EnterNewPassword/EnterNewPassword";
import { Toaster } from "react-hot-toast";

export const EnterNewPasswordPage: React.FC = () => {
  return (
    <>
      <Toaster position="top-right" />
      <EnterNewPassword />
    </>
  );
};

export default EnterNewPasswordPage;
