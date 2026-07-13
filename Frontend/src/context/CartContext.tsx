import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { useAuth } from "./AuthContext";

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

// Helper: localStorage key har user ke liye unique hoga
const getCartKey = (email: string | undefined) => email ? `cart_${email}` : null;

// Helper: localStorage se cart load karo
const loadCart = (email: string | undefined): CartItem[] => {
  const key = getCartKey(email);
  if (!key) return [];
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

// Helper: localStorage mein cart save karo
const saveCart = (email: string | undefined, cart: CartItem[]) => {
  const key = getCartKey(email);
  if (!key) return;
  localStorage.setItem(key, JSON.stringify(cart));
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState<CartItem[]>([]);

  // Jab user login/logout ho, cart load karo
  useEffect(() => {
    const loaded = loadCart(user?.email);
    setCart(loaded);
  }, [user?.email]);

  // Jab bhi cart change ho, localStorage mein save karo
  const updateCart = useCallback((updater: (prev: CartItem[]) => CartItem[]) => {
    setCart((prev) => {
      const newCart = updater(prev);
      saveCart(user?.email, newCart);
      return newCart;
    });
  }, [user?.email]);

  // Add to cart
  const addToCart = (item: CartItem) => {
    updateCart((prev) => {
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
    updateCart((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantity: p.quantity + 1 } : p)),
    );
  };

  const decreaseQty = (id: string) => {
    updateCart((prev) => {
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
    updateCart((prev) => prev.filter((p) => p.id !== id));
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
    const key = getCartKey(user?.email);
    if (key) localStorage.removeItem(key);
  };

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
