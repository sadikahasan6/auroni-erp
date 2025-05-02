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

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/protected/profile");
        setUser(response.data.user);
      } catch (err: any) {
        setError("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };
    if (isAuthenticated) fetchUser();
    else setLoading(false);
  }, [isAuthenticated]);

  const overviewCards = [
    { title: "Total Sales", value: "$12,345", icon: DollarSign, color: "bg-green-100 text-green-700" },
    { title: "Active Users", value: "1,234", icon: Users, color: "bg-blue-100 text-blue-700" },
    { title: "Pending Orders", value: "56", icon: ShoppingCart, color: "bg-yellow-100 text-yellow-700" },
  ];

  const transactions = [
    { id: 1, customer: "John Doe", amount: "$1,200", date: "2025-05-01" },
    { id: 2, customer: "Jane Smith", amount: "$850", date: "2025-04-30" },
    { id: 3, customer: "Acme Corp", amount: "$3,000", date: "2025-04-29" },
  ];

  if (isAuthenticated === null || loading) {
    return (
      <div className="min-h-screen bg-white text-gray-800 flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (isAuthenticated === false) return null;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex">
      <Sidebar />
      <div className="flex-1 md:ml-64 p-6">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-green-700">ERP Dashboard</h1>
          {user && (
            <div className="text-sm text-gray-600">
              Welcome, <span className="font-medium text-green-700">{user.name || user.email}</span>
            </div>
          )}
        </header>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {overviewCards.map((card) => (
            <div key={card.title} className={`${card.color} p-4 rounded-lg shadow-sm`}>
              <div className="flex items-center space-x-3">
                <card.icon size={28} />
                <div>
                  <h3 className="text-lg font-semibold">{card.title}</h3>
                  <p className="text-2xl font-bold">{card.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User Profile */}
          <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <h3 className="text-lg font-semibold text-green-700 mb-4">User Profile</h3>
            {user ? (
              <div className="flex items-start space-x-3">
                <User size={24} className="text-gray-500" />
                <div>
                  <p><strong>Name:</strong> {user.name || "N/A"}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                </div>
              </div>
            ) : (
              <p>No user data available</p>
            )}
          </div>

          {/* Recent Transactions */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow border border-gray-200">
            <h3 className="text-lg font-semibold text-green-700 mb-4">Recent Transactions</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-gray-500 border-b border-gray-200">
                    <th className="p-2">ID</th>
                    <th className="p-2">Customer</th>
                    <th className="p-2">Amount</th>
                    <th className="p-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="border-b last:border-none border-gray-100">
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
