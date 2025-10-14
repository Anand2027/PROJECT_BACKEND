import Analytics from "../components/Analytics";

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <main className="bg-yellow-50 text-gray-900">
        <section className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-12">
          {/* Text Content */}
          <div className="flex-1 space-y-6 font-semibold">
            <h1 className="text-4xl md:text-5xl font-bold leading-snug">
              Welcome to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-green-500"><br></br>
                Code and Connect
              </span>
            </h1>
            <p className="text-green-600 uppercase tracking-wide">
              Innovative IT Solutions<br />for Modern Business
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              Transforming your business landscape with cutting-edge, agile, and innovative IT solutions that drive growth, enhance efficiency, and empower you to stay ahead in a rapidly evolving digital world.
            </p>
            <div className="flex gap-4 mt-4">
              <a href="/contact">
                <button className="px-6 py-3 bg-green-500 text-white rounded-full shadow-md hover:bg-green-600 transition duration-300">
                  Connect Now
                </button>
              </a>
              <a href="/services">
                <button className="px-6 py-3 border border-green-500 text-green-600 rounded-full hover:bg-green-50 transition duration-300">
                  Learn More
                </button>
              </a>
            </div>
          </div>

          {/* Hero Image */}
          <div className="flex-1">
            <img
              src="/images/home.png"
              alt="Tech illustration"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </section>
      </main>

      {/* Analytics Section */}
      <section className="bg-white py-12">
        <Analytics />
      </section>

      {/* Reach Out To Us Heading */}
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-6">
        Reach Out To Us
      </h2>

      {/* Secondary Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-12">
        {/* Image */}
        <div className="flex-1">
          <img
            src="/images/design.png"
            alt="Design illustration"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>

        {/* Text Content */}
        <div className="flex-1 space-y-6 font-semibold">
          <p className="text-green-600 uppercase tracking-wide">
            Let's Build Together
          </p>
          <h2 className="text-4xl md:text-5xl font-bold leading-snug">
            Get Started Today
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Embark on your digital transformation journey with us. Let's create something exceptional together.
          </p>
          <div className="flex gap-4 mt-4">
            <a href="/contact">
              <button className="px-6 py-3 bg-green-500 text-white rounded-full shadow-md hover:bg-green-600 transition duration-300">
                Connect Now
              </button>
            </a>
            <a href="/services">
              <button className="px-6 py-3 border border-green-500 text-green-600 rounded-full hover:bg-green-50 transition duration-300">
                Learn More
              </button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
