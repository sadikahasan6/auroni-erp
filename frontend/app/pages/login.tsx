import { useState } from "react";
import type { Route } from "./+types/login";
export function meta({}: Route.MetaArgs) {
    return [
      { title: "Login || Auroni ERP" },
      { name: "description", content: "Log in to access your ERP system, manage workflows, and unlock powerful business tools." },
    ];
  }

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!data.success) {
        setError(data.message);
        setLoading(false);
        return;
      }
      // Store tokens in localStorage or cookies
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      // Redirect to dashboard or protected route
      window.location.href = "/dashboard"; // Adjust as needed
    } catch (err) {
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <section className="py-16 md:h-screen bg-gray-50 flex items-center">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
              Welcome to <span className="text-amber-950">ERP Solutions</span>
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-md mx-auto md:mx-0">
              Log in to access your ERP system, manage workflows, and unlock powerful business tools.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row justify-center md:justify-start gap-4">
              <a
                href="/signup"
                className="px-8 py-3 bg-amber-950 text-white font-semibold rounded-lg shadow-md hover:bg-amber-900 transition-colors duration-200"
              >
                Start Free Trial
              </a>
              <a
                href="/demo"
                className="px-8 py-3 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition-colors duration-200"
              >
                Schedule a Demo
              </a>
            </div>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md border-t-4 border-amber-950">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Log In</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-amber-950 focus:border-amber-950"
                  placeholder="Your Email"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-amber-950 focus:border-amber-950"
                  placeholder="Your Password"
                  required
                />
              </div>
              <div className="flex justify-between items-center">
                <a
                  href="/forgot-password" // Placeholder; implement later if needed
                  className="text-sm text-amber-950 hover:text-amber-900 transition-colors duration-200"
                >
                  Forgot Password?
                </a>
              </div>
              {error && <p className="text-red-600 text-sm">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-amber-950 text-white font-semibold rounded-lg shadow-md hover:bg-amber-900 transition-colors duration-200 disabled:opacity-50"
              >
                {loading ? "Logging In..." : "Log In"}
              </button>
            </form>
            <p className="mt-4 text-center text-gray-600">
              Don’t have an account?{' '}
              <a
                href="/signup"
                className="text-amber-950 font-semibold hover:text-amber-900 transition-colors duration-200"
              >
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}