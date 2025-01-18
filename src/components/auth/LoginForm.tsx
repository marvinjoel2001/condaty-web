'use client';

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/validations/auth-schema";
import { useAuthStore } from "@/store/auth-store";
import { api } from "@/lib/axios";
import { LoginCredentials, LoginResponse } from "@/types/auth";
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  const { register, handleSubmit, formState: { errors }, setError } = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (credentials: LoginCredentials) => {
    try {
      const response = await api.post<LoginResponse>('/auth/login', credentials);
      
      if (response.data.user) {
        login(response.data.user, response.data.token);
        router.push('/dashboard');
      }
    } catch (error) {
        console.error('Error:', error);
      setError('email', {
        type: 'manual',
        message: 'Credenciales incorrectas'
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#0B2921_0%,#0f1720_70%,#000000_100%)] flex items-center justify-center p-4">
      <div className={`w-full max-w-md space-y-8 transform transition-all duration-700 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <div className="text-center">
          <Image
            src="/logo.webp"
            alt="Condaty"
            className={`h-12 mx-auto transition-all duration-700 delay-100 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
            width={190}
            height={80}
          />
          <h2 className={`mt-6 text-2xl font-semibold text-white transition-all duration-700 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            Conectando tu comunidad
          </h2>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div className={`relative transition-all duration-700 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              <input
                {...register("email")}
                type="email"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-[#00e38c] transition-all duration-300 hover:scale-102"
                placeholder="Email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1 animate-fade-in">{errors.email?.message}</p>
              )}
            </div>
            
            <div className={`relative transition-all duration-700 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-[#00e38c] pr-12 transition-all duration-300 hover:scale-102"
                placeholder="Contraseña"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1 animate-fade-in">{errors.password?.message}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className={`w-full py-3 px-4 bg-[#00e38c] hover:bg-[#00c77d] text-black font-medium rounded-lg transition-all duration-700 delay-500 transform hover:scale-102 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
}