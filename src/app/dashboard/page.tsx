'use client';

import { useAuthStore } from "@/store/auth-store";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Package, ShoppingCart } from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`space-y-6 transform transition-all duration-700 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
      <div className={`bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700/50 transition-all duration-700 delay-200 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
        <h1 className="text-2xl font-semibold text-white mb-4">
          Bienvenido, {user?.name}
        </h1>
        <p className="text-gray-400">
          Administra tus productos y pedidos del condominio {user?.condominio}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className={`bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700/50 transition-all duration-700 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <div className="flex items-center gap-3 mb-4">
            <Package className="h-6 w-6 text-[#00e38c]" />
            <h2 className="text-xl font-semibold text-white">Productos</h2>
          </div>
          <p className="text-gray-400 mb-6">
            Gestiona los productos y servicios que ofreces en tu condominio.
          </p>
          <button
            onClick={() => router.push('/dashboard/products')}
            className="w-full py-3 px-4 bg-[#00e38c] hover:bg-[#00c77d] text-black font-medium rounded-lg transition-all duration-300 transform hover:scale-102"
          >
            Ver productos
          </button>
        </div>

        <div className={`bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700/50 transition-all duration-700 delay-400 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <div className="flex items-center gap-3 mb-4">
            <ShoppingCart className="h-6 w-6 text-[#00e38c]" />
            <h2 className="text-xl font-semibold text-white">Pedidos</h2>
          </div>
          <p className="text-gray-400 mb-6">
            Revisa y gestiona los pedidos recibidos de tus productos.
          </p>
          <button
            onClick={() => router.push('/dashboard/orders')}
            className="w-full py-3 px-4 bg-[#00e38c] hover:bg-[#00c77d] text-black font-medium rounded-lg transition-all duration-300 transform hover:scale-102"
          >
            Ver pedidos
          </button>
        </div>
      </div>
    </div>
  );
}