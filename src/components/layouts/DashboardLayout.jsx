import { useState } from "react";
import Sidebar from "../layouts/Sidebar";
import Navbar from "../layouts/Navbar";

export default function DashboardLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

   const handleToggle = () => {
    console.log("TOGGLE:", !collapsed); // 🔍 DEBUG
    setCollapsed(prev => !prev);
  };

  return (
    <div className="flex bg-slate-100 dark:bg-slate-950 min-h-screen">
      <Sidebar collapsed={collapsed}  onToggle={handleToggle} />
      
      {/* ✅ CORRECT MARGINS - Sidebar ALWAYS exists */}
      <div 
        className="flex-1 flex flex-col min-h-screen"
        style={{
          marginLeft: collapsed ? 40 : 240,   // ← COLLAPSED=72px, EXPANDED=240px
          marginTop: '100px',
          transition: 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <Navbar collapsed={collapsed} />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
