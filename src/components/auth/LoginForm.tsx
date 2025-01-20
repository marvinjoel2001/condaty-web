"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/validations/auth-schema";
import { useAuthStore } from "@/store/auth-store";
import { api } from "@/lib/axios";
import { LoginCredentials, LoginResponse } from "@/types/auth";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Eye, EyeOff, ArrowRight, ArrowLeft } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showPasswordField, setShowPasswordField] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (credentials: LoginCredentials) => {
    try {
      const response = await api.post<LoginResponse>(
        "/auth/login",
        credentials
      );

      if (response.data.user) {
        login(response.data.user, response.data.token);
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("email", {
        type: "manual",
        message: "Credenciales incorrectas",
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleContinue = () => {
    const emailValue = watch("email");
    if (emailValue && !errors.email) {
      setShowPasswordField(true);
    }
  };
  const handleBack = () => {
    setShowPasswordField(false);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#071510_0%,#060a0f_70%,#000000_100%)]"></div>

      {/* Spotlight effect with background image */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle 200px at ${mousePosition.x}px ${mousePosition.y}px, transparent 10%, rgba(0,0,0,0.95) 100%)`,
        }}
      >
        <Image
          src="/background.webp"
          alt="Background"
          fill
          className="object-cover opacity-10"
          priority
        />
      </div>

      {/* Main content */}
      <div
        className={`relative w-full max-w-md space-y-8 backdrop-blur-sm bg-black/30 p-8 rounded-2xl border border-white/10 shadow-2xl transform transition-all duration-700 ease-out ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <div className="text-center">
          <Image
            src="/logo.webp"
            alt="Condaty"
            className={`h-12 mx-auto transition-all duration-700 delay-100 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
            width={190}
            height={80}
          />
          <h2
            className={`mt-6 text-2xl font-semibold text-white transition-all duration-700 delay-200 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            Conectando tu comunidad
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="space-y-4">
            {/* Campo de Email */}
            <div
              className={`relative group transition-all duration-700 delay-300 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
            >
              <div className="relative">
                <input
                  {...register("email")}
                  type="email"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:ring-2 focus:ring-[#00e38c] focus:border-transparent transition-all duration-300 group-hover:border-white/30"
                  placeholder="Email"
                  disabled={showPasswordField}
                />
                {!showPasswordField && (
                  <button
                    type="button"
                    onClick={handleContinue}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-black/60 hover:text-black transition-colors duration-200"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </button>
                )}
              </div>
              {errors.email && (
                <p className="text-red-400 text-sm mt-1 animate-fade-in">
                  {errors.email?.message}
                </p>
              )}
            </div>

            {/* Campo de Password */}
            {showPasswordField && (
              <div
                className={`relative group transform transition-all duration-700 ${
                  showPasswordField
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                }`}
              >
                <div className="relative flex items-center">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors duration-200"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                  <input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    className="w-full pl-12 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:ring-2 focus:ring-[#00e38c] focus:border-transparent transition-all duration-300 group-hover:border-white/30"
                    placeholder="Contraseña"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors duration-200 flex items-center justify-center w-5 h-5"
                  >
                    {showPassword ? (
                      <EyeOff className="w-full h-full" />
                    ) : (
                      <Eye className="w-full h-full" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-400 text-sm mt-1 animate-fade-in">
                    {errors.password?.message}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Botón de submit */}
          {showPasswordField && (
            <button
              type="submit"
              className={`w-full py-3 px-4 bg-[#00e38c] hover:bg-[#00c77d] text-black font-medium rounded-lg transition-all duration-700 transform hover:scale-105 hover:shadow-lg hover:shadow-[#00e38c]/20 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
            >
              Iniciar sesión
            </button>
          )}
        </form>
      </div>
    </div>
  );
}