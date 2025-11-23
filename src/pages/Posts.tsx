import { CheckCircle, Clock, XCircle } from "lucide-react";
import { PostService } from "../services/post.service";
import { useEffect, useMemo, useState } from "react";
import { Spin, message } from "antd";

export default function Posts() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<number | null>(null);

  const [filterStatus, setFilterStatus] = useState<
    "all" | "active" | "pending" | "hidden"
  >("all");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const statusConfig = {
    active: {
      icon: CheckCircle,
      label: "Đã duyệt",
      badgeColor: "bg-green-100 text-green-700",
      iconColor: "text-green-500",
    },
    pending: {
      icon: Clock,
      label: "Chờ xét duyệt",
      badgeColor: "bg-yellow-100 text-yellow-700",
      iconColor: "text-yellow-500",
    },
    hidden: {
      icon: XCircle,
      label: "Đã ẩn / Từ chối",
      badgeColor: "bg-red-100 text-red-700",
      iconColor: "text-red-500",
    },
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await PostService.getAllPost();
        setPosts(res);
      } catch (error) {
        console.error("Lỗi khi tải bài đăng:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleApprove = async (postId: number) => {
    setActionLoading(postId);
    try {
      await PostService.updateStatus(postId, "active");
      setPosts((prev) =>
        prev.map((p) => (p.id === postId ? { ...p, status: "active" } : p))
      );
      message.success("Duyệt bài thành công!");
    } catch (error) {
      message.error("Lỗi khi duyệt bài!");
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (postId: number) => {
    setActionLoading(postId);
    try {
      await PostService.updateStatus(postId, "hidden");
      setPosts((prev) =>
        prev.map((p) => (p.id === postId ? { ...p, status: "hidden" } : p))
      );
      message.warning("🚫 Đã từ chối bài đăng!");
    } catch (error) {
      message.error("❌ Lỗi khi từ chối bài!");
    } finally {
      setActionLoading(null);
    }
  };

  const filteredPosts = useMemo(() => {
    if (filterStatus === "all") return posts;
    return posts.filter((p) => p.status === filterStatus);
  }, [posts, filterStatus]);

  const totalPages = Math.ceil(filteredPosts.length / pageSize);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const changePage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  if (loading) return <p>Đang tải...</p>;
  if (actionLoading) return <Spin tip="Đang xử lý..." />;
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Quản lý bài đăng</h1>

      <div className="flex items-center gap-3 bg-white rounded-xl shadow-sm p-4">
        <button
          onClick={() => {
            setFilterStatus("active");
            setCurrentPage(1);
          }}
          className={`px-4 py-2 rounded-lg font-medium ${
            filterStatus === "active"
              ? "bg-green-600 text-white"
              : "bg-green-500 text-white hover:bg-green-600"
          }`}
        >
          Đã duyệt
        </button>
        <button
          onClick={() => {
            setFilterStatus("hidden");
            setCurrentPage(1);
          }}
          className={`px-4 py-2 rounded-lg font-medium ${
            filterStatus === "hidden"
              ? "bg-red-600 text-white"
              : "bg-red-500 text-white hover:bg-red-600"
          }`}
        >
          Đã từ chối
        </button>
        <button
          onClick={() => {
            setFilterStatus("pending");
            setCurrentPage(1);
          }}
          className={`px-4 py-2 rounded-lg font-medium ${
            filterStatus === "pending"
              ? "bg-yellow-600 text-white"
              : "bg-yellow-500 text-white hover:bg-yellow-600"
          }`}
        >
          Chờ xét duyệt
        </button>
        <button
          onClick={() => {
            setFilterStatus("all");
            setCurrentPage(1);
          }}
          className={`px-4 py-2 rounded-lg font-medium ${
            filterStatus === "all"
              ? "bg-gray-600 text-white"
              : "bg-gray-400 text-white hover:bg-gray-500"
          }`}
        >
          Tất cả
        </button>
      </div>

      {/* POSTS LIST */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">
          Danh sách bài đăng
        </h2>

        {paginatedPosts.map((post) => {
          const config =
            statusConfig[post.status as keyof typeof statusConfig] ||
            statusConfig.pending;
          const Icon = config.icon;
          return (
            <div
              key={post.id}
              className="flex items-center justify-between p-4 border rounded-xl mb-2"
            >
              <div className="flex items-center gap-4 flex-1">
                <img
                  src={post.roomImages?.[0] || "/placeholder.png"}
                  className="w-12 h-12 object-cover rounded-xl"
                />
                <div className="flex-1">
                  <h3 className="font-semibold flex items-center gap-2">
                    {post.title}
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${config.badgeColor}`}
                    >
                      {config.label}
                    </span>
                  </h3>
                  <p className="text-sm">
                    <b>Giá:</b> {post.price} VND
                  </p>
                  <p className="text-sm">
                    <b>Địa chỉ:</b> {post.address}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleApprove(post.id)}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg flex items-center justify-center"
                  disabled={actionLoading === post.id}
                >
                  {actionLoading === post.id ? <Spin size="small" /> : "Duyệt"}
                </button>
                <button
                  onClick={() => handleReject(post.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg flex items-center justify-center"
                  disabled={actionLoading === post.id}
                >
                  {actionLoading === post.id ? (
                    <Spin size="small" />
                  ) : (
                    "Từ chối"
                  )}
                </button>
              </div>
            </div>
          );
        })}

        {/* PAGINATION */}
        <div className="flex justify-center gap-2 mt-4">
          <button
            onClick={() => changePage(currentPage - 1)}
            className="px-3 py-1 border rounded"
          >
            «
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => changePage(i + 1)}
              className={`w-8 h-8 rounded-lg border flex items-center justify-center ${
                currentPage === i + 1
                  ? "bg-orange-500 text-white"
                  : "hover:bg-gray-50"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => changePage(currentPage + 1)}
            className="px-3 py-1 border rounded"
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
}
