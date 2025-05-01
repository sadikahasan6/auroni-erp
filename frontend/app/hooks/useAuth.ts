import { useState, useEffect } from "react";
import api from "../lib/api";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      console.log("useAuth: Checking token:", token ? "Present" : "Missing");

      if (!token) {
        console.log("useAuth: No token, setting isAuthenticated to false");
        setIsAuthenticated(false);
        return;
      }

      try {
        console.log("useAuth: Calling /protected/profile");
        const response = await api.get("/protected/profile");
        console.log("useAuth: /protected/profile response:", response.data);
        setIsAuthenticated(true);
      } catch (err: any) {
        console.error("useAuth: Error in /protected/profile:", err.response?.data || err.message);
        setIsAuthenticated(false);
        localStorage.removeItem("token");
      }
    };
    checkAuth();
  }, []);

  return { isAuthenticated };
};