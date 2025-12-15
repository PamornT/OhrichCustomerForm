import {
  Users,
} from "lucide-react";

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const menuItems = [
  {
    id: "customer-form",
    label: "บันทึกข้อมูลลูกค้า",
    icon: Users,
  },
];

export default function Sidebar({
  currentPage,
  onNavigate,
  isOpen,
}: SidebarProps) {
  return (
    <aside
      className={`bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ${
        isOpen ? "w-64" : "w-0 overflow-hidden"
      }`}
    >
      <div className="px-6 py-2 border-b border-gray-200 min-w-64 mb-0">
        <div className="h-16 rounded-xl flex items-left mb-0">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoq6cNxB4Kmc2Can8ZQwKLkb6dP415mZHFhQ&s"
            alt="OH! RICH Logo"
            className="h-16 w-auto"
          />
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2 min-w-64 bg-[#97d700]">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-green-50 text-green-600"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}