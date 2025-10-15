import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { FaEnvelope, FaTrash } from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

export const AdminContacts = () => {
  const [contactData, setContactData] = useState([]);
  const { authorizationToken } = useAuth();

  const getContactsData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/contacts`, {
        method: "GET",
        headers: { Authorization: authorizationToken },
      });
      const data = await response.json();
      if (response.ok) setContactData(data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch contacts");
    }
  };

  const deleteContactById = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/contacts/delete/${id}`,
        { method: "DELETE", headers: { Authorization: authorizationToken } }
      );
      if (response.ok) {
        getContactsData();
        toast.success("Deleted successfully");
      } else toast.error("Failed to delete contact");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getContactsData();
  }, []);

  // --- Prepare data for charts ---
  const usersCountData = [];
  const emailDomainData = {};
  const messageLengthData = [];

  contactData.forEach((c) => {
    // Count per user
    const userIndex = usersCountData.findIndex((u) => u.name === c.username);
    if (userIndex >= 0) usersCountData[userIndex].count += 1;
    else usersCountData.push({ name: c.username, count: 1 });

    // Email domain
    const domain = c.email.split("@")[1];
    emailDomainData[domain] = (emailDomainData[domain] || 0) + 1;

    // Message length
    messageLengthData.push({ name: c.username, length: c.message.length });
  });

  const pieData = Object.keys(emailDomainData).map((key) => ({
    name: key,
    value: emailDomainData[key],
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28CF5", "#FF6699"];

  return (
    <section className="py-12 bg-gradient-to-b from-gray-100 to-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-extrabold text-green-600 mb-10 text-center relative">
          Admin Contact Messages
          <span className="absolute left-1/2 transform -translate-x-1/2 bottom-[-12px] w-24 h-1 bg-green-600 rounded-full"></span>
        </h1>

        {/* --- Graphs --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Messages per User</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={usersCountData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#22c55e" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Email Domain Distribution</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Message Length per User</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={messageLengthData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="length" fill="#f43f5e" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* --- Contact Cards --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {contactData.length > 0 ? (
            contactData.map((contact, index) => {
              const { username, email, message, _id } = contact;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all duration-300 border border-gray-200"
                >
                  <div className="flex items-center mb-4">
                    <FaEnvelope className="text-green-500 mr-3 text-xl" />
                    <h2 className="text-xl font-semibold text-gray-800">{username}</h2>
                  </div>
                  <p className="text-gray-600 mb-2 font-medium">{email}</p>
                  <p className="text-gray-700 mb-6">{message}</p>
                  <button
                    onClick={() => deleteContactById(_id)}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-300 w-full"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              );
            })
          ) : (
            <p className="col-span-full text-center text-gray-500 font-semibold">
              No contact messages found.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
