'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { api } from '@/lib/axios';
import { Product } from '@/types/product';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';

export default function ProductViewPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  const fetchProduct = async () => {
    try {
      const id = params?.id;
      if (!id) return;
      
      const response = await api.get<Product>(`/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  const handleDelete = async () => {
    if (!product || !window.confirm('¿Estás seguro de eliminar este producto?')) return;

    try {
      await api.delete(`/products/${product.id}`);
      router.push('/dashboard/products');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-white">Cargando...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-8">
        <p className="text-white">Producto no encontrado</p>
        <button
          onClick={() => router.push('/dashboard/products')}
          className="mt-4 text-[#00e38c] hover:underline"
        >
          Volver a productos
        </button>
      </div>
    );
  }

  const { name, description, price, category, condominio, images } = product;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.push('/dashboard/products')}
          className="flex items-center text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Volver
        </button>

        <div className="flex space-x-3">
          <button
            onClick={() => router.push(`/dashboard/products/edit/${product.id}`)}
            className="flex items-center space-x-2 px-4 py-2 bg-[#00e38c] hover:bg-[#00c77d] text-black rounded-lg transition-colors"
          >
            <Edit className="h-5 w-5" />
            <span>Editar</span>
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
          >
            <Trash2 className="h-5 w-5" />
            <span>Eliminar</span>
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700/50">
          {images?.[0] && (
            <img
            src={`${baseUrl}/${images[0]}`}
              alt={name}
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
          )}
          <h1 className="text-2xl font-semibold text-white mb-2">{name}</h1>
          <p className="text-gray-400 mb-4">{description}</p>
          <div className="flex items-center justify-between">
            <span className="text-[#00e38c] text-xl font-semibold">
              Bs. {price}
            </span>
            <span className="text-gray-400">
              Categoría: {category}
            </span>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700/50">
          <h2 className="text-xl font-semibold text-white mb-4">Detalles del vendedor</h2>
          <p className="text-gray-400">Condominio: {condominio}</p>
        </div>
      </div>
    </div>
  );
}