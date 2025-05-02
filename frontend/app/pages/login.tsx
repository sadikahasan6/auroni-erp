import { useState, useEffect } from "react";
import { z } from "zod";
import api from "../lib/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

// Define schema matching backend
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Redirect if authenticated
  useEffect(() => {
    console.log("Login: isAuthenticated:", isAuthenticated);
    if (isAuthenticated) {
      console.log("Login: Authenticated, redirecting to /dashboard");
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSuccess("");

    // Validate form data
    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      const fieldErrors: { [key: string]: string } = {};
      result.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0]] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    const payload = { email, password };
    console.log("Login: Sending payload:", payload);

    try {
      const response = await api.post("/auth/login", payload);
      console.log("Login: Response:", response.data);
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      setSuccess(`Welcome back, ${user.email}!`);
      setTimeout(() => navigate("/dashboard", { replace: true }), 1000);
    } catch (err: any) {
      console.error("Login: Error:", err.response?.data || err.message);
      setErrors({ general: err.response?.data?.error || "Login failed" });
    }
  };

  if (isAuthenticated === null) {
    console.log("Login: Showing loading screen");
    return <div className="min-h-screen bg-purple-100 text-white flex items-center justify-center">Loading...</div>;
  }

  if (isAuthenticated) {
    return null; // Navigate will handle redirection
  }

  return (
    <div className="min-h-screen bg-gray-50 text-purple-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8 border border-gray-200">
        <h2 className="text-2xl font-semibold text-center text-green-700 mb-6">
          Sign in to your account
        </h2>

        {errors.general && <p className="text-red-600 mb-4 text-center">{errors.general}</p>}
        {success && <p className="text-green-600 mb-4 text-center">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
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
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition duration-150"
          >
            Log In
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <a href="/signup" className="text-green-700 hover:underline font-medium">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;