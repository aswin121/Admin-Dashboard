import { useState } from "react";
import {
  Bell,
  Search,
  Sun,
  Moon,
  ChevronDown,
  X,
  ChartLine,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useTheme from "../../hooks/useTheme";
import ProfileMenu from "../ProfileMenu";
import { MdBatteryChargingFull } from "react-icons/md";

export default function Navbar({ collapsed }) {
  const { theme, toggleTheme } = useTheme();
  const [search, setSearch] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications] = useState(4);

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="backdrop-blur-3xl bg-white/80 dark:bg-slate-900/80 shadow-2xl border-b border-white/50 dark:border-slate-800/50 fixed top-0 left-0 right-0 z-40 px-6 lg:px-8 py-4 lg:py-6" // 🔥 z-40 + FULL WIDTH FIXED
    >
      <div
        className={`flex items-center justify-between relative transition-all duration-300 ${collapsed ? "ml-[70px]" : "ml-[240px]"}`}
      >
        {/* Left: Logo + Brand */}
        <motion.div
          className="flex items-center gap-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="p-4 lg:p-5 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl shadow-2xl border border-white/30 backdrop-blur-sm group hover:shadow-3xl transition-all duration-500 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <ChartLine className="w-6 h-6 lg:w-7 lg:h-7 text-white drop-shadow-lg" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="hidden lg:block"
          >
            <h1 className="text-2xl lg:text-3xl font-black bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent drop-shadow-lg">
              Admin Dashboard
            </h1>
            <p className="text-xs text-indigo-500 font-medium tracking-wider uppercase">
              Premium Analytics
            </p>
          </motion.div>
        </motion.div>

        {/* Center: Global Search */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex-1 max-w-md mx-8 hidden md:flex"
        >
          <div className="relative w-full group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-indigo-500 transition-all duration-300 z-10" />

            <input
              type="text"
              placeholder="🔍 Search Dashboard, Users, Orders..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-12 py-4 bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border-2 border-gray-200/50 dark:border-slate-700/50 rounded-3xl focus:ring-4 focus:ring-indigo-500/30 focus:border-indigo-500/50 shadow-lg hover:shadow-xl text-lg font-semibold transition-all duration-500 placeholder-gray-500"
            />

            {/* PERFECTLY STABLE BUTTON */}
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-gray-200/50 dark:border-slate-700/50 rounded-lg shadow-sm hover:shadow-md hover:bg-indigo-50 dark:hover:bg-slate-700/50 hover:scale-105 active:scale-95 z-20 transition-all duration-200"
              onClick={() => setSearch("")}
            >
              {search ? (
                <X className="w-4 h-4 text-gray-600 dark:text-gray-300" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-600 dark:text-gray-300" />
              )}
            </button>
          </div>
        </motion.div>

        {/* Right: Actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 lg:gap-4 ml-[200px]"
        >
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              backgroundColor: ["#10b98120", "#10b98140", "#10b98120"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="px-4 py-2 bg-emerald-500/20 dark:bg-emerald-900/30 backdrop-blur-sm rounded-2xl border border-emerald-200/50 text-emerald-700 dark:text-emerald-300 font-semibold text-sm hidden lg:flex items-center gap-2"
          >
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
            Live Data
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="p-3 rounded-2xl bg-gradient-to-r from-gray-100 to-gray-200 dark:from-slate-800 dark:to-slate-700 backdrop-blur-sm border border-white/50 dark:border-slate-800/50 shadow-lg hover:shadow-xl hover:from-indigo-100 hover:to-purple-100 dark:hover:from-slate-700 dark:hover:to-slate-600 transition-all duration-300 group"
          >
            {theme === "light" ? (
              <Moon className="w-5 h-5 text-gray-700 group-hover:text-indigo-500 dark:text-gray-300 transition-colors" />
            ) : (
              <Sun className="w-5 h-5 text-gray-300 group-hover:text-yellow-500 transition-colors" />
            )}
          </motion.button>

          <motion.div
            className="relative"
            onMouseEnter={() => setShowNotifications(true)}
            onMouseLeave={() => setShowNotifications(false)}
          >
            <motion.button
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-2xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-white/30 dark:border-slate-700/50 shadow-lg hover:shadow-xl hover:bg-indigo-500/10 transition-all duration-300 relative"
            >
              <Bell className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              {notifications > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-2xl flex items-center justify-center text-xs font-bold shadow-lg border-2 border-white/50"
                >
                  {notifications > 99 ? "99+" : notifications}
                </motion.span>
              )}
            </motion.button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 10 }}
                  className="absolute top-full right-0 mt-2 w-80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 dark:border-slate-800/50 py-4 px-6 z-50"
                >
                  <h4 className="font-black text-lg mb-4 flex items-center gap-2 bg-gradient-to-r from-gray-900 to-indigo-900 bg-clip-text text-transparent">
                    🔔 Notifications ({notifications})
                  </h4>
                  <div className="space-y-3 max-h-80 overflow-y-auto">
                    {[
                      "🛒 New order #1243 received - $89.99",
                      "👤 User Sarah Smith updated profile",
                      "📊 Analytics report ready for download",
                      "💳 Payment #567 confirmed successfully",
                    ].map((notif, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-3 p-4 rounded-2xl hover:bg-indigo-50/50 backdrop-blur-sm border-l-4 border-indigo-500 cursor-pointer group transition-all"
                        whileHover={{ x: 4, scale: 1.02 }}
                      >
                        <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-indigo-600 flex-1">
                          {notif}
                        </span>
                        <span className="text-xs text-gray-400">2 min</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <ProfileMenu />
        </motion.div>
      </div>
    </motion.div>
  );
}
