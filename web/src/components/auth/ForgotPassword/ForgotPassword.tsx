import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthLayout } from "../AuthLayuot/AuthLayout";
import { AlertCircle, Mail } from "lucide-react";
import toast from "react-hot-toast";

export const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (): boolean => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Введите корректный email");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail()) return;

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Ошибка отправки кода");
        return;
      }

      toast.success("Код отправлен на ваш email");


      if (data.code) {
        toast.success(`Код: ${data.code}`, { duration: 10000 });
      }

 
      navigate("/confirmation", { state: { email } });
    } catch (error) {
      console.error("Forgot password error:", error);
      toast.error("Ошибка соединения с сервером");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout title="Forgot Password" subtitle="Enter your email and we'll send you a verification code">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700" style={{ fontFamily: "Poppins" }}>
            Email Address
          </label>
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={e => {
                setEmail(e.target.value);
                if (error) setError("");
              }}
              className={`w-full rounded-lg border px-4 py-2 pl-10 focus:ring-2 focus:ring-black focus:outline-none ${
                error ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="john.doe@example.com"
              disabled={isLoading}
            />
            <Mail size={20} className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
          </div>
          {error && (
            <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
              <AlertCircle size={12} /> {error}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-lg bg-black py-3 font-semibold text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          style={{ fontFamily: "Poppins" }}
        >
          {isLoading ? "Sending..." : "Send Verification Code"}
        </button>

        <div className="text-center text-sm text-gray-600" style={{ fontFamily: "Poppins" }}>
          Remember your password?{" "}
          <Link to="/sign-in" className="font-semibold text-black hover:underline">
            Sign In
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};
