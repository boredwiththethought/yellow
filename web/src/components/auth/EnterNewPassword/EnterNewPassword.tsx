import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthLayout } from "../AuthLayuot/AuthLayout";
import { AlertCircle, Eye, EyeOff, Lock } from "lucide-react";
import toast from "react-hot-toast";

export const EnterNewPassword: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  const code = location.state?.code || "";

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (formData.newPassword.length < 8) {
      newErrors.newPassword = "Пароль должен быть минимум 8 символов";
    }
    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Пароли не совпадают";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          code,
          newPassword: formData.newPassword
        })
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Ошибка сброса пароля");
        return;
      }

      toast.success("Пароль успешно изменен!");
      navigate("/sign-in");
    } catch (error) {
      console.error("Reset password error:", error);
      toast.error("Ошибка соединения с сервером");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout title="Create New Password" subtitle="Enter your new password">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700" style={{ fontFamily: "Poppins" }}>
            New Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className={`w-full rounded-lg border px-4 py-2 pr-10 pl-10 focus:ring-2 focus:ring-black focus:outline-none ${
                errors.newPassword ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="••••••••"
              disabled={isLoading}
            />
            <Lock size={20} className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.newPassword && (
            <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
              <AlertCircle size={12} /> {errors.newPassword}
            </p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700" style={{ fontFamily: "Poppins" }}>
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full rounded-lg border px-4 py-2 pr-10 pl-10 focus:ring-2 focus:ring-black focus:outline-none ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="••••••••"
              disabled={isLoading}
            />
            <Lock size={20} className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
              <AlertCircle size={12} /> {errors.confirmPassword}
            </p>
          )}
        </div>

        <div className="rounded-lg bg-blue-50 p-3 text-sm text-blue-900" style={{ fontFamily: "Poppins" }}>
          <p className="font-medium">Password requirements:</p>
          <ul className="mt-1 ml-4 list-disc space-y-1 text-xs">
            <li>At least 8 characters long</li>
            <li>Include both letters and numbers</li>
            <li>Use a unique password you haven't used before</li>
          </ul>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-lg bg-black py-3 font-semibold text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          style={{ fontFamily: "Poppins" }}
        >
          {isLoading ? "Resetting Password..." : "Reset Password"}
        </button>
      </form>
    </AuthLayout>
  );
};
