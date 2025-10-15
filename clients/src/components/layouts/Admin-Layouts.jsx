import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { FaUsers, FaEnvelope, FaHome, FaServer, FaBars } from "react-icons/fa";
import { useState } from "react";
import Navbar from "../Navbar";


export const AdminLayout = () => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
        {/* Sidebar for big screen / Horizontal top menu for small screen */}
      <aside
        className={`flex flex-row md:flex-col w-full md:w-64 text-white shadow-lg`}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between p-6 mt-12"
          style={{ background: "linear-gradient(to bottom, #4ade80, #16a34a)" }}
        >
          {sidebarOpen && <span className="text-2xl font-bold">Admin Panel</span>}
       
        </div>

        {/* Navigation */}
        <nav
          className={`flex-1 md:flex-col flex-row flex w-full md:w-full`}
          style={{ background: "linear-gradient(to bottom, #22c55e, #10b981)" }}
        >
          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-md font-semibold transition w-full ${
                isActive ? "bg-white text-green-600 shadow-lg" : "hover:bg-white/30"
              }`
            }
          >
            <FaUsers />
            <span className="hidden md:inline">{sidebarOpen && "Users"}</span>
          </NavLink>

          <NavLink
            to="/admin/contacts"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-md font-semibold transition w-full ${
                isActive ? "bg-white text-green-600 shadow-lg" : "hover:bg-white/30"
              }`
            }
          >
            <FaEnvelope />
            <span className="hidden md:inline">{sidebarOpen && "Contacts"}</span>
          </NavLink>

          <NavLink
            to="/service"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-md font-semibold transition w-full ${
                isActive ? "bg-white text-green-600 shadow-lg" : "hover:bg-white/30"
              }`
            }
          >
            <FaServer />
            <span className="hidden md:inline">{sidebarOpen && "Services"}</span>
          </NavLink>

          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-md font-semibold transition w-full ${
                isActive ? "bg-white text-green-600 shadow-lg" : "hover:bg-white/30"
              }`
            }
          >
            <FaHome />
            <span className="hidden md:inline">{sidebarOpen && "Home"}</span>
          </NavLink>
        </nav>

        {/* Footer */}
        <div
          className="p-6 border-t border-white/20 md:block hidden"
          style={{ background: "linear-gradient(to top, #22c55e, #16a34a)" }}
        >
          {sidebarOpen && (
            <>
              <p className="font-semibold text-white/90">Logged in as:</p>
              <p className="text-white font-bold">{user?.username || "Admin"}</p>
            </>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-x-auto">
        <Outlet />
      </main>
    </div>
    </>
  );
};
