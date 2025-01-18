export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    images: string[];
    condominio: string;
    sellerId: number;
  }
  
  // Para categorías
  export interface Category {
    id: number;
    name: string;
  }
  
  // Para items en el carrito/orden
  export interface OrderItem {
    productId: number;
    quantity: number;
  }
  
  // Para órdenes
  export interface Order {
    id: number;
    userId: number;
    products: OrderItem[];
    total: number;
    status: "completed" | "pending" | "cancelled"; // Añadí estados comunes
    date: string;
  }
  
  // Para usuarios
  export interface User {
    id: number;
    email: string;
    name: string;
    condominio: string;
  }
  
  // Interface para la creación de productos 
  export type CreateProductDto = Omit<Product, 'id'>;
  
  // Interface para actualización de productos
  export type UpdateProductDto = Partial<CreateProductDto>;
  
  // Interface para la respuesta de la API
  export interface ApiResponse<T> {
    data: T;
    message?: string;
    success: boolean;
  }