import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="bg-blue-500 text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">Finance Tracker</h1>
      <nav>
        <Link to="/" className="mx-2">
          Dashboard
        </Link>
        <Link to="/income" className="mx-2">
          Income
        </Link>
        <Link to="/expenses" className="mx-2">
          Expenses
        </Link>
        <Link to="/savings-goals" className="mx-2">
          Savings Goals
        </Link>
      </nav>
    </header>
  );
};

export default Header;
