import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addExpense } from "../store/financeSlice";

const Expenses: React.FC = () => {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const dispatch = useDispatch();

  const handleAddExpense = () => {
    dispatch(addExpense({ id: Date.now(), amount, category }));
    setCategory("");
    setAmount(0);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Add Expense</h2>
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <input
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className="border p-2 w-full mb-2"
      />

      <button
        onClick={handleAddExpense}
        className="bg-red-500 text-white py-2 px-4 rounded"
      >
        Add Expense
      </button>
    </div>
  );
};

export default Expenses;
