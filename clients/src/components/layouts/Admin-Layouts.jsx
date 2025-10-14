import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { FaUsers, FaEnvelope, FaHome, FaServer, FaBars } from "react-icons/fa";
import { useState } from "react";

export const AdminLayout = () => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-16"
        } transition-all duration-300 flex flex-col text-white shadow-lg`}
      >
        <div className="flex items-center justify-between p-6" style={{background: "linear-gradient(to bottom, #4ade80, #16a34a)"}}>
          {sidebarOpen && <span className="text-2xl font-bold">Admin Panel</span>}
          <button className="text-white md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <FaBars />
          </button>
        </div>

        <nav className="flex-1 px-2 py-4 space-y-2" style={{background: "linear-gradient(to bottom, #22c55e, #10b981)"}}>
          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-md font-semibold transition ${
                isActive ? "bg-white text-green-600 shadow-lg" : "hover:bg-white/30"
              }`
            }
          >
            <FaUsers />
            {sidebarOpen && "Users"}
          </NavLink>

          <NavLink
            to="/admin/contacts"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-md font-semibold transition ${
                isActive ? "bg-white text-green-600 shadow-lg" : "hover:bg-white/30"
              }`
            }
          >
            <FaEnvelope />
            {sidebarOpen && "Contacts"}
          </NavLink>

          <NavLink
            to="/service"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-md font-semibold transition ${
                isActive ? "bg-white text-green-600 shadow-lg" : "hover:bg-white/30"
              }`
            }
          >
            <FaServer />
            {sidebarOpen && "Services"}
          </NavLink>

          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-md font-semibold transition ${
                isActive ? "bg-white text-green-600 shadow-lg" : "hover:bg-white/30"
              }`
            }
          >
            <FaHome />
            {sidebarOpen && "Home"}
          </NavLink>
        </nav>

        <div className="p-6 border-t border-white/20" style={{background: "linear-gradient(to top, #22c55e, #16a34a)"}}>
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
  );
};
