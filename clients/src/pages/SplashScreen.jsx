// SplashScreen.jsx
// import Logo from "../public/images/home.png"; // Place your logo in src/assets/logo.png
const Logo = "/images/CnC.jpg";
export const SplashScreen = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center z-50 text-white px-4">
      {/* Logo */}
      <div className="flex flex-col items-center mb-6 animate-fade-in">
        <img
          src='/images/cnc.png'
          alt="Code & Connect Logo"
          className="w-24 h-24 md:w-32 md:h-32 mb-4 object-contain rounded-full"
        />
        <h1 className="text-3xl md:text-5xl font-extrabold mb-2 text-center text-cyan-400">
          Code & Connect
        </h1>
        <p className="text-sm md:text-lg text-gray-300 text-center max-w-md">
          The ultimate platform to learn, code, and connect
        </p>
      </div>

      {/* Loader / Animated Dots */}
      <div className="flex space-x-2 mb-6">
        <span className="w-4 h-4 bg-cyan-400 rounded-full animate-bounce delay-0"></span>
        <span className="w-4 h-4 bg-cyan-400 rounded-full animate-bounce delay-150"></span>
        <span className="w-4 h-4 bg-cyan-400 rounded-full animate-bounce delay-300"></span>
      </div>

      {/* Founder Credit */}
      <p className="text-xs md:text-sm text-gray-400 mt-4 text-center">
        Founded by <br></br> <span className="font-semibold text-cyan-400">Shivang Sharma</span>
      </p>

      {/* Tailwind Animations */}
      <style jsx>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }
        .animate-bounce {
          animation: bounce 1.4s infinite ease-in-out both;
        }
        .delay-0 { animation-delay: 0s; }
        .delay-150 { animation-delay: 0.15s; }
        .delay-300 { animation-delay: 0.3s; }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};
