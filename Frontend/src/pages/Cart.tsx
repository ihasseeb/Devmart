import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const {
    cart,
    total,
    cartCount,
    removeFromCart,
    clearCart,
    increaseQty,
    decreaseQty,
  } = useCart();

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          🛒 My Cart
          {cartCount > 0 && (
            <span className="ml-2 text-sm font-normal text-gray-500">
              ({cartCount} items)
            </span>
          )}
        </h1>
        {cart.length > 0 && (
          <button
            onClick={clearCart}
            className="text-danger hover:text-danger/80 text-sm transition"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Empty Cart */}
      {cart.length === 0 && (
        <div className="text-center py-24">
          <p className="text-6xl mb-4">🛒</p>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Your cart is empty!
          </h2>
          <p className="text-gray-400 mb-6">Add some products to get started</p>
          <Link
            to="/products"
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-hover transition"
          >
            Shop Now
          </Link>
        </div>
      )}

      {/* Cart Items + Summary */}
      {cart.length > 0 && (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Items List */}
          <div className="flex-1 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 bg-white rounded-xl shadow-sm p-4"
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg shrink-0"
                />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">
                    {item.name}
                  </h3>
                  <p className="text-primary font-bold mt-1">
                    Rs. {item.price.toLocaleString()}
                  </p>
                  <p className="text-gray-400 text-xs mt-1">
                    Subtotal: Rs.{" "}
                    {(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 font-bold transition flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="w-6 text-center font-semibold text-gray-900">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => increaseQty(item.id)}
                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 font-bold transition flex items-center justify-center"
                  >
                    +
                  </button>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-danger hover:text-danger/80 transition ml-2"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:w-72">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h2 className="font-bold text-gray-900 text-lg mb-4">
                Order Summary
              </h2>

              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex justify-between">
                  <span>Items ({cartCount})</span>
                  <span>Rs. {total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span className="text-green-500">Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Discount</span>
                  <span className="text-danger">- Rs. 0</span>
                </div>
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between font-bold text-gray-900 text-lg">
                  <span>Total</span>
                  <span className="text-primary">
                    Rs. {total.toLocaleString()}
                  </span>
                </div>
              </div>

              <button className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-hover active:scale-95 transition font-semibold">
                Checkout →
              </button>

              <Link
                to="/products"
                className="block text-center text-sm text-gray-400 hover:text-gray-600 transition mt-4"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
