import { memo, useCallback } from 'react';
import { Product } from '@/types/product';
import { api } from '@/lib/axios';
import { ProductCard } from './ProductCard';

interface ProductListProps {
  products: Product[];
  onUpdate: () => void;
}

const ProductList = memo(function ProductList({ products, onUpdate }: ProductListProps) {
  const handleDelete = useCallback(async (id: number) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      try {
        await api.delete(`/products/${id}`);
        onUpdate();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  }, [onUpdate]);

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No hay productos disponibles</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          onDelete={handleDelete}
          index={index}
        />
      ))}
    </div>
  );
});

export default ProductList;