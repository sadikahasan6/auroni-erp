import { useState, useEffect } from "react";
import { z } from "zod";
import api from "../lib/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().optional(),
  employeeCount: z
    .enum(["1-10", "11-50", "51-200", "200+"], {
      errorMap: () => ({ message: "Please select employee count" }),
    })
    .optional(),
  businessType: z
    .enum(["retail", "tech", "manufacturing", "services", "other"], {
      errorMap: () => ({ message: "Please select business type" }),
    })
    .optional(),
});

const TrialSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [employeeCount, setEmployeeCount] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

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

    const result = registerSchema.safeParse({
      email,
      password,
      name: name || undefined,
      employeeCount: employeeCount || undefined,
      businessType: businessType || undefined,
    });
    if (!result.success) {
      const fieldErrors: { [key: string]: string } = {};
      result.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0]] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    const payload = { email, password, name: name || undefined, employeeCount, businessType };
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
    return <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">Loading...</div>;
  }

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-amber-950 mb-6 text-center">Sign Up for ERP Trial</h2>
        {errors.general && <p className="text-red-500 mb-4">{errors.general}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">Email</label>
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
            <label htmlFor="password" className="block text-sm font-medium">Password</label>
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
            <label htmlFor="name" className="block text-sm font-medium">Name (Optional)</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 p-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-950"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="employeeCount" className="block text-sm font-medium">Number of Employees</label>
            <select
              id="employeeCount"
              value={employeeCount}
              onChange={(e) => setEmployeeCount(e.target.value)}
              className="w-full mt-1 p-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-950"
              required
            >
              <option value="">Select...</option>
              <option value="1-10">1-10</option>
              <option value="11-50">11-50</option>
              <option value="51-200">51-200</option>
              <option value="200+">200+</option>
            </select>
            {errors.employeeCount && <p className="text-red-500 text-sm mt-1">{errors.employeeCount}</p>}
          </div>
          <div>
            <label htmlFor="businessType" className="block text-sm font-medium">Business Type</label>
            <select
              id="businessType"
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
              className="w-full mt-1 p-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-950"
              required
            >
              <option value="">Select...</option>
              <option value="retail">Retail</option>
              <option value="tech">Tech</option>
              <option value="manufacturing">Manufacturing</option>
              <option value="services">Services</option>
              <option value="other">Other</option>
            </select>
            {errors.businessType && <p className="text-red-500 text-sm mt-1">{errors.businessType}</p>}
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