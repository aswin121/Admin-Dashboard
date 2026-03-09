import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Users, Package, BarChart3, Settings,
  ChevronRight, ChevronLeft, User, Crown
} from "lucide-react";

export default function Sidebar({ collapsed: externalCollapsed, onToggle }) {
  // const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
 const isCollapsed = externalCollapsed;
  const handleToggle = () => {
    if (onToggle) onToggle(); // 🔥 CALL PARENT CALLBACK
  };

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/Admin-Dashboard/dashboard", color: "from-indigo-500 to-purple-600" },
    { name: "Users", icon: Users, path: "/Admin-Dashboard/users", color: "from-emerald-500 to-teal-600" },
    { name: "Products", icon: Package, path: "/Admin-Dashboard/products", color: "from-orange-500 to-amber-600" },
    { name: "Analytics", icon: BarChart3, path: "/Admin-Dashboard/analytics", color: "from-blue-500 to-indigo-600" },
    { name: "Settings", icon: Settings, path: "/Admin-Dashboard/settings", color: "from-purple-500 to-violet-600" },
  ];

  const sidebarVariants = {
    expanded: { width: 240 },
    collapsed: { width: 72 }
  };

  return (
    <motion.aside
      variants={sidebarVariants}
      animate={isCollapsed ? "collapsed" : "expanded"}
      initial={false}
      className="fixed left-0 top-0 h-screen bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-2xl border-r border-white/50 dark:border-slate-800/50 flex flex-col z-50"
    >
      {/* Header - Fixed height */}
      <motion.div 
        layout
        className="flex items-center justify-between p-3 pl-2 pr-1 border-b border-white/30 dark:border-slate-800/50 backdrop-blur-sm h-16 flex-shrink-0"
      >
        {/* Logo */}
        <motion.div layout className="flex items-center gap-1.5" whileHover={{ scale: 1.02 }}>
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="p-2 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-lg shadow-lg border border-white/30 flex-shrink-0"
          >
            <LayoutDashboard className="w-4 h-4 text-white" />
          </motion.div>
          
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8, width: 0 }}
                animate={{ opacity: 1, scale: 1, width: "auto" }}
                exit={{ opacity: 0, scale: 0.8, width: 0 }}
                className="overflow-hidden"
              >
                <h1 className="text-lg font-black bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent whitespace-nowrap">
                  AJU TWILLS
                </h1>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Arrow Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
           onClick={handleToggle} 
          className="p-1.5 ml-1 rounded-lg bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/50 shadow-md hover:shadow-lg hover:bg-indigo-500/30 transition-all flex-shrink-0 z-10"
        >
          {isCollapsed ? (
            <ChevronRight size={16} className="text-gray-800 dark:text-gray-200 ml-0.5" />
          ) : (
            <ChevronLeft size={16} className="text-gray-800 dark:text-gray-200" />
          )}
        </motion.button>
      </motion.div>

      {/* Navigation - NO SCROLLING */}
      <nav className="flex-1 flex flex-col px-1.5 gap-1 py-2">
        <AnimatePresence>
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ delay: index * 0.03 }}
              >
                <NavLink
                  to={item.path}
                  className={({ isActive: linkActive }) =>
                    `group relative flex items-center gap-2.5 p-2.5 rounded-lg backdrop-blur-sm border border-transparent hover:border-white/50 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden font-medium text-xs cursor-pointer no-underline ${
                      linkActive || isActive
                        ? "bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border-indigo-200/60 shadow-md"
                        : "text-gray-700 dark:text-gray-300 hover:bg-indigo-50/60 hover:text-indigo-600"
                    }`
                  }
                >
                  <motion.div 
                    className={`p-2 rounded-md shadow-sm flex-shrink-0 transition-all ${
                      location.pathname === item.path
                        ? `bg-gradient-to-r ${item.color}`
                        : "bg-white/80 dark:bg-slate-800/80 hover:bg-indigo-100/70"
                    }`}
                    whileHover={{ scale: 1.06 }}
                  >
                    <Icon 
                      size={14} 
                      className={`transition-all ${
                        location.pathname === item.path ? "text-white" : "text-indigo-600 group-hover:text-indigo-700"
                      }`} 
                    />
                  </motion.div>

                  <AnimatePresence mode="wait">
                    {!isCollapsed && (
                      <motion.span 
                        layout
                        className="flex-1 min-w-0"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {location.pathname === item.path && (
                    <motion.div
                      layoutId="sidebarIndicator"
                      className="w-2 h-2 bg-indigo-500 rounded-full shadow-sm flex-shrink-0"
                    />
                  )}
                </NavLink>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </nav>

      {/* Profile Footer - Fixed height */}
      <motion.div layout className="p-3 border-t border-white/30 backdrop-blur-sm h-20 flex-shrink-0">
        <motion.div 
          layout
          className="flex items-center gap-2.5 group cursor-pointer rounded-xl p-2.5 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/50 hover:border-indigo-200/60 hover:shadow-lg transition-all"
          whileHover={{ scale: 1.02 }}
        >
          <motion.div
            animate={{ rotate: [0, 6, -6, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="relative flex-shrink-0"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-lg border-2 border-white/40 flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <motion.div
              className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full shadow-sm flex items-center justify-center"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            >
              <Crown className="w-2 h-2 text-white" />
            </motion.div>
          </motion.div>

          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="flex-1 min-w-0"
              >
                <p className="font-semibold text-sm text-gray-900 dark:text-white truncate">Antony Aswin</p>
                <p className="text-xs bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Super Admin
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </motion.aside>
  );
}
