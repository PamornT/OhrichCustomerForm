import { LogOut, User, Menu } from 'lucide-react';

interface HeaderProps {
  currentUser: string;
  onLogout: () => void;
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export default function Header({ currentUser, onLogout, onToggleSidebar, isSidebarOpen }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
      <button
        onClick={onToggleSidebar}
        className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
        title={isSidebarOpen ? "ซ่อนเมนู" : "แสดงเมนู"}
      >
        <Menu className="w-5 h-5" />
      </button>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-lg">
          <User className="w-5 h-5 text-gray-600" />
          <span className="text-gray-700">{currentUser}</span>
        </div>
        
        <button
          onClick={onLogout}
          className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>ออกจากระบบ</span>
        </button>
      </div>
    </header>
  );
}