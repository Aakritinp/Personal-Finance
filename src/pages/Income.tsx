import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addIncome } from "../store/financeSlice";

const Income: React.FC = () => {
  const [source, setSource] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const dispatch = useDispatch();

  const handleAddIncome = () => {
    if (source && amount > 0) {
      dispatch(addIncome({ id: Date.now(), amount, category: source }));
      setSource("");
      setAmount(0);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-blue-600">Add Income</h2>
      <div className="bg-white shadow-md p-6 rounded-lg">
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Source</label>
          <input
            type="text"
            placeholder="Enter income source"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Amount</label>
          <input
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <button
          onClick={handleAddIncome}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Add Income
        </button>
      </div>
    </div>
  );
};

export default Income;
