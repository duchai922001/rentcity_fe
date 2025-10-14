import { CheckCircle, Clock, XCircle, ChevronRight } from 'lucide-react';

const posts = [
  {
    id: 1,
    title: 'Bài đăng 1',
    description: 'Đây là bài đăng đầu tiên của tôi',
    loremIpsum: 'Lorem Ipsum',
    moreIpsum: 'Many publishing',
    datePublished: 'Many publishing',
    status: 'approved'
  },
  {
    id: 2,
    title: 'Bài đăng 2',
    description: 'Đây là bài đăng đầu tiên của tôi',
    loremIpsum: 'Lorem Ipsum',
    moreIpsum: 'Many publishing',
    datePublished: 'Many publishing',
    status: 'pending'
  },
  {
    id: 3,
    title: 'Bài đăng 3',
    description: 'Đây là bài đăng đầu tiên của tôi',
    loremIpsum: 'Lorem Ipsum',
    moreIpsum: 'Many publishing',
    datePublished: 'Many publishing',
    status: 'rejected'
  },
  {
    id: 4,
    title: 'Bài đăng 4',
    description: 'Đây là bài đăng đầu tiên của tôi',
    loremIpsum: 'Lorem Ipsum',
    moreIpsum: 'Many publishing',
    datePublished: 'Many publishing',
    status: 'approved'
  },
  {
    id: 5,
    title: 'Bài đăng 5',
    description: 'Đây là bài đăng đầu tiên của tôi',
    loremIpsum: 'Lorem Ipsum',
    moreIpsum: 'Many publishing',
    datePublished: 'Many publishing',
    status: 'pending'
  },
  {
    id: 6,
    title: 'Bài đăng 6',
    description: 'Đây là bài đăng đầu tiên của tôi',
    loremIpsum: 'Lorem Ipsum',
    moreIpsum: 'Many publishing',
    datePublished: 'Many publishing',
    status: 'approved'
  }
];

const statusConfig = {
  approved: {
    icon: CheckCircle,
    label: 'Đã duyệt',
    badgeColor: 'bg-green-100 text-green-700',
    iconColor: 'text-green-500',
    count: 123
  },
  pending: {
    icon: Clock,
    label: 'Chờ xét duyệt',
    badgeColor: 'bg-yellow-100 text-yellow-700',
    iconColor: 'text-yellow-500',
    count: 123
  },
  rejected: {
    icon: XCircle,
    label: 'Đã từ chối',
    badgeColor: 'bg-red-100 text-red-700',
    iconColor: 'text-red-500',
    count: 123
  }
};

export default function Posts() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý bài đăng</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(statusConfig).map(([key, config]) => {
          const Icon = config.icon;
          return (
            <div key={key} className="bg-white rounded-xl shadow-sm p-6 border-2 border-gray-100 hover:border-orange-200 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    key === 'approved' ? 'bg-green-100' :
                    key === 'pending' ? 'bg-yellow-100' : 'bg-red-100'
                  }`}>
                    <Icon className={`w-6 h-6 ${config.iconColor}`} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-800">{config.count}</p>
                    <p className="text-sm text-gray-600">{config.label}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-3 bg-white rounded-xl shadow-sm p-4">
        <button className="px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors">
          Đã duyệt
        </button>
        <button className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors">
          Đã từ chối
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">Danh sách bài đăng</h2>
        <div className="space-y-3">
          {posts.map((post) => {
            const config = statusConfig[post.status as keyof typeof statusConfig];
            const StatusIcon = config.icon;

            return (
              <div
                key={post.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-orange-300 hover:shadow-sm transition-all"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    post.status === 'approved' ? 'bg-yellow-100' :
                    post.status === 'pending' ? 'bg-yellow-100' : 'bg-yellow-100'
                  }`}>
                    <span className="text-2xl">⭐</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-800">{post.title}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${config.badgeColor}`}>
                        {post.description}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="text-gray-500">Lorem Ipsum:</span> {post.loremIpsum}
                      </div>
                      <div>
                        <span className="text-gray-500">Many publishing:</span> {post.moreIpsum}
                      </div>
                      <div>
                        <span className="text-gray-500">Many publishing:</span> {post.datePublished}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 ml-4">
                  <div className="flex items-center gap-2">
                    <StatusIcon className={`w-5 h-5 ${config.iconColor}`} />
                    <span className={`text-sm font-medium ${config.iconColor}`}>
                      {config.label}
                    </span>
                  </div>
                  <button className="px-4 py-2 border border-orange-300 text-orange-600 rounded-lg text-sm font-medium hover:bg-orange-50 transition-colors">
                    Xem chi tiết
                  </button>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-center gap-2 mt-6">
          <button className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
            1
          </button>
          <button className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center bg-orange-500 text-white">
            2
          </button>
          <button className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
            3
          </button>
          <button className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
            4
          </button>
          <button className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
            5
          </button>
          <span className="px-2">...</span>
          <button className="px-3 py-1 rounded-lg border border-gray-300 text-sm hover:bg-gray-50 transition-colors">
            Next »
          </button>
        </div>
      </div>
    </div>
  );
}
