import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { User } from "@/types/auth";

export const useAuth = () => {
  const router = useRouter();
  const { user, token, login, logout } = useAuthStore();

  const handleLogin = async (user: User, token: string) => {

    login(user, token);
    Cookies.set("token", token, { expires: 7 });
    router.push("/dashboard");
  };

  const handleLogout = () => {
    logout();
    Cookies.remove("token");
    router.push("/auth/login");
  };


  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      handleLogout();
    }
  }, [handleLogout]);

  return {
    user,
    token,
    isAuthenticated: !!token,
    login: handleLogin,
    logout: handleLogout,
  };
};
