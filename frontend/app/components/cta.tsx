export default function CTASection() {
    return (
      <section className="bg-teal-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Ready to streamline your business?
          </h2>
          <p className="mt-4 text-lg text-teal-200">
            Get started with our ERP system today. Empower your team, save time, and grow faster.
          </p>
          <div className="mt-8 flex justify-center">
            <a
              href="#"
              className="inline-block bg-white text-teal-950 font-semibold px-8 py-3 rounded-md shadow hover:bg-gray-100 transition duration-300"
            >
              Schedule a Free Demo
            </a>
          </div>
        </div>
      </section>
    );
  }
  