import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../store/auth.jsx';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { isLoggedIn } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed w-full z-50 bg-gradient-to-r from-green-500 to-green-600 backdrop-blur-md shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl md:text-3xl font-extrabold text-white tracking-wide">
          <NavLink to="/">NEXUS Tech Solutions</NavLink>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8 font-bold items-center text-white">
          <NavLink
            to="/"
            className="relative group px-2 py-1 hover:text-yellow-300 transition-all duration-300"
          >
            Home
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-yellow-300 transition-all group-hover:w-full"></span>
          </NavLink>
          <NavLink
            to="/about"
            className="relative group px-2 py-1 hover:text-yellow-300 transition-all duration-300"
          >
            About
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-yellow-300 transition-all group-hover:w-full"></span>
          </NavLink>
          <NavLink
            to="/contact"
            className="relative group px-2 py-1 hover:text-yellow-300 transition-all duration-300"
          >
            Contact
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-yellow-300 transition-all group-hover:w-full"></span>
          </NavLink>
          <NavLink
            to="/service"
            className="relative group px-2 py-1 hover:text-yellow-300 transition-all duration-300"
          >
            Service
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-yellow-300 transition-all group-hover:w-full"></span>
          </NavLink>

          {isLoggedIn ? (
            <NavLink
              to="/logout"
              className="px-5 py-2 rounded-full bg-yellow-400 hover:bg-yellow-500 text-green-900 font-bold shadow-lg transition"
            >
              Logout
            </NavLink>
          ) : (
            <>
              <NavLink
                to="/register"
                className="px-5 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-green-900 font-bold shadow-lg transition transform hover:scale-105"
              >
                Register
              </NavLink>
              <NavLink
                to="/login"
                className="px-5 py-2 rounded-full border-2 border-white text-white font-bold hover:bg-white hover:text-green-600 shadow-lg transition transform hover:scale-105"
              >
                Login
              </NavLink>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-gradient-to-b from-green-500 to-green-600 shadow-lg overflow-hidden"
          >
            <ul className="flex flex-col px-6 py-4 space-y-4 font-bold text-white">
              <li>
                <NavLink to="/" onClick={() => setIsOpen(false)} className="hover:text-yellow-300 transition">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" onClick={() => setIsOpen(false)} className="hover:text-yellow-300 transition">
                  About
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" onClick={() => setIsOpen(false)} className="hover:text-yellow-300 transition">
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink to="/service" onClick={() => setIsOpen(false)} className="hover:text-yellow-300 transition">
                  Service
                </NavLink>
              </li>
              {isLoggedIn ? (
                <li>
                  <NavLink to="/logout" onClick={() => setIsOpen(false)} className="hover:text-yellow-300 transition">
                    Logout
                  </NavLink>
                </li>
              ) : (
                <>
                  <li>
                    <NavLink
                      to="/register"
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-green-900 font-bold shadow-md transition transform hover:scale-105"
                    >
                      Register
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-2 rounded-full border-2 border-white text-white font-bold hover:bg-white hover:text-green-600 shadow-md transition transform hover:scale-105"
                    >
                      Login
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
