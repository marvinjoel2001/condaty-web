'use client';
import { useEffect, useState } from 'react';
import { api } from '@/lib/axios';
import { Order } from '@/types/order'; 
import { useAuthStore } from '@/store/auth-store';
import { formatDate } from '@/lib/utils';
import { FileText, Package, CheckCircle, XCircle, Clock } from 'lucide-react';

export default function OrdersPage() {
 const [orders, setOrders] = useState<Order[]>([]);
 const [isLoading, setIsLoading] = useState(true);
 const { user } = useAuthStore();
 const [isVisible, setIsVisible] = useState(false);

 useEffect(() => {
   setIsVisible(true);
 }, []);

 useEffect(() => {
   if (user?.id) {
     fetchOrders();
   }
 // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [user?.id]);

 const fetchOrders = async () => {
    if (!user?.id) {
      console.error('Usuario no encontrado');
      return;
    }
     
    try {
      setIsLoading(true);
    
      const response = await api.get(`/orders?userId=${user.id}`);
      const orders = response.data;
  
  
      const ordersWithProducts = await Promise.all(
        orders.map(async (order: Order) => {
          

          const productsWithDetails = await Promise.all(
            order.products.map(async (item) => {
              try {
                const productResponse = await api.get(`/products/${item.productId}`);
                return {
                  ...item,
                  product: productResponse.data
                };
              } catch (error) {
                console.error(`Error fetching product ${item.productId}:`, error);
                return {
                  ...item,
                  product: null
                };
              }
            })
          );
  
          return {
            ...order,
            products: productsWithDetails
          };
        })
      );
  
      setOrders(ordersWithProducts);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

 const getStatusColor = (status: string) => {
   switch (status) {
     case 'completed':
       return 'text-green-500';
     case 'cancelled':
       return 'text-red-500';
     default:
       return 'text-yellow-500';
   }
 };

 const getStatusIcon = (status: string) => {
   switch (status) {
     case 'completed':
       return <CheckCircle className="h-5 w-5" />;
     case 'cancelled':
       return <XCircle className="h-5 w-5" />;
     default:
       return <Clock className="h-5 w-5" />;
   }
 };


 if (!user?.id) {
   return (
     <div className="flex items-center justify-center min-h-[400px]">
       <div className="text-white">No se encontró información del usuario</div>
     </div>
   );
 }

 if (isLoading) {
   return (
     <div className="flex items-center justify-center min-h-[400px]">
       <div className="text-white">Cargando pedidos...</div>
     </div>
   );
 }

 if (orders.length === 0) {
   return (
     <div className={`flex flex-col items-center justify-center min-h-[400px] text-center transform transition-all duration-700 ease-out ${
       isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
     }`}>
       <FileText className="h-16 w-16 text-gray-500 mb-4" />
       <h2 className="text-xl font-semibold text-white mb-2">No hay pedidos</h2>
       <p className="text-gray-400">Aún no has realizado ningún pedido</p>
     </div>
   );
 }

 return (
   <div className="space-y-6">
     <div className={`flex justify-between items-center mb-6 transform transition-all duration-700 ease-out ${
       isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
     }`}>
       <h1 className="text-2xl font-semibold text-white">Mis Pedidos</h1>
     </div>
     
     <div className="grid gap-6">
       {orders.map((order, index) => (
         <div
           key={order.id}
           className={`bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700/50 overflow-hidden transform transition-all duration-700 ease-out ${
             isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
           }`}
           style={{ transitionDelay: `${index * 100}ms` }}
         >
         
           <div className="p-4 border-b border-gray-700/50 flex items-center justify-between">
             <div>
               <p className="text-sm text-gray-400">Pedido #{order.id}</p>
               <p className="text-sm text-gray-400">{formatDate(order.date)}</p>
             </div>
             <div className={`flex items-center gap-2 ${getStatusColor(order.status)}`}>
               {getStatusIcon(order.status)}
               <span className="capitalize">{order.status}</span>
             </div>
           </div>

        
           <div className="p-4">
           {order.products.map((item) => (
                <div 
                    key={item.productId}
                    className="flex items-center gap-4 py-3 border-b border-gray-700/50 last:border-0"
                >
                    <div className="flex-shrink-0">
                    <Package className="h-10 w-10 text-gray-400" />
                    </div>
                    <div className="flex-grow">
                    <h3 className="text-white font-medium">
                        {item.product?.name || 'Producto no encontrado'}
                    </h3>
                    <p className="text-sm text-gray-400">Cantidad: {item.quantity}</p>
                    </div>
                    <div className="text-[#00e38c] font-semibold">
                    Bs. {item.product?.price || 0}
                    </div>
                </div>
                ))}

             <div className="mt-4 flex justify-end">
               <div className="text-right">
                 <p className="text-sm text-gray-400">Total</p>
                 <p className="text-xl font-semibold text-[#00e38c]">
                   Bs. {order.total}
                 </p>
               </div>
             </div>
           </div>
         </div>
       ))}
     </div>
   </div>
 );
}