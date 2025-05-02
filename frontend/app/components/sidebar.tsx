import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X, Home, Package, DollarSign, Settings, LogOut } from "lucide-react";

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
        className="md:hidden p-4 text-gray-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-30 shadow-sm`}
      >
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-green-700">Auroni ERP</h2>
        </div>
        <nav className="mt-4">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center p-4 text-gray-700 hover:bg-green-50 hover:text-green-700 ${
                  isActive ? "bg-green-100 text-green-700 font-medium" : ""
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              <item.icon className="mr-3" size={20} />
              {item.name}
            </NavLink>
          ))}
          <button
            onClick={handleLogout}
            className="flex items-center w-full p-4 text-gray-700 hover:bg-red-50 hover:text-red-600"
          >
            <LogOut className="mr-3" size={20} />
            Logout
          </button>
        </nav>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 md:hidden z-20"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
