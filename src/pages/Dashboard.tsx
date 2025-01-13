import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard: React.FC = () => {
  const { income, expenses } = useSelector((state: RootState) => state.finance);

  const totalIncome = income.reduce((sum, i) => sum + i.amount, 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

  const data = {
    labels: ["Income", "Expenses"],
    datasets: [
      {
        label: "Amount",
        data: [totalIncome, totalExpenses],
        backgroundColor: ["#4caf50", "#f44336"],
        borderRadius: 10,
      },
    ],
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-blue-600">Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white shadow-md p-6 rounded-lg text-center">
          <h3 className="text-gray-700 text-lg">Total Income</h3>
          <p className="text-green-500 text-2xl font-bold">${totalIncome}</p>
        </div>
        <div className="bg-white shadow-md p-6 rounded-lg text-center">
          <h3 className="text-gray-700 text-lg">Total Expenses</h3>
          <p className="text-red-500 text-2xl font-bold">${totalExpenses}</p>
        </div>
        <div className="bg-white shadow-md p-6 rounded-lg text-center">
          <h3 className="text-gray-700 text-lg">Net Savings</h3>
          <p
            className={`text-2xl font-bold ${
              totalIncome - totalExpenses >= 0
                ? "text-blue-500"
                : "text-red-500"
            }`}
          >
            ${totalIncome - totalExpenses}
          </p>
        </div>
      </div>
      <div className="mt-8 bg-white shadow-md p-6 rounded-lg">
        <h3 className="text-lg font-bold mb-4 text-gray-700">
          Financial Summary
        </h3>
        <Bar data={data} />
      </div>
    </div>
  );
};

export default Dashboard;
