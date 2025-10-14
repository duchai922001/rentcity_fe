import { Search, Bell, Mail, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-gradient-to-r from-[#FFE3AF] to-orange-50 border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
            />
          </div>
        </div>

        <div className="flex items-center gap-4 ml-6">
          <button className="relative p-2 hover:bg-white rounded-lg transition-colors">
            <Mail className="w-6 h-6 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full"></span>
          </button>

          <button className="relative p-2 hover:bg-white rounded-lg transition-colors">
            <Bell className="w-6 h-6 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full"></span>
          </button>

          <div className="flex items-center gap-3 ml-2">
            <img
              src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1"
              alt="User"
              className="w-10 h-10 rounded-full object-cover border-2 border-orange-400"
            />
            <div className="text-sm">
              <div className="font-semibold text-gray-800">
                {user?.name || 'Admin'}
              </div>
              <div className="text-gray-500 text-xs">{user?.email || 'admin@example.com'}</div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="ml-2 p-2 hover:bg-white rounded-lg transition-colors group"
            title="Đăng xuất"
          >
            <LogOut className="w-6 h-6 text-gray-600 group-hover:text-orange-500" />
          </button>
        </div>
      </div>
    </header>
  );
}