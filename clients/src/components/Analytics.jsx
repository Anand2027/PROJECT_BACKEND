import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  Legend,
} from "recharts";

const Analytics = () => {
  // Chart Data
  const growthData = [
    { name: "2021", growth: 200 },
    { name: "2022", growth: 400 },
    { name: "2023", growth: 700 },
    { name: "2024", growth: 1000 },
    { name: "2025", growth: 1500 },
  ];

  const revenueData = [
    { month: "Jan", revenue: 400 },
    { month: "Feb", revenue: 800 },
    { month: "Mar", revenue: 1200 },
    { month: "Apr", revenue: 1000 },
    { month: "May", revenue: 1600 },
    { month: "Jun", revenue: 2000 },
  ];

  const pieData = [
    { name: "Web Dev", value: 45 },
    { name: "App Dev", value: 25 },
    { name: "AI Solutions", value: 15 },
    { name: "Cloud Services", value: 15 },
  ];

  const COLORS = ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444"];

  const userEngagementData = [
    { month: "Jan", engagement: 300 },
    { month: "Feb", engagement: 500 },
    { month: "Mar", engagement: 800 },
    { month: "Apr", engagement: 700 },
    { month: "May", engagement: 1200 },
    { month: "Jun", engagement: 1600 },
  ];

  return (
    <section className="bg-gray-50 py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      {/* Section Title */}
      <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 text-center mb-12">
        Our Achievements
      </h2>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16">
        {[
          { title: "Registered Companies", value: "50+" },
          { title: "Happy Clients", value: "100,000+" },
          { title: "Well Known Developers", value: "500+" },
          { title: "24/7 Service", value: "24/7" },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-lg p-6 text-center hover:scale-105 transform transition-all duration-300"
          >
            <h2 className="text-4xl font-bold text-green-500">{item.value}</h2>
            <p className="mt-2 text-gray-700 font-semibold text-sm sm:text-base">
              {item.title}
            </p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Bar Chart */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-lg">
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 text-center">
            Company Growth Overview
          </h3>
          <div className="w-full h-[250px] sm:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Legend />
                <Bar dataKey="growth" fill="#22c55e" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Line Chart */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-lg">
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 text-center">
            Revenue Growth Trend
          </h3>
          <div className="w-full h-[250px] sm:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-lg">
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 text-center">
            Service Distribution
          </h3>
          <div className="w-full h-[250px] sm:h-[300px] flex justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  dataKey="value"
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

        {/* Area Chart */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-lg">
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 text-center">
            User Engagement Over Time
          </h3>
          <div className="w-full h-[250px] sm:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={userEngagementData}>
                <defs>
                  <linearGradient id="colorEngage" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16a34a" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="engagement"
                  stroke="#16a34a"
                  fillOpacity={1}
                  fill="url(#colorEngage)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Analytics;
