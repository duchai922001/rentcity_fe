import { useState } from "react";
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  MoreVertical,
  UserCheck,
  UserX,
  Mail,
  Phone,
} from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "landlord" | "tenant" | "admin";
  status: "active" | "inactive" | "banned";
  avatar: string;
  joinDate: string;
  totalPosts: number;
  totalTransactions: number;
}

const users: User[] = [
  {
    id: "1",
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phone: "0901234567",
    role: "landlord",
    status: "active",
    avatar:
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100",
    joinDate: "15/01/2024",
    totalPosts: 12,
    totalTransactions: 5,
  },
  {
    id: "2",
    name: "Trần Thị B",
    email: "tranthib@example.com",
    phone: "0912345678",
    role: "tenant",
    status: "active",
    avatar:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100",
    joinDate: "20/02/2024",
    totalPosts: 3,
    totalTransactions: 8,
  },
  {
    id: "3",
    name: "Lê Văn C",
    email: "levanc@example.com",
    phone: "0923456789",
    role: "landlord",
    status: "inactive",
    avatar:
      "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100",
    joinDate: "10/03/2024",
    totalPosts: 7,
    totalTransactions: 2,
  },
  {
    id: "4",
    name: "Phạm Thị D",
    email: "phamthid@example.com",
    phone: "0934567890",
    role: "tenant",
    status: "active",
    avatar:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100",
    joinDate: "25/03/2024",
    totalPosts: 0,
    totalTransactions: 15,
  },
  {
    id: "5",
    name: "Hoàng Văn E",
    email: "hoangvane@example.com",
    phone: "0945678901",
    role: "landlord",
    status: "banned",
    avatar:
      "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100",
    joinDate: "05/04/2024",
    totalPosts: 25,
    totalTransactions: 3,
  },
  {
    id: "6",
    name: "Vũ Thị F",
    email: "vuthif@example.com",
    phone: "0956789012",
    role: "tenant",
    status: "active",
    avatar:
      "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=100",
    joinDate: "12/04/2024",
    totalPosts: 1,
    totalTransactions: 6,
  },
];

const roleLabels = {
  landlord: "Chủ nhà",
  tenant: "Người thuê",
  admin: "Quản trị viên",
};

const statusConfig = {
  active: {
    label: "Hoạt động",
    color: "bg-green-100 text-green-700",
    icon: UserCheck,
  },
  inactive: {
    label: "Không hoạt động",
    color: "bg-gray-100 text-gray-700",
    icon: UserX,
  },
  banned: {
    label: "Bị cấm",
    color: "bg-red-100 text-red-700",
    icon: UserX,
  },
};

export default function Users() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm);
    const matchesRole = filterRole === "all" || user.role === filterRole;
    const matchesStatus =
      filterStatus === "all" || user.status === filterStatus;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const stats = {
    total: users.length,
    active: users.filter((u) => u.status === "active").length,
    landlords: users.filter((u) => u.role === "landlord").length,
    tenants: users.filter((u) => u.role === "tenant").length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Quản lý người dùng
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Quản lý tất cả người dùng trong hệ thống
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-lg font-medium hover:shadow-lg transition-shadow">
          <Plus className="w-5 h-5" />
          Thêm người dùng
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-6 border-2 border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Tổng người dùng</p>
              <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border-2 border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Đang hoạt động</p>
              <p className="text-3xl font-bold text-green-600">
                {stats.active}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border-2 border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Chủ nhà</p>
              <p className="text-3xl font-bold text-orange-600">
                {stats.landlords}
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <span className="text-2xl">🏠</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border-2 border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Người thuê</p>
              <p className="text-3xl font-bold text-purple-600">
                {stats.tenants}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <span className="text-2xl">👥</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên, email, số điện thoại..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div className="flex gap-3">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                aria-label="Lọc theo vai trò"
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
              >
                <option value="all">Tất cả vai trò</option>
                <option value="landlord">Chủ nhà</option>
                <option value="tenant">Người thuê</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <select
              aria-label="Lọc theo trạng thái"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="active">Hoạt động</option>
              <option value="inactive">Không hoạt động</option>
              <option value="banned">Bị cấm</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                  Người dùng
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                  Liên hệ
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 ">
                  Vai trò
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                  Trạng thái
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                  Thống kê
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                  Ngày tham gia
                </th>
                <th className="text-center py-4 px-6 text-sm font-semibold text-gray-700">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.map((user) => {
                const StatusIcon = statusConfig[user.status].icon;
                return (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-orange-200"
                        />
                        <div>
                          <p className="font-semibold text-gray-800">
                            {user.name}
                          </p>
                          <p className="text-sm text-gray-500">ID: {user.id}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail className="w-4 h-4 text-gray-400" />
                          {user.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="w-4 h-4 text-gray-400" />
                          {user.phone}
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6 w-40">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          user.role === "landlord"
                            ? "bg-orange-100 text-orange-700"
                            : user.role === "tenant"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {roleLabels[user.role]}
                      </span>
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <StatusIcon
                          className={`w-5 h-5 ${
                            user.status === "active"
                              ? "text-green-600"
                              : user.status === "inactive"
                              ? "text-gray-600"
                              : "text-red-600"
                          }`}
                        />
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            statusConfig[user.status].color
                          }`}
                        >
                          {statusConfig[user.status].label}
                        </span>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="space-y-1 text-sm">
                        <p className="text-gray-600">
                          <span className="font-medium text-gray-800">
                            {user.totalPosts}
                          </span>{" "}
                          bài đăng
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium text-gray-800">
                            {user.totalTransactions}
                          </span>{" "}
                          giao dịch
                        </p>
                      </div>
                    </td>

                    <td className="py-4 px-6 text-sm text-gray-600">
                      {user.joinDate}
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          aria-label="Chỉnh sửa người dùng"
                          className="p-2 hover:bg-blue-50 rounded-lg transition-colors group"
                        >
                          <Edit className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
                        </button>
                        <button
                          aria-label="Xóa người dùng"
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
                        >
                          <Trash2 className="w-5 h-5 text-gray-600 group-hover:text-red-600" />
                        </button>
                        <button
                          aria-label="Thêm hành động"
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <MoreVertical className="w-5 h-5 text-gray-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Hiển thị <span className="font-medium">{filteredUsers.length}</span>{" "}
            trong tổng số <span className="font-medium">{users.length}</span>{" "}
            người dùng
          </p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 rounded-lg border border-gray-300 text-sm hover:bg-gray-50 transition-colors">
              « Trước
            </button>
            <button className="px-3 py-1 rounded-lg bg-orange-500 text-white text-sm">
              1
            </button>
            <button className="px-3 py-1 rounded-lg border border-gray-300 text-sm hover:bg-gray-50 transition-colors">
              2
            </button>
            <button className="px-3 py-1 rounded-lg border border-gray-300 text-sm hover:bg-gray-50 transition-colors">
              3
            </button>
            <button className="px-3 py-1 rounded-lg border border-gray-300 text-sm hover:bg-gray-50 transition-colors">
              Sau »
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
