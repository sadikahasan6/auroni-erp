import { FaRocket, FaUsers, FaLightbulb } from "react-icons/fa";
import Footer from "~/components/footer";
import Header from "~/components/header";
import type { Route } from "./+types/about";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About || Auroni ERP" },
    { name: "description", content: "Choose a plan that fits your needs, from small startups to large enterprises, with transparent pricing and no hidden fees." },
  ];
}

export default function About() {
  return (
    <>
      <Header />
      <section className="py-16 bg-gray-50">
        {/* Hero Section */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            About <span className="text-amber-950">ERP Solutions</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            We are a dedicated team passionate about transforming businesses
            with innovative, customizable, and secure ERP systems.
          </p>
        </div>

        {/* Mission Section */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="bg-white p-8 rounded-lg shadow-md border-t-4 border-amber-950">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
              Our Mission
            </h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto">
              At ERP Solutions, our mission is to empower businesses of all
              sizes to streamline operations, enhance productivity, and achieve
              sustainable growth through cutting-edge ERP technology. We believe
              in delivering tailored solutions that drive efficiency and
              innovation.
            </p>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="text-center">
                <FaRocket className="text-amber-950 text-4xl mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900">
                  Innovation
                </h3>
                <p className="text-gray-600">
                  Pushing the boundaries of ERP with advanced features.
                </p>
              </div>
              <div className="text-center">
                <FaUsers className="text-amber-950 text-4xl mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900">
                  Collaboration
                </h3>
                <p className="text-gray-600">
                  Fostering teamwork with seamless tools.
                </p>
              </div>
              <div className="text-center">
                <FaLightbulb className="text-amber-950 text-4xl mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900">
                  Excellence
                </h3>
                <p className="text-gray-600">
                  Delivering top-quality solutions for your success.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Jane Doe", role: "CEO & Founder" },
              { name: "John Smith", role: "CTO" },
              { name: "Emily Johnson", role: "Lead Developer" },
              { name: "Michael Brown", role: "Head of Sales" },
            ].map((member, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md text-center"
              >
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4" />{" "}
                {/* Placeholder for image */}
                <h3 className="text-xl font-semibold text-gray-900">
                  {member.name}
                </h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Ready to Learn More?
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our powerful ERP features or get in touch to see how we can
            help your business thrive.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <a
              href="/features"
              className="px-8 py-3 bg-amber-950 text-white font-semibold rounded-lg shadow-md hover:bg-amber-900 transition-colors duration-200"
            >
              View Features
            </a>
            <a
              href="/contact"
              className="px-8 py-3 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition-colors duration-200"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
