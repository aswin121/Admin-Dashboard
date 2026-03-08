import { useMemo, useState, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import { 
  FaUsers, FaEdit, FaTrash, FaPlus, FaTimes, FaSearch, FaCheck, 
  FaUserPlus, FaShieldAlt, FaEnvelope 
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const defaultUsers = [
  { id: 1, name: "John Doe", email: "john@company.com", role: "Admin", status: "Active", lastLogin: "2026-03-07" },
  { id: 2, name: "Sarah Smith", email: "sarah@company.com", role: "Editor", status: "Active", lastLogin: "2026-03-06" },
  { id: 3, name: "David Lee", email: "david@company.com", role: "User", status: "Active", lastLogin: "2026-03-05" },
  { id: 4, name: "Emma Brown", email: "emma@company.com", role: "User", status: "Inactive", lastLogin: "2026-02-28" },
  { id: 5, name: "Michael Chen", email: "michael@company.com", role: "Admin", status: "Active", lastLogin: "2026-03-08" },
  { id: 6, name: "Lisa Wilson", email: "lisa@company.com", role: "Editor", status: "Active", lastLogin: "2026-03-07" },
  { id: 7, name: "John Doe", email: "john@company.com", role: "Admin", status: "Active", lastLogin: "2026-03-07" },
  { id: 8, name: "Sarah Smith", email: "sarah@company.com", role: "Editor", status: "Active", lastLogin: "2026-03-06" },
  { id: 9, name: "David Lee", email: "david@company.com", role: "User", status: "Active", lastLogin: "2026-03-05" },
  { id: 10, name: "Emma Brown", email: "emma@company.com", role: "User", status: "Inactive", lastLogin: "2026-02-28" },
  { id: 11, name: "Michael Chen", email: "michael@company.com", role: "Admin", status: "Active", lastLogin: "2026-03-08" },
  { id: 12, name: "Lisa Wilson", email: "lisa@company.com", role: "Editor", status: "Active", lastLogin: "2026-03-07" },
];

const rowVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.05,
      duration: 0.4,
      type: "spring",
      stiffness: 300,
      damping: 25,
    },
  }),
  hover: { 
    y: -4, 
    scale: 1.01, 
    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
    backgroundColor: "hsl(var(--primary)/0.08)",
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.2,
    },
  },
};

const statusColors = {
  Active: "bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800",
  Inactive: "bg-orange-100 dark:bg-orange-900/50 text-orange-800 dark:text-orange-300 border-orange-200 dark:border-orange-800",
};

export default function Users() {
  const [data, setData] = useState(defaultUsers);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 8 });
  
  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  
  const [formData, setFormData] = useState({
    name: "", email: "", role: "", status: "Active",
  });

  const columns = useMemo(() => [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "email", header: "Email" },
    { 
      accessorKey: "role", 
      header: "Role",
      cell: (info) => (
        <span className={`px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r ${
          info.getValue() === "Admin" ? "from-purple-500 to-indigo-600 text-white" :
          info.getValue() === "Editor" ? "from-emerald-500 to-teal-600 text-white" :
          "from-slate-200 dark:from-slate-700 text-slate-800 dark:text-slate-200"
        }`}>
          {info.getValue()}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (info) => (
        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${statusColors[info.getValue()]}`}>
          {info.getValue()}
        </span>
      ),
    },
    {
      accessorKey: "lastLogin",
      header: "Last Login",
    },
    {
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
          <motion.button 
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleEdit(row.original)}
            className="p-2 text-blue-500 hover:text-blue-600 bg-blue-50/50 hover:bg-blue-100 rounded-xl backdrop-blur-sm border border-blue-100 hover:border-blue-200 transition-all duration-200"
            title="Edit"
          >
            <FaEdit className="w-4 h-4" />
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleDelete(row.original)}
            className="p-2 text-red-500 hover:text-red-600 bg-red-50/50 hover:bg-red-100 rounded-xl backdrop-blur-sm border border-red-100 hover:border-red-200 transition-all duration-200"
            title="Delete"
          >
            <FaTrash className="w-4 h-4" />
          </motion.button>
        </div>
      ),
    },
  ], []);

  const table = useReactTable({
    data,
    columns,
    state: { globalFilter, pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handleAddUser = (e) => {
    e.preventDefault();
    const newUser = {
      id: Date.now(),
      ...formData,
      lastLogin: new Date().toISOString().split('T')[0],
    };
    setData([newUser, ...data]);
    setIsAddModalOpen(false);
    setFormData({ name: "", email: "", role: "", status: "Active" });
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    });
    setIsEditModalOpen(true);
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();
    setData(data.map((user) =>
      user.id === selectedUser.id
        ? { ...selectedUser, ...formData }
        : user
    ));
    setIsEditModalOpen(false);
    setSelectedUser(null);
    setFormData({ name: "", email: "", role: "", status: "Active" });
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    setData(data.filter((user) => user.id !== selectedUser.id));
    setDeleteConfirmOpen(false);
    setSelectedUser(null);
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
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 p-6 bg-gradient-to-r from-slate-50/80 to-blue-50/80 dark:from-slate-900/80 dark:to-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 dark:border-slate-800/50"
      >
        <motion.div className="flex items-center gap-4" whileHover={{ scale: 1.02 }}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="p-4 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 rounded-2xl shadow-2xl"
          >
            <FaUsers className="w-7 h-7 text-white drop-shadow-lg" />
          </motion.div>
          <div>
            <h1 className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent drop-shadow-lg">
              Users Management
            </h1>
            <motion.p 
              className="text-gray-600 dark:text-gray-400 mt-1 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Manage your team ({data.length} users)
            </motion.p>
          </div>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsAddModalOpen(true)}
          className="group bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-2xl hover:shadow-3xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 flex items-center gap-3 backdrop-blur-sm border border-white/20"
        >
          <FaUserPlus className="group-hover:scale-110 transition-transform" />
          Add New User
        </motion.button>
      </motion.div>

      {/* Advanced Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-6 lg:p-8 rounded-3xl shadow-2xl border border-white/50 dark:border-slate-800/50"
      >
        <div className="relative flex-1 group">
          <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-all duration-200 w-5 h-5" />
          <input
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(String(e.target.value))}
            placeholder="🔍 Search users by name, email, or role..."
            className="w-full pl-14 pr-6 py-4 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-gray-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-transparent transition-all duration-300 text-lg placeholder-gray-500"
          />
        </div>
      </motion.div>

      {/* Animated Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 dark:border-slate-800/50 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <motion.tr 
                  key={headerGroup.id} 
                  className="bg-gradient-to-r from-slate-50 to-blue-50/50 dark:from-slate-800/50 dark:to-slate-700/50 border-b-2 border-blue-100 dark:border-slate-700 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {headerGroup.headers.map((header) => (
                    <motion.th
                      key={header.id}
                      className="p-6 text-left font-black text-xl text-gray-900 dark:text-white tracking-tight cursor-pointer group hover:bg-blue-100/50 dark:hover:bg-slate-700/50 rounded-t-xl transition-all duration-300 relative overflow-hidden"
                      onClick={header.column.getToggleSortingHandler()}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center gap-2">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        <motion.span
                          className="text-blue-500 text-lg"
                          animate={{ rotateX: header.column.getIsSorted() ? 360 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {header.column.getIsSorted() === "asc" && "↑"}
                          {header.column.getIsSorted() === "desc" && "↓"}
                        </motion.span>
                      </div>
                    </motion.th>
                  ))}
                </motion.tr>
              ))}
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <AnimatePresence>
                {table.getRowModel().rows.map((row, index) => (
                  <motion.tr
                    key={row.id}
                    variants={rowVariants}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    className="group hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50/50 dark:hover:from-slate-800/70 dark:hover:to-slate-700/70 backdrop-blur-sm border-b border-slate-100/50 dark:border-slate-800/50 transition-all duration-300"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <motion.td 
                        key={cell.id} 
                        className="p-6 font-medium text-gray-900 dark:text-white relative"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.02 }}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </motion.td>
                    ))}
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {table.getRowModel().rows.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-20 text-center"
          >
            <motion.div 
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-slate-800 dark:to-slate-700 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl p-6"
            >
              <FaUsers className="w-12 h-12 text-blue-500 dark:text-blue-400" />
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">
              No Users Found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              Try adjusting your search
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Premium Pagination */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 dark:from-slate-900/80 dark:to-slate-800/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-blue-200/50 dark:border-slate-800/50 flex flex-col lg:flex-row items-center justify-between gap-6"
      >
        <motion.div 
          className="text-lg font-semibold text-gray-700 dark:text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()} 
          • Showing {table.getRowModel().rows.length} of {data.length} users
        </motion.div>
        
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="group flex items-center gap-2 px-6 py-3 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl font-semibold text-gray-800 dark:text-white shadow-lg hover:shadow-xl border border-gray-200/50 dark:border-slate-700/50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </motion.button>
          
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl font-bold text-lg shadow-2xl"
          >
            Page {table.getState().pagination.pageIndex + 1}
          </motion.div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="group flex items-center gap-2 px-6 py-3 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl font-semibold text-gray-800 dark:text-white shadow-lg hover:shadow-xl border border-gray-200/50 dark:border-slate-700/50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300"
          >
            Next
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>
      </motion.div>

      {/* Modals */}
      <AnimatePresence mode="wait">
        {isAddModalOpen && (
          <UserModal
            key="add"
            title="👤 Add New User"
            onClose={() => {
              setIsAddModalOpen(false);
              setFormData({ name: "", email: "", role: "", status: "Active" });
            }}
            onSubmit={handleAddUser}
            formData={formData}
            setFormData={setFormData}
          />
        )}
        {isEditModalOpen && selectedUser && (
          <UserModal
            key="edit"
            title="✏️ Edit User"
            onClose={() => {
              setIsEditModalOpen(false);
              setFormData({ name: "", email: "", role: "", status: "Active" });
              setSelectedUser(null);
            }}
            onSubmit={handleUpdateUser}
            formData={formData}
            setFormData={setFormData}
          />
        )}
      </AnimatePresence>

      {/* Delete Confirmation */}
      <AnimatePresence>
        {deleteConfirmOpen && selectedUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-3xl p-8 max-w-md w-full shadow-2xl border border-white/50 dark:border-slate-800/50"
            >
              <div className="text-center mb-8">
                <motion.div 
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 0.5 }}
                  className="w-20 h-20 bg-gradient-to-br from-red-500 to-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl p-5"
                >
                  <FaTrash className="w-10 h-10 text-white" />
                </motion.div>
                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-3">
                  Delete User?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  Are you sure you want to delete <br />
                  <span className="font-bold text-blue-600 dark:text-blue-400">"{selectedUser.name}"</span>?
                </p>
              </div>
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setDeleteConfirmOpen(false)}
                  className="flex-1 px-6 py-4 bg-gray-100 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl font-semibold text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-slate-700 transition-all duration-200 border border-gray-200/50"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={confirmDelete}
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-2xl font-bold shadow-xl hover:shadow-2xl hover:from-red-600 hover:to-rose-600 transition-all duration-200"
                >
                  Delete User
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// User Modal Component
function UserModal({ title, onClose, onSubmit, formData, setFormData }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-6"
    >
      <motion.div
        initial={{ scale: 0.7, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.7, opacity: 0, y: 50 }}
        className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-3xl p-8 max-w-lg w-full shadow-2xl border border-white/50 dark:border-slate-800/50 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
            {title}
          </h2>
          <motion.button 
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-3 hover:bg-gray-200 dark:hover:bg-slate-800 rounded-2xl transition-all duration-200"
          >
            <FaTimes className="w-6 h-6 text-gray-500" />
          </motion.button>
        </div>
        
        <form onSubmit={onSubmit} className="space-y-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-6 py-4 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-2 border-gray-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 text-lg font-medium transition-all duration-300 shadow-inner hover:shadow-md"
              required
            />
          </motion.div>
          
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Email Address
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-14 pr-6 py-4 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-2 border-gray-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-emerald-500/30 focus:border-emerald-500 text-lg font-medium transition-all duration-300 shadow-inner hover:shadow-md"
                required
              />
            </div>
          </motion.div>
          
          <motion.div className="grid grid-cols-2 gap-6" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <div>
              <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Role
              </label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-6 py-4 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-2 border-gray-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-purple-500/30 focus:border-purple-500 text-lg font-medium transition-all duration-300 shadow-inner hover:shadow-md"
                required
              >
                <option value="">Select Role</option>
                <option value="Admin">🛡️ Admin</option>
                <option value="Editor">✏️ Editor</option>
                <option value="User">👤 User</option>
              </select>
            </div>
            <div>
              <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-6 py-4 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-2 border-gray-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-orange-500/30 focus:border-orange-500 text-lg font-medium transition-all duration-300 shadow-inner hover:shadow-md"
                required
              >
                <option value="Active">✅ Active</option>
                <option value="Inactive">⏸️ Inactive</option>
              </select>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex gap-4 pt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={onClose}
              className="flex-1 px-8 py-5 bg-gray-100 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl font-bold text-xl text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-slate-700 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200/50"
            >
              Cancel
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="flex-1 px-8 py-5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl hover:from-blue-600 hover:via-indigo-600 hover:to-purple-600 transition-all duration-300 flex items-center justify-center gap-3"
            >
              <FaCheck className="w-6 h-6" />
              {title === "✏️ Edit User" ? "Update User" : "Save User"}
            </motion.button>
          </motion.div>
        </form>
      </motion.div>
    </motion.div>
  );
}
