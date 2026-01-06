import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "../api/authApi";
import { FaHome, FaSignOutAlt } from "react-icons/fa";
import { TbCertificate } from "react-icons/tb";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navItems = [
    { name: "Home", icon: <FaHome />, path: "/admin" },
    { name: "Marriage Form", icon: <TbCertificate className="text-xl" />, path: "/MariageForm" },
    { name: "All Records", icon: <TbCertificate className="text-xl" />, path: "/allCertificate" },
  ];

  return (
    <aside className="h-screen w-64 bg-gradient-to-b from-indigo-700 via-blue-700 to-indigo-800 text-white shadow-lg p-6 flex flex-col">
      {/* Logo / Branding */}
      <div className="text-3xl font-extrabold mb-12 tracking-widest text-yellow-400 select-none drop-shadow-lg">
        Admin<span className="text-yellow-300">Panel</span>
      </div>

      {/* Navigation */}
      <nav className="flex-grow">
        <ul className="space-y-6">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li
                key={item.name}
                onClick={() => navigate(item.path)}
                className={`flex items-center space-x-4 px-5 py-3 rounded-xl cursor-pointer transition-all duration-300
                  ${
                    isActive
                      ? "bg-yellow-500 shadow-lg text-indigo-900 font-semibold"
                      : "hover:bg-yellow-400 hover:text-indigo-900"
                  }`}
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="text-lg">{item.name}</span>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="mt-auto flex items-center space-x-3 px-5 py-3 rounded-xl cursor-pointer bg-red-600 hover:bg-red-700 transition-colors duration-300 text-white font-semibold shadow-md"
      >
        <FaSignOutAlt className="text-xl" />
        <span className="text-lg">Logout</span>
      </button>
    </aside>
  );
};

export default Sidebar;
