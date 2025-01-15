import React, { useContext, useState } from "react";
import { FinanceContext } from "../context/FinanceContext";

const SavingsGoals: React.FC = () => {
  const { state, dispatch } = useContext(FinanceContext); // Access state and dispatch
  const [goal, setGoal] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [type, setType] = useState<"income" | "expense" | "goal">("income");

  // Calculate total income, expenses, and savings
  const totalIncome = state.income.reduce((sum, inc) => sum + inc.amount, 0);
  const totalExpenses = state.expenses.reduce(
    (sum, exp) => sum + exp.amount,
    0
  );
  const totalSavings = totalIncome - totalExpenses;

  // Handle form submission
  const handleAdd = () => {
    if (amount <= 0) {
      alert("Please enter a valid amount!");
      return;
    }

    if (type === "income") {
      // Add income
      const newIncome = {
        id: Date.now(),
        amount,
        source: goal || "Salary",
        date: new Date().toLocaleDateString(),
        paymentMethod: "Cash", // Add appropriate payment method
      };
      dispatch({ type: "ADD_INCOME", payload: newIncome });
      alert(`Added income: $${amount}`);
    } else if (type === "expense") {
      // Add expense
      const newExpense = {
        id: Date.now(),
        amount,
        category: goal || "General",
        date: new Date().toLocaleDateString(),
        paymentMethod: "Cash", // Add appropriate payment method
      };
      dispatch({ type: "ADD_EXPENSE", payload: newExpense });
      alert(`Added expense: $${amount}`);
    } else if (type === "goal") {
      // Add savings goal
      if (!goal) {
        alert("Please provide a goal name!");
        return;
      }
      const newGoal = {
        id: Date.now(),
        title: goal,
        name: goal,
        target: amount,
        progress: totalSavings,
        goal: goal,
        amount: amount,
      };
      dispatch({ type: "ADD_SAVINGS_GOAL", payload: newGoal });
      alert(`Savings goal "${goal}" set for $${amount}`);
    }

    // Reset fields
    setGoal("");
    setAmount(0);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Savings Goals</h2>
      <p className="mb-4">Your current savings: ${totalSavings.toFixed(2)}</p>

      {/* Input fields */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Name or Category"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          className="border p-2 mb-2 w-full rounded"
        />
        <input
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="border p-2 mb-2 w-full rounded"
        />
        <select
          value={type}
          onChange={(e) =>
            setType(e.target.value as "income" | "expense" | "goal")
          }
          className="border p-2 mb-2 w-full rounded"
        >
          <option value="income">Add Income</option>
          <option value="expense">Add Expense</option>
          <option value="goal">Set Savings Goal</option>
        </select>
      </div>

      {/* Add button */}
      <button
        onClick={handleAdd}
        className="bg-green-500 text-white p-2 rounded w-full hover:bg-green-600"
      >
        Add{" "}
        {type === "income" ? "Income" : type === "expense" ? "Expense" : "Goal"}
      </button>

      {/* Existing Goals */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Your Savings Goals</h3>
        {state.savingsGoals.length > 0 ? (
          state.savingsGoals.map((goal) => (
            <div
              key={goal.id}
              className="border p-4 rounded my-2 bg-gray-100 flex justify-between items-center"
            >
              <div>
                <h4 className="font-bold text-lg">{goal.goal}</h4>
                <p>Target: ${goal.amount.toFixed(2)}</p>
                <p>Progress: ${goal.progress.toFixed(2)}</p>
              </div>
              <div>
                <p
                  className={`text-sm font-semibold ${
                    goal.progress >= goal.amount
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {goal.progress >= goal.amount
                    ? "Goal Achieved!"
                    : "In Progress"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">
            No savings goals yet. Start by setting one!
          </p>
        )}
      </div>
    </div>
  );
};

export default SavingsGoals;
