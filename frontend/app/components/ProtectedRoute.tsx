import { useEffect, useState, type JSX } from "react";
import { Navigate } from "react-router-dom";
import api from "../lib/api";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      console.log("ProtectedRoute: Checking token:", token ? "Present" : "Missing");

      if (!token) {
        console.log("ProtectedRoute: No token, redirecting to /login");
        setIsAuthenticated(false);
        return;
      }

      try {
        console.log("ProtectedRoute: Calling /protected/profile");
        const response = await api.get("/protected/profile");
        console.log("ProtectedRoute: /protected/profile response:", response.data);
        setIsAuthenticated(true);
      } catch (err: any) {
        console.error("ProtectedRoute: Error:", err.response?.data || err.message);
        setIsAuthenticated(false);
        localStorage.removeItem("token");
      }
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    console.log("ProtectedRoute: Showing loading screen");
    return <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    console.log("ProtectedRoute: Not authenticated, redirecting to /login");
    return <Navigate to="/login" replace />;
  }

  console.log("ProtectedRoute: Authenticated, rendering children");
  return children;
};

export default ProtectedRoute;