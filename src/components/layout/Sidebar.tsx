import { NavLink } from "react-router-dom";
import {
  Home,
  Wallet,
  DollarSign,
  FileText,
  Settings,
  Users,
  Megaphone,
} from "lucide-react";

export default function Sidebar() {
  const menuItems = [
    { path: "/admin", icon: Home, label: "Dashboard", exact: true },
    { path: "/admin/wallet", icon: Wallet, label: "Rút tiền" },
    // { path: '/admin/revenue', icon: DollarSign, label: 'Dòng tiền' },
    { path: "/admin/posts", icon: FileText, label: "Đăng bài" },
    { path: "/admin/users", icon: Users, label: "Người dùng" },
    { path: "/admin/packages", icon: Megaphone, label: "Gói quảng cáo" },
    { path: "/admin/settings", icon: Settings, label: "Quản lý" },
  ];

  return (
    <aside className="w-64 bg-[#2d2d2d] text-white min-h-screen flex flex-col">
      <div className="p-6 flex items-center gap-3 border-b border-gray-700">
        <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center">
          <img src="/logo.png" alt="Logo" className="w-10 h-10" />
        </div>
        <div>
          <div className="font-bold text-lg">EASYRENT</div>
          <div className="text-xs text-gray-400">Admin Panel</div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.exact}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                isActive
                  ? "bg-gradient-to-r from-amber-400 to-orange-500 text-white"
                  : "text-gray-300 hover:bg-gray-700"
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
