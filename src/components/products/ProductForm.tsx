"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productService } from "@/lib/api/products";
import { ProductFormProps } from "@/types/product";
import { useAuthStore } from "@/store/auth-store";
import { productSchema, ProductFormData } from "@/validations/product-schema";
import { UploadCloud, X } from "lucide-react";



export function ProductForm({
  initialData,
  isEditing = false,
}: ProductFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const { user } = useAuthStore();
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

  useEffect(() => {
    setIsVisible(true);
    if (initialData?.images?.length) {
      setPreviewUrls(initialData.images.map((img) => `${baseUrl}/${img}`));
    }
  }, [initialData, baseUrl]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      price: initialData?.price || 0,
      category:
        (initialData?.category as "servicios" | "productos") || undefined,
      condominio: initialData?.condominio || user?.condominio || "",
      sellerId:
        initialData?.sellerId || (user?.id ? Number(user.id) : undefined),
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const urls = Array.from(files).map((file) => URL.createObjectURL(file));
      setPreviewUrls(urls);
    }
  };

  const removeImage = (index: number) => {
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
    // También limpiar el input de archivos
    const fileInput =
      document.querySelector<HTMLInputElement>('input[type="file"]');
    if (fileInput) {
      fileInput.value = "";
    }
  };

const onSubmit = async (data: ProductFormData) => {
  try {
    setIsLoading(true);

    // Construir el objeto de producto
    const productData = {
      name: data.name,
      description: data.description,
      price: Number(data.price),
      category: data.category,
      condominio: user?.condominio || "",
      sellerId: user?.id ? Number(user.id) : undefined,
    };

    console.log("Sending product data:", productData); // Debug log

    const formData = new FormData();
    formData.append("productData", JSON.stringify(productData));

    // Agregar imágenes si existen
    const fileInput =
      document.querySelector<HTMLInputElement>('input[type="file"]');
    if (fileInput?.files) {
      Array.from(fileInput.files).forEach((file) => {
        formData.append("images", file);
      });
    }

    if (isEditing && initialData) {
      const result = await productService.update(
        initialData.id.toString(),
        formData
      );
      if (!result) throw new Error("Failed to update product");
    } else {
      const result = await productService.create(formData);
      if (!result) throw new Error("Failed to create product");
    }

    router.push("/dashboard/products");
    router.refresh();
  } catch (error) {
    console.error("Error:", error);
    // Aquí podrías agregar una notificación de error para el usuario
  } finally {
    setIsLoading(false);
  }
};

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div
        className={`transform transition-all duration-700 delay-200 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <label className="block text-white mb-2">Nombre del producto</label>
        <input
          {...register("name")}
          className="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg text-white focus:ring-2 focus:ring-[#00e38c] transition-all duration-300"
          placeholder="Ingresa el nombre del producto"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div
        className={`transform transition-all duration-700 delay-300 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <label className="block text-white mb-2">Descripción</label>
        <textarea
          {...register("description")}
          className="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg text-white focus:ring-2 focus:ring-[#00e38c] transition-all duration-300"
          rows={4}
          placeholder="Describe tu producto"
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      <div
        className={`transform transition-all duration-700 delay-400 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <label className="block text-white mb-2">Imágenes</label>
        <div className="relative flex flex-col items-center p-6 border-2 border-dashed border-gray-700/50 rounded-lg hover:border-[#00e38c]/50 transition-colors">
          <UploadCloud className="w-12 h-12 text-gray-400 mb-2" />
          <p className="text-gray-400 mb-2">
            Arrastra y suelta o haz clic para seleccionar
          </p>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="w-full h-full opacity-0 absolute inset-0 cursor-pointer"
          />
        </div>

        {previewUrls.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {previewUrls.map((url, index) => (
              <div key={index} className="relative group">
                <img
                  src={url}
                  alt={`Preview ${index + 1}`}
                  className="w-full aspect-square object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div
        className={`transform transition-all duration-700 delay-500 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <label className="block text-white mb-2">Precio</label>
        <input
          type="number"
          step="0.01"
          {...register("price", { valueAsNumber: true })}
          className="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg text-white focus:ring-2 focus:ring-[#00e38c] transition-all duration-300"
          placeholder="0.00"
        />
        {errors.price && (
          <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
        )}
      </div>

      <div
        className={`transform transition-all duration-700 delay-600 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <label className="block text-white mb-2">Categoría</label>
        <select
          {...register("category")}
          className="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg text-white focus:ring-2 focus:ring-[#00e38c] transition-all duration-300"
        >
          <option value="">Selecciona una categoría</option>
          <option value="servicios">Servicios</option>
          <option value="productos">Productos</option>
        </select>
        {errors.category && (
          <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
        )}
      </div>

      <input
        type="hidden"
        {...register("condominio")}
        value={user?.condominio || ""}
      />

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-3 px-4 bg-[#00e38c] hover:bg-[#00c77d] text-black font-medium rounded-lg transition-all duration-700 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        {isLoading
          ? "Guardando..."
          : isEditing
          ? "Actualizar producto"
          : "Crear producto"}
      </button>
    </form>
  );
}
