import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { User, DollarSign, ShoppingCart, Users } from "lucide-react";
import api from "../lib/api";
import Sidebar from "~/components/sidebar";

interface UserProfile {
  id: number;
  email: string;
  name?: string;
}

const Dashboard = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Protect the route
  useEffect(() => {
    console.log("Dashboard: isAuthenticated:", isAuthenticated);
    if (isAuthenticated === false) {
      console.log("Dashboard: Not authenticated, redirecting to /login");
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/protected/profile");
        console.log("Dashboard: /protected/profile response:", response.data);
        setUser(response.data.user);
      } catch (err: any) {
        console.error("Dashboard: Error:", err.response?.data || err.message);
        setError("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };
    if (isAuthenticated) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const overviewCards = [
    { title: "Total Sales", value: "$12,345", icon: DollarSign, color: "bg-amber-950" },
    { title: "Active Users", value: "1,234", icon: Users, color: "bg-blue-600" },
    { title: "Pending Orders", value: "56", icon: ShoppingCart, color: "bg-green-600" },
  ];

  const transactions = [
    { id: 1, customer: "John Doe", amount: "$1,200", date: "2025-05-01" },
    { id: 2, customer: "Jane Smith", amount: "$850", date: "2025-04-30" },
    { id: 3, customer: "Acme Corp", amount: "$3,000", date: "2025-04-29" },
  ];

  if (isAuthenticated === null || loading) {
    return <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">Loading...</div>;
  }

  if (isAuthenticated === false) {
    return null; // Navigate will handle redirection
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      <Sidebar />
      <div className="flex-1 md:ml-64 p-6">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-amber-950">ERP Dashboard</h1>
          {user && (
            <div className="text-sm">
              Welcome, <span className="text-amber-950">{user.name || user.email}</span>
            </div>
          )}
        </header>

        {error && <p className="text-red-500">{error}</p>}

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {overviewCards.map((card) => (
            <div key={card.title} className={`${card.color} p-4 rounded-lg shadow-lg`}>
              <div className="flex items-center">
                <card.icon className="mr-2" size={24} />
                <div>
                  <h3 className="text-lg font-semibold">{card.title}</h3>
                  <p className="text-2xl">{card.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User Profile Widget */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-amber-950 mb-4">User Profile</h3>
            {user ? (
              <div className="flex items-center">
                <User className="mr-2" size={24} />
                <div>
                  <p><strong>Name:</strong> {user.name || "N/A"}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                </div>
              </div>
            ) : (
              <p>No user data available</p>
            )}
          </div>

          {/* Recent Transactions Table */}
          <div className="lg:col-span-2 bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-amber-950 mb-4">Recent Transactions</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-400">
                    <th className="p-2">ID</th>
                    <th className="p-2">Customer</th>
                    <th className="p-2">Amount</th>
                    <th className="p-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="border-t border-gray-700">
                      <td className="p-2">{tx.id}</td>
                      <td className="p-2">{tx.customer}</td>
                      <td className="p-2">{tx.amount}</td>
                      <td className="p-2">{tx.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;