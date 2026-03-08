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
  FaBox, FaEdit, FaTrash, FaPlus, FaTimes, FaSearch, FaCheck, 
  FaSpinner, FaFilter, FaCalendarAlt, FaDollarSign, FaTag 
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const defaultProducts = [
  { id: 1, name: "iPhone 15 Pro", price: 999, stock: 25, category: "Electronics" },
  { id: 2, name: "MacBook Pro", price: 1999, stock: 12, category: "Electronics" },
  { id: 3, name: "AirPods Pro", price: 249, stock: 45, category: "Electronics" },
  { id: 4, name: "Nike Air Max", price: 129, stock: 30, category: "Footwear" },
  { id: 5, name: "Adidas", price: 110, stock: 23, category: "Footwear" },
  { id: 6, name: "Red Tape", price: 88, stock: 20, category: "Footwear" },
  { id: 7, name: "iPhone 15 Pro", price: 999, stock: 25, category: "Electronics" },
  { id: 8, name: "MacBook Pro", price: 1999, stock: 12, category: "Electronics" },
  { id: 9, name: "AirPods Pro", price: 249, stock: 45, category: "Electronics" },
  { id: 10, name: "Nike Air Max", price: 129, stock: 30, category: "Footwear" },
  { id: 11, name: "Adidas", price: 110, stock: 23, category: "Footwear" },
  { id: 12, name: "Red Tape", price: 88, stock: 20, category: "Footwear" },
  { id: 13, name: "iPhone 15 Pro", price: 999, stock: 25, category: "Electronics" },
  { id: 14, name: "MacBook Pro", price: 1999, stock: 12, category: "Electronics" },
  { id: 15, name: "AirPods Pro", price: 249, stock: 45, category: "Electronics" },
  { id: 16, name: "Nike Air Max", price: 129, stock: 30, category: "Footwear" },
  { id: 17, name: "Adidas", price: 110, stock: 23, category: "Footwear" },
  { id: 18, name: "Red Tape", price: 88, stock: 20, category: "Footwear" },
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

export default function Products() {
  const [data, setData] = useState(defaultProducts);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [isAnimating, setIsAnimating] = useState(false);
  
  // 🔥 NEW FILTER STATES
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
    minStock: "",
    maxStock: "",
  });
  
  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  const [formData, setFormData] = useState({
    name: "", price: "", stock: "", category: "",
  });

  // Animate on mount
  useEffect(() => {
    setIsAnimating(true);
  }, []);

  // 🔥 FILTER LOGIC
  const filteredData = useMemo(() => {
    let filtered = data;

    if (filters.category) {
      filtered = filtered.filter(product => 
        product.category === filters.category
      );
    }
    
    if (filters.minPrice) {
      filtered = filtered.filter(product => 
        product.price >= Number(filters.minPrice)
      );
    }
    
    if (filters.maxPrice) {
      filtered = filtered.filter(product => 
        product.price <= Number(filters.maxPrice)
      );
    }
    
    if (filters.minStock) {
      filtered = filtered.filter(product => 
        product.stock >= Number(filters.minStock)
      );
    }
    
    if (filters.maxStock) {
      filtered = filtered.filter(product => 
        product.stock <= Number(filters.maxStock)
      );
    }

    if (globalFilter) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(globalFilter.toLowerCase()) ||
        product.category.toLowerCase().includes(globalFilter.toLowerCase())
      );
    }

    return filtered;
  }, [data, filters, globalFilter]);

  const columns = useMemo(() => [
    { accessorKey: "name", header: "Product Name" },
    {
      accessorKey: "price",
      header: "Price",
      cell: (info) => `$${Number(info.getValue()).toLocaleString()}`,
    },
    { accessorKey: "stock", header: "Stock" },
    { accessorKey: "category", header: "Category" },
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
    data: filteredData, // 🔥 USE FILTERED DATA
    columns,
    state: { globalFilter, pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handleAddProduct = (e) => {
    e.preventDefault();
    const newProduct = {
      id: Date.now(),
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
    };
    setData([newProduct, ...data]);
    setIsAddModalOpen(false);
    setFormData({ name: "", price: "", stock: "", category: "" });
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      stock: product.stock,
      category: product.category,
    });
    setIsEditModalOpen(true);
  };

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    setData(data.map((product) =>
      product.id === selectedProduct.id
        ? { id: selectedProduct.id, ...formData, price: Number(formData.price), stock: Number(formData.stock) }
        : product
    ));
    setIsEditModalOpen(false);
    setSelectedProduct(null);
    setFormData({ name: "", price: "", stock: "", category: "" });
  };

  const handleDelete = (product) => {
    setSelectedProduct(product);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    setData(data.filter((product) => product.id !== selectedProduct.id));
    setDeleteConfirmOpen(false);
    setSelectedProduct(null);
  };

  // 🔥 FILTER MODAL FUNCTIONS
  const clearFilters = () => {
    setFilters({
      category: "",
      minPrice: "",
      maxPrice: "",
      minStock: "",
      maxStock: "",
    });
  };

  const applyFilters = () => {
    setIsFilterModalOpen(false);
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
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 p-6 bg-gradient-to-r from-slate-50/80 to-indigo-50/80 dark:from-slate-900/80 dark:to-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 dark:border-slate-800/50"
      >
        <motion.div className="flex items-center gap-4" whileHover={{ scale: 1.02 }}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="p-4 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl shadow-2xl"
          >
            <FaBox className="w-7 h-7 text-white drop-shadow-lg" />
          </motion.div>
          <div>
            <h1 className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent drop-shadow-lg">
              Products Management
            </h1>
            <motion.p 
              className="text-gray-600 dark:text-gray-400 mt-1 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Manage your inventory ({filteredData.length} items)
            </motion.p>
          </div>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsAddModalOpen(true)}
          className="group bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-2xl hover:shadow-3xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 flex items-center gap-3 backdrop-blur-sm border border-white/20"
        >
          <FaPlus className="group-hover:scale-110 transition-transform" />
          Add New Product
        </motion.button>
      </motion.div>

      {/* 🔥 ADVANCED SEARCH & FILTERS WITH MODAL TRIGGER */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-6 lg:p-8 rounded-3xl shadow-2xl border border-white/50 dark:border-slate-800/50"
      >
        <div className="flex flex-col lg:flex-row gap-4 items-center lg:items-stretch">
          <div className="relative flex-1 group">
            <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-all duration-200 w-5 h-5" />
            <input
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(String(e.target.value))}
              placeholder="🔍 Search products by name, category, or SKU..."
              className="w-full pl-14 pr-6 py-4 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-gray-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-transparent transition-all duration-300 text-lg placeholder-gray-500"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsFilterModalOpen(true)}
            className="flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-2xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 whitespace-nowrap border border-orange-400/50 hover:border-orange-500/50"
          >
            <FaFilter className="w-4 h-4" />
            Advanced Filters
          </motion.button>
        </div>
      </motion.div>

      {/* 🔥 NEW ADVANCED FILTERS MODAL */}
      <AnimatePresence mode="wait">
        {isFilterModalOpen && (
          <FilterModal
            filters={filters}
            setFilters={setFilters}
            onClose={() => setIsFilterModalOpen(false)}
            onApply={applyFilters}
            onClear={clearFilters}
          />
        )}
      </AnimatePresence>

      {/* Rest of your existing table, pagination, modals code stays EXACTLY same */}
      {/* Animated Table Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 dark:border-slate-800/50 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <motion.table 
            className="w-full min-w-[800px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <motion.tr 
                  key={headerGroup.id} 
                  className="bg-gradient-to-r from-slate-50 to-indigo-50/50 dark:from-slate-800/50 dark:to-slate-700/50 border-b-2 border-indigo-100 dark:border-slate-700 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {headerGroup.headers.map((header) => (
                    <motion.th
                      key={header.id}
                      className="p-6 text-left font-black text-xl text-gray-900 dark:text-white tracking-tight cursor-pointer group hover:bg-indigo-100/50 dark:hover:bg-slate-700/50 rounded-t-xl transition-all duration-300 relative overflow-hidden"
                      onClick={header.column.getToggleSortingHandler()}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center gap-2">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        <motion.span
                          className="text-indigo-500 text-lg"
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
                    className="group hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50/50 dark:hover:from-slate-800/70 dark:hover:to-slate-700/70 backdrop-blur-sm border-b border-slate-100/50 dark:border-slate-800/50 transition-all duration-300"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <motion.td 
                        key={cell.id} 
                        className="p-6 font-medium text-gray-900 dark:text-white relative"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.02 }}
                      >
                        <span className="block pr-4">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </span>
                      </motion.td>
                    ))}
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </motion.table>
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
              className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-slate-800 dark:to-slate-700 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl p-6"
            >
              <FaBox className="w-12 h-12 text-indigo-500 dark:text-indigo-400" />
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">
              No Products Found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              Try adjusting your search or filters
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Premium Pagination */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-indigo-50/80 to-purple-50/80 dark:from-slate-900/80 dark:to-slate-800/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-indigo-200/50 dark:border-slate-800/50 flex flex-col lg:flex-row items-center justify-between gap-6"
      >
        <motion.div 
          className="text-lg font-semibold text-gray-700 dark:text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()} 
          • Showing {table.getRowModel().rows.length} of {filteredData.length} products
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
            className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl font-bold text-lg shadow-2xl"
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

      {/* Enhanced Modals - Same style as Analytics */}
      <AnimatePresence mode="wait">
        {isAddModalOpen && (
          <ProductModal
            key="add"
            title="✨ Add New Product"
            onClose={() => {
              setIsAddModalOpen(false);
              setFormData({ name: "", price: "", stock: "", category: "" });
            }}
            onSubmit={handleAddProduct}
            formData={formData}
            setFormData={setFormData}
          />
        )}
        {isEditModalOpen && selectedProduct && (
          <ProductModal
            key="edit"
            title="✏️ Edit Product"
            onClose={() => {
              setIsEditModalOpen(false);
              setFormData({ name: "", price: "", stock: "", category: "" });
              setSelectedProduct(null);
            }}
            onSubmit={handleUpdateProduct}
            formData={formData}
            setFormData={setFormData}
          />
        )}
      </AnimatePresence>

      {/* Delete Confirmation */}
      <AnimatePresence>
        {deleteConfirmOpen && selectedProduct && (
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
                  Delete Product?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  Are you sure you want to delete <br />
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">"{selectedProduct.name}"</span>?
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
                  Delete Forever
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// 🔥 NEW ADVANCED FILTERS MODAL COMPONENT
function FilterModal({ filters, setFilters, onClose, onApply, onClear }) {
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
        className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-3xl p-8 max-w-2xl w-full shadow-2xl border border-white/50 dark:border-slate-800/50 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
            🔍 Advanced Filters
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
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Category Filter */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <FaTag className="w-5 h-5 text-orange-500" />
              Category
            </label>
            <select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              className="w-full px-6 py-4 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-2 border-gray-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-orange-500/30 focus:border-orange-500 text-lg font-medium transition-all duration-300 shadow-inner hover:shadow-md"
            >
              <option value="">All Categories</option>
              <option value="Electronics">📱 Electronics</option>
              <option value="Footwear">👟 Footwear</option>
              <option value="Clothing">👕 Clothing</option>
              <option value="Books">📚 Books</option>
            </select>
          </motion.div>

          {/* Price Range */}
          <motion.div className="grid grid-cols-2 gap-4" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <div>
              <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <FaDollarSign className="w-5 h-5 text-emerald-500" />
                Min Price
              </label>
              <input
                type="number"
                step="0.01"
                value={filters.minPrice}
                onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                placeholder="0"
                className="w-full px-6 py-4 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-2 border-gray-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-emerald-500/30 focus:border-emerald-500 text-lg font-medium transition-all duration-300 shadow-inner hover:shadow-md"
              />
            </div>
            <div>
              <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                Max Price
              </label>
              <input
                type="number"
                step="0.01"
                value={filters.maxPrice}
                onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                placeholder="5000"
                className="w-full px-6 py-4 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-2 border-gray-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-emerald-500/30 focus:border-emerald-500 text-lg font-medium transition-all duration-300 shadow-inner hover:shadow-md"
              />
            </div>
          </motion.div>

          {/* Stock Range */}
          <motion.div className="grid grid-cols-2 gap-4" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <div>
              <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                Min Stock
              </label>
              <input
                type="number"
                value={filters.minStock}
                onChange={(e) => setFilters({ ...filters, minStock: e.target.value })}
                placeholder="0"
                className="w-full px-6 py-4 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-2 border-gray-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-orange-500/30 focus:border-orange-500 text-lg font-medium transition-all duration-300 shadow-inner hover:shadow-md"
              />
            </div>
            <div>
              <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                Max Stock
              </label>
              <input
                type="number"
                value={filters.maxStock}
                onChange={(e) => setFilters({ ...filters, maxStock: e.target.value })}
                placeholder="100"
                className="w-full px-6 py-4 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-2 border-gray-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-orange-500/30 focus:border-orange-500 text-lg font-medium transition-all duration-300 shadow-inner hover:shadow-md"
              />
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="flex flex-col sm:flex-row gap-4 pt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClear}
            className="flex-1 px-8 py-5 bg-gradient-to-r from-gray-400 to-gray-500 text-white rounded-2xl font-bold text-xl shadow-xl hover:shadow-2xl hover:from-gray-500 hover:to-gray-600 transition-all duration-300 flex items-center justify-center gap-3"
          >
            Clear All Filters
          </motion.button>
          <div className="flex gap-3">
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
              onClick={onApply}
              className="flex-1 px-8 py-5 bg-gradient-to-r from-orange-500 via-pink-500 to-orange-600 text-white rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl hover:from-orange-600 hover:via-pink-600 hover:to-orange-700 transition-all duration-300 flex items-center justify-center gap-3"
            >
              <FaCheck className="w-6 h-6" />
              Apply Filters
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// Enhanced Product Modal (unchanged)
function ProductModal({ title, onClose, onSubmit, formData, setFormData }) {
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
          <h2 className="text-2xl font-black bg-gradient-to-r from-gray-900 to-indigo-900 bg-clip-text text-transparent">
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
              Product Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-6 py-4 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-2 border-gray-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-indigo-500/30 focus:border-indigo-500 text-lg font-medium transition-all duration-300 shadow-inner hover:shadow-md"
              required
            />
          </motion.div>
          
          <motion.div className="grid grid-cols-2 gap-6" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <div>
              <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Price ($)
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-6 py-4 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-2 border-gray-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-emerald-500/30 focus:border-emerald-500 text-lg font-medium transition-all duration-300 shadow-inner hover:shadow-md"
                required
              />
            </div>
            <div>
              <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Stock
              </label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="w-full px-6 py-4 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-2 border-gray-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-orange-500/30 focus:border-orange-500 text-lg font-medium transition-all duration-300 shadow-inner hover:shadow-md"
                required
              />
            </div>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-6 py-4 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-2 border-gray-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-purple-500/30 focus:border-purple-500 text-lg font-medium transition-all duration-300 shadow-inner hover:shadow-md"
              required
            >
              <option value="">Select Category</option>
              <option value="Electronics">📱 Electronics</option>
              <option value="Footwear">👟 Footwear</option>
              <option value="Clothing">👕 Clothing</option>
              <option value="Books">📚 Books</option>
            </select>
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
              className="flex-1 px-8 py-5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center justify-center gap-3"
            >
              <FaCheck className="w-6 h-6" />
              {title === "Edit Product" ? "Update Product" : "Save Product"}
            </motion.button>
          </motion.div>
        </form>
      </motion.div>
    </motion.div>
  );
}
