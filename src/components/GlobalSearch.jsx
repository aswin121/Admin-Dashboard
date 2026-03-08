import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function GlobalSearch() {

  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const pages = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Analytics", path: "/analytics" },
    { name: "Users", path: "/users" },
  ];

  const results = pages.filter(page =>
    page.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="relative">

      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="px-3 py-2 rounded-lg bg-slate-200 dark:bg-slate-800"
      />

      {query && (
        <div className="absolute bg-white dark:bg-slate-900 shadow-lg mt-2 w-48 rounded">

          {results.map((r) => (
            <div
              key={r.path}
              onClick={() => navigate(r.path)}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            >
              {r.name}
            </div>
          ))}

        </div>
      )}

    </div>
  );
}