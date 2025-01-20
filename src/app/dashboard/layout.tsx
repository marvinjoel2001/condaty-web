"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useAuthStore } from "@/store/auth-store";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { token } = useAuthStore();

  useEffect(() => {
    if (!token) {
      router.push("/auth/login");
    }
  }, [token, router]);

  if (!token) {
    return null;
  }

  return <DashboardLayout>{children}</DashboardLayout>;
}
