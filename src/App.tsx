import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./component/Sidebar";
import Dashboard from "./pages/Dashboard";
import Income from "./pages/Income";
import Expenses from "./pages/Expenses";
import SavingsGoals from "./pages/SavingsGoals";
import { FinanceProvider } from "./context/FinanceContext";

const App: React.FC = () => {
  return (
    <FinanceProvider>
      <div className="flex">
        <Sidebar />
        <main className="ml-64 p-6 w-full">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/income" element={<Income />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/savings-goals" element={<SavingsGoals />} />
          </Routes>
        </main>
      </div>
    </FinanceProvider>
  );
};

export default App;
