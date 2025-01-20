import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Rutas públicas que no requieren autenticación
const publicRoutes = ["/auth/login", "/auth/register"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // Si es la ruta raíz, redirigir a login
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Verificar si la ruta actual es pública
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Verificar si la ruta actual es del dashboard
  const isDashboardRoute = pathname.startsWith("/dashboard");

  // Si no hay token y es una ruta del dashboard, redirigir al login
  if (!token && isDashboardRoute) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Si hay token y estamos en una ruta pública, redirigir al dashboard
  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

// Configurar qué rutas debe manejar el middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
