import { NavLink } from "react-router-dom";

export const Error = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-6">
      <div className="text-center max-w-xl">
        <h2 className="text-8xl font-extrabold text-green-500 mb-6 animate-pulse">
          404
        </h2>
        <h4 className="text-3xl font-bold mb-4 text-gray-700">
          Sorry! Page not found
        </h4>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Oops! It seems like the page you're trying to access doesn't exist.
          If you believe there's an issue, feel free to report it, and we'll
          look into it.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <NavLink
            to="/"
            className="px-6 py-3 bg-green-500 text-white rounded-xl font-semibold shadow-lg hover:bg-green-600 hover:scale-105 transform transition duration-300"
          >
            Return Home
          </NavLink>
          <NavLink
            to="/contact"
            className="px-6 py-3 border border-green-500 text-green-600 rounded-xl font-semibold shadow hover:bg-green-50 hover:scale-105 transform transition duration-300"
          >
            Report Problem
          </NavLink>
        </div>
      </div>
    </section>
  );
};
