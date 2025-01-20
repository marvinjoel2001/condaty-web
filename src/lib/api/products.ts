import { api } from "../axios";
import { Product } from "@/types/product";

export const productService = {
  getAll: async () => {
    const response = await api.get<Product[]>("/products");
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
  },

  create: async (data: FormData) => {
    const response = await api.post<Product>("/products", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  update: async (id: string, data: FormData) => {
    const response = await api.put<Product>(`/products/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  delete: async (id: string) => {
    await api.delete(`/products/${id}`);
  },
};
