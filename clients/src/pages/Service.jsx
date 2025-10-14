import { useAuth } from "../store/auth";

export const Service = () => {
  const { services } = useAuth();

  return (
    <section className="bg-gray-50 text-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-600 mb-12 text-center">
          Services
        </h1>

        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8">
          {services.map((curElem, index) => {
            const { price, description, provider, service } = curElem;

            return (
              <div
                className="bg-white rounded-2xl shadow-2xl hover:shadow-3xl transition transform hover:-translate-y-2 hover:scale-105 p-6"
                key={index}
              >
                <div className="flex justify-center mb-4">
                  <img
                    src="/images/design.png"
                    alt="service illustration"
                    className="w-32 h-32 object-contain"
                  />
                </div>

                <div className="mb-2 flex justify-between font-semibold text-green-600">
                  <p>{provider}</p>
                  <p>{price}</p>
                </div>

                <h2 className="text-2xl font-bold mb-2">{service}</h2>
                <p className="text-gray-700">{description}</p>

                <button className="mt-4 w-full bg-green-500 text-white font-bold py-2 rounded-xl shadow-lg hover:bg-green-600 transition transform hover:scale-105">
                  Learn More
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
