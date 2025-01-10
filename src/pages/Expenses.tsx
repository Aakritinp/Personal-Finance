import React, { useContext, useState } from "react";
import { FinanceContext } from "../context/FinanceContext";

const Expenses: React.FC = () => {
  const { dispatch } = useContext(FinanceContext);
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState<number>(0);

  const handleAddExpense = () => {
    dispatch({
      type: "ADD_EXPENSE",
      payload: { id: Date.now(), category, amount },
    });
    setCategory("");
    setAmount(0);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Expenses</h2>
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 my-2 w-full"
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className="border p-2 my-2 w-full"
      />
      <button
        onClick={handleAddExpense}
        className="bg-red-500 text-white p-2 rounded"
      >
        Add Expense
      </button>
    </div>
  );
};

export default Expenses;
