import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { productService } from "@/lib/api/products";
import { Product } from "@/types/product";

export const useProducts = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await productService.getAll();
      setProducts(data);
    } catch (err) {
      setError("Error al cargar los productos");
      console.error("Error fetching products:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getProduct = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);
      return await productService.getById(id);
    } catch (err) {
      setError("Error al cargar el producto");
      console.error("Error getting product:", err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createProduct = useCallback(
    async (productData: FormData) => {
      try {
        setIsLoading(true);
        setError(null);
        await productService.create(productData);
        router.push("/dashboard/products");
      } catch (err) {
        setError("Error al crear el producto");
        console.error("Error creating product:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [router]
  );

  const updateProduct = useCallback(
    async (id: string, productData: FormData) => {
      try {
        setIsLoading(true);
        setError(null);
        await productService.update(id, productData);
        router.push("/dashboard/products");
      } catch (err) {
        setError("Error al actualizar el producto");
        console.error("Error updating product:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [router]
  );

  const deleteProduct = useCallback(
    async (id: string) => {
      try {
        setIsLoading(true);
        setError(null);
        await productService.delete(id);
        router.push("/dashboard/products");
      } catch (err) {
        setError("Error al eliminar el producto");
        console.error("Error deleting product:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [router]
  );

  return {
    products,
    isLoading,
    error,
    fetchProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
  };
};
