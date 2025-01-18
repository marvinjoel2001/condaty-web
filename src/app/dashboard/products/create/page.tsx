'use client';

import { ProductForm } from '@/components/products/ProductForm';

export default function CreateProductPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-white mb-6">Crear Producto</h1>
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700/50">
        <ProductForm />
      </div>
    </div>
  );
}