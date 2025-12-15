import { ReactNode, useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface DashboardProps {
  currentUser: string;
  onLogout: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
  children: ReactNode;
}

export default function Dashboard({ 
  currentUser, 
  onLogout, 
  currentPage,
  onNavigate,
  children 
}: DashboardProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        currentPage={currentPage} 
        onNavigate={onNavigate}
        isOpen={isSidebarOpen}
        onToggle={toggleSidebar}
      />
      
      <div className="flex-1 flex flex-col">
        <Header 
          currentUser={currentUser} 
          onLogout={onLogout}
          onToggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
        />
        
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}