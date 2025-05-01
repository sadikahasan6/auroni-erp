import { useState, useEffect } from "react";
import { z } from "zod";
import api from "../lib/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

// Define schema matching backend
const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().optional(),
});

const TrialSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Redirect if authenticated
  useEffect(() => {
    console.log("TrialSignup: isAuthenticated:", isAuthenticated);
    if (isAuthenticated) {
      console.log("TrialSignup: Authenticated, redirecting to /dashboard");
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSuccess("");

    // Validate form data
    const result = registerSchema.safeParse({ email, password, name: name || undefined });
    if (!result.success) {
      const fieldErrors: { [key: string]: string } = {};
      result.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0]] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    const payload = { email, password, name: name || undefined };
    console.log("TrialSignup: Sending payload:", payload);

    try {
      const response = await api.post("/auth/register", payload);
      console.log("TrialSignup: Response:", response.data);
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      setSuccess(`Welcome, ${user.email}! Signup successful.`);
      setTimeout(() => navigate("/dashboard", { replace: true }), 1000);
    } catch (err: any) {
      console.error("TrialSignup: Error:", err.response?.data || err.message);
      setErrors({ general: err.response?.data?.error || "Signup failed" });
    }
  };

  if (isAuthenticated === null) {
    console.log("TrialSignup: Showing loading screen");
    return <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">Loading...</div>;
  }

  if (isAuthenticated) {
    return null; // Navigate will handle redirection
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-amber-950 mb-6 text-center">
          Sign Up for ERP Trial
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
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Name (Optional)
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)} // Fixed typo from setEmail to setName
              className="w-full mt-1 p-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-950"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-amber-950 text-white py-2 rounded-md hover:bg-amber-900 transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default TrialSignup;