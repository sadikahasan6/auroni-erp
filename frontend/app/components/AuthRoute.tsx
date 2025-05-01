import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import type { JSX } from "react";

interface AuthRouteProps {
  children: JSX.Element;
}

const AuthRoute = ({ children }: AuthRouteProps) => {
  const { isAuthenticated } = useAuth();

  console.log("AuthRoute: isAuthenticated:", isAuthenticated);

  if (isAuthenticated === null) {
    console.log("AuthRoute: Showing loading screen");
    return <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">Loading...</div>;
  }

  if (isAuthenticated) {
    console.log("AuthRoute: Redirecting to /dashboard");
    return <Navigate to="/dashboard" replace />;
  }

  console.log("AuthRoute: Rendering children (login or trial page)");
  return children;
};

export default AuthRoute;