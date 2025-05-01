import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X, Home, Package, DollarSign, Settings } from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: Home },
    { name: "Inventory", path: "/inventory", icon: Package },
    { name: "Sales", path: "/sales", icon: DollarSign },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden p-4 text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-gray-800 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-30`}
      >
        <div className="p-4">
          <h2 className="text-2xl font-bold text-amber-950">Auroni ERP</h2>
        </div>
        <nav className="mt-4">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center p-4 text-white hover:bg-gray-700 ${
                  isActive ? "bg-gray-700 text-amber-950" : ""
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              <item.icon className="mr-2" size={20} />
              {item.name}
            </NavLink>
          ))}
          <button
            onClick={handleLogout}
            className="flex items-center w-full p-4 text-white hover:bg-gray-700"
          >
            <X className="mr-2" size={20} />
            Logout
          </button>
        </nav>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 md:hidden z-20"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;