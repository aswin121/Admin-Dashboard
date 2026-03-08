import { useState } from "react";
import { FaUserCircle, FaCog, FaSignOutAlt, FaUser, FaCrown } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function ProfileMenu() {
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    setProfileOpen(false);
    // Add logout logic here
    setTimeout(() => {
      window.location.href = "/";
    }, 500);
  };

  const menuItems = [
    { 
      name: "Profile", 
      icon: FaUser, 
      action: () => console.log("Go to profile"),
      color: "from-blue-500 to-indigo-600"
    },
    { 
      name: "Settings", 
      icon: FaCog, 
      action: () => console.log("Open Settings"),
      color: "from-purple-500 to-violet-600"
    },
    { 
      name: "Logout", 
      icon: FaSignOutAlt, 
      action: handleLogout,
      color: "from-red-500 to-rose-600",
      destructive: true
    },
  ];

  return (
    <motion.div className="relative" animate={{ scale: 1 }}>
      {/* Profile Button */}
      <motion.button
        whileHover={{ scale: 1.05, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setProfileOpen(!profileOpen)}
        className="group relative p-3 rounded-3xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/50 dark:border-slate-700/50 shadow-2xl hover:shadow-3xl hover:border-indigo-200/50 hover:bg-gradient-to-r hover:from-indigo-500/10 hover:to-purple-500/10 transition-all duration-500 overflow-hidden"
      >
        {/* Premium Avatar */}
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="relative"
        >
          <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl shadow-2xl border-4 border-white/20 flex items-center justify-center overflow-hidden group-hover:scale-110 transition-all">
            <FaUserCircle className="w-7 h-7 lg:w-8 lg:h-8 text-white drop-shadow-lg" />
          </div>
          
          {/* Premium Badge */}
          <motion.div
            className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full shadow-lg flex items-center justify-center border-2 border-white/50"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <FaCrown className="w-3 h-3 text-white drop-shadow-md" />
          </motion.div>
        </motion.div>

        {/* Status Ring */}
        <motion.div
          className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl animate-pulse"
          animate={{ opacity: [0, 0.2, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.button>

      {/* Animated Dropdown */}
      <AnimatePresence>
        {profileOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="absolute right-0 mt-3 w-72 lg:w-80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-3xl shadow-2xl rounded-3xl border border-white/50 dark:border-slate-800/50 py-4 px-6 z-50 overflow-hidden"
          >
            {/* Header with User Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-4 p-4 mb-6 rounded-2xl bg-gradient-to-r from-indigo-50/50 to-purple-50/50 dark:from-slate-800/50 dark:to-slate-700/50 backdrop-blur-sm border border-indigo-200/50"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-xl flex items-center justify-center flex-shrink-0">
                <FaUser className="w-6 h-6 text-white drop-shadow-lg" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-black text-xl text-gray-900 dark:text-white truncate">
                  Antony Aswin
                </h3>
                <p className="text-sm font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  🛡️ Super Admin
                </p>
              </div>
              <div className="px-3 py-1 bg-gradient-to-r from-emerald-500/20 to-teal-600/20 backdrop-blur-sm rounded-xl border border-emerald-200/50 shadow-lg">
                <span className="font-bold text-emerald-700 text-sm">Active</span>
              </div>
            </motion.div>

            {/* Menu Items */}
            <div className="space-y-1">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    whileHover={{ 
                      x: 8, 
                      scale: 1.02,
                      backgroundColor: item.destructive 
                        ? "#fee2e2" 
                        : "#f0f9ff"
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={item.action}
                    className={`group relative w-full flex items-center gap-4 p-5 lg:p-6 rounded-2xl backdrop-blur-sm border border-transparent hover:border-white/30 dark:hover:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden font-semibold text-left text-base cursor-pointer no-underline ${
                      item.destructive
                        ? "hover:bg-gradient-to-r hover:from-red-50/70 hover:to-rose-50/70 text-red-700 hover:text-red-800"
                        : "text-gray-800 dark:text-gray-200 hover:bg-gradient-to-r hover:from-blue-50/70 hover:to-indigo-50/70 hover:text-blue-700 dark:hover:text-blue-400"
                    }`}
                  >
                    {/* Icon */}
                    <motion.div 
                      className={`p-3 lg:p-4 rounded-2xl shadow-lg flex-shrink-0 transition-all duration-300 ${
                        item.destructive
                          ? "bg-gradient-to-r from-red-500/20 to-rose-500/20 border border-red-200/50 shadow-red-500/20"
                          : `bg-gradient-to-r ${item.color} shadow-xl shadow-blue-500/25 hover:scale-110`
                      }`}
                      whileHover={{ scale: 1.1 }}
                    >
                      <Icon className={`w-5 h-5 lg:w-6 lg:h-6 ${
                        item.destructive 
                          ? "text-red-500" 
                          : "text-white drop-shadow-lg"
                      }`} />
                    </motion.div>

                    {/* Text */}
                    <span className="flex-1">{item.name}</span>

                    {/* Hover Glow */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                      whileHover={{ opacity: 1 }}
                    />

                    {/* Arrow */}
                    <motion.div 
                      className="w-5 h-5 text-gray-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors"
                      animate={{ rotate: profileOpen ? 90 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown />
                    </motion.div>
                  </motion.button>
                );
              })}
            </div>

            {/* Bottom Decorative Line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5 }}
              className="h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent my-4 mx-auto w-20"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
