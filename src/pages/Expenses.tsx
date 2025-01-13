import React, { useContext, useState } from "react";
import { FinanceContext } from "../context/FinanceContext";

const Expenses: React.FC = () => {
  const { dispatch } = useContext(FinanceContext);
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState<number>(0);

  const handleAddExpense = () => {
    if (category && amount > 0) {
      const newExpense = { id: Date.now(), category, amount };
      dispatch({ type: "ADD_EXPENSE", payload: newExpense });
      alert(`Expense of $${amount} for "${category}" added!`);
      setCategory("");
      setAmount(0);
    } else {
      alert("Please provide valid expense details!");
    }
  };

  return (
    <div className="bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add Expense</h2>
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 mb-4 w-full rounded"
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className="border p-2 mb-4 w-full rounded"
      />
      <button
        onClick={handleAddExpense}
        className="bg-red-500 text-white p-2 rounded w-full hover:bg-red-600"
      >
        Add Expense
      </button>
    </div>
  );
};

export default Expenses;
