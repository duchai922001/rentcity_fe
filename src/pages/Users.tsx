// src/components/Users.tsx
import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  MoreVertical,
  UserCheck,
  Phone,
} from "lucide-react";
import { UserService } from "../services/user.service"; // path theo project của bạn
import { AuthService } from "../services/auth.service"; // dùng để register/create user
import {
  Modal,
  Form,
  Input,
  Select,
  Switch,
  Button,
  message,
  Spin,
} from "antd";

type Role = "seeker" | "owner" | "admin" | "landlord" | "tenant"; // map nếu cần
type Status = "active" | "inactive" | "banned";

interface UserItem {
  id: number | string;
  firstName: string;
  lastName: string;
  phone: string;
  role: Role;
  active: boolean;
  address?: string | null;
  createdAt?: string;
  // optional stats
  totalPosts?: number;
  totalTransactions?: number;
}

const ROLE_LABELS: Record<string, string> = {
  owner: "Chủ nhà",
  landlord: "Chủ nhà",
  seeker: "Người thuê",
  tenant: "Người thuê",
  admin: "Quản trị viên",
};

export default function Users() {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // pagination (FE)
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 5;

  // Modal create
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const res = await UserService.getAllUsers();
      // Nếu API trả object { data: [...] } thì đổi thành res.data
      setUsers(Array.isArray(res) ? res : res?.data ?? []);
    } catch (error) {
      console.error("Lỗi khi tải user:", error);
      message.error("Không tải được danh sách người dùng");
    } finally {
      setLoading(false);
    }
  };

  // Derived filtered list
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const fullName = `${u.firstName} ${u.lastName}`.toLowerCase();
      const matchesSearch =
        fullName.includes(searchTerm.toLowerCase()) ||
        u.phone.includes(searchTerm);
      const matchesRole = filterRole === "all" || u.role === filterRole;
      const matchesStatus =
        filterStatus === "all" ||
        (filterStatus === "active" && u.active) ||
        (filterStatus === "inactive" && !u.active) ||
        (filterStatus === "banned" && (u as any).status === "banned"); // if you have banned field

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchTerm, filterRole, filterStatus]);

  // Pagination slices
  const total = filteredUsers.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  // When filters change, reset page to 1
  useEffect(() => {
    setCurrentPage(1);
  }, [filterRole, filterStatus, searchTerm]);

  // Create user (register)
  const openCreateModal = () => {
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleCreate = async (values: any) => {
    // Values: { firstName, lastName, phone, password, role, address, active }
    setSubmitting(true);
    try {
      // call AuthService.register (your service defined earlier)
      await AuthService.register({
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
        password: values.password,
        role: values.role,
        address: values.address || null,
        active: values.active ?? true,
      });

      message.success("Tạo người dùng thành công");
      setIsModalOpen(false);
      await loadUsers();
    } catch (err) {
      console.error("Lỗi tạo user:", err);
      message.error("Tạo người dùng thất bại");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number | string) => {
    // If you have delete API, call it here; otherwise just show message.
    // Example: await UserService.deleteUser(id)
    message.info("Chức năng xóa chưa được triển khai ở FE - gọi API tương ứng");
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

        <div className="flex items-center gap-3">
          <Button
            type="primary"
            icon={<Plus className="w-4 h-4" />}
            onClick={openCreateModal}
          >
            Thêm người dùng
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-6 border-2 border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Tổng người dùng</p>
              <p className="text-3xl font-bold text-gray-800">{users.length}</p>
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
                {users.filter((u) => u.active).length}
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
                {
                  users.filter(
                    (u) => u.role === "owner" || u.role === "landlord"
                  ).length
                }
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
                {
                  users.filter(
                    (u) => u.role === "seeker" || u.role === "tenant"
                  ).length
                }
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
              placeholder="Tìm kiếm theo tên, số điện thoại..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div className="flex gap-3 items-center">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                aria-label="Lọc theo vai trò"
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
              >
                <option value="all">Tất cả vai trò</option>
                <option value="owner">Chủ nhà</option>
                <option value="landlord">Chủ nhà</option>
                <option value="seeker">Người thuê</option>
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
                  Ngày tham gia
                </th>
                {/* <th className="text-center py-4 px-6 text-sm font-semibold text-gray-700">
                  Hành động
                </th> */}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedUsers.map((user) => {
                const statusLabel = user.active
                  ? "Hoạt động"
                  : "Không hoạt động";
                const statusColor = user.active
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-700";
                return (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-xl text-gray-500 border-2 border-orange-200">
                          {user.firstName?.[0] ?? "U"}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">
                            {user.firstName} {user.lastName}
                          </p>
                          <p className="text-sm text-gray-500">ID: {user.id}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="w-4 h-4 text-gray-400" />
                          {user.phone}
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6 w-40">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          user.role === "owner" || user.role === "landlord"
                            ? "bg-orange-100 text-orange-700"
                            : user.role === "seeker" || user.role === "tenant"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {ROLE_LABELS[user.role] ?? user.role}
                      </span>
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <UserCheck
                          className={`w-5 h-5 ${
                            user.active ? "text-green-600" : "text-gray-600"
                          }`}
                        />
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor}`}
                        >
                          {statusLabel}
                        </span>
                      </div>
                    </td>

                    <td className="py-4 px-6 text-sm text-gray-600">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString()
                        : "-"}
                    </td>

                    {/* <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          aria-label="Chỉnh sửa người dùng"
                          className="p-2 hover:bg-blue-50 rounded-lg transition-colors group"
                        >
                          <Edit className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
                        </button>
                        <button
                          aria-label="Xóa người dùng"
                          onClick={() => handleDelete(user.id)}
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
                    </td> */}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Hiển thị{" "}
            <span className="font-medium">{paginatedUsers.length}</span> trong
            tổng số <span className="font-medium">{filteredUsers.length}</span>{" "}
            người dùng (từ {users.length})
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded-lg border border-gray-300 text-sm hover:bg-gray-50 transition-colors disabled:opacity-40"
            >
              « Trước
            </button>

            {/* page numbers */}
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded-lg border text-sm ${
                  currentPage === i + 1
                    ? "bg-orange-500 text-white"
                    : "border-gray-300 hover:bg-gray-50"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded-lg border border-gray-300 text-sm hover:bg-gray-50 transition-colors disabled:opacity-40"
            >
              Sau »
            </button>
          </div>
        </div>
      </div>

      {/* Create User Modal */}
      <Modal
        title="Tạo người dùng mới"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleCreate}
          initialValues={{ role: "seeker", active: true }}
        >
          <Form.Item
            name="firstName"
            label="Họ"
            rules={[{ required: true, message: "Vui lòng nhập họ" }]}
          >
            <Input placeholder="Nguyễn" />
          </Form.Item>

          <Form.Item
            name="lastName"
            label="Tên"
            rules={[{ required: true, message: "Vui lòng nhập tên" }]}
          >
            <Input placeholder="Văn A" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại" },
              {
                pattern: /^[0-9]{9,11}$/,
                message: "Số điện thoại không hợp lệ",
              },
            ]}
          >
            <Input placeholder="09xxxxxxxx" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu (>=6 ký tự)" },
              { min: 6 },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item name="role" label="Vai trò" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="seeker">Người thuê</Select.Option>
              <Select.Option value="owner">Chủ nhà</Select.Option>
              <Select.Option value="admin">Admin</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="address" label="Địa chỉ (tùy chọn)">
            <Input.TextArea rows={2} />
          </Form.Item>

          <Form.Item name="active" label="Kích hoạt" valuePropName="checked">
            <Switch />
          </Form.Item>

          <div className="flex justify-end gap-2">
            <Button onClick={() => setIsModalOpen(false)}>Hủy</Button>
            <Button type="primary" htmlType="submit" loading={submitting}>
              Tạo
            </Button>
          </div>
        </Form>
      </Modal>

      {loading && (
        <div className="fixed inset-0 left-0 top-0 flex items-center justify-center bg-black/20">
          <Spin />
        </div>
      )}
    </div>
  );
}
