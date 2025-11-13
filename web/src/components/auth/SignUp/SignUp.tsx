import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthLayout } from "../AuthLayuot/AuthLayout";
import { useAuth } from "../../../context/AuthContext";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import api from "../../../api/axios.config";

export const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
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

    if (formData.firstName.length < 2) {
      newErrors.firstName = "Имя должно быть минимум 2 символа";
    }
    if (formData.lastName.length < 2) {
      newErrors.lastName = "Фамилия должна быть минимум 2 символа";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Введите корректный email";
    }
    if (formData.password.length < 8) {
      newErrors.password = "Пароль должен быть минимум 8 символов";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const { data } = await api.post("/auth/register", formData);

      toast.success("Регистрация успешна!");
      login(data.token, data.user);
      navigate("/");
    } catch (error: any) {
      const data = error?.response?.data;
      if (data?.errors) {
        const errorMap: Record<string, string> = {};
        data.errors.forEach((err: { field: string; message: string }) => {
          errorMap[err.field] = err.message;
        });
        setErrors(errorMap);
      }
      toast.error(data?.message || "Ошибка регистрации");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout title="Create Account" subtitle="Join FASCO and start shopping">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700" style={{ fontFamily: "Poppins" }}>
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-black focus:outline-none ${
                errors.firstName ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="John"
              disabled={isLoading}
            />
            {errors.firstName && (
              <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                <AlertCircle size={12} /> {errors.firstName}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700" style={{ fontFamily: "Poppins" }}>
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-black focus:outline-none ${
                errors.lastName ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Doe"
              disabled={isLoading}
            />
            {errors.lastName && (
              <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                <AlertCircle size={12} /> {errors.lastName}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700" style={{ fontFamily: "Poppins" }}>
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-black focus:outline-none ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="john.doe@example.com"
            disabled={isLoading}
          />
          {errors.email && (
            <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
              <AlertCircle size={12} /> {errors.email}
            </p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700" style={{ fontFamily: "Poppins" }}>
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full rounded-lg border px-4 py-2 pr-10 focus:ring-2 focus:ring-black focus:outline-none ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="••••••••"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
              <AlertCircle size={12} /> {errors.password}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-lg bg-black py-3 font-semibold text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          style={{ fontFamily: "Poppins" }}
        >
          {isLoading ? "Creating Account..." : "Sign Up"}
        </button>

        <div className="text-center text-sm text-gray-600" style={{ fontFamily: "Poppins" }}>
          Already have an account?{" "}
          <Link to="/sign-in" className="font-semibold text-black hover:underline">
            Sign In
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};
