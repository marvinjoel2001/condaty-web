"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import dynamic from "next/dynamic";

const DynamicProductList = dynamic(
  () => import("@/components/products/ProductList"),
  {
    loading: () => <div>Cargando...</div>,
    ssr: false,
  }
);

export default function ProductsPage() {
  const router = useRouter();
  const { products, isLoading, error, fetchProducts } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        !searchTerm ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        !selectedCategory || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-white">Marketplace</h1>
        <button
          onClick={() => router.push("/dashboard/products/create")}
          className="flex items-center space-x-2 px-4 py-2 bg-[#00e38c] hover:bg-[#00c77d] text-black rounded-lg transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Nuevo Producto</span>
        </button>
      </div>

      <div className="flex space-x-4">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-black"
        >
          <option value="">Todas las categorías</option>
          <option value="servicios">Servicios</option>
          <option value="productos">Productos</option>
        </select>
      </div>

      <DynamicProductList
        products={filteredProducts}
        isLoading={isLoading}
        onUpdate={fetchProducts}
      />
    </div>
  );
}
