import { FaCheckCircle } from 'react-icons/fa';
import type { Route } from './+types/demo';
import Header from '~/components/header';
import Footer from '~/components/footer';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Schedule a Free Demo|| Auroni ERP" },
    { name: "description", content: "See Auroni ERP in action with a personalized demo tailored to your business needs. Our experts will guide you through the features that matter most." },
  ];
}

export default function Demo() {
  return (
    <>
    <Header/>
    <section className="py-16 bg-gray-50">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
          Schedule a <span className="text-amber-950">Free Demo</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          See Auroni ERP in action with a personalized demo tailored to your business needs. Our experts will guide you through the features that matter most.
        </p>
      </div>

      {/* Demo Form and Benefits */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Demo Request Form */}
          <div className="bg-white p-8 rounded-lg shadow-md border-t-4 border-amber-950">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Request Your Demo</h2>
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-amber-950 focus:border-amber-950"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Work Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-amber-950 focus:border-amber-950"
                  placeholder="Your Work Email"
                />
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                  Company Name
                </label>
                <input
                  type="text"
                  id="company"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-amber-950 focus:border-amber-950"
                  placeholder="Your Company"
                />
              </div>
              <div>
                <label htmlFor="preferred-time" className="block text-sm font-medium text-gray-700">
                  Preferred Demo Time
                </label>
                <select
                  id="preferred-time"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-amber-950 focus:border-amber-950"
                >
                  <option>Morning (9 AM - 12 PM)</option>
                  <option>Afternoon (1 PM - 4 PM)</option>
                  <option>Evening (4 PM - 6 PM)</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-amber-950 text-white font-semibold rounded-lg shadow-md hover:bg-amber-900 transition-colors duration-200"
              >
                Schedule Demo
              </button>
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-white p-8 rounded-lg shadow-md border-t-4 border-amber-950">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Schedule a Demo?</h2>
            <ul className="space-y-4">
              {[
                'Personalized walkthrough of ERP features',
                'Tailored to your business needs',
                'Expert guidance from our team',
                'Answers to your specific questions',
                'Explore integrations and workflows',
                'No commitment required',
              ].map((benefit, index) => (
                <li key={index} className="flex items-center">
                  <FaCheckCircle className="text-amber-950 mr-3 text-xl" />
                  <span className="text-gray-600">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900">Ready to Explore More?</h2>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Start a free trial or dive into our features to see how ERP Solutions can transform your business.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <a
            href="/signup"
            className="px-8 py-3 bg-amber-950 text-white font-semibold rounded-lg shadow-md hover:bg-amber-900 transition-colors duration-200"
          >
            Start Free Trial
          </a>
          <a
            href="/features"
            className="px-8 py-3 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition-colors duration-200"
          >
            View Features
          </a>
        </div>
      </div>
    </section>
    <Footer/>
    </>
  );
}