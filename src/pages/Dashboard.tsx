import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';

const weeklyData = [
  { name: 'CN', value: 45 },
  { name: 'T2', value: 65 },
  { name: 'T3', value: 85 },
  { name: 'T4', value: 75 },
  { name: 'T5', value: 95 },
  { name: 'T6', value: 55 },
  { name: 'T7', value: 70 }
];

const yearlyData = [
  { name: 'Jan', value: 300 },
  { name: 'Feb', value: 450 },
  { name: 'Mar', value: 400 },
  { name: 'Apr', value: 500 },
  { name: 'May', value: 480 },
  { name: 'Jun', value: 550 },
  { name: 'Jul', value: 520 }
];

const pieData = [
  { name: 'Đã cho thuê', value: 55, color: '#6366f1' },
  { name: 'Chưa cho thuê', value: 20, color: '#f59e0b' },
  { name: 'Căn hộ tồn hàng', value: 25, color: '#10b981' }
];

const activities = [
  { id: 1, title: 'Mã căn hộ', code: 'XXYYZZ1102', time: '3 hour Ago', status: 'pending' },
  { id: 2, title: 'Khách hàng thanh toán', code: 'XXYYZZ1102', time: '3 hour Ago', status: 'success' },
  { id: 3, title: 'Mã căn hộ khả dụng', code: 'XXYYZZ1102', time: '3 hour Ago', status: 'available' },
  { id: 4, title: 'Có căn hộ mới', code: 'XXYYZZ1102', time: '3 hour Ago', status: 'new' }
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Tổng bài đăng trong tuần</h2>
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

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">Thống kê bài đăng</h2>
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
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm text-gray-600">{item.name}</span>
                </div>
                <span className="text-sm font-semibold">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">Tổng bài đăng trong năm</h2>
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
              dot={{ fill: '#f97316', r: 6 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Tổng người dùng</h2>
            <span className="text-2xl font-bold text-gray-800">123,456</span>
          </div>
          <ResponsiveContainer width="100%" height={100}>
            <LineChart data={yearlyData.slice(0, 5)}>
              <Line
                type="monotone"
                dataKey="value"
                stroke="#f97316"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Hoạt động gần đây</h2>
          <div className="space-y-3">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  activity.status === 'pending' ? 'bg-yellow-100' :
                  activity.status === 'success' ? 'bg-blue-100' :
                  activity.status === 'available' ? 'bg-green-100' : 'bg-orange-100'
                }`}>
                  {activity.status === 'success' ?
                    <TrendingUp className="w-5 h-5 text-blue-600" /> :
                    <TrendingDown className="w-5 h-5 text-gray-600" />
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800">{activity.title}</p>
                  <p className="text-xs text-gray-500">{activity.code}</p>
                </div>
                <span className="text-xs text-gray-400 flex-shrink-0">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
