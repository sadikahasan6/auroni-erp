import { useState } from "react";
import { FaCheckCircle } from 'react-icons/fa';
import type { Route } from "./+types/trial";
export function meta({}: Route.MetaArgs) {
    return [
      { title: "Signup for 14 days free trial || Auroni ERP" },
      { name: "description", content: "Experience the power of Auroni ERP with a 14-day free trial. No credit card required. Get started in minutes." },
    ];
  }

export default function Trial() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password: "temporary-password", company }), // Adjust password logic
      });
      const data = await response.json();
      if (!data.success) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setSuccess(true);
      setLoading(false);
      // Optionally redirect to login
      setTimeout(() => (window.location.href = "/login"), 2000);
    } catch (err) {
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
          Start Your <span className="text-amber-950">Free Trial</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          Experience the power of ERP Solutions with a 14-day free trial. No credit card required. Get started in minutes.
        </p>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md border-t-4 border-amber-950">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Sign Up for Your Free Trial</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-amber-950 focus:border-amber-950"
                  placeholder="Your Work Email"
                  required
                />
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                  Company Name
                </label>
                <input
                  type="text"
                  id="company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-amber-950 focus:border-amber-950"
                  placeholder="Your Company"
                />
              </div>
              <div>
                <label htmlFor="company-size" className="block text-sm font-medium text-gray-700">
                  Company Size
                </label>
                <select
                  id="company-size"
                  value={companySize}
                  onChange={(e) => setCompanySize(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-amber-950 focus:border-amber-950"
                >
                  <option value="">Select company size</option>
                  <option>1-10 employees</option>
                  <option>11-50 employees</option>
                  <option>51-200 employees</option>
                  <option>201+ employees</option>
                </select>
              </div>
              {error && <p className="text-red-600 text-sm">{error}</p>}
              {success && <p className="text-green-600 text-sm">Account created! Redirecting to login...</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-amber-950 text-white font-semibold rounded-lg shadow-md hover:bg-amber-900 transition-colors duration-200 disabled:opacity-50"
              >
                {loading ? "Signing Up..." : "Start Free Trial"}
              </button>
            </form>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md border-t-4 border-amber-950">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What You Get with Your Trial</h2>
            <ul className="space-y-4">
              {[
                'Access to all Starter plan features',
                'Customizable workflows',
                'Real-time analytics dashboard',
                'Mobile access for on-the-go management',
                'Priority email support',
                'No credit card required',
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900">Need More Information?</h2>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Explore our features or contact our team to learn how ERP Solutions can transform your business.
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
  );
}