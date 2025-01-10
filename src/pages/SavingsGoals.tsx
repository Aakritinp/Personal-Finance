import React, { useContext, useState } from "react";
import { FinanceContext } from "../context/FinanceContext";

const SavingsGoals: React.FC = () => {
  const { state } = useContext(FinanceContext);
  const [goal, setGoal] = useState("");
  const [amount, setAmount] = useState<number>(0);

  const totalSavings =
    state.income.reduce((sum, inc) => sum + inc.amount, 0) -
    state.expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Savings Goals</h2>
      <p>Your current savings: ${totalSavings}</p>
      <input
        type="text"
        placeholder="Goal Name"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        className="border p-2 my-2 w-full"
      />
      <input
        type="number"
        placeholder="Goal Amount"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className="border p-2 my-2 w-full"
      />
      <button className="bg-green-500 text-white p-2 rounded">Set Goal</button>
    </div>
  );
};

export default SavingsGoals;
