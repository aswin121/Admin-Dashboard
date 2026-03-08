import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaUser, FaLock, FaEnvelope, FaEye, FaEyeSlash, 
  FaSpinner 
} from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    const result = await login(email, password);
    if (result.success) {
      navigate("/dashboard");
    } else {
      setError(result.error || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/10 to-indigo-900 flex items-center justify-center p-4">
      {/* Subtle floating orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-32 h-32 bg-indigo-500/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl animate-[pulse_4s_infinite]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="w-full max-w-sm bg-white/20 backdrop-blur-xl border border-white/40 rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500"
      >
        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <motion.div 
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl"
          >
            <FaUser className="w-8 h-8 text-white drop-shadow-lg" />
          </motion.div>
        </div>

        {/* 🔥 DARK TEXT ON LIGHT GLASS */}
        <h2 className="text-3xl font-black text-gray-900 text-center mb-3 drop-shadow-lg tracking-tight">
          Welcome Back
        </h2>
        <p className="text-gray-700 text-center text-lg font-semibold mb-8 drop-shadow-md">
          Sign in to continue
        </p>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email - DARK TEXT */}
          <div className="relative group">
            <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 group-focus-within:text-indigo-600 transition-all duration-300 drop-shadow-md" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              className="w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-xl focus:ring-4 focus:ring-indigo-500/40 focus:border-indigo-500 text-gray-900 placeholder-gray-500 font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-400"
              required
            />
          </div>

          {/* Password - DARK TEXT */}
          <div className="relative group">
            <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 group-focus-within:text-purple-600 transition-all duration-300 drop-shadow-md" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-12 pr-12 py-4 bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-xl focus:ring-4 focus:ring-purple-500/40 focus:border-purple-500 text-gray-900 placeholder-gray-500 font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-400"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg shadow-md hover:shadow-lg hover:bg-indigo-50 hover:scale-105 active:scale-95 transition-all duration-300 z-10"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash className="w-4 h-4 text-gray-700" /> : <FaEye className="w-4 h-4 text-gray-700" />}
            </button>
          </div>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="p-4 bg-red-100/90 border-2 border-red-400/60 backdrop-blur-md rounded-xl text-red-900 font-bold text-lg shadow-xl animate-pulse"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Button */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-4 rounded-xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all duration-400 border border-white/50 backdrop-blur-xl disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <FaSpinner className="w-5 h-5 animate-spin inline mr-2 drop-shadow-lg" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </motion.button>
        </form>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200/50 text-center">
          <p className="text-gray-700 text-sm font-semibold">
            Don't have an account?{' '}
            <span className="text-indigo-600 hover:text-indigo-700 font-bold cursor-pointer transition-all duration-300 hover:underline">
              Contact Admin
            </span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
