'use client';

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/types/auth";

interface AuthStore {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  getToken: () => string | null;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      login: (user, token) => {
        localStorage.setItem("token", token); // Mantener esto para el interceptor
        set({ user, token });
      },
      logout: () => {
        localStorage.removeItem("token"); // Limpiar también el token del localStorage
        set({ user: null, token: null });
      },
      getToken: () => get().token
    }),
    {
      name: 'auth-storage',
    }
  )
);