import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar: React.FC = () => {
  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `block py-3 px-4 rounded-md text-white text-lg transition-colors ${
      isActive ? "bg-blue-700" : "hover:bg-blue-500"
    }`;

  return (
    <aside className="w-64 h-screen bg-gradient-to-b from-blue-600 to-blue-800 text-white fixed">
      <div className="p-6 text-3xl font-bold border-b border-blue-700">
        Finance Tracker
      </div>
      <nav className="mt-6 space-y-2">
        <NavLink to="/" className={navLinkClasses}>
          Dashboard
        </NavLink>
        <NavLink to="/income" className={navLinkClasses}>
          Income
        </NavLink>
        <NavLink to="/expenses" className={navLinkClasses}>
          Expenses
        </NavLink>
        <NavLink to="/savings-goals" className={navLinkClasses}>
          Savings Goals
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
