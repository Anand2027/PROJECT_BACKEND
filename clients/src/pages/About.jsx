import { NavLink } from "react-router-dom";
import Analytics from "../components/Analytics";
import { useAuth } from "../store/auth";
import { FaRocket, FaCogs, FaShieldAlt, FaUsers } from "react-icons/fa";

const About = () => {
  const { user } = useAuth();

  const features = [
    { icon: <FaRocket />, title: "Innovation", desc: "We drive forward-thinking IT solutions that accelerate your business growth." },
    { icon: <FaCogs />, title: "Custom Solutions", desc: "Tailored strategies designed to meet your unique business requirements." },
    { icon: <FaShieldAlt />, title: "Security & Reliability", desc: "Ensuring your IT systems are robust, secure, and always available." },
    { icon: <FaUsers />, title: "Customer Focus", desc: "We prioritize your success and provide world-class support." },
  ];

  return (
    <>
      {/* Hero Section */}
      <main className="relative bg-gradient-to-br from-gray-50 to-white pt-3 overflow-hidden">
        <section className="max-w-7xl mx-auto px-6 py-16 sm:py-24 lg:py-36 flex flex-col lg:flex-row items-center gap-10">
          {/* Text Content */}
          <div className="w-full lg:w-1/2 flex-1 space-y-4 sm:space-y-6 z-10">
            <p className="text-lg sm:text-xl text-gray-500 tracking-normal font-semibold">
              Welcome{user ? `, ` : ""}<span className="font-bold text-purple-700">{user?.username}</span> to Code and Connect
            </p>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900">
              Transforming{" "}
              <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-blue-500">
                Digital Experiences
              </span>
            </h1>
            <p className="text-gray-700 font-semibold text-base sm:text-lg lg:text-xl leading-relaxed max-w-full sm:max-w-xl">
              We empower businesses with scalable, reliable, and cutting-edge IT solutions that redefine success.
            </p>

            <div className="flex flex-wrap gap-4 sm:gap-6 mt-4">
              <NavLink to="/contact">
                <button className="px-6 sm:px-8 py-3 sm:py-4 bg-green-600 text-white rounded-xl shadow-lg text-base sm:text-lg font-bold hover:bg-green-700 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  Get in Touch
                </button>
              </NavLink>
              <NavLink to="/service">
                <button className="px-6 sm:px-8 py-3 sm:py-4 border border-green-600 text-green-600 rounded-xl text-base sm:text-lg font-bold hover:bg-green-50 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                  Explore Services
                </button>
              </NavLink>
            </div>
          </div>

          {/* Hero Illustration */}
          <div className="w-full lg:w-1/2 flex-1 mt-8 lg:mt-0 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-green-200 to-blue-200 rounded-3xl -z-10 transform rotate-3 sm:rotate-6 scale-105 sm:scale-110"></div>
            <img
              src="/images/about.png"
              alt="About illustration"
              className="w-full h-auto rounded-3xl shadow-2xl hover:scale-105 transition-transform duration-700"
            />
          </div>
        </section>
      </main>

      {/* Features Section */}
      <section className="bg-gray-50 py-16 sm:py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center mb-12 sm:mb-16">
            Why Choose <span className="text-green-600">Us?</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 hover:shadow-2xl transition-all duration-500 flex flex-col items-start gap-3 sm:gap-4 transform hover:-translate-y-1"
              >
                <div className="text-green-600 text-3xl sm:text-4xl">{feature.icon}</div>
                <h3 className="text-xl sm:text-2xl font-bold">{feature.title}</h3>
                <p className="text-gray-600 font-semibold text-sm sm:text-base">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Analytics Section */}
      <section className="bg-white py-12 sm:py-16">
        <Analytics />
      </section>
    </>
  );
};

export default About;
