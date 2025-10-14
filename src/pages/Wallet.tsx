import { CreditCard, Plus } from 'lucide-react';

const cards = [
  {
    id: 1,
    balance: '123,456 VND',
    cardNumber: '**** **** **** 1234',
    cardHolder: 'Nguyen Van A',
    expiry: '12/25',
    color: 'from-orange-400 to-orange-600'
  },
  {
    id: 2,
    balance: '323,456 VND',
    cardNumber: '**** **** **** 5678',
    cardHolder: 'Nguyen Van A',
    expiry: '12/25',
    color: 'from-gray-400 to-gray-600'
  }
];

const transactions = [
  { id: 1, type: 'Tiêu tiêu dùng', code: '#12124792', name: 'Hoa Khang', amount: '123đ', date: '29 Jan, 12:30 PM', status: 'pending' },
  { id: 2, type: 'Tiêu tiêu dùng', code: '#12124792', name: 'Hoa Khang', amount: '123đ', date: '29 Jan, 12:30 PM', status: 'completed' },
  { id: 3, type: 'Tiêu tiêu dùng', code: '#12124792', name: 'Hoa Khang', amount: '123đ', date: '29 Jan, 12:30 PM', status: 'pending' },
  { id: 4, type: 'Tiêu tiêu dùng', code: '#12124792', name: 'Hoa Khang', amount: '123đ', date: '29 Jan, 12:30 PM', status: 'completed' },
  { id: 5, type: 'Tiêu tiêu dùng', code: '#12124792', name: 'Hoa Khang', amount: '123đ', date: '13 Jan, 09:49 PM', status: 'pending' }
];

export default function Wallet() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Thẻ của tôi</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-lg font-medium hover:shadow-lg transition-shadow">
          <Plus className="w-5 h-5" />
          Thêm thẻ
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card) => (
          <div key={card.id} className={`bg-gradient-to-br ${card.color} rounded-2xl p-6 text-white shadow-lg`}>
            <div className="flex items-start justify-between mb-8">
              <div>
                <p className="text-sm opacity-90 mb-1">Số dư</p>
                <p className="text-2xl font-bold">{card.balance}</p>
              </div>
              <CreditCard className="w-8 h-8 opacity-80" />
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-xs opacity-75 mb-1">Số thẻ</p>
                <p className="text-lg font-mono tracking-wider">{card.cardNumber}</p>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs opacity-75 mb-1">Chủ thẻ</p>
                  <p className="text-sm font-medium">{card.cardHolder}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs opacity-75 mb-1">Hết hạn</p>
                  <p className="text-sm font-medium">{card.expiry}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-800">
            Tổng số tiền: <span className="text-orange-500">123,456,000 VND</span>
          </h2>
          <button className="px-6 py-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-lg font-medium hover:shadow-lg transition-shadow">
            RÚT TIỀN VỀ THẺ
          </button>
        </div>

        <div className="space-y-4">
          <h3 className="text-base font-semibold text-gray-800">Thanh toán gần đây</h3>
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
                          transaction.status === 'completed' ? 'bg-green-100' : 'bg-yellow-100'
                        }`}>
                          {transaction.status === 'completed' ? '✓' : '⏱'}
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
                        transaction.status === 'completed' ? 'text-green-600' : 'text-orange-500'
                      }`}>
                        {transaction.status === 'completed' ? '+0.5đ' : '-1.5đ'}
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
    </div>
  );
}
