import React, { useContext } from "react";
import { FinanceContext } from "../context/FinanceContext";
// import { Bar } from "react-chartjs-2";

const Dashboard: React.FC = () => {
  const { state } = useContext(FinanceContext);

  const totalIncome = state.income.reduce(
    (sum, income) => sum + income.amount,
    0
  );
  const totalExpenses = state.expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  // const data = {
  //   labels: ["Income", "Expenses"],
  //   datasets: [
  //     {
  //       label: "Amount",
  //       data: [totalIncome, totalExpenses],
  //       backgroundColor: ["#4caf50", "#f44336"],
  //     },
  //   ],
  // };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white shadow-md p-4 rounded-md">
          <h3 className="text-lg font-semibold">Total Income</h3>
          <p className="text-green-500 text-xl font-bold">${totalIncome}</p>
        </div>
        <div className="bg-white shadow-md p-4 rounded-md">
          <h3 className="text-lg font-semibold">Total Expenses</h3>
          <p className="text-red-500 text-xl font-bold">${totalExpenses}</p>
        </div>
        <div className="bg-white shadow-md p-4 rounded-md">
          <h3 className="text-lg font-semibold">Net Savings</h3>
          <p className="text-blue-500 text-xl font-bold">
            ${totalIncome - totalExpenses}
          </p>
        </div>
      </div>
      {/* <div className="mt-8">
        <Bar data={data} />
      </div> */}
    </div>
  );
};

export default Dashboard;
