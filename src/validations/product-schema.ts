import { z } from 'zod';

export const productSchema = z.object({
  name: z.string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(50, 'El nombre no puede tener más de 50 caracteres'),
  description: z.string()
    .min(10, 'La descripción debe tener al menos 10 caracteres')
    .max(500, 'La descripción no puede tener más de 500 caracteres'),
  price: z.number()
    .min(0, 'El precio no puede ser negativo')
    .max(999999, 'El precio es demasiado alto'),
  category: z.enum(['servicios', 'productos'], {
    errorMap: () => ({ message: 'Debes seleccionar una categoría válida' })
  }),
  condominio: z.string().min(1, 'El condominio es requerido'),
  images: z.array(z.string()).optional(),
  sellerId: z.number().optional()
});

export type ProductFormData = z.infer<typeof productSchema>;