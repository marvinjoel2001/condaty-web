'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth-store';
import Image from 'next/image';
import { Package, ShoppingCart, LogOut, Home } from 'lucide-react';

export default function Sidebar() {
  const router = useRouter();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push('/auth/login');
  };

  return (
    <aside className="fixed top-0 left-0 h-full w-64 bg-gray-900 p-4 flex flex-col">
      <div className="flex justify-center mb-8">
        <Image
          src="/logo.webp"
          alt="Condaty"
          width={150}
          height={60}
          className="w-auto h-12"
        />
      </div>
      
      <nav className="flex-1 space-y-2">
        <button
          onClick={() => router.push('/dashboard')}
          className="flex items-center space-x-2 w-full px-4 py-2 text-gray-300 hover:bg-[#00e38c] hover:text-black rounded-lg transition-colors"
        >
          <Home className="h-5 w-5" />
          <span>Inicio</span>
        </button>

        <button
          onClick={() => router.push('/dashboard/products')}
          className="flex items-center space-x-2 w-full px-4 py-2 text-gray-300 hover:bg-[#00e38c] hover:text-black rounded-lg transition-colors"
        >
          <Package className="h-5 w-5" />
          <span>Marketplace</span>
        </button>

        <button
          onClick={() => router.push('/dashboard/orders')}
          className="flex items-center space-x-2 w-full px-4 py-2 text-gray-300 hover:bg-[#00e38c] hover:text-black rounded-lg transition-colors"
        >
          <ShoppingCart className="h-5 w-5" />
          <span>Pedidos</span>
        </button>
      </nav>

      <button
        onClick={handleLogout}
        className="flex items-center space-x-2 w-full px-4 py-2 text-gray-300 hover:bg-red-500/10 hover:text-red-500 rounded-lg transition-colors mt-auto"
      >
        <LogOut className="h-5 w-5" />
        <span>Cerrar sesión</span>
      </button>
    </aside>
  );
}