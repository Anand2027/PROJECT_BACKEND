import { useEffect, useState } from "react";
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

export const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const { authorizationToken } = useAuth();

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

  // --- Chart Data Logic (Unchanged) ---
  const monthlyActivity = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const registrationsByMonth = monthlyActivity.map((month, idx) => ({
    month,
    registrations: users.filter(
      (u) => new Date(u.createdAt).getMonth() === idx
    ).length,
  }));
  const roleCounts = users.reduce((acc, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1;
    return acc;
  }, {});
  const roleData = Object.entries(roleCounts).map(([role, value]) => ({
    name: role,
    value,
  }));
  const ageBuckets = {
    "0-30 days": 0,
    "1-3 months": 0,
    "3-6 months": 0,
    "6+ months": 0,
  };
  users.forEach((user) => {
    const days =
      (Date.now() - new Date(user.createdAt)) / (1000 * 60 * 60 * 24);
    if (days <= 30) ageBuckets["0-30 days"]++;
    else if (days <= 90) ageBuckets["1-3 months"]++;
    else if (days <= 180) ageBuckets["3-6 months"]++;
    else ageBuckets["6+ months"]++;
  });
  const ageData = Object.entries(ageBuckets).map(([range, value]) => ({
    range,
    value,
  }));
  const statusCounts = {
    Active: users.filter((u) => u.status === "Active").length,
    Inactive: users.filter((u) => u.status === "Inactive").length,
    Pending: users.filter((u) => u.status === "Pending").length,
  };
  const pieData = [
    { name: "Active", value: statusCounts.Active },
    { name: "Inactive", value: statusCounts.Inactive },
    { name: "Pending", value: statusCounts.Pending },
  ];
  const genderCounts = users.reduce((acc, user) => {
    acc[user.gender] = (acc[user.gender] || 0) + 1;
    return acc;
  }, {});
  const genderData = Object.entries(genderCounts).map(([gender, value]) => ({
    name: gender,
    value,
  }));
  const phoneVerifiedCounts = {
    Verified: users.filter((u) => u.phoneVerified).length,
    Unverified: users.filter((u) => !u.phoneVerified).length,
  };
  const phoneVerifiedData = [
    { category: "Verified", count: phoneVerifiedCounts.Verified },
    { category: "Unverified", count: phoneVerifiedCounts.Unverified },
  ];
  const COLORS = [
    "#16a34a",
    "#3b82f6",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#0ea5e9",
    "#e11d48",
  ];
  // --- End Chart Data Logic ---

  return (
    <section className="bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mt-7 mb-10">
        Admin Dashboard
      </h1>

      {/* User Table: Hidden on small screens (md:hidden) and only shown 
        on large screens and up (lg:block) to prioritize chart visibility.
      */}
      <div className="hidden lg:block overflow-x-auto mb-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">User Details</h2>
        <table className="min-w-full bg-white rounded-xl shadow-md">
          <thead className="bg-green-100 text-green-700">
            <tr>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Phone</th>
              <th className="py-3 px-4 text-left">Update</th>
              <th className="py-3 px-4 text-left">Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((curUser, index) => (
              <tr key={index} className="border-b">
                <td className="py-2 px-4 font-semibold">{curUser.username}</td>
                <td className="py-2 px-4">{curUser.email}</td>
                <td className="py-2 px-4">{curUser.phone}</td>
                <td className="py-2 px-4">
                  <Link
                    to={`/admin/users/${curUser._id}/edit`}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>
                </td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => deleteUser(curUser._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Charts: The grid handles responsiveness by stacking on small screens. */}
      <h2 className="text-2xl font-semibold text-gray-700 mb-4 lg:mt-0 mt-8">
        User Analytics
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* Monthly Registrations */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-center mb-4">Monthly Registrations</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={registrationsByMonth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="registrations"
                  fill="#16a34a"
                  radius={[10, 10, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Role Distribution */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-center mb-4">User Roles</h2>
          <div className="h-64 flex justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={roleData}
                  dataKey="value"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {roleData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Account Age */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-center mb-4">Account Age</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="value"
                  fill="#3b82f6"
                  radius={[10, 10, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Breakdown */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-center mb-4">User Status</h2>
          <div className="h-64 flex justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gender Distribution */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-center mb-4">Gender Distribution</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={genderData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="value"
                  fill="#8b5cf6"
                  radius={[10, 10, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Phone Verification */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-center mb-4">
            Phone Verification
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={phoneVerifiedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#ef4444"
                  fill="#ef4444"
                  fillOpacity={0.6}
                  name="Users"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cumulative Users Over Time (Spans full width) */}
        <div className="bg-white rounded-xl shadow-md p-6 col-span-full">
          <h2 className="text-xl font-semibold text-center mb-4">
            Cumulative Users Over Time
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={registrationsByMonth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="registrations"
                  stroke="#ef4444"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};