'use client';

import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#0B2921_0%,#0f1720_70%,#000000_100%)] flex">
      <Sidebar />
      
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-1 p-4 md:p-8">
          {children}
        </main>

        <Footer />
      </div>
    </div>
  );
}