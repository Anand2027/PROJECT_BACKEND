import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../store/auth";
import { Link } from "react-router-dom";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { useTable, usePagination, useGlobalFilter, useSortBy } from "react-table";
import { FaArrowUp, FaArrowDown, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

// 🔍 Search Bar
function GlobalFilter({ globalFilter, setGlobalFilter }) {
  return (
    <input
      value={globalFilter || ""}
      onChange={(e) => setGlobalFilter(e.target.value)}
      placeholder="🔍 Search user..."
      className="border border-gray-300 rounded-full px-4 py-2 w-full sm:w-72 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200"
    />
  );
}

export const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const { authorizationToken } = useAuth();
  const [selectedUser, setSelectedUser] = useState(null);

  const getAllUsersData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/users", {
        method: "GET",
        headers: { Authorization: authorizationToken },
      });
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/users/delete/${id}`,
        { method: "DELETE", headers: { Authorization: authorizationToken } }
      );
      if (response.ok) getAllUsersData();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsersData();
  }, []);

  const data = useMemo(() => users, [users]);
  const columns = useMemo(
    () => [
      { Header: "Name", accessor: "username" },
      { Header: "Email", accessor: "email" },
      { Header: "Phone", accessor: "phone" },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div className="flex items-center gap-4 justify-center">
            <button
              onClick={() => setSelectedUser(row.original)}
              className="text-blue-600 font-medium hover:text-blue-800 transition-all duration-200"
            >
              View
            </button>
            <span className="h-5 w-px bg-gray-300"></span>
            <Link
              to={`/admin/users/${row.original._id}/edit`}
              className="text-emerald-600 font-medium hover:text-emerald-800 transition-all duration-200"
            >
              Edit
            </Link>
            <span className="h-5 w-px bg-gray-300"></span>
            <button
              onClick={() => deleteUser(row.original._id)}
              className="text-red-600 font-medium hover:text-red-800 transition-all duration-200"
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const tableInstance = useTable(
    { columns, data, initialState: { pageSize: 6 } },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    setGlobalFilter,
  } = tableInstance;

  const { globalFilter } = state;

  // 📊 Chart Data
  const monthlyActivity = [
    "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec",
  ];
  const registrationsByMonth = monthlyActivity.map((month, idx) => ({
    month,
    registrations: users.filter(
      (u) => new Date(u.createdAt).getMonth() === idx
    ).length,
  }));

  // User Account Age Distribution
  const ageBuckets = {
    "0-30 days": 0,
    "1-3 months": 0,
    "3-6 months": 0,
    "6+ months": 0,
  };
  users.forEach((user) => {
    const days = (Date.now() - new Date(user.createdAt)) / (1000 * 60 * 60 * 24);
    if (days <= 30) ageBuckets["0-30 days"]++;
    else if (days <= 90) ageBuckets["1-3 months"]++;
    else if (days <= 180) ageBuckets["3-6 months"]++;
    else ageBuckets["6+ months"]++;
  });
  const ageData = Object.entries(ageBuckets).map(([range, value]) => ({
    range,
    value,
  }));

  // Gender Distribution
  const genderCounts = users.reduce((acc, user) => {
    acc[user.gender] = (acc[user.gender] || 0) + 1;
    return acc;
  }, {});
  const genderData = Object.entries(genderCounts).map(([gender, value]) => ({
    name: gender,
    value,
  }));

  // Phone Verification
  const phoneVerifiedCounts = {
    Verified: users.filter((u) => u.phoneVerified).length,
    Unverified: users.filter((u) => !u.phoneVerified).length,
  };
  const phoneVerifiedData = [
    { category: "Verified", count: phoneVerifiedCounts.Verified },
    { category: "Unverified", count: phoneVerifiedCounts.Unverified },
  ];

  // 🌟 NEW CHART: Total Users Over Time
  const totalUsersOverTime = monthlyActivity.map((month, idx) => {
    const cumulative = registrationsByMonth
      .slice(0, idx + 1)
      .reduce((sum, entry) => sum + entry.registrations, 0);
    return { month, totalUsers: cumulative };
  });

  const COLORS = [
    "#16a34a","#3b82f6","#f59e0b","#ef4444","#8b5cf6","#0ea5e9","#e11d48",
  ];

  return (
    <section className="bg-gradient-to-b from-gray-50 to-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
        Admin Dashboard
      </h1>

      {/* 🧊 Table Section */}
      <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6 mb-16 border border-gray-100 relative overflow-hidden">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
          <h2 className="text-2xl font-semibold text-gray-800">👥 User Management</h2>
          <GlobalFilter globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-inner">
          <table {...getTableProps()} className="min-w-full text-sm text-gray-700">
            <thead className="bg-gradient-to-r from-emerald-500 to-green-500 text-white">
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className="py-3 px-4 text-center font-semibold uppercase tracking-wide cursor-pointer select-none"
                    >
                      {column.render("Header")}
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <FaArrowDown className="inline ml-1 text-xs" />
                        ) : (
                          <FaArrowUp className="inline ml-1 text-xs" />
                        )
                      ) : (
                        ""
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody {...getTableBodyProps()} className="divide-y divide-gray-200 bg-white">
              <AnimatePresence>
                {page.map((row, i) => {
                  prepareRow(row);
                  return (
                    <motion.tr
                      {...row.getRowProps()}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                      className="hover:bg-emerald-50 transition duration-200 even:bg-gray-50 cursor-pointer"
                      onClick={() => setSelectedUser(row.original)}
                    >
                      {row.cells.map((cell) => (
                        <td {...cell.getCellProps()} className="py-3 px-4 text-center">
                          {cell.render("Cell")}
                        </td>
                      ))}
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-end items-center mt-5 gap-3">
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className="px-4 py-2 bg-green-400 text-gray-700 rounded-lg font-semibold hover:bg-emerald-500 hover:text-white transition "
          >
            Previous
          </button>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className="px-4 py-2 bg-green-400 text-gray-700 rounded-lg font-semibold hover:bg-emerald-500 hover:text-white transition "
          >
            Next
          </button>
        </div>
      </div>

      {/* ✨ Modal */}
      <AnimatePresence>
        {selectedUser && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl shadow-2xl p-6 w-11/12 sm:w-96 relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <button
                className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
                onClick={() => setSelectedUser(null)}
              >
                <FaTimes size={20} />
              </button>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
                User Details
              </h3>
              <div className="space-y-2 text-gray-700">
                <p><strong>Name:</strong> {selectedUser.username}</p>
                <p><strong>Email:</strong> {selectedUser.email}</p>
                <p><strong>Phone:</strong> {selectedUser.phone}</p>
                <p><strong>Gender:</strong> {selectedUser.gender || "N/A"}</p>
                <p><strong>Status:</strong> {selectedUser.status || "Active"}</p>
                <p><strong>Created At:</strong> {new Date(selectedUser.createdAt).toLocaleDateString()}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 📊 Charts */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        User Analytics Overview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Monthly Registrations */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-center mb-4">Monthly Registrations</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={registrationsByMonth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="registrations" fill="#16a34a" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* User Growth Trend */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-center mb-4">User Growth Trend</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={registrationsByMonth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="registrations" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Total Users Over Time */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-center mb-4">Total Users Over Time</h2>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={totalUsersOverTime}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="totalUsers"
                stroke="#8b5cf6"
                fill="#ddd6fe"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Account Age */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-center mb-4">User Account Age</h2>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={ageData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="value" stroke="#10b981" fill="#a7f3d0" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Gender */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-center mb-4">Gender Distribution</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={genderData} dataKey="value" outerRadius={90} label>
                {genderData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Phone Verification */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-center mb-4">Phone Verification</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={phoneVerifiedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#f59e0b" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};
