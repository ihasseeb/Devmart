import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderId = (location.state as { orderId?: string })?.orderId;

  // Agar koi direct URL se is page pe aa jaye (orderId na ho), home pe bhej do
  useEffect(() => {
    if (!orderId) {
      navigate("/");
    }
  }, [orderId, navigate]);

  if (!orderId) return null;

  return (
    <div className="max-w-md mx-auto px-4 py-20 text-center">
      <p className="text-6xl mb-4">✅</p>
      <h1 className="text-2xl font-bold mb-2">Order Placed Successfully!</h1>
      <p className="text-gray-600 mb-1">Thank you for shopping with DevMart.</p>
      <p className="text-sm text-gray-400 mb-8">
        Order ID: <span className="font-mono">{orderId}</span>
      </p>

      <div className="flex flex-col gap-3">
        <Link
          to="/orders"
          className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          View My Orders
        </Link>
        <Link to="/products" className="text-blue-600 underline text-sm">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
