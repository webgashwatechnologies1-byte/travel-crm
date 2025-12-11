"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminPanelLayout({ children }) {
  const pathname = usePathname();

  const menu = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Blogs", path: "/admin/blogs" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <aside className="w-64 bg-white shadow-lg p-5 flex flex-col gap-4">
        <h2 className="text-2xl font-bold mb-4" style={{ color: "#EC792E" }}>
          Admin Panel
        </h2>

        {menu.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`p-3 rounded-md text-lg font-medium transition ${
              pathname === item.path
                ? "bg-[#EC792E] text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
