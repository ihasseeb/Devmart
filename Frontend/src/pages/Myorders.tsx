import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getMyOrders } from "../services/orderApi";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  processing: "bg-blue-100 text-blue-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const MyOrders = () => {
  console.log("MyOrders component mounted");
  const {
    data: orders,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["myOrders"],
    queryFn: getMyOrders,
  });

  if (isLoading) {
    return <p className="text-center mt-10">Loading your orders...</p>;
  }

  if (isError) {
    return (
      <p className="text-center mt-10 text-red-600">Failed to load orders</p>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <p className="text-5xl mb-4">📦</p>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          No orders yet
        </h2>
        <Link to="/products" className="text-blue-600 underline">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white border rounded-lg p-5 shadow-sm"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-sm text-gray-500">Order ID</p>
                <p className="font-mono text-sm">{order._id}</p>
              </div>
              <span
                className={`text-xs font-medium px-3 py-1 rounded-full capitalize ${statusColors[order.status]}`}
              >
                {order.status}
              </span>
            </div>

            <div className="space-y-1 mb-3">
              {order.items.map((item, i) => (
                <p key={i} className="text-sm text-gray-600">
                  {item.quantity} × Rs. {item.price.toLocaleString()}
                </p>
              ))}
            </div>

            <div className="border-t pt-3 flex justify-between items-center">
              <p className="text-sm text-gray-500">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <p className="font-bold">
                Rs. {order.totalAmount.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
