import React, { useContext, useState } from "react";
import { FinanceContext } from "../context/FinanceContext";

const Income: React.FC = () => {
  const { dispatch } = useContext(FinanceContext);
  const [source, setSource] = useState("");
  const [amount, setAmount] = useState<number>(0);

  const handleAddIncome = () => {
    if (source && amount > 0) {
      const newIncome = { id: Date.now(), source, amount };
      dispatch({ type: "ADD_INCOME", payload: newIncome });
      alert(`Income of $${amount} from "${source}" added!`);
      setSource("");
      setAmount(0);
    } else {
      alert("Please provide valid income details!");
    }
  };

  return (
    <div className="bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add Income</h2>
      <input
        type="text"
        placeholder="Source"
        value={source}
        onChange={(e) => setSource(e.target.value)}
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
        onClick={handleAddIncome}
        className="bg-green-500 text-white p-2 rounded w-full hover:bg-green-600"
      >
        Add Income
      </button>
    </div>
  );
};

export default Income;
