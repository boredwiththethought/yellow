import React from "react";
import { Link } from "react-router-dom";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md">

        <div className="mb-8 text-center">
          <Link to="/" className="inline-block">
            <h1 className="text-4xl font-bold text-gray-900" style={{ fontFamily: "Volkhov" }}>
              FASCO
            </h1>
          </Link>
        </div>


        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <div className="mb-6 text-center">
            <h2 className="mb-2 text-2xl font-bold text-gray-900" style={{ fontFamily: "Poppins" }}>
              {title}
            </h2>
            {subtitle && (
              <p className="text-sm text-gray-600" style={{ fontFamily: "Poppins" }}>
                {subtitle}
              </p>
            )}
          </div>

          {children}
        </div>


        <div className="mt-6 text-center text-sm text-gray-600" style={{ fontFamily: "Poppins" }}>
          <Link to="/shop" className="hover:text-gray-900 hover:underline">
            Continue Shopping
          </Link>
          {" · "}
          <Link to="/" className="hover:text-gray-900 hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};
