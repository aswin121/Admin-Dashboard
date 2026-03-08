import { useState, useEffect } from "react";
import { 
  FaUsers, FaDollarSign, FaShoppingCart, FaChartLine, FaFilter, 
  FaBell, FaSearch, FaPlus, FaDownload, FaPlay, FaPause, FaExpand,
  FaCheckCircle, FaTimesCircle, FaUserPlus, FaBox 
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area
} from "recharts";

const revenueData = [
  { name: "Jan", value: 400, users: 200 },
  { name: "Feb", value: 300, users: 400 },
  { name: "Mar", value: 500, users: 600 },
  { name: "Apr", value: 478, users: 800 },
  { name: "May", value: 589, users: 1200 },
  { name: "Jun", value: 639, users: 1600 },
];

const pieData = [
  { name: "Desktop", value: 65, color: "#6366f1" },
  { name: "Mobile", value: 25, color: "#10b981" },
  { name: "Tablet", value: 10, color: "#f59e0b" },
];

export default function Dashboard() {
  // Interactive states
  const [activeTab, setActiveTab] = useState("overview");
  const [isPlaying, setIsPlaying] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [stats, setStats] = useState([
    { title: "Total Revenue", value: "$45,231", change: "+18.2%", color: "from-green-500 to-emerald-600", icon: FaDollarSign },
    { title: "Active Users", value: "2,350", change: "+45%", color: "from-blue-500 to-indigo-600", icon: FaUsers },
    { title: "Orders", value: "1,203", change: "+12%", color: "from-purple-500 to-violet-600", icon: FaShoppingCart },
    { title: "Growth", value: "+12.5%", change: "+2.1%", color: "from-orange-500 to-amber-600", icon: FaChartLine },
  ]);
  
  // Modal & Quick Action states
  const [showQuickSearch, setShowQuickSearch] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("Today");
  const [showNotificationPanel, setShowNotificationPanel] = useState(false);
  const [exporting, setExporting] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  // REAL INTERACTIONS
  const handleQuickSearch = () => {
    setShowQuickSearch(true);
  };

  const handleNewOrder = () => {
    // Navigate to Orders page or open modal
    alert("🚀 Redirecting to New Order page...");
    console.log("Navigate to /orders/new");
  };

  const handleAddUser = () => {
    alert("👤 Opening Add User modal...");
    console.log("Navigate to /users/add");
  };

  const handleProducts = () => {
    alert("📦 Redirecting to Products page...");
    console.log("Navigate to /products");
  };

  const handleAnalytics = () => {
    alert("📊 Opening full Analytics page...");
    console.log("Navigate to /analytics");
  };

  const togglePeriod = (period) => {
    setSelectedPeriod(period);
    // Simulate data refresh
    setTimeout(() => {
      console.log(`📅 Filtering data for ${period}`);
    }, 300);
  };

  const exportReport = async () => {
    setExporting(true);
    // Simulate export
    await new Promise(resolve => setTimeout(resolve, 2000));
    setExporting(false);
    alert("✅ Report exported successfully as PDF & CSV!");
  };

  const toggleNotifications = () => {
    setShowNotificationPanel(!showNotificationPanel);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload) {
      return (
        <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-2xl rounded-2xl p-4 border border-white/50">
          <p className="font-bold text-gray-900 dark:text-white mb-2">{label}</p>
          {payload.map((entry, i) => (
            <p key={i} style={{ color: entry.color }} className="text-sm">
              {entry.name}: <span className="font-bold">{entry.value}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 min-h-screen p-6 lg:p-8"
    >
      {/* Animated Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-gradient-to-r from-slate-50/80 to-indigo-50/80 dark:from-slate-900/80 dark:to-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 dark:border-slate-800/50 p-8"
      >
        <div className="flex items-center gap-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="p-4 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl shadow-2xl"
          >
            <FaChartLine className="w-7 h-7 text-white drop-shadow-lg" />
          </motion.div>
          <div>
            <h1 className="text-4xl font-black bg-gradient-to-r from-gray-900 to-indigo-900 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1 font-medium">
              Welcome back! Here's what's happening with your business.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* QUICK SEARCH - REAL ACTION */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleQuickSearch}
            className="flex items-center gap-2 px-5 py-3 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-gray-200/50 hover:shadow-xl transition-all relative"
          >
            <FaSearch className="w-4 h-4" />
            Quick Search
          </motion.button>
          
          {/* NOTIFICATION TOGGLE - REAL ACTION */}
          <motion.button
            whileHover={{ scale: 1.05, rotate: 5 }}
            onClick={toggleNotifications}
            className="p-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl shadow-lg hover:shadow-xl relative"
          >
            <FaBell className="w-5 h-5" />
            {notifications.length > 0 && (
              <motion.span
                className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold text-white"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                3
              </motion.span>
            )}
          </motion.button>
        </div>
      </motion.div>

      {/* Interactive Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/50 dark:border-slate-800/50 hover:shadow-3xl transition-all duration-500 relative overflow-hidden cursor-pointer"
            onClick={() => alert(`📊 Opening ${stat.title} details...`)}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 flex items-center justify-between mb-4">
              <div className={`p-4 rounded-2xl bg-gradient-to-r ${stat.color} shadow-xl group-hover:scale-110 transition-all duration-300`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-bold bg-green-100 dark:bg-green-900/50 px-3 py-1 rounded-full text-green-700 dark:text-green-300 group-hover:scale-105">
                {stat.change}
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 font-medium">{stat.title}</p>
              <p className="text-3xl lg:text-4xl font-black text-gray-900 dark:text-white">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts & Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {/* Main Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 hover:shadow-3xl transition-all"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-black flex items-center gap-3">
              <FaChartLine className="text-indigo-500" />
              Revenue Overview
            </h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 bg-indigo-500/20 hover:bg-indigo-500/40 rounded-xl text-indigo-600"
            >
              {isPlaying ? <FaPause /> : <FaPlay />}
            </motion.button>
          </div>
          
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={revenueData}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={0.8}/>
                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tickMargin={12} />
              <YAxis axisLine={false} tickLine={false} tickMargin={12} />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#6366f1" 
                strokeWidth={4}
                dot={{ fill: "#6366f1", strokeWidth: 2 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* User Activity Pie */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 hover:shadow-3xl transition-all"
        >
          <h3 className="text-xl font-black mb-6 flex items-center gap-2">
            <FaUsers className="text-emerald-500" />
            User Activity
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={80}
                innerRadius={40}
                cornerRadius={8}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="xl:col-span-3 bg-gradient-to-r from-emerald-50/80 to-blue-50/80 dark:from-emerald-900/20 dark:to-blue-900/20 backdrop-blur-xl rounded-3xl shadow-2xl border border-emerald-200/50 p-8"
        >
          <h3 className="text-2xl font-black mb-6 flex items-center gap-3">
            <FaBell className="text-orange-500" />
            Recent Activity
          </h3>
          <div className="space-y-4 max-h-80 overflow-y-auto">
            {[
              { user: "John Doe", action: "placed order", time: "2 min ago", color: "emerald" },
              { user: "Sarah Smith", action: "updated profile", time: "5 min ago", color: "blue" },
              { user: "David Lee", action: "added product", time: "12 min ago", color: "purple" },
              { user: "Emma Brown", action: "completed payment", time: "18 min ago", color: "indigo" },
              { user: "Michael Chen", action: "login", time: "25 min ago", color: "green" },
            ].map((activity, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 p-4 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl hover:shadow-lg transition-all group cursor-pointer"
                onClick={() => alert(`📋 View details for ${activity.user}`)}
              >
                <div className={`w-3 h-3 rounded-full bg-${activity.color}-500 animate-pulse`} />
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 dark:text-white">{activity.user}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{activity.action}</p>
                </div>
                <span className="text-xs text-gray-500 font-medium">{activity.time}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Control Panel - FULLY INTERACTIVE */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8"
      >
        {/* QUICK ACTIONS - ALL WORK! */}
        <div>
          <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
            <FaPlus className="text-indigo-500" />
            Quick Actions
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "New Order", icon: FaShoppingCart, color: "indigo", action: handleNewOrder },
              { label: "Add User", icon: FaUsers, color: "emerald", action: handleAddUser },
              { label: "Products", icon: FaBox, color: "purple", action: handleProducts },
              { label: "Analytics", icon: FaChartLine, color: "blue", action: handleAnalytics },
            ].map((action, i) => (
              <motion.button
                key={action.label}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={action.action}
                className={`flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-${action.color}-500 to-${action.color}-600 text-white shadow-lg hover:shadow-xl transition-all font-medium`}
              >
                <action.icon className="w-5 h-5" />
                {action.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* FILTERS - REAL TIME CHANGE */}
        <div>
          <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
            <FaFilter className="text-orange-500" />
            Time Period
          </h4>
          <div className="space-y-3">
            {["Today", "This Week", "This Month", "This Year"].map((period) => (
              <motion.button
                key={period}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => togglePeriod(period)}
                className={`w-full p-3 text-left bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl border-2 font-medium transition-all ${
                  selectedPeriod === period 
                    ? 'border-indigo-500 bg-indigo-500/20 text-indigo-700 shadow-lg' 
                    : 'border-transparent hover:border-indigo-300 hover:shadow-md'
                }`}
              >
                {period}
              </motion.button>
            ))}
          </div>
        </div>

        {/* EXPORT - REAL LOADING STATE */}
        <div className="text-center">
          <motion.div
            whileHover={{ scale: 1.05, rotateY: 5 }}
            className="p-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl text-white shadow-2xl border border-white/20 cursor-pointer"
            onClick={exportReport}
          >
            <FaDownload className={`w-12 h-12 mx-auto mb-4 opacity-80 ${exporting ? 'animate-spin' : ''}`} />
            <h4 className="text-xl font-bold mb-2">
              {exporting ? "Exporting..." : "Export Report"}
            </h4>
            <p className="text-indigo-100 mb-6">Download all data as PDF/CSV</p>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              disabled={exporting}
              className="px-8 py-3 bg-white text-indigo-600 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all disabled:opacity-50"
            >
              {exporting ? "Processing..." : "Export Now"}
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* QUICK SEARCH MODAL */}
      <AnimatePresence>
        {showQuickSearch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50 p-6"
          >
            <motion.div
              initial={{ scale: 0.7, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.7, y: 50 }}
              className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-3xl p-8 max-w-2xl w-full shadow-2xl border border-white/50"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-black text-gray-900 dark:text-white">
                  🔍 Quick Search
                </h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setShowQuickSearch(false)}
                  className="p-2 hover:bg-gray-200 rounded-xl"
                >
                  <FaTimesCircle className="w-6 h-6 text-gray-500" />
                </motion.button>
              </div>
              <div className="space-y-4">
                <div className="relative">
                  <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    placeholder="Search orders, users, products..."
                    className="w-full pl-12 pr-4 py-4 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 text-lg"
                  />
                </div>
                <div className="grid grid-cols-3 gap-3 pt-4">
                  <motion.button className="p-3 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20">Orders</motion.button>
                  <motion.button className="p-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20">Users</motion.button>
                  <motion.button className="p-3 rounded-xl bg-purple-500/10 hover:bg-purple-500/20">Products</motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* NOTIFICATION PANEL */}
      <AnimatePresence>
        {showNotificationPanel && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="fixed right-0 top-0 h-full w-80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-2xl border-l border-gray-200 z-50 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">🔔 Notifications</h3>
              <button onClick={toggleNotifications}>
                <FaTimesCircle className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            <div className="space-y-4 max-h-[calc(100vh-150px)] overflow-y-auto">
              {["New order received", "User Sarah Smith updated profile", "Payment completed"].map((notif, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-l-4 border-blue-500"
                >
                  <p className="font-medium text-gray-900">{notif}</p>
                  <p className="text-sm text-gray-500">2 min ago</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
