import { Product } from "@/types/product";
import { Edit, Trash2, Tag, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";

interface ProductCardProps {
  product: Product;
  onDelete: (id: number) => Promise<void>;
  index?: number;
}

export function ProductCard({
  product,
  onDelete,
  index = 0,
}: ProductCardProps) {
  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleViewProduct = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      router.push(`/dashboard/products/view/${product.id}`);
    },
    [router, product.id]
  );

  const handleEditProduct = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      router.push(`/dashboard/products/edit/${product.id}`);
    },
    [router, product.id]
  );

  const handleDeleteProduct = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onDelete(product.id);
    },
    [onDelete, product.id]
  );

  // Formatear el precio de manera segura
  const formattedPrice =
    typeof product.price === "number"
      ? `Bs. ${product.price.toLocaleString("es-VE", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`
      : "Precio no disponible";

  return (
    <div
      className={`transform transition-all duration-700 ease-out ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div
        className="relative group bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-gray-700/50 hover:border-[#00e38c]/50 transition-all duration-300 cursor-pointer"
        onClick={handleViewProduct}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Badge de categoría */}
        <div className="absolute top-3 left-3 z-10">
          <span className="px-3 py-1 bg-[#00e38c]/20 backdrop-blur-md text-[#00e38c] text-sm rounded-full border border-[#00e38c]/30">
            {product.category}
          </span>
        </div>

        {/* Imagen con overlay en hover */}
        <div className="relative h-48">
          {product.images?.[0] ? (
            <img
              src={`${baseUrl}/${product.images[0]}`}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-gray-700 flex items-center justify-center">
              <Tag className="h-12 w-12 text-gray-500" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />
        </div>

        {/* Contenido */}
        <div className="p-5">
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-white group-hover:text-[#00e38c] transition-colors">
              {product.name}
            </h3>
            <p className="text-gray-400 text-sm line-clamp-2 min-h-[40px]">
              {product.description}
            </p>

            <div className="flex items-center justify-between">
              <p className="text-[#00e38c] text-xl font-bold">
                {formattedPrice}
              </p>
              <div className="flex items-center text-gray-400 text-sm">
                <MapPin className="h-4 w-4 mr-1" />
                {product.condominio}
              </div>
            </div>
          </div>

          <div
            className={`flex justify-end space-x-2 mt-4 transition-all duration-300 ${
              isHovered
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleDeleteProduct}
              className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-all hover:scale-110"
            >
              <Trash2 className="h-5 w-5" />
            </button>
            <button
              onClick={handleEditProduct}
              className="p-2 text-[#00e38c] hover:bg-[#00e38c]/10 rounded-lg transition-all hover:scale-110"
            >
              <Edit className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
