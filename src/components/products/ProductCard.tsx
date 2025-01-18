import { Product } from '@/types/product';
import { Edit, Trash2 } from 'lucide-react';
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';

interface ProductCardProps {
  product: Product;
  onDelete: (id: number) => Promise<void>;
  index?: number;
}

export function ProductCard({ product, onDelete, index = 0 }: ProductCardProps) {
  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div 
      className={`transform transition-all duration-700 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div 
        className="bg-gray-800/50 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-102 cursor-pointer border border-gray-700/50"
        onClick={() => router.push(`/dashboard/products/view/${product.id}`)}
      >
        <div className="h-48 bg-gray-700">
          {product.images?.[0] && (
            <img
              src={`${baseUrl}/${product.images[0]}`}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          )}
        </div>
        
        <div className="p-4">
          <h3 className="text-xl font-semibold text-white mb-2">{product.name}</h3>
          <p className="text-gray-400 mb-2">{product.description}</p>
          <p className="text-[#00e38c] font-semibold">Bs. {product.price}</p>
          <p className="text-gray-400 text-sm mt-2">Condominio: {product.condominio}</p>
          
          <div className="flex justify-end space-x-2 mt-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(product.id);
              }}
              className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
            >
              <Trash2 className="h-5 w-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/dashboard/products/edit/${product.id}`);
              }}
              className="p-2 text-[#00e38c] hover:bg-[#00e38c]/10 rounded-lg transition-colors"
            >
              <Edit className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}