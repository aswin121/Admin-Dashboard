import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  CartesianGrid,
} from "recharts";
import {
  FaChartLine,
  FaUsers,
  FaShoppingCart,
  FaDollarSign,
  FaFilter,
  FaPlay,
  FaPause,
  FaExpand,
  FaChartBar,
  FaDownload,
  FaBell,
  FaSearch,
  FaPlus,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

// Enhanced animated data
const revenueData = [
  { name: "Jan", revenue: 4200, users: 200 },
  { name: "Feb", revenue: 3800, users: 400 },
  { name: "Mar", revenue: 5800, users: 600 },
  { name: "Apr", revenue: 4900, users: 850 },
  { name: "May", revenue: 6200, users: 1200 },
  { name: "Jun", revenue: 6800, users: 1600 },
  { name: "Jul", revenue: 7500, users: 2000 },
];

const pieData = [
  { name: "Completed", value: 65, color: "#10b981" },
  { name: "Pending", value: 25, color: "#f59e0b" },
  { name: "Cancelled", value: 10, color: "#ef4444" },
];

export default function Analytics() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isPlaying, setIsPlaying] = useState(false);
  const [animateCharts, setAnimateCharts] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [filterPeriod, setFilterPeriod] = useState("30D");

  useEffect(() => {
    const timer = setTimeout(() => setAnimateCharts(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-2xl rounded-2xl p-6 border border-white/50 dark:border-slate-800/50">
          <p className="font-black text-xl text-gray-900 dark:text-white mb-4">
            {label}
          </p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center gap-3 mb-2">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {entry.name}:
              </span>
              <span
                className="font-bold text-lg"
                style={{ color: entry.color }}
              >
                {entry.value}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const QuickStats = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {[
        {
          title: "Total Revenue",
          value: "$68,400",
          change: "+18.2%",
          icon: FaDollarSign,
          color: "from-green-500 to-emerald-600",
        },
        {
          title: "Total Users",
          value: "12.3K",
          change: "+45%",
          icon: FaUsers,
          color: "from-blue-500 to-indigo-600",
        },
        {
          title: "Orders",
          value: "2,847",
          change: "+12%",
          icon: FaShoppingCart,
          color: "from-purple-500 to-violet-600",
        },
        {
          title: "Avg. Conversion",
          value: "3.8%",
          change: "+2.1%",
          icon: FaChartLine,
          color: "from-orange-500 to-amber-600",
        },
      ].map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/50 dark:border-slate-800/50 hover:shadow-3xl transition-all duration-500 relative overflow-hidden cursor-pointer"
            onClick={() => alert(`📊 Opening ${stat.title} details...`)}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10 flex items-center justify-between mb-4">
              <div
                className={`p-4 rounded-2xl bg-gradient-to-r ${stat.color} shadow-xl group-hover:scale-110 transition-all duration-300`}
              >
                <Icon className="w-6 h-6 text-white" />
              </div>
              <motion.span
                className="text-sm font-bold bg-green-100 dark:bg-green-900/50 px-3 py-1 rounded-full text-green-700 dark:text-green-300 group-hover:scale-105"
                whileHover={{ scale: 1.1 }}
              >
                {stat.change}
              </motion.span>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 font-medium">
                {stat.title}
              </p>
              <p className="text-3xl lg:text-4xl font-black text-gray-900 dark:text-white">
                {stat.value}
              </p>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 min-h-screen p-6 lg:p-8"
    >
      {/* Premium Animated Header */}
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
            <h1 className="text-4xl font-black bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent">
              Analytics Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1 font-medium">
              Real-time insights & business trends
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-2 px-6 py-3 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-gray-200/50 hover:shadow-xl font-semibold transition-all"
          >
            {isPlaying ? (
              <FaPause className="w-4 h-4" />
            ) : (
              <FaPlay className="w-4 h-4" />
            )}
            Live Data
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            className="p-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl shadow-lg hover:shadow-xl"
            onClick={() => setShowExport(true)}
          >
            <FaDownload className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.div>

      {/* Interactive Stats */}
      <QuickStats />

      {/* Premium Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 xl:col-span-1 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 hover:shadow-3xl transition-all"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <h3 className="text-2xl font-black flex items-center gap-3 bg-gradient-to-r from-gray-900 to-indigo-900 bg-clip-text text-transparent">
              <FaChartLine className="text-indigo-500 w-7 h-7" />
              Revenue Trends
            </h3>
            <div className="flex items-center gap-2 text-sm bg-white/60 dark:bg-slate-800/60 px-4 py-2 rounded-xl backdrop-blur-sm">
              <span className="font-semibold text-indigo-600">
                {filterPeriod}
              </span>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            </div>
          </div>

          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={revenueData}>
              <defs>
                <linearGradient
                  id="revenueGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="hsl(var(--muted)/0.1)" />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tickMargin={12}
              />
              <YAxis axisLine={false} tickLine={false} tickMargin={12} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#6366f1"
                strokeWidth={5}
                dot={{ fill: "#6366f1", strokeWidth: 3 }}
                activeDot={{ r: 10 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Order Status Pie */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 hover:shadow-3xl transition-all relative overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              backgroundSize: ["400% 400%", "400% 400%", "400% 400%"],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />

          <div className="relative z-10">
            <h3 className="text-2xl font-black mb-8 flex items-center gap-3 bg-gradient-to-r from-gray-900 to-orange-900 bg-clip-text text-transparent">
              <FaChartBar className="text-orange-500 w-7 h-7" />
              Order Status
            </h3>

            <div className="flex flex-col items-center space-y-8">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    innerRadius={50}
                    cornerRadius={10}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>

              <div className="grid grid-cols-3 gap-4 w-full">
                {pieData.map((entry, index) => (
                  <motion.div
                    key={entry.name}
                    whileHover={{ scale: 1.05, y: -4 }}
                    className="flex items-center gap-3 p-4 rounded-2xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-gray-200/50 shadow-lg hover:shadow-xl cursor-pointer transition-all"
                    onClick={() => alert(`📊 Filter by ${entry.name} orders`)}
                  >
                    <div
                      className="w-5 h-5 rounded-full shadow-lg"
                      style={{ backgroundColor: entry.color }}
                    />
                    <span className="font-bold text-gray-900 dark:text-white flex-1">
                      {entry.name}
                    </span>
                    <span className="font-black text-xl">{entry.value}%</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Analytics Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 xl:grid-cols-3 gap-8"
      >
        {/* User Growth */}
        <motion.div
          whileHover={{ y: -5, scale: 1.01 }}
          className="bg-gradient-to-br from-emerald-50/80 to-green-50/80 dark:from-emerald-900/30 dark:to-green-900/30 backdrop-blur-xl rounded-3xl shadow-2xl border border-emerald-200/50 p-8 hover:shadow-3xl transition-all"
        >
          <h3 className="text-2xl font-black mb-8 flex items-center gap-3 bg-gradient-to-r from-emerald-900 to-green-900 bg-clip-text text-transparent">
            <FaUsers className="text-emerald-500 w-7 h-7" />
            User Growth
          </h3>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={revenueData} margin={{ left: -20 }}>
              <defs>
                <linearGradient id="userGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                vertical={false}
                strokeDasharray="3 3"
                stroke="hsl(var(--muted)/0.2)"
              />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="users"
                stroke="#10b981"
                strokeWidth={4}
                fillOpacity={1}
                fill="url(#userGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="xl:col-span-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 hover:shadow-3xl transition-all"
        >
          <h3 className="text-2xl font-black mb-10 flex items-center gap-3 bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
            📊 Key Performance Metrics
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                label: "Avg Order Value",
                value: "$24.10",
                trend: "+8.3%",
                color: "emerald",
              },
              {
                label: "Bounce Rate",
                value: "32%",
                trend: "-4.2%",
                color: "orange",
              },
              {
                label: "Page Views",
                value: "45.2K",
                trend: "+22%",
                color: "blue",
              },
              {
                label: "Retention",
                value: "78%",
                trend: "+3.1%",
                color: "purple",
              },
            ].map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -4 }}
                className={`group p-8 rounded-2xl border backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all cursor-pointer ${
                  metric.trend.startsWith("+")
                    ? "bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/30 border-emerald-200/50"
                    : "bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/30 border-orange-200/50"
                }`}
                onClick={() => alert(`📈 View ${metric.label} analytics`)}
              >
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 font-medium group-hover:text-gray-800">
                  {metric.label}
                </p>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-black text-gray-900 dark:text-white">
                    {metric.value}
                  </span>
                  <motion.span
                    className={`text-lg font-bold px-3 py-1 rounded-xl ${
                      metric.trend.startsWith("+")
                        ? "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300"
                        : "bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300"
                    }`}
                    whileHover={{ scale: 1.1 }}
                  >
                    {metric.trend}
                  </motion.span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Export Modal */}
      <AnimatePresence>
        {showExport && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-6"
          >
            <motion.div
              initial={{ scale: 0.7, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.7, y: 50 }}
              className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-3xl p-10 max-w-md w-full shadow-2xl border border-white/50"
            >
              <div className="text-center mb-8">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 1 }}
                  className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl p-5"
                >
                  <FaDownload className="w-10 h-10 text-white" />
                </motion.div>
                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">
                  Export Analytics
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Download comprehensive report as PDF & CSV
                </p>
              </div>
              <div className="space-y-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  className="w-full px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all"
                  onClick={() => {
                    setShowExport(false);
                    alert("✅ Analytics report exported successfully!");
                  }}
                >
                  Export Now
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  className="w-full px-8 py-4 bg-gray-100 dark:bg-slate-800 rounded-2xl font-semibold text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-slate-700 transition-all"
                  onClick={() => setShowExport(false)}
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
