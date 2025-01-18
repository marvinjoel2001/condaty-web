'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProductList } from '@/components/products/ProductList';
import { api } from '@/lib/axios';
import { Plus } from 'lucide-react';

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-white">Marketplace</h1>
        <button
          onClick={() => router.push('/dashboard/products/create')}
          className="flex items-center space-x-2 px-4 py-2 bg-[#00e38c] hover:bg-[#00c77d] text-black rounded-lg transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Nuevo Producto</span>
        </button>
      </div>
      <ProductList products={products} onUpdate={fetchProducts} />
    </div>
  );
}