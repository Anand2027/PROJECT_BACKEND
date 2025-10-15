import { FaWhatsapp, FaLinkedin, FaTelegram, FaInstagram } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* About Section */}
        <div className="flex flex-col">
          <h2 className="text-3xl font-bold text-cyan-400 mb-4">Code & Connect</h2>
          <p className="text-gray-400 text-sm md:text-base">
            Code & Connect is your ultimate coding platform to learn, practice, and collaborate with developers worldwide.
            Build projects, join coding challenges, and grow your skills every day.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col">
          <h3 className="text-xl md:text-2xl font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:text-cyan-400 transition duration-300">Home</a>
            </li>
            <li>
              <a href="/about" className="hover:text-cyan-400 transition duration-300">About</a>
            </li>
            <li>
              <a href="/service" className="hover:text-cyan-400 transition duration-300">Services</a>
            </li>
            <li>
              <a href="/contact" className="hover:text-cyan-400 transition duration-300">Contact</a>
            </li>
            <li>
              <a href="/register" className="hover:text-cyan-400 transition duration-300">Register</a>
            </li>
          </ul>
        </div>

        {/* Social & Channels */}
        <div className="flex flex-col">
          <h3 className="text-xl md:text-2xl font-semibold text-white mb-4">Connect with Us</h3>
          <p className="mb-4 text-gray-400 text-sm md:text-base">Follow us on social media:</p>
          <div className="flex space-x-4 mb-6">
            <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="hover:text-green-500 transform hover:scale-110 transition duration-300">
              <FaWhatsapp size={28} />
            </a>
            <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transform hover:scale-110 transition duration-300">
              <FaLinkedin size={28} />
            </a>
            <a href="https://t.me/code_and_connect" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transform hover:scale-110 transition duration-300">
              <FaTelegram size={28} />
            </a>
            <a href="https://instagram.com/yourprofile" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transform hover:scale-110 transition duration-300">
              <FaInstagram size={28} />
            </a>
          </div>

          {/* Join Our Channels */}
          <div className="flex flex-col space-y-2">
            <a
              href="https://whatsapp.com/channel/0029VbBO5YF5a24DLieris31"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-green-500 text-white rounded-lg text-center font-semibold hover:bg-green-600 transition duration-300"
            >
              Join WhatsApp Channel
            </a>
            <a
              href="https://t.me/code_and_connect"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg text-center font-semibold hover:bg-blue-600 transition duration-300"
            >
              Join Telegram Channel
            </a>
          </div>

          {/* Footer credit */}
          <p className="text-gray-500 text-xs md:text-sm mt-6 text-center md:text-left">
            © 2025 Code & Connect. Founded by <span className="font-semibold text-cyan-400">Shivang Sharma</span>. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};
