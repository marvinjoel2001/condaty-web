'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth-store';
import Image from 'next/image';
import { Package, ShoppingCart, LogOut, Home, Menu } from 'lucide-react';
import { useState } from 'react';

export default function Sidebar() {
 const router = useRouter();
 const { logout } = useAuthStore();
 const [isOpen, setIsOpen] = useState(false);

 const handleLogout = () => {
   logout();
   router.push('/auth/login');
 };

 const toggleSidebar = () => {
   setIsOpen(!isOpen);
 };

 const navItems = [
   {
     icon: <Home className="h-5 w-5" />,
     label: 'Inicio',
     onClick: () => router.push('/dashboard')
   },
   {
     icon: <Package className="h-5 w-5" />,
     label: 'Marketplace',
     onClick: () => router.push('/dashboard/products')
   },
   {
     icon: <ShoppingCart className="h-5 w-5" />,
     label: 'Pedidos',
     onClick: () => router.push('/dashboard/orders')
   }
 ];

 return (
   <>
     {/* Mobile Menu Button */}
     <button
       onClick={toggleSidebar}
       className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-gray-800 text-white"
     >
       <Menu className="h-6 w-6" />
     </button>

     {/* Overlay */}
     {isOpen && (
       <div
         className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
         onClick={toggleSidebar}
       />
     )}

     {/* Sidebar */}
     <aside className={`
       fixed top-0 left-0 h-full bg-gray-900 p-4 flex flex-col z-50
       transform transition-transform duration-300 ease-in-out
       ${isOpen ? 'translate-x-0' : '-translate-x-full'}
       md:translate-x-0 md:w-64
     `}>
       <div className="flex justify-center mb-8">
         <Image
           src="/logo.webp"
           alt="Condaty"
           width={150}
           height={60}
           className="w-auto h-12"
         />
       </div>

       <nav className="flex-1 space-y-2">
         {navItems.map((item, index) => (
           <button
             key={index}
             onClick={() => {
               item.onClick();
               setIsOpen(false);
             }}
             className="flex items-center space-x-2 w-full px-4 py-2 text-gray-300 hover:bg-[#00e38c] hover:text-black rounded-lg transition-colors"
           >
             {item.icon}
             <span>{item.label}</span>
           </button>
         ))}
       </nav>

       <button
         onClick={handleLogout}
         className="flex items-center space-x-2 w-full px-4 py-2 text-gray-300 hover:bg-red-500/10 hover:text-red-500 rounded-lg transition-colors mt-auto"
       >
         <LogOut className="h-5 w-5" />
         <span>Cerrar sesión</span>
       </button>
     </aside>
   </>
 );
}