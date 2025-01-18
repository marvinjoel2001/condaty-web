'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/axios';
import { Plus } from 'lucide-react';
import { Product } from '@/types/product';
import dynamic from 'next/dynamic';


const DynamicProductList = dynamic(() => import('@/components/products/ProductList'), {
  loading: () => <div>Cargando...</div>,
  ssr: false
});

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const fetchProducts = useCallback(async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Memoize filtered products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = !searchTerm || 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = !selectedCategory || 
        product.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  // Memoize handlers
  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleCategoryChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  }, []);

  const handleCreateClick = useCallback(() => {
    router.push('/dashboard/products/create');
  }, [router]);

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-xl md:text-2xl font-semibold text-white">Marketplace</h1>
        <button
          onClick={handleCreateClick}
          className="w-full sm:w-auto flex items-center justify-center space-x-2 px-4 py-2 bg-[#00e38c] hover:bg-[#00c77d] text-black rounded-lg transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span className="hidden sm:inline">Nuevo Producto</span>
          <span className="sm:hidden">Nuevo</span>
        </button>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Buscar productos..."
          className="flex-1 px-4 py-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg text-white focus:ring-2 focus:ring-[#00e38c] transition-all"
        />
        <select 
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="px-4 py-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg text-white focus:ring-2 focus:ring-[#00e38c] transition-all"
        >
          <option value="">Todas las categorías</option>
          <option value="servicios">Servicios</option>
          <option value="productos">Productos</option>
        </select>
      </div>

      <DynamicProductList 
        products={filteredProducts}
        onUpdate={fetchProducts}
      />
    </div>
  );
}