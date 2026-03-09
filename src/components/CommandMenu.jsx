import { Command } from "cmdk";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CommandMenu() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      className="fixed top-40 left-1/2 -translate-x-1/2 w-96 bg-white dark:bg-slate-900 shadow-xl rounded-xl p-4 border"
    >

      <Command.Input
        placeholder="Search..."
        className="w-full p-2 outline-none border-b bg-transparent"
      />

      <Command.List className="mt-2">

        <Command.Item
          onSelect={() => navigate("/Admin-Dashboard/dashboard")}
          className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
        >
          Dashboard
        </Command.Item>

        <Command.Item
          onSelect={() => navigate("/Admin-Dashboard/users")}
          className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
        >
          Users
        </Command.Item>

        <Command.Item
          onSelect={() => navigate("/Admin-Dashboard/analytics")}
          className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
        >
          Analytics
        </Command.Item>

        <Command.Item
          onSelect={() => navigate("/Admin-Dashboard/settings")}
          className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
        >
          Settings
        </Command.Item>

      </Command.List>

    </Command.Dialog>
  );
}