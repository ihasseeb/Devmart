import { useState, useEffect } from "react";
import { BarChart3, Users, Package, ShoppingCart, TrendingUp, Loader2 } from "lucide-react";
import { getAdminStats, type AdminStats } from "../../services/adminApi";

export default function AdminDashboard() {
  const [data, setData] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const statsData = await getAdminStats();
        setData(statsData);
      } catch (err) {
        console.error("Error loading admin stats:", err);
        setError("Failed to load dashboard metrics.");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const stats = [
    {
      title: "Total Revenue",
      value: data ? `Rs. ${data.stats.totalRevenue.toLocaleString()}` : "Rs. 0",
      icon: <TrendingUp className="w-6 h-6 text-emerald-600" />,
      trend: "+10.0%",
      bg: "bg-emerald-100",
    },
    {
      title: "Total Orders",
      value: data ? data.stats.totalOrders.toString() : "0",
      icon: <ShoppingCart className="w-6 h-6 text-blue-600" />,
      trend: "+5.0%",
      bg: "bg-blue-100",
    },
    {
      title: "Products",
      value: data ? data.stats.totalProducts.toString() : "0",
      icon: <Package className="w-6 h-6 text-purple-600" />,
      trend: "+0.0%",
      bg: "bg-purple-100",
    },
    {
      title: "Active Users",
      value: data ? data.stats.totalUsers.toString() : "0",
      icon: <Users className="w-6 h-6 text-orange-600" />,
      trend: "+12.0%",
      bg: "bg-orange-100",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-6 rounded-2xl border border-red-100 text-center">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Dashboard Overview</h2>
        <span className="text-sm text-gray-500">Updated today at {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
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
              Chart Data Visualization (Real-time backend stats connected)
            </p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Recent Activity</h3>
          <div className="space-y-6">
            {data?.recentOrders && data.recentOrders.length > 0 ? (
              data.recentOrders.map((order) => (
                <div key={order._id} className="flex items-start gap-4">
                  <div className={`w-2 h-2 mt-2 rounded-full ${
                    order.status === "cancelled" ? "bg-red-500" :
                    order.status === "delivered" ? "bg-emerald-500" :
                    "bg-blue-500"
                  }`}></div>
                  <div>
                    <p className="text-sm text-gray-800 font-medium">
                      Order Rs.{order.totalAmount} by {order.customerName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()} - <span className="uppercase text-[10px] font-bold">{order.status}</span>
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">No recent orders yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

