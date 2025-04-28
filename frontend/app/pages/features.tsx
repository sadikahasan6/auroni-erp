
import {
  FaCogs,
  FaChartLine,
  FaUsers,
  FaShieldAlt,
  FaMobileAlt,
  FaPlug,
} from "react-icons/fa";
import Footer from "~/components/footer";
import Header from "~/components/header";
import type { Route } from "./+types/features";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Features || Auroni ERP" },
    { name: "description", content: "Discover the tools and capabilities that make our ERP system the perfect solution for streamlining your business operations." },
  ];
}

export default function Features() {
  const features = [
    {
      icon: <FaCogs className="text-amber-950 text-4xl" />,
      title: "Customizable Workflows",
      description:
        "Tailor the ERP to fit your unique business processes with flexible configuration options.",
    },
    {
      icon: <FaChartLine className="text-amber-950 text-4xl" />,
      title: "Real-Time Analytics",
      description:
        "Gain actionable insights with powerful dashboards and real-time data reporting.",
    },
    {
      icon: <FaUsers className="text-amber-950 text-4xl" />,
      title: "Team Collaboration",
      description:
        "Streamline communication and collaboration across departments with integrated tools.",
    },
    {
      icon: <FaShieldAlt className="text-amber-950 text-4xl" />,
      title: "Enterprise Security",
      description:
        "Protect your data with advanced encryption and robust cloud security protocols.",
    },
    {
      icon: <FaMobileAlt className="text-amber-950 text-4xl" />,
      title: "Mobile Access",
      description:
        "Manage your business on the go with fully responsive mobile and tablet support.",
    },
    {
      icon: <FaPlug className="text-amber-950 text-4xl" />,
      title: "Seamless Integrations",
      description:
        "Connect with your existing tools like CRM, accounting, and inventory systems via APIs.",
    },
  ];

  return (
    <>
      <Header />
      <section className="py-16 bg-gray-50">
        {/* Hero Section */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Powerful Features for Your{" "}
            <span className="text-amber-950">ERP</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Discover the tools and capabilities that make our ERP system the
            perfect solution for streamlining your business operations.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border-t-4 border-amber-950"
              >
                <div className="flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 text-center">
                  {feature.title}
                </h3>
                <p className="mt-2 text-gray-600 text-center">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Ready to Transform Your Business?
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Get started with our ERP solution today and experience seamless
            operations and unparalleled efficiency.
          </p>
          <a
            href="/signup"
            className="mt-6 inline-block px-8 py-3 bg-amber-950 text-white font-semibold rounded-lg shadow-md hover:bg-amber-900 transition-colors duration-200"
          >
            Start Free Trial
          </a>
        </div>
      </section>
      <Footer />
    </>
  );
}
