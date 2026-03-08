import { useState } from "react";
import { 
  FaCog, FaUser, FaBell, FaLock, FaPalette, FaCheck, FaTimes, 
  FaEye, FaEyeSlash, FaCopy, FaShieldAlt, FaMoon, FaSun 
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const settingsSections = [
  { id: "profile", title: "Profile", icon: FaUser, description: "Update your account information" },
  { id: "notifications", title: "Notifications", icon: FaBell, description: "Manage notification preferences" },
  { id: "security", title: "Security", icon: FaLock, description: "Protect your account" },
  { id: "appearance", title: "Appearance", icon: FaPalette, description: "Customize your experience" },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState({
    name: "Aswin Maria Antony",
    email: "aswin@example.com",
    notifications: { email: true, push: false, sms: true },
    password: "",
    currentPassword: "",
    theme: "light",
    language: "English",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [saving, setSaving] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const sidebarVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.2 }
    }
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSaving(false);
    alert("✅ Profile updated successfully!");
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(formData.email);
    // Visual feedback handled by animation
  };

  const toggleTheme = () => {
    setFormData(prev => ({
      ...prev,
      theme: prev.theme === "light" ? "dark" : "light"
    }));
  };

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl border-4 border-white/20"
              >
                <FaUser className="w-12 h-12 text-white drop-shadow-lg" />
              </motion.div>
              <h2 className="text-3xl font-black bg-gradient-to-r from-gray-900 to-indigo-900 bg-clip-text text-transparent">
                {formData.name}
              </h2>
            </div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div>
                <label className="block text-lg font-bold text-gray-900 dark:text-white mb-4">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-6 py-4 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-2 border-gray-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-indigo-500/30 focus:border-indigo-500 text-xl font-semibold transition-all duration-300 shadow-inner hover:shadow-md"
                />
              </div>

              <div className="relative">
                <label className="block text-lg font-bold text-gray-900 dark:text-white mb-4">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-14 pr-12 py-4 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-2 border-gray-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-emerald-500/30 focus:border-emerald-500 text-xl font-semibold transition-all duration-300 shadow-inner hover:shadow-md"
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-emerald-500 transition-colors"
                    onClick={handleCopyEmail}
                  >
                    <FaCopy className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSaveProfile}
                disabled={saving}
                className="w-full px-8 py-5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl font-black text-xl shadow-2xl hover:shadow-3xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <FaCog className="w-6 h-6 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <FaCheck className="w-6 h-6" />
                    Save Changes
                  </>
                )}
              </motion.button>
            </motion.div>
          </motion.div>
        );

      case "notifications":
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-black bg-gradient-to-r from-gray-900 to-emerald-900 bg-clip-text text-transparent mb-8">
              Notification Preferences
            </h3>
            
            <div className="space-y-4">
              {[
                { key: "email", label: "Email Notifications", description: "Order confirmations, receipts, and updates" },
                { key: "push", label: "Push Notifications", description: "Real-time alerts on mobile" },
                { key: "sms", label: "SMS Alerts", description: "Critical account notifications" },
              ].map((notification) => (
                <motion.div
                  key={notification.key}
                  whileHover={{ scale: 1.02 }}
                  className="group p-6 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 hover:shadow-xl transition-all duration-300"
                >
                  <label className="flex items-center justify-between cursor-pointer">
                    <div>
                      <p className="font-semibold text-lg text-gray-900 dark:text-white group-hover:text-indigo-600">
                        {notification.label}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {notification.description}
                      </p>
                    </div>
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={formData.notifications[notification.key]}
                        onChange={(e) => setFormData({
                          ...formData,
                          notifications: {
                            ...formData.notifications,
                            [notification.key]: e.target.checked
                          }
                        })}
                        className="sr-only"
                      />
                      <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                    </div>
                  </label>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      case "security":
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-black bg-gradient-to-r from-gray-900 to-red-900 bg-clip-text text-transparent mb-8">
              Security Settings
            </h3>
            
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="p-6 bg-gradient-to-r from-orange-50 to-red-50/50 dark:from-orange-900/20 dark:to-red-900/20 backdrop-blur-sm rounded-2xl border border-orange-200/50"
            >
              <h4 className="font-bold text-xl mb-4 flex items-center gap-2 text-gray-900">
                <FaShieldAlt className="text-orange-500" />
                2FA Status: Enabled ✅
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                Two-factor authentication is active on your account
              </p>
            </motion.div>

            <div className="space-y-4">
              <div>
                <label className="block text-lg font-bold text-gray-900 dark:text-white mb-4">
                  Change Password
                </label>
                <div className="space-y-4">
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Current Password"
                      className="w-full px-6 py-4 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-2 border-gray-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-orange-500/30 focus:border-orange-500 pr-14 text-lg transition-all duration-300 shadow-inner"
                    />
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-orange-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </motion.button>
                  </div>
                  <input
                    type="password"
                    placeholder="New Password"
                    className="w-full px-6 py-4 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-2 border-gray-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-orange-500/30 focus:border-orange-500 text-lg transition-all duration-300 shadow-inner"
                  />
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                className="w-full px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all"
              >
                Update Password
              </motion.button>
            </div>
          </motion.div>
        );

      case "appearance":
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-black bg-gradient-to-r from-gray-900 to-purple-900 bg-clip-text text-transparent mb-8">
              Customize Appearance
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Theme Toggle */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl border border-gray-200/50 group"
              >
                <label className="flex items-center justify-between cursor-pointer">
                  <div>
                    <p className="font-bold text-xl text-gray-900 dark:text-white group-hover:text-purple-600">
                      Theme Mode
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Switch between light and dark themes
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleTheme}
                    className="p-3 rounded-2xl bg-gradient-to-r from-gray-200 to-gray-300 dark:from-slate-700 dark:to-slate-600 hover:shadow-lg transition-all"
                  >
                    {formData.theme === "light" ? <FaMoon /> : <FaSun />}
                  </motion.button>
                </label>
              </motion.div>

              {/* Language */}
              <div className="p-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl border border-gray-200/50">
                <label className="block text-lg font-bold text-gray-900 dark:text-white mb-4">
                  Language
                </label>
                <select
                  value={formData.language}
                  onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                  className="w-full px-6 py-4 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-2 border-gray-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-purple-500/30 focus:border-purple-500 text-lg font-semibold transition-all"
                >
                  <option>English</option>
                  <option>हिंदी</option>
                  <option>தமிழ்</option>
                  <option>Français</option>
                  <option>Español</option>
                </select>
              </div>
            </div>
          </motion.div>
        );

      default:
        return (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-20"
          >
            <FaCog className="w-24 h-24 text-gray-300 mx-auto mb-6 animate-spin" />
            <h3 className="text-2xl font-bold text-gray-500 mb-2">Coming Soon</h3>
            <p className="text-gray-400">This section is under development</p>
          </motion.div>
        );
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
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
            <FaCog className="w-7 h-7 text-white drop-shadow-lg" />
          </motion.div>
          <div>
            <h1 className="text-4xl font-black bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent">
              Settings
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1 font-medium">
              Customize your account and preferences
            </p>
          </div>
        </div>
      </motion.div>

      {/* Main Layout */}
      <motion.div
        variants={sidebarVariants}
        className="grid grid-cols-1 lg:grid-cols-4 gap-8"
      >
        {/* Animated Sidebar */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 dark:border-slate-800/50 p-8 hover:shadow-3xl transition-all duration-500"
        >
          <div className="space-y-2">
            {settingsSections.map((section, index) => {
              const Icon = section.icon;
              const isActive = activeTab === section.id;
              
              return (
                <motion.button
                  key={section.id}
                  variants={{
                    hidden: { x: -20, opacity: 0 },
                    visible: { x: 0, opacity: 1 },
                  }}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ 
                    scale: 1.02, 
                    backgroundColor: isActive ? "#eef2ff" : "#f8fafc",
                    x: 5 
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab(section.id)}
                  className={`group w-full flex items-center gap-4 p-5 rounded-2xl transition-all duration-300 relative overflow-hidden ${
                    isActive 
                      ? "bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border-2 border-indigo-200/50 shadow-lg" 
                      : "hover:bg-indigo-50/50 border border-transparent hover:shadow-md"
                  }`}
                >
                  <motion.div
                    animate={{ scale: isActive ? 1.2 : 1 }}
                    className={`p-3 rounded-xl ${isActive ? 'bg-indigo-500 shadow-lg shadow-indigo-500/25' : 'bg-indigo-100/50 group-hover:bg-indigo-200/50 dark:bg-slate-800/50'}`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700'}`} />
                  </motion.div>
                  
                  <div className="flex-1 text-left">
                    <span className={`font-bold text-lg ${isActive ? 'text-indigo-700 dark:text-indigo-300' : 'text-gray-800 dark:text-white group-hover:text-indigo-600'}`}>
                      {section.title}
                    </span>
                    <p className={`text-sm opacity-75 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'}`}>
                      {section.description}
                    </p>
                  </div>
                  
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute right-4 w-2 h-2 bg-indigo-500 rounded-full shadow-lg"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Content Area */}
        <motion.div 
          layout
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-3"
        >
          <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 dark:border-slate-800/50 p-8 lg:p-10 min-h-[600px] hover:shadow-3xl transition-all duration-500">
            <AnimatePresence mode="wait">
              {renderContent()}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
