import { Product } from "./product";

export interface OrderProduct {
    productId: number;
    quantity: number;
    product?: Product; // Para cuando uni con el produc
  }
  
  export interface Order {
    id: number;
    userId: number;
    products: OrderProduct[];
    total: number;
    status: 'pending' | 'completed' | 'cancelled';
    date: string;
  }