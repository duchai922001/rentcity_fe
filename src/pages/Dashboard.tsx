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
  status: "pending" | "success" | "available" | "new";
}

interface PieItem {
  name: string;
  value: number;
  color: string;
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

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await DashboardService.getDashboard();

        // Weekly data: map day → value
        const weekMap: Record<string, number> = {
          CN: 0,
          T2: 0,
          T3: 0,
          T4: 0,
          T5: 0,
          T6: 0,
          T7: 0,
        };
        data.weeklyPosts.forEach((item: any) => {
          const day = item.day.replace(".", ""); // type Postgres: 'Mon.' → 'Mon'
          const nameMap: Record<string, string> = {
            Sun: "CN",
            Mon: "T2",
            Tue: "T3",
            Wed: "T4",
            Thu: "T5",
            Fri: "T6",
            Sat: "T7",
          };
          weekMap[nameMap[day]] = Number(item.count);
        });
        setWeeklyData(
          Object.entries(weekMap).map(([name, value]) => ({ name, value }))
        );

        // Yearly data: map month → value
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
          const found = data.yearlyPosts.find((y: any) => y.month === m);
          return { name: m, value: found ? Number(found.count) : 0 };
        });
        setYearlyData(yearly);

        // Pie data
        const colors = {
          ACTIVE: "#6366f1",
          PENDING: "#f59e0b",
          HIDDEN: "#10b981",
        };
        const pie = data.postStatusStats.map((item: any) => ({
          name:
            item.status === "ACTIVE"
              ? "Đã cho thuê"
              : item.status === "PENDING"
              ? "Chưa cho thuê"
              : "Căn hộ tồn hàng",
          value: Number(item.count),
          color: colors[item.status] || "#888",
        }));
        setPieData(pie);

        // Total users
        setTotalUsers(data.totalUsers);

        // Activities: map to frontend UI
        const acts = data.activities.map((act: any, idx: number) => {
          if (act.amount)
            return {
              id: idx,
              title: "Yêu cầu rút tiền",
              code: `#${act.id}`,
              time: "Mới",
              status: act.status.toLowerCase(),
            };
          if (act.appointmentDate)
            return {
              id: idx,
              title: "Đặt lịch xem phòng",
              code: `#${act.id}`,
              time: "Mới",
              status: act.status.toLowerCase(),
            };
          if (act.status)
            return {
              id: idx,
              title: "Hợp đồng mới",
              code: `#${act.id}`,
              time: "Mới",
              status: act.status.toLowerCase(),
            };
          return {
            id: idx,
            title: "Hoạt động mới",
            code: `#${act.id}`,
            time: "Mới",
            status: "new",
          };
        });
        setActivities(acts);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly bar chart */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">
              Tổng bài đăng trong tuần
            </h2>
            <div className="flex gap-4 text-sm">
              <button className="text-orange-500 font-medium">Chủ Nhà</button>
              <button className="text-gray-400">Khách thuê</button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#f97316" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie chart */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">
            Thống kê bài đăng
          </h2>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {pieData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm text-gray-600">{item.name}</span>
                </div>
                <span className="text-sm font-semibold">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Yearly line chart */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">
          Tổng bài đăng trong năm
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={yearlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#f97316"
              strokeWidth={3}
              dot={{ fill: "#f97316", r: 6 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Total users */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Tổng người dùng
            </h2>
            <span className="text-2xl font-bold text-gray-800">
              {totalUsers}
            </span>
          </div>
        </div>

        {/* Recent activities */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Hoạt động gần đây
          </h2>
          <div className="space-y-3">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    activity.status === "pending"
                      ? "bg-yellow-100"
                      : activity.status === "success"
                      ? "bg-blue-100"
                      : activity.status === "available"
                      ? "bg-green-100"
                      : "bg-orange-100"
                  }`}
                >
                  {activity.status === "success" ? (
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-gray-600" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800">
                    {activity.title}
                  </p>
                  <p className="text-xs text-gray-500">{activity.code}</p>
                </div>
                <span className="text-xs text-gray-400 flex-shrink-0">
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
