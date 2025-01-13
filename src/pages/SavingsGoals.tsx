import React, { useContext, useState } from "react";
import { FinanceContext } from "../context/FinanceContext";

const SavingsGoals: React.FC = () => {
  const { state, dispatch } = useContext(FinanceContext); // Access state and dispatch
  const [goal, setGoal] = useState("");
  const [amount, setAmount] = useState<number>(0);

  // Calculate total savings
  const totalSavings =
    state.income.reduce(
      (sum: number, inc: { amount: number }) => sum + inc.amount,
      0
    ) -
    state.expenses.reduce(
      (sum: number, exp: { amount: number }) => sum + exp.amount,
      0
    );

  // Handle setting a new savings goal
  const handleSaveGoal = () => {
    if (goal && amount > 0) {
      const newGoal = {
        id: Date.now(),
        name: goal,
        target: amount,
        progress: 0,
      };

      // Dispatch the new goal to the context state
      dispatch({ type: "ADD_SAVINGS_GOAL", payload: newGoal });

      // Reset input fields
      setGoal("");
      setAmount(0);
    } else {
      alert("Please provide a valid goal name and amount!");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Savings Goals</h2>
      <p className="mb-4">Your current savings: ${totalSavings.toFixed(2)}</p>

      {/* Goal input */}
      <input
        type="text"
        placeholder="Goal Name"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        className="border p-2 my-2 w-full rounded"
      />

      {/* Amount input */}
      <input
        type="number"
        placeholder="Goal Amount"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className="border p-2 my-2 w-full rounded"
      />

      {/* Save Goal button */}
      <button
        onClick={handleSaveGoal}
        className="bg-green-500 text-white p-2 rounded w-full hover:bg-green-600"
      >
        Set Goal
      </button>

      {/* Display existing goals */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Your Goals</h3>
        {state.savingsGoals.length > 0 ? (
          state.savingsGoals.map(
            (
              goal: {
                id: number;
                name: string;
                target: number;
                progress: number;
              },
              index: number
            ) => (
              <div
                key={index}
                className="border p-4 rounded my-2 bg-gray-100 flex justify-between"
              >
                <div>
                  <h4 className="font-bold text-lg">{goal.name}</h4>
                  <p>Target: ${goal.target.toFixed(2)}</p>
                  <p>Progress: ${goal.progress.toFixed(2)}</p>
                </div>
                <div>
                  <p
                    className={`text-sm font-semibold ${
                      goal.progress >= goal.target
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {goal.progress >= goal.target
                      ? "Goal Achieved!"
                      : "In Progress"}
                  </p>
                </div>
              </div>
            )
          )
        ) : (
          <p>No savings goals yet. Start by setting one!</p>
        )}
      </div>
    </div>
  );
};

export default SavingsGoals;
