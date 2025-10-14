import { useState } from "react";
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  TrendingUp,
  DollarSign,
  MousePointerClick,
} from "lucide-react";

interface Advertisement {
  id: string;
  title: string;
  partner: {
    name: string;
    logo: string;
    contact: string;
  };
  type: "banner" | "popup" | "native" | "video";
  placement: "homepage" | "search" | "detail" | "sidebar" | "footer";
  status: "active" | "paused" | "pending" | "expired";
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  ctr: number; // Click Through Rate
  startDate: string;
  endDate: string;
  image: string;
  targetUrl: string;
}

const ads: Advertisement[] = [
  {
    id: "1",
    title: "Dịch vụ chuyển nhà Nhanh & Rẻ",
    partner: {
      name: "Chuyển nhà 24/7",
      logo: "https://images.pexels.com/photos/4246120/pexels-photo-4246120.jpeg?auto=compress&cs=tinysrgb&w=100",
      contact: "0901234567",
    },
    type: "banner",
    placement: "homepage",
    status: "active",
    budget: 50000000,
    spent: 35000000,
    impressions: 125000,
    clicks: 3750,
    ctr: 3.0,
    startDate: "01/10/2024",
    endDate: "31/12/2024",
    image:
      "https://images.pexels.com/photos/4246120/pexels-photo-4246120.jpeg?auto=compress&cs=tinysrgb&w=600",
    targetUrl: "https://example.com/moving-service",
  },
  {
    id: "2",
    title: "Dịch vụ dọn dẹp nhà cửa",
    partner: {
      name: "Clean House Pro",
      logo: "https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg?auto=compress&cs=tinysrgb&w=100",
      contact: "0912345678",
    },
    type: "native",
    placement: "search",
    status: "active",
    budget: 30000000,
    spent: 18000000,
    impressions: 85000,
    clicks: 2125,
    ctr: 2.5,
    startDate: "15/09/2024",
    endDate: "15/12/2024",
    image:
      "https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg?auto=compress&cs=tinysrgb&w=600",
    targetUrl: "https://example.com/cleaning-service",
  },
  {
    id: "3",
    title: "Sửa chữa điện nước",
    partner: {
      name: "Thợ Điện Nước 123",
      logo: "https://images.pexels.com/photos/8293778/pexels-photo-8293778.jpeg?auto=compress&cs=tinysrgb&w=100",
      contact: "0923456789",
    },
    type: "banner",
    placement: "detail",
    status: "paused",
    budget: 20000000,
    spent: 12000000,
    impressions: 45000,
    clicks: 900,
    ctr: 2.0,
    startDate: "01/09/2024",
    endDate: "30/11/2024",
    image:
      "https://images.pexels.com/photos/8293778/pexels-photo-8293778.jpeg?auto=compress&cs=tinysrgb&w=600",
    targetUrl: "https://example.com/repair-service",
  },
  {
    id: "4",
    title: "Bảo hiểm nhà ở giá rẻ",
    partner: {
      name: "Bảo Hiểm ABC",
      logo: "https://images.pexels.com/photos/6863332/pexels-photo-6863332.jpeg?auto=compress&cs=tinysrgb&w=100",
      contact: "0934567890",
    },
    type: "popup",
    placement: "homepage",
    status: "pending",
    budget: 40000000,
    spent: 0,
    impressions: 0,
    clicks: 0,
    ctr: 0,
    startDate: "01/11/2024",
    endDate: "31/01/2025",
    image:
      "https://images.pexels.com/photos/6863332/pexels-photo-6863332.jpeg?auto=compress&cs=tinysrgb&w=600",
    targetUrl: "https://example.com/insurance",
  },
  {
    id: "5",
    title: "Nội thất giá rẻ",
    partner: {
      name: "Nội Thất Modern",
      logo: "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=100",
      contact: "0945678901",
    },
    type: "banner",
    placement: "sidebar",
    status: "expired",
    budget: 25000000,
    spent: 25000000,
    impressions: 95000,
    clicks: 2850,
    ctr: 3.0,
    startDate: "01/08/2024",
    endDate: "31/10/2024",
    image:
      "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=600",
    targetUrl: "https://example.com/furniture",
  },
];

const adTypeLabels = {
  banner: "Banner",
  popup: "Popup",
  native: "Native",
  video: "Video",
};

const placementLabels = {
  homepage: "Trang chủ",
  search: "Trang tìm kiếm",
  detail: "Trang chi tiết",
  sidebar: "Thanh bên",
  footer: "Chân trang",
};

const statusConfig = {
  active: {
    label: "Đang chạy",
    color: "bg-green-100 text-green-700",
    icon: Eye,
  },
  paused: {
    label: "Tạm dừng",
    color: "bg-yellow-100 text-yellow-700",
    icon: EyeOff,
  },
  pending: {
    label: "Chờ duyệt",
    color: "bg-blue-100 text-blue-700",
    icon: Clock,
  },
  expired: {
    label: "Hết hạn",
    color: "bg-gray-100 text-gray-700",
    icon: EyeOff,
  },
};

function Clock({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

export default function Ads() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filteredAds = ads.filter((ad) => {
    const matchesSearch =
      ad.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ad.partner.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || ad.type === filterType;
    const matchesStatus = filterStatus === "all" || ad.status === filterStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  const totalBudget = ads.reduce((sum, ad) => sum + ad.budget, 0);
  const totalSpent = ads.reduce((sum, ad) => sum + ad.spent, 0);
  const totalImpressions = ads.reduce((sum, ad) => sum + ad.impressions, 0);
  const totalClicks = ads.reduce((sum, ad) => sum + ad.clicks, 0);
  const avgCTR =
    totalImpressions > 0
      ? ((totalClicks / totalImpressions) * 100).toFixed(2)
      : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Quản lý Quảng cáo Đối tác
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Quản lý các chiến dịch quảng cáo và đối tác
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-lg font-medium hover:shadow-lg transition-shadow">
          <Plus className="w-5 h-5" />
          Tạo chiến dịch mới
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-6 border-2 border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-xs text-green-600 font-medium">
              {((totalSpent / totalBudget) * 100).toFixed(1)}%
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-800">
            {(totalSpent / 1000000).toFixed(1)}M
          </p>
          <p className="text-sm text-gray-600">
            Chi tiêu / {(totalBudget / 1000000).toFixed(1)}M
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border-2 border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Eye className="w-6 h-6 text-purple-600" />
            </div>
            <TrendingUp className="w-4 h-4 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-gray-800">
            {(totalImpressions / 1000).toFixed(1)}K
          </p>
          <p className="text-sm text-gray-600">Lượt hiển thị</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border-2 border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <MousePointerClick className="w-6 h-6 text-orange-600" />
            </div>
            <TrendingUp className="w-4 h-4 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-gray-800">
            {(totalClicks / 1000).toFixed(1)}K
          </p>
          <p className="text-sm text-gray-600">Lượt click</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border-2 border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-xs text-green-600 font-medium">Tốt</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">{avgCTR}%</p>
          <p className="text-sm text-gray-600">CTR trung bình</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên chiến dịch hoặc đối tác..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div className="flex gap-3">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                aria-label="Lọc theo loại quảng cáo"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
              >
                <option value="all">Tất cả loại</option>
                <option value="banner">Banner</option>
                <option value="popup">Popup</option>
                <option value="native">Native</option>
                <option value="video">Video</option>
              </select>
            </div>

            <select
              aria-label="Lọc theo trạng thái chiến dịch"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="active">Đang chạy</option>
              <option value="paused">Tạm dừng</option>
              <option value="pending">Chờ duyệt</option>
              <option value="expired">Hết hạn</option>
            </select>
          </div>
        </div>
      </div>

      {/* Ads Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredAds.map((ad) => {
          const budgetPercent = (ad.spent / ad.budget) * 100;

          return (
            <div
              key={ad.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative h-48">
                <img
                  src={ad.image}
                  alt={ad.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 flex gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      statusConfig[ad.status].color
                    } backdrop-blur-sm`}
                  >
                    {statusConfig[ad.status].label}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 backdrop-blur-sm">
                    {adTypeLabels[ad.type]}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800 mb-1">
                      {ad.title}
                    </h3>
                    <div className="flex items-center gap-2 mb-2">
                      <img
                        src={ad.partner.logo}
                        alt={ad.partner.name}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span className="text-sm text-gray-600">
                        {ad.partner.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>📍 {placementLabels[ad.placement]}</span>
                      <span>•</span>
                      <span>
                        📅 {ad.startDate} - {ad.endDate}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Budget Progress */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600">Ngân sách</span>
                    <span className="font-semibold text-gray-800">
                      {(ad.spent / 1000000).toFixed(1)}M /{" "}
                      {(ad.budget / 1000000).toFixed(1)}M VNĐ
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all ${
                        budgetPercent >= 90
                          ? "bg-red-500"
                          : budgetPercent >= 70
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                      style={{ width: `${Math.min(budgetPercent, 100)}%` }}
                    ></div>
                  </div>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <p className="text-xs text-gray-600 mb-1">Hiển thị</p>
                    <p className="text-sm font-bold text-gray-800">
                      {(ad.impressions / 1000).toFixed(1)}K
                    </p>
                  </div>
                  <div className="text-center border-x border-gray-200">
                    <p className="text-xs text-gray-600 mb-1">Click</p>
                    <p className="text-sm font-bold text-gray-800">
                      {(ad.clicks / 1000).toFixed(1)}K
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-600 mb-1">CTR</p>
                    <p className="text-sm font-bold text-green-600">
                      {ad.ctr}%
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  {ad.status === "active" ? (
                    <button className="flex-1 px-4 py-2 bg-yellow-500 text-white rounded-lg text-sm font-medium hover:bg-yellow-600 transition-colors flex items-center justify-center gap-2">
                      <EyeOff className="w-4 h-4" />
                      Tạm dừng
                    </button>
                  ) : ad.status === "paused" ? (
                    <button className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors flex items-center justify-center gap-2">
                      <Eye className="w-4 h-4" />
                      Kích hoạt
                    </button>
                  ) : ad.status === "pending" ? (
                    <button className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors">
                      Duyệt chiến dịch
                    </button>
                  ) : (
                    <button className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg text-sm font-medium hover:bg-gray-600 transition-colors">
                      Gia hạn
                    </button>
                  )}
                  <button
                    aria-label="Chỉnh sửa chiến dịch"
                    className="px-4 py-2 border border-orange-300 text-orange-600 rounded-lg text-sm font-medium hover:bg-orange-50 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    aria-label="Xóa chiến dịch"
                    className="px-4 py-2 border border-red-300 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between bg-white rounded-xl shadow-sm px-6 py-4">
        <p className="text-sm text-gray-600">
          Hiển thị <span className="font-medium">{filteredAds.length}</span>{" "}
          trong tổng số <span className="font-medium">{ads.length}</span> chiến
          dịch
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
            Sau »
          </button>
        </div>
      </div>
    </div>
  );
}
