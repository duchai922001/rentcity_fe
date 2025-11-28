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
  Legend,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Users,
  BarChart3,
  DollarSign,
} from "lucide-react";
import { motion } from "framer-motion";
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

        setYearlyData(
          monthOrder.map((m) => {
            const found = data.yearlyPosts?.find((y: any) => y.month === m);
            return { name: m, value: found ? Number(found.count) : 0 };
          })
        );

        const colors: Record<string, string> = {
          active: "#22c55e",
          pending: "#f59e0b",
          hidden: "#ef4444",
        };

        setPieData(
          data.postStatusStats?.map((item: any) => ({
            name:
              item.status === "active"
                ? "Chưa cho thuê"
                : item.status === "pending"
                ? "Đã cho thuê"
                : "Căn hộ tồn",
            value: Number(item.count),
            color: colors[item.status] || "#888",
          })) || []
        );

        setTotalUsers(Number(data.totalUsers || 0));

        setActivities(
          data.activities?.map((act: any, idx: number) => ({
            id: idx,
            title: act.amount
              ? "Yêu cầu rút tiền"
              : act.startDate
              ? "Hợp đồng mới"
              : "Đặt lịch xem phòng",
            code: `#${act.id}`,
            time: new Date(act.createdAt).toLocaleString(),
            status: act.status || "new",
          })) || []
        );

        setRevenueByMonth(
          data.revenueByMonth?.map((item: any) => ({
            month: item.month,
            revenue: Number(item.revenue),
          })) || []
        );
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-gray-800"
      >
        ✨ Admin Dashboard
      </motion.h1>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-2xl shadow-xl">
          <Users className="mb-2" />
          <p className="text-sm">Tổng người dùng</p>
          <h2 className="text-3xl font-bold">{totalUsers}</h2>
        </div>
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-6 rounded-2xl shadow-xl">
          <DollarSign className="mb-2" />
          <p className="text-sm">Doanh thu tháng</p>
          <h2 className="text-3xl font-bold">
            {revenueByMonth.reduce((a, b) => a + b.revenue, 0).toLocaleString()}
            đ
          </h2>
        </div>
        <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white p-6 rounded-2xl shadow-xl">
          <BarChart3 className="mb-2" />
          <p className="text-sm">Tổng bài đăng</p>
          <h2 className="text-3xl font-bold">
            {yearlyData.reduce((a, b) => a + b.value, 0)}
          </h2>
        </div>
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="font-semibold text-lg mb-4">Bài đăng theo tuần</h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#6366f1" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="font-semibold text-lg mb-4">Trạng thái bài đăng</h2>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                outerRadius={100}
                innerRadius={60}
              >
                {pieData.map((item, index) => (
                  <Cell key={index} fill={item.color} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="font-semibold text-lg mb-4">💰 Doanh thu theo tháng</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenueByMonth}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#22c55e"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* ACTIVITIES */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="font-semibold text-lg mb-4">🕒 Hoạt động gần đây</h2>
        <div className="space-y-4">
          {activities.map((activity) => (
            <motion.div
              key={activity.id}
              whileHover={{ scale: 1.02 }}
              className="flex items-center justify-between p-4 rounded-xl border hover:shadow-md transition"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-gray-100">
                  {activity.status === "active" ? (
                    <TrendingUp className="text-green-600" />
                  ) : (
                    <TrendingDown className="text-gray-500" />
                  )}
                </div>
                <div>
                  <p className="font-semibold">{activity.title}</p>
                  <span className="text-sm text-gray-500">{activity.code}</span>
                </div>
              </div>
              <span className="text-sm text-gray-400">{activity.time}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
