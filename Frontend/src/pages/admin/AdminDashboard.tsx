import { BarChart3, Users, Package, ShoppingCart, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    { title: "Total Revenue", value: "$12,426", icon: <TrendingUp className="w-6 h-6 text-emerald-600" />, trend: "+14.5%", bg: "bg-emerald-100" },
    { title: "Total Orders", value: "356", icon: <ShoppingCart className="w-6 h-6 text-blue-600" />, trend: "+5.2%", bg: "bg-blue-100" },
    { title: "Products", value: "84", icon: <Package className="w-6 h-6 text-purple-600" />, trend: "-1.4%", bg: "bg-purple-100" },
    { title: "Active Users", value: "1,240", icon: <Users className="w-6 h-6 text-orange-600" />, trend: "+18.2%", bg: "bg-orange-100" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Dashboard Overview</h2>
        <span className="text-sm text-gray-500">Updated today at 09:41 AM</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">{stat.title}</p>
                <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              </div>
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                {stat.icon}
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className={`font-medium ${stat.trend.startsWith('+') ? 'text-emerald-600' : 'text-red-500'}`}>
                {stat.trend}
              </span>
              <span className="text-gray-400 ml-2">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* Placeholder for a chart */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-800">Sales Overview</h3>
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>
          <div className="h-64 w-full bg-gray-50 rounded-xl flex items-center justify-center border border-dashed border-gray-200">
            <p className="text-gray-400 flex flex-col items-center gap-2">
              <BarChart3 className="w-8 h-8 opacity-50" />
              Chart Data Visualization (Mock)
            </p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Recent Activity</h3>
          <div className="space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-2 h-2 mt-2 rounded-full bg-blue-500"></div>
                <div>
                  <p className="text-sm text-gray-800 font-medium">New order #ORD-{1040 + i}</p>
                  <p className="text-xs text-gray-500">{i * 12} mins ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
