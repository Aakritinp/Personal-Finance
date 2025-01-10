import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Finance Tracker</h1>
      <nav>
        <Link to="/" className="mx-4 hover:underline">
          Dashboard
        </Link>
        <Link to="/income" className="mx-4 hover:underline">
          Income
        </Link>
        <Link to="/expenses" className="mx-4 hover:underline">
          Expenses
        </Link>
        <Link to="/savings-goals" className="mx-4 hover:underline">
          Savings Goals
        </Link>
      </nav>
    </header>
  );
};

export default Header;
