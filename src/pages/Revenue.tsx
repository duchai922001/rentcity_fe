import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';

const monthlyData = [
  { name: '2012', value: 45000 },
  { name: '2017', value: 52000 },
  { name: '2018', value: 48000 },
  { name: '2019', value: 65000 },
  { name: '2020', value: 58000 },
  { name: '2021', value: 72000 }
];

const yearlyData = [
  { name: '2016', value: 35000 },
  { name: '2017', value: 42000 },
  { name: '2018', value: 55000 },
  { name: '2019', value: 48000 },
  { name: '2020', value: 62000 },
  { name: '2021', value: 58000 }
];

const stats = [
  { title: 'HỢP ĐỒNG', value: '45,000đ', trend: 'up', color: 'purple' },
  { title: 'DỊCH VỤ', value: '45,000đ', trend: 'down', color: 'orange' },
  { title: 'TIỀN LỜI', value: '45,000đ', trend: 'up', color: 'red' },
  { title: 'TIỀN LỜI', value: '45,000đ', trend: 'up', color: 'blue' }
];

const transactions = [
  { id: 1, type: 'Tiêu tiêu dùng', code: '#11414792', name: 'Hoa Khang', amount: '123đ', date: '30 Jan, 11:30 AM', status: 'pending' },
  { id: 2, type: 'Tiêu tiêu dùng', code: '#11414792', name: 'Hoa Khang', amount: '123đ', date: '21 Jan, 10:40 AM', status: 'completed' },
  { id: 3, type: 'Tiêu tiêu dùng', code: '#11414792', name: 'Hoa Khang', amount: '123đ', date: '21 Jan, 06:40 PM', status: 'failed' },
  { id: 4, type: 'Tiêu tiêu dùng', code: '#11414792', name: 'Hoa Khang', amount: '123đ', date: '13 Jan, 03:49 PM', status: 'completed' }
];

export default function Revenue() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Dòng tiền</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">Tổng thu nhập năm</h2>
          <ResponsiveContainer width="100%" height={200}>
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
                dot={{ fill: '#f97316', r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">Tổng thu nhập tháng</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#ef4444"
                strokeWidth={3}
                dot={{ fill: '#ef4444', r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-4">{stat.title}</h3>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-800 mb-2">{stat.value}</p>
                <p className={`text-xs flex items-center gap-1 ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  {stat.trend === 'up' ? '+3.5%' : '-2.1%'}
                </p>
              </div>
              <ResponsiveContainer width={80} height={50}>
                <LineChart data={monthlyData.slice(0, 4)}>
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={
                      stat.color === 'purple' ? '#8b5cf6' :
                      stat.color === 'orange' ? '#f97316' :
                      stat.color === 'red' ? '#ef4444' : '#3b82f6'
                    }
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">Chi tiết</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Chi tiết</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Mã giao dịch</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Loại</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Thẻ</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Ngày</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Số tiền</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Hóa đơn</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        transaction.status === 'completed' ? 'bg-green-100 text-green-600' :
                        transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-red-100 text-red-600'
                      }`}>
                        {transaction.status === 'completed' ? '✓' :
                         transaction.status === 'pending' ? '⏱' : '✕'}
                      </div>
                      <span className="text-sm text-gray-600">{transaction.type}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">{transaction.code}</td>
                  <td className="py-4 px-4 text-sm text-gray-600">{transaction.name}</td>
                  <td className="py-4 px-4 text-sm text-gray-600">{transaction.amount}</td>
                  <td className="py-4 px-4 text-sm text-gray-600">{transaction.date}</td>
                  <td className="py-4 px-4">
                    <span className={`text-sm font-semibold ${
                      transaction.status === 'completed' ? 'text-green-600' :
                      transaction.status === 'pending' ? 'text-orange-500' :
                      'text-red-600'
                    }`}>
                      {transaction.status === 'completed' ? '+0.5đ' :
                       transaction.status === 'pending' ? '-1.5đ' : '-0.8đ'}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <button className="px-3 py-1 text-xs border border-orange-300 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors">
                      Xem hóa đơn
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
