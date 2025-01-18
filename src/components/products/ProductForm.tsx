'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { api } from '@/lib/axios';
import { CreateProductDto, Product } from '@/types/product';
import { useAuthStore } from '@/store/auth-store';

interface ProductFormProps {
 initialData?: Product;
 isEditing?: boolean;
}

export function ProductForm({ initialData, isEditing = false }: ProductFormProps) {
 const router = useRouter();
 const [isLoading, setIsLoading] = useState(false);
 const [isVisible, setIsVisible] = useState(false);
 const { user } = useAuthStore();

 useEffect(() => {
   setIsVisible(true);
 }, []);

 const { register, handleSubmit, formState: { errors } } = useForm<CreateProductDto>({
  defaultValues: initialData || {
    name: '',
    description: '',
    price: 0,
    category: '',
    condominio: user?.condominio || '',
    images: [],
    sellerId: user?.id ? Number(user.id) : undefined, 
  },
});


 const onSubmit = async (data: CreateProductDto) => {
   try {
     setIsLoading(true);
     if (isEditing && initialData) {
       await api.put(`/products/${initialData.id}`, data);
     } else {
       await api.post('/products', data);
     }
     router.push('/dashboard/products');
     router.refresh();
   } catch (error) {
     console.error('Error:', error);
   } finally {
     setIsLoading(false);
   }
 };

 return (
   <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
     <div className={`transform transition-all duration-700 delay-200 ${
       isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
     }`}>
       <label className="block text-white mb-2">Nombre del producto</label>
       <input
         {...register('name', { required: 'Este campo es requerido' })}
         className="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg text-white focus:ring-2 focus:ring-[#00e38c] transition-all duration-300 hover:scale-102"
       />
       {errors.name && (
         <p className="text-red-500 text-sm mt-1 animate-fade-in">{errors.name.message}</p>
       )}
     </div>

     <div className={`transform transition-all duration-700 delay-300 ${
       isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
     }`}>
       <label className="block text-white mb-2">Descripción</label>
       <textarea
         {...register('description', { required: 'Este campo es requerido' })}
         className="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg text-white focus:ring-2 focus:ring-[#00e38c] transition-all duration-300 hover:scale-102"
         rows={4}
       />
       {errors.description && (
         <p className="text-red-500 text-sm mt-1 animate-fade-in">{errors.description.message}</p>
       )}
     </div>

     <div className={`transform transition-all duration-700 delay-400 ${
       isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
     }`}>
       <label className="block text-white mb-2">Precio</label>
       <input
         type="number"
         {...register('price', { required: 'Este campo es requerido', min: 0 })}
         className="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg text-white focus:ring-2 focus:ring-[#00e38c] transition-all duration-300 hover:scale-102"
       />
       {errors.price && (
         <p className="text-red-500 text-sm mt-1 animate-fade-in">{errors.price.message}</p>
       )}
     </div>

     <div className={`transform transition-all duration-700 delay-450 ${
       isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
     }`}>
       <label className="block text-white mb-2">Categoría</label>
       <select
         {...register('category', { required: 'Este campo es requerido' })}
         className="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg text-white focus:ring-2 focus:ring-[#00e38c] transition-all duration-300 hover:scale-102"
       >
         <option value="">Selecciona una categoría</option>
         <option value="servicios">Servicios</option>
         <option value="productos">Productos</option>
       </select>
       {errors.category && (
         <p className="text-red-500 text-sm mt-1 animate-fade-in">{errors.category.message}</p>
       )}
     </div>

     <button
       type="submit"
       disabled={isLoading}
       className={`w-full py-3 px-4 bg-[#00e38c] hover:bg-[#00c77d] text-black font-medium rounded-lg transition-all duration-700 delay-500 transform hover:scale-102 ${
         isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
       }`}
     >
       {isLoading ? 'Guardando...' : isEditing ? 'Actualizar producto' : 'Crear producto'}
     </button>
   </form>
 );
}