'use client';

import { useAuthStore } from '@/store/auth-store';
import Image from 'next/image';

export default function Header() {
  const { user} = useAuthStore();

  return (
    <header className="bg-gray-900 border-b border-gray-800">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Image 
            src="/logo.webp" 
            alt="Condaty" 
            width={120} 
            height={48}
            className="h-8 w-auto" 
          />
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-gray-300">{user?.name}</span>
          <span className="text-gray-500">|</span>
          <span className="text-gray-400">{user?.condominio}</span>
        </div>
      </div>
    </header>
  );
}