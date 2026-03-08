import { useState } from "react";
import { FaBell } from "react-icons/fa";

export default function Notifications() {
  const [open, setOpen] = useState(false);

  const notifications = [
    { id: 1, text: "New user registered" },
    { id: 2, text: "Server restarted successfully" },
    { id: 3, text: "New order received" },
    { id: 4, text: "Payment completed" },
  ];

  return (
    <div className="relative">
      
      <button
        onClick={() => setOpen(!open)}
        className="relative text-xl p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg"
      >
        <FaBell />

        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded">
          {notifications.length}
        </span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 shadow-xl rounded-xl border p-3">

          <h3 className="font-semibold mb-2">Notifications</h3>

          <ul className="space-y-2">
            {notifications.map((n) => (
              <li
                key={n.id}
                className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                {n.text}
              </li>
            ))}
          </ul>

        </div>
      )}
    </div>
  );
}