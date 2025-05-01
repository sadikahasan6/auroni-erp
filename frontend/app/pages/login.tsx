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
    return <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">Loading...</div>;
  }

  if (isAuthenticated) {
    return null; // Navigate will handle redirection
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-amber-950 mb-6 text-center">
          Log In to ERP
        </h2>
        {errors.general && <p className="text-red-500 mb-4">{errors.general}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-950"
              required
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 p-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-950"
              required
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-amber-950 text-white py-2 rounded-md hover:bg-amber-900 transition"
          >
            Log In
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <a href="/signup" className="text-amber-950 hover:underline">
            Sign up for a trial
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;