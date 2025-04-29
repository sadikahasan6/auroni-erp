import { useEffect, useState } from "react";

export default function Dashboard() {
  const [user, setUser] = useState<{ id: string; name: string; email: string } | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:3000/profile", {
          headers: { "Authorization": `Bearer ${localStorage.getItem("accessToken")}` },
          credentials: "include", // If using cookies
        });
        const data = await response.json();
        if (!data.success) {
          setError(data.message);
          window.location.href = "/login";
          return;
        }
        setUser(data.user);
      } catch (err) {
        setError("Failed to load user data.");
        window.location.href = "/login";
      }
    };
    fetchUser();
  }, []);

  if (error) return <p className="text-red-600 text-center">{error}</p>;
  if (!user) return <p className="text-center">Loading...</p>;

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
          Welcome, <span className="text-amber-950">{user.name || user.email}</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          Manage your ERP workflows, analytics, and more from your dashboard.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <a
            href="/features"
            className="px-8 py-3 bg-amber-950 text-white font-semibold rounded-lg shadow-md hover:bg-amber-900 transition-colors duration-200"
          >
            Explore Features
          </a>
          <a
            href="/contact"
            className="px-8 py-3 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition-colors duration-200"
          >
            Get Support
          </a>
        </div>
      </div>
    </section>
  );
}