import { createContext, useContext, useState, type ReactNode } from "react";

// 1. CartItem ka structure
interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

// 2. Context mein kya kya hoga
interface CartContextType {
  cart: CartItem[];
  cartCount: number;
  total: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;
  clearCart: () => void;
}
const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Add to cart
  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === item.id);
      if (exists) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p,
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  // Context mein add karo
  const increaseQty = (id: string) => {
    setCart((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantity: p.quantity + 1 } : p)),
    );
  };

  const decreaseQty = (id: string) => {
    setCart((prev) => {
      const item = prev.find((p) => p.id === id);
      if (item && item.quantity === 1) {
        // agar already 1 hai, to remove kar do
        return prev.filter((p) => p.id !== id);
      }
      // warna sirf quantity kam karo
      return prev.map((p) =>
        p.id === id ? { ...p, quantity: p.quantity - 1 } : p,
      );
    });
  };

  // Remove from cart
  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  // Clear cart
  const clearCart = () => setCart([]);

  // Total count
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Total price
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        total,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

//step 5 custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
