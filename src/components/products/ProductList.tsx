import { memo, useCallback } from "react";
import { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";
import { useProducts } from "@/hooks/useProducts";

interface ProductListProps {
  products: Product[];
  onUpdate: () => void;
  isLoading?: boolean;
}

const ProductList = memo(function ProductList({
  products,
  onUpdate,
  isLoading = false,
}: ProductListProps) {
  const { deleteProduct } = useProducts();

  const handleDelete = useCallback(
    async (id: number) => {
      if (window.confirm("¿Estás seguro de eliminar este producto?")) {
        try {
          await deleteProduct(id.toString());
          onUpdate();
        } catch (error) {
          console.error("Error deleting product:", error);
        }
      }
    },
    [deleteProduct, onUpdate]
  );

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {[1, 2, 3].map((index) => (
          <div
            key={index}
            className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700/50 animate-pulse"
          >
            <div className="h-48 bg-gray-700/50 rounded-lg mb-4"></div>
            <div className="h-4 bg-gray-700/50 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-700/50 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

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
