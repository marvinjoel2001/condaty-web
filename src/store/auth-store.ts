'use client';

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { User } from "@/types/auth";
import Cookies from "js-cookie";

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
        if (!user?.id) {
          console.error("Usuario inválido:", user);
          return;
        }
        // Guardar en localStorage y cookies
        localStorage.setItem("token", token);
        Cookies.set("token", token, { expires: 7 }); // Cookie expira en 7 días
        set({ user, token });
      },
      logout: () => {
        localStorage.removeItem("token");
        Cookies.remove("token");
        set({ user: null, token: null });
      },
      getToken: () => get().token,
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user, token: state.token }),
    }
  )
);