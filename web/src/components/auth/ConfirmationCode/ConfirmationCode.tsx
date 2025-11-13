import React, { useState, useRef } from "react";
import type { KeyboardEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthLayout } from "../AuthLayuot/AuthLayout";
import { AlertCircle } from "lucide-react";
import toast from "react-hot-toast";
import api from "../../../api/axios.config";

export const ConfirmationCode: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setError("");

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const newCode = [...code];
    for (let i = 0; i < pastedData.length; i++) {
      newCode[i] = pastedData[i];
    }
    setCode(newCode);
    inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const codeString = code.join("");

    if (codeString.length !== 6) {
      setError("Введите 6-значный код");
      return;
    }

    setIsLoading(true);
    try {
      await api.post("/auth/verify-code", { email, code: codeString });

      toast.success("Код подтвержден!");
      navigate("/enter-new-password", { state: { email, code: codeString } });
    } catch (error: any) {
      const data = error?.response?.data;
      setError(data?.message || "Неверный код");
      toast.error(data?.message || "Неверный код");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.post("/auth/forgot-password", { email });
      toast.success("Новый код отправлен!");
      if (data.code) {
        toast.success(`Код: ${data.code}`, { duration: 10000 });
      }
      setCode(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } catch (error: any) {
      const data = error?.response?.data;
      toast.error(data?.message || "Ошибка отправки кода");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout title="Enter Verification Code" subtitle={`We sent a code to ${email || "your email"}`}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <div className="flex justify-center gap-3">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={el => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={e => handleChange(index, e.target.value)}
                onKeyDown={e => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                disabled={isLoading}
                className={`h-14 w-12 rounded-lg border text-center text-xl font-bold focus:ring-2 focus:ring-black focus:outline-none ${
                  error ? "border-red-500" : "border-gray-300"
                }`}
                style={{ fontFamily: "Poppins" }}
              />
            ))}
          </div>
          {error && (
            <p className="mt-2 flex items-center justify-center gap-1 text-sm text-red-500">
              <AlertCircle size={14} /> {error}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-lg bg-black py-3 font-semibold text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          style={{ fontFamily: "Poppins" }}
        >
          {isLoading ? "Verifying..." : "Verify Code"}
        </button>

        <div className="text-center text-sm text-gray-600" style={{ fontFamily: "Poppins" }}>
          Didn't receive the code?{" "}
          <button
            type="button"
            onClick={handleResend}
            disabled={isLoading}
            className="font-semibold text-black hover:underline disabled:opacity-50"
          >
            Resend
          </button>
        </div>
      </form>
    </AuthLayout>
  );
};
