import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";
import { DashboardService } from "../services/dashboard.service";

interface Activity {
  id: number;
  title: string;
  code: string;
  time: string;
  status: string;
}

interface PieItem {
  name: string;
  value: number;
  color: string;
}
interface RevenueItem {
  month: string;
  revenue: number;
}
export default function Dashboard() {
  const [weeklyData, setWeeklyData] = useState<
    { name: string; value: number }[]
  >([]);
  const [yearlyData, setYearlyData] = useState<
    { name: string; value: number }[]
  >([]);
  const [pieData, setPieData] = useState<PieItem[]>([]);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [revenueByMonth, setRevenueByMonth] = useState<RevenueItem[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await DashboardService.getDashboard();

        // ===== WEEKLY POSTS =====
        const weekMap: Record<string, number> = {
          CN: 0,
          T2: 0,
          T3: 0,
          T4: 0,
          T5: 0,
          T6: 0,
          T7: 0,
        };

        const nameMap: Record<string, string> = {
          Sun: "CN",
          Mon: "T2",
          Tue: "T3",
          Wed: "T4",
          Thu: "T5",
          Fri: "T6",
          Sat: "T7",
        };

        data.weeklyPosts?.forEach((item: any) => {
          const key = nameMap[item.day];
          if (key) weekMap[key] = Number(item.count);
        });

        setWeeklyData(
          Object.entries(weekMap).map(([name, value]) => ({ name, value }))
        );

        // ===== YEARLY POSTS =====
        const monthOrder = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];

        const yearly = monthOrder.map((m) => {
          const found = data.yearlyPosts?.find((y: any) => y.month === m);
          return { name: m, value: found ? Number(found.count) : 0 };
        });
        setYearlyData(yearly);

        // ===== PIE - STATUS POSTS =====
        const colors: Record<string, string> = {
          active: "#22c55e",
          pending: "#f59e0b",
          hidden: "#ef4444",
        };

        const pie = data.postStatusStats?.map((item: any) => ({
          name:
            item.status === "active"
              ? "Đã cho thuê"
              : item.status === "pending"
              ? "Chưa cho thuê"
              : "Căn hộ tồn",
          value: Number(item.count),
          color: colors[item.status] || "#888",
        }));

        setPieData(pie || []);

        // ===== TOTAL USERS =====
        setTotalUsers(Number(data.totalUsers || 0));

        // ===== ACTIVITIES =====
        const acts = data.activities?.map((act: any, idx: number) => {
          let title = "Hoạt động mới";

          if (act.amount) title = "Yêu cầu rút tiền";
          else if (act.startDate) title = "Hợp đồng mới";
          else if (act.appointmentDate) title = "Đặt lịch xem phòng";

          return {
            id: idx,
            title,
            code: `#${act.id}`,
            time: new Date(act.createdAt).toLocaleString(),
            status: act.status || "new",
          };
        });

        setActivities(acts || []);
        const revenue = data.revenueByMonth?.map((item: any) => ({
          month: item.month,
          revenue: Number(item.revenue),
        }));

        setRevenueByMonth(revenue || []);
      } catch (error) {
        console.error("Dashboard error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Bài đăng trong tuần</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#f97316" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Trạng thái bài đăng</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
              >
                {pieData.map((item, index) => (
                  <Cell key={index} fill={item.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Doanh thu theo tháng</h2>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={revenueByMonth}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip
              formatter={(value: number) =>
                value.toLocaleString("vi-VN") + " đ"
              }
            />
            <Bar dataKey="revenue" fill="#22c55e" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Yearly Chart */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Bài đăng theo năm</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={yearlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#f97316"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Total Users */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold">Tổng người dùng</h2>
          <p className="text-3xl font-bold mt-2">{totalUsers}</p>
        </div>

        {/* Activities */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Hoạt động gần đây</h2>
          <div className="space-y-3">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50"
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100">
                  {activity.status === "active" ? (
                    <TrendingUp className="text-green-600" />
                  ) : (
                    <TrendingDown className="text-gray-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{activity.title}</p>
                  <p className="text-xs text-gray-500">{activity.code}</p>
                </div>
                <span className="text-xs text-gray-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
