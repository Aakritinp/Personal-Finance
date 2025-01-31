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

// Register Chart.js components
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

  // Calculate financial summaries
  const totalIncome = state.income.reduce((sum, inc) => sum + inc.amount, 0);
  const totalExpenses = state.expenses.reduce(
    (sum, exp) => sum + exp.amount,
    0
  );
  const netSavings = totalIncome - totalExpenses;
  const savingsPercentage =
    totalIncome > 0 ? ((netSavings / totalIncome) * 100).toFixed(2) : "0";

  // Extract recent transactions
  const recentTransactions = [
    ...state.income.map((inc) => ({ ...inc, type: "Income" })),
    ...state.expenses.map((exp) => ({ ...exp, type: "Expense" })),
  ].slice(-5);

  // Calculate expense category distribution
  const expenseCategories = state.expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  // Bar chart data
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

  // Pie chart data
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Total Income",
            value: `$${totalIncome.toFixed(2)}`,
            color: "green",
          },
          {
            label: "Total Expenses",
            value: `$${totalExpenses.toFixed(2)}`,
            color: "red",
          },
          {
            label: "Net Savings",
            value: `$${netSavings.toFixed(2)}`,
            color: "blue",
          },
          {
            label: "Savings Percentage",
            value: `${savingsPercentage}%`,
            color: "purple",
          },
        ].map((item, index) => (
          <div
            key={index}
            className={`bg-gradient-to-br from-${item.color}-100 to-${item.color}-50 shadow-md p-4 rounded-lg text-center hover:scale-105 transition transform`}
          >
            <h3 className={`text-lg font-semibold text-${item.color}-600`}>
              {item.label}
            </h3>
            <p className={`text-3xl font-bold text-${item.color}-800`}>
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Middle Row: Graphs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md p-6 rounded-lg hover:shadow-lg transition">
          <h2 className="text-xl font-bold text-gray-700 mb-4">
            Financial Overview
          </h2>
          <Bar data={barData} />
        </div>
        <div className="bg-white shadow-md p-6 rounded-lg hover:shadow-lg transition">
          <h2 className="text-xl font-bold text-gray-700 mb-4">
            Expense Breakdown
          </h2>
          <Pie data={pieData} />
        </div>
      </div>

      {/* Bottom Row: Recent Transactions & Goals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <div className="bg-white shadow-md p-6 rounded-lg hover:shadow-lg transition">
          <h2 className="text-xl font-bold text-gray-700 mb-4">
            Recent Transactions
          </h2>
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-left">Type</th>
                <th className="border p-2 text-left">Category/Source</th>
                <th className="border p-2 text-left">Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((trans, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td
                    className={`border p-2 ${
                      trans.type === "Income"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {trans.type}
                  </td>
                  <td className="border p-2">
                    {"source" in trans ? trans.source : trans.category}
                  </td>
                  <td className="border p-2">${trans.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Savings Goals */}
        <div className="bg-white shadow-md p-6 rounded-lg hover:shadow-lg transition">
          <h2 className="text-xl font-bold text-gray-700 mb-4">
            Savings Goals
          </h2>
          {state.savingsGoals.length > 0 ? (
            state.savingsGoals.map((goal, index) => (
              <div
                key={index}
                className="border p-4 rounded my-2 bg-gray-100 shadow-sm"
              >
                <h3 className="font-bold text-lg">{goal.title}</h3>
                <p>Target: ${goal.target.toFixed(2)}</p>
                <p>Progress: ${goal.progress.toFixed(2)}</p>
                <div className="w-full bg-gray-300 h-2 rounded">
                  <div
                    className="bg-blue-500 h-2 rounded"
                    style={{
                      width: `${(goal.progress / goal.target) * 100}%`,
                    }}
                  ></div>
                </div>
                <p className="text-sm mt-2 text-right">
                  {(goal.progress / goal.target) * 100 >= 100
                    ? "Goal Achieved!"
                    : `Progress: ${(goal.progress / goal.target) * 100}%`}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">
              No savings goals set yet. Add one to track progress!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
