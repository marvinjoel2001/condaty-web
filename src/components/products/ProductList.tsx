import { Product } from '@/types/product';
import { api } from '@/lib/axios';
import { ProductCard } from './ProductCard';

interface ProductListProps {
  products: Product[];
  onUpdate: () => void;
}

export function ProductList({ products, onUpdate }: ProductListProps) {
  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      try {
        await api.delete(`/products/${id}`);
        onUpdate();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
}