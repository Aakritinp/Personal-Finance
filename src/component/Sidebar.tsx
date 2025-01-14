import React from "react";
import { Link } from "react-router-dom";
import {
  HomeIcon,
  CashIcon,
  CreditCardIcon,
  ChartBarIcon,
} from "@heroicons/react/outline";

const Sidebar: React.FC = () => {
  return (
    <aside className="h-screen w-64 bg-gray-800 text-white flex flex-col">
      {/* Application Title */}
      <h2 className="text-2xl font-bold text-center py-4 border-b border-gray-700">
        Finance Tracker
      </h2>

      {/* Navigation Links */}
      <nav className="mt-4 flex flex-col">
        {/* Dashboard Link */}
        <Link
          to="/"
          className="flex items-center px-6 py-3 hover:bg-gray-700 transition-all"
        >
          <HomeIcon className="h-6 w-6 text-blue-400 mr-3" />
          <span>Dashboard</span>
        </Link>

        {/* Income Link */}
        <Link
          to="/income"
          className="flex items-center px-6 py-3 hover:bg-gray-700 transition-all"
        >
          <CashIcon className="h-6 w-6 text-green-400 mr-3" />
          <span>Income</span>
        </Link>

        {/* Expenses Link */}
        <Link
          to="/expenses"
          className="flex items-center px-6 py-3 hover:bg-gray-700 transition-all"
        >
          <CreditCardIcon className="h-6 w-6 text-red-400 mr-3" />
          <span>Expenses</span>
        </Link>

        {/* Savings Goals Link */}
        <Link
          to="/savings"
          className="flex items-center px-6 py-3 hover:bg-gray-700 transition-all"
        >
          <ChartBarIcon className="h-6 w-6 text-yellow-400 mr-3" />
          <span>Savings Goals</span>
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
