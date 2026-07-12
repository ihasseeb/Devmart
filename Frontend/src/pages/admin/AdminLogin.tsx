import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../services/authApi";
import { useAuth } from "../../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Loader2, ArrowRight, ShieldAlert, KeyRound, ShieldCheck, Settings, BarChart3, Users } from "lucide-react";

const AdminLogin = () => {
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

      // Admin login specific check BEFORE saving to context
      if (response.role !== "admin") {
        setError("Access Denied: You do not have administrator privileges.");
        setLoading(false);
        return;
      }

      login(response);
      navigate("/admin/dashboard");
    } catch (err: any) {
      const status = err.response?.status;
      const message = err.response?.data?.message || "Authentication failed.";

      if (status === 403) {
        setNotVerified(true);
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    { icon: BarChart3, title: "Analytics Dashboard", desc: "Real-time insights into your store performance" },
    { icon: Settings, title: "Full Control", desc: "Manage products, orders, and settings" },
    { icon: Users, title: "User Management", desc: "Handle customer accounts and roles" },
    { icon: ShieldCheck, title: "Secure Access", desc: "Role-based authentication and protection" },
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
            <span className="text-4xl font-black text-gray-900 tracking-tight">DevMart</span>
          </Link>

          <h2 className="text-3xl xl:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
            Admin Control <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Center
            </span>
          </h2>
          <p className="text-gray-500 text-base mb-12 max-w-md leading-relaxed">
            Access the administration panel to manage your store, monitor analytics, and control all aspects of DevMart.
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
                  <p className="text-sm font-bold text-gray-800">{feature.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{feature.desc}</p>
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
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white/50 p-8 sm:p-10 relative overflow-hidden">

            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"></div>

            {/* Mobile logo */}
            <div className="lg:hidden text-center mb-6">
              <Link to="/" className="inline-flex items-center gap-2">
                <span className="text-2xl">🛒</span>
                <span className="text-2xl font-black text-gray-900 tracking-tight">DevMart</span>
              </Link>
            </div>

            <div className="text-center mb-10">
              <motion.div
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.7, type: "spring" }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white mb-6 shadow-lg shadow-blue-500/30"
              >
                <KeyRound className="w-8 h-8" />
              </motion.div>
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Admin Portal</h1>
              <p className="text-sm text-gray-500 mt-2 font-medium">Secure access for authorized personnel only.</p>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-red-50/80 backdrop-blur-sm border border-red-100 text-red-600 text-sm rounded-xl p-4 mb-6 flex items-start space-x-3"
                >
                  <ShieldAlert className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-500" />
                  <div className="flex-1">
                    <p className="font-semibold leading-relaxed">{error}</p>
                    {notVerified && (
                      <button
                        onClick={() => navigate("/verify-otp", { state: { email } })}
                        className="mt-3 inline-flex items-center justify-center px-4 py-2 border border-red-200 text-xs font-bold rounded-lg text-red-700 bg-white hover:bg-red-50 transition-colors"
                      >
                        Verify your email now
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700 ml-1">Administrator Email</label>
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
                    placeholder="admin@devmart.com"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between ml-1">
                  <label className="text-sm font-semibold text-gray-700">Password</label>
                </div>
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

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-md shadow-blue-500/20 disabled:opacity-70 disabled:cursor-not-allowed transition-all overflow-hidden mt-8"
              >
                {loading ? (
                  <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" />
                ) : (
                  <>
                    Access Portal
                    <ArrowRight className="ml-2 h-5 w-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 absolute right-4" />
                  </>
                )}
              </motion.button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-100 text-center relative z-10">
              <Link to="/" className="text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors inline-flex items-center">
                <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                Return to main store
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminLogin;
