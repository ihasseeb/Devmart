import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authApi";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  Loader2,
  ArrowRight,
  ShoppingBag,
  Truck,
  Shield,
  Star,
} from "lucide-react";

const Login = () => {
  // Component ke andar:
  const location = useLocation();
  const justVerified = (location.state as { verified?: boolean })?.verified;
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [notVerified, setNotVerified] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setNotVerified(false);
    setLoading(true);

    try {
      const response = await loginUser({ email, password });
      login(response);

      if (response.role === "admin") {
        navigate("/");
      } else {
        navigate("/");
      }
    } catch (err: any) {
      const status = err.response?.status;
      const message = err.response?.data?.message || "Something went wrong";

      if (status === 403) {
        setNotVerified(true);
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: ShoppingBag,
      title: "Premium Products",
      desc: "Curated selection of top-quality items",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      desc: "Free shipping on orders above Rs. 5,000",
    },
    {
      icon: Shield,
      title: "Secure Payments",
      desc: "Your data is always protected",
    },
    {
      icon: Star,
      title: "Best Prices",
      desc: "Competitive prices you won't find elsewhere",
    },
  ];

  return (
    <div className="min-h-screen flex relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 z-0" />
      <div className="absolute top-[10%] right-[10%] w-[30%] h-[30%] rounded-full bg-purple-400/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[10%] left-[20%] w-[40%] h-[40%] rounded-full bg-indigo-400/10 blur-3xl pointer-events-none" />

      {/* Left Side — Branding Content */}
      <div className="hidden lg:flex lg:w-1/2 relative z-10 flex-col justify-center px-16 xl:px-24">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Link to="/" className="inline-flex items-center gap-3 mb-10">
            <span className="text-4xl">🛒</span>
            <span className="text-4xl font-black text-gray-900 tracking-tight">
              DevMart
            </span>
          </Link>

          <h2 className="text-3xl xl:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
            Welcome back to <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              your favorite store
            </span>
          </h2>
          <p className="text-gray-500 text-base mb-12 max-w-md leading-relaxed">
            Sign in to access your account, track orders, and explore our latest
            collection of premium products.
          </p>

          <div className="grid grid-cols-2 gap-5 max-w-lg">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-start gap-3 p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-gray-100/80 shadow-sm"
              >
                <div className="p-2 rounded-xl bg-blue-50 text-blue-600 flex-shrink-0">
                  <feature.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800">
                    {feature.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right Side — Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white/50 p-8 sm:p-10">
            {/* Mobile logo */}
            <div className="lg:hidden text-center mb-6">
              <Link to="/" className="inline-flex items-center gap-2">
                <span className="text-2xl">🛒</span>
                <span className="text-2xl font-black text-gray-900 tracking-tight">
                  DevMart
                </span>
              </Link>
            </div>

            <div className="text-center mb-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white mb-6 shadow-lg shadow-blue-500/30"
              >
                <Lock className="w-8 h-8" />
              </motion.div>
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                Welcome back
              </h1>
              <p className="text-sm text-gray-500 mt-3 font-medium">
                Please enter your details to sign in.
              </p>
            </div>
            {justVerified && (
              <div className="bg-green-100 text-green-700 text-sm rounded-md p-3 mb-4">
                ✅ Email verified successfully! Please login.
              </div>
            )}

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-red-50/80 backdrop-blur-sm text-red-600 text-sm rounded-xl p-4 mb-6 border border-red-100 flex flex-col items-center text-center overflow-hidden"
                >
                  <p className="font-semibold">{error}</p>
                  {notVerified && (
                    <button
                      onClick={() =>
                        navigate("/verify-otp", { state: { email } })
                      }
                      className="mt-3 inline-flex items-center justify-center px-4 py-2 border border-red-200 shadow-sm text-xs font-bold rounded-lg text-red-700 bg-white hover:bg-red-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Verify your email now
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700 ml-1">
                  Email
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                    <Mail className="h-5 w-5" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-11 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 shadow-sm"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700 ml-1">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                    <Lock className="h-5 w-5" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-11 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 shadow-sm"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-600 cursor-pointer select-none"
                  >
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-blue-600 hover:text-blue-500 transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-md shadow-blue-500/20 disabled:opacity-70 disabled:cursor-not-allowed transition-all overflow-hidden mt-6"
              >
                {loading ? (
                  <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" />
                ) : (
                  <>
                    Sign in
                    <ArrowRight className="ml-2 h-5 w-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 absolute right-4" />
                  </>
                )}
              </motion.button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-100 text-center">
              <p className="text-sm text-gray-600 font-medium">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-bold text-blue-600 hover:text-blue-500 transition-colors"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
