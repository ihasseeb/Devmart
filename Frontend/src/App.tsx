import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

// This is all about the main structure of the app. It wraps the entire application with AuthProvider and CartProvider, which provide authentication and cart state management respectively. The Navbar is displayed at the top, followed by the main content area where different routes are rendered, and finally the Footer is displayed at the bottom.
function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Navbar />
          <main className="flex-1">
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
