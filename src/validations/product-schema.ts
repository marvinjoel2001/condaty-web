import { z } from "zod";

// Definición de categorías permitidas
const CategoryEnum = z.enum(["servicios", "productos"] as const);


// Schema de validación para el formulario
export const productSchema = z.object({
  name: z
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(100, "El nombre no puede exceder los 100 caracteres"),
  description: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres")
    .max(500, "La descripción no puede exceder los 500 caracteres"),
  price: z
    .number()
    .min(0, "El precio no puede ser negativo")
    .max(999999.99, "El precio es demasiado alto"),
  category: CategoryEnum,
  condominio: z.string(),
  sellerId: z.number().optional(),
  images: z.array(z.string()).optional(),
});

// Tipo para los datos del formulario
export type ProductFormData = z.infer<typeof productSchema>;

// Tipo completo del producto incluyendo campos adicionales
export interface Product extends ProductFormData {
  id: number;
  createdAt?: string;
  updatedAt?: string;
}
