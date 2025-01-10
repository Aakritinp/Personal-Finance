import React, { useContext, useState } from "react";
import { FinanceContext } from "../context/FinanceContext";

const Income: React.FC = () => {
  const { dispatch } = useContext(FinanceContext);
  const [source, setSource] = useState("");
  const [amount, setAmount] = useState<number>(0);

  const handleAddIncome = () => {
    dispatch({
      type: "ADD_INCOME",
      payload: { id: Date.now(), source, amount },
    });
    setSource("");
    setAmount(0);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Income</h2>
      <input
        type="text"
        placeholder="Source"
        value={source}
        onChange={(e) => setSource(e.target.value)}
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
        onClick={handleAddIncome}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Add Income
      </button>
    </div>
  );
};

export default Income;
