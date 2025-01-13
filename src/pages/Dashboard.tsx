import React, { useContext } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { FinanceContext } from "../context/FinanceContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const Dashboard: React.FC = () => {
  const { state } = useContext(FinanceContext);

  const totalIncome = state.income.reduce((sum, inc) => sum + inc.amount, 0);
  const totalExpenses = state.expenses.reduce(
    (sum, exp) => sum + exp.amount,
    0
  );
  const netSavings = totalIncome - totalExpenses;
  const savingsPercentage =
    totalIncome > 0 ? ((netSavings / totalIncome) * 100).toFixed(2) : "0";

  const recentTransactions = [
    ...state.income.map((inc) => ({ ...inc, type: "Income" })),
    ...state.expenses.map((exp) => ({ ...exp, type: "Expense" })),
  ].slice(-5); // Get the last 5 transactions

  const expenseCategories = state.expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const barData = {
    labels: ["Income", "Expenses", "Savings"],
    datasets: [
      {
        label: "Amount ($)",
        data: [totalIncome, totalExpenses, netSavings],
        backgroundColor: ["#4CAF50", "#F44336", "#2196F3"],
      },
    ],
  };

  const pieData = {
    labels: Object.keys(expenseCategories),
    datasets: [
      {
        data: Object.values(expenseCategories),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  };

  return (
    <div className="mt-8 space-y-6">
      {/* Top Row: Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white shadow-md p-4 rounded-lg text-center">
          <h3 className="text-lg font-semibold text-gray-600">Total Income</h3>
          <p className="text-2xl font-bold text-green-600">
            ${totalIncome.toFixed(2)}
          </p>
        </div>
        <div className="bg-white shadow-md p-4 rounded-lg text-center">
          <h3 className="text-lg font-semibold text-gray-600">
            Total Expenses
          </h3>
          <p className="text-2xl font-bold text-red-600">
            ${totalExpenses.toFixed(2)}
          </p>
        </div>
        <div className="bg-white shadow-md p-4 rounded-lg text-center">
          <h3 className="text-lg font-semibold text-gray-600">Net Savings</h3>
          <p className="text-2xl font-bold text-blue-600">
            ${netSavings.toFixed(2)}
          </p>
        </div>
        <div className="bg-white shadow-md p-4 rounded-lg text-center">
          <h3 className="text-lg font-semibold text-gray-600">
            Savings Percentage
          </h3>
          <p className="text-2xl font-bold text-purple-600">
            {savingsPercentage}%
          </p>
        </div>
      </div>

      {/* Middle Row: Graphs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-xl font-bold text-gray-700 mb-4">
            Financial Overview
          </h2>
          <Bar data={barData} />
        </div>
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-xl font-bold text-gray-700 mb-4">
            Expense Breakdown
          </h2>
          <Pie data={pieData} />
        </div>
      </div>

      {/* Bottom Row: Recent Transactions & Goals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-xl font-bold text-gray-700 mb-4">
            Recent Transactions
          </h2>
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Type</th>
                <th className="border p-2">Category/Source</th>
                <th className="border p-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((trans, index) => (
                <tr key={index}>
                  <td
                    className={`border p-2 ${
                      trans.type === "Income"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {trans.type}
                  </td>
                  <td className="border p-2">
                    {trans.type === "Income" && "source" in trans
                      ? trans.source
                      : "category" in trans
                      ? trans.category
                      : ""}
                  </td>
                  <td className="border p-2">${trans.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-xl font-bold text-gray-700 mb-4">
            Savings Goals
          </h2>
          <p>Coming Soon!</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
