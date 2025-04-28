import { FaCheckCircle } from "react-icons/fa";
import Footer from "~/components/footer";
import Header from "~/components/header";

export default function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "$49",
      period: "/month",
      description: "Perfect for small businesses getting started with ERP.",
      features: [
        "Up to 5 users",
        "Basic workflows",
        "Email support",
        "1 integration",
        "Mobile access",
      ],
      cta: "Get Started",
      highlighted: false,
    },
    {
      name: "Professional",
      price: "$149",
      period: "/month",
      description: "Ideal for growing businesses with advanced needs.",
      features: [
        "Up to 20 users",
        "Custom workflows",
        "Priority email & chat support",
        "5 integrations",
        "Real-time analytics",
        "Mobile access",
      ],
      cta: "Get Started",
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description:
        "Tailored for large organizations with complex requirements.",
      features: [
        "Unlimited users",
        "Fully custom workflows",
        "24/7 phone & chat support",
        "Unlimited integrations",
        "Advanced analytics",
        "Mobile access",
        "Dedicated account manager",
      ],
      cta: "Contact Sales",
      highlighted: false,
    },
  ];

  return (
    <>
      <Header />
      <section className="py-16 bg-gray-50">
        {/* Hero Section */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Flexible <span className="text-amber-950">Pricing</span> for Every
            Business
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Choose a plan that fits your needs, from small startups to large
            enterprises, with transparent pricing and no hidden fees.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`bg-white p-6 rounded-lg shadow-md border-t-4 ${
                  plan.highlighted
                    ? "border-amber-950 scale-105"
                    : "border-gray-200"
                } transition-transform duration-300`}
              >
                <h3 className="text-2xl font-bold text-gray-900 text-center">
                  {plan.name}
                </h3>
                <div className="mt-4 flex justify-center items-baseline">
                  <span className="text-4xl font-extrabold text-gray-900">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="ml-1 text-xl text-gray-600">
                      {plan.period}
                    </span>
                  )}
                </div>
                <p className="mt-4 text-gray-600 text-center">
                  {plan.description}
                </p>
                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <FaCheckCircle className="text-amber-950 mr-2" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={plan.name === "Enterprise" ? "/contact" : "/signup"}
                  className={`mt-8 block w-full px-6 py-3 text-center text-white font-semibold rounded-lg shadow-md transition-colors duration-200 ${
                    plan.highlighted
                      ? "bg-amber-950 hover:bg-amber-900"
                      : "bg-amber-950 hover:bg-amber-900"
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Not Sure Which Plan is Right for You?
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Contact our sales team for a personalized consultation to find the
            perfect ERP solution for your business.
          </p>
          <a
            href="/contact"
            className="mt-6 inline-block px-8 py-3 bg-amber-950 text-white font-semibold rounded-lg shadow-md hover:bg-amber-900 transition-colors duration-200"
          >
            Talk to Sales
          </a>
        </div>
      </section>
      <Footer />
    </>
  );
}
