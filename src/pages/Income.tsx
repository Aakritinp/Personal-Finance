import React, { useContext, useState } from "react";
import { FinanceContext } from "../context/FinanceContext";
import { TrashIcon, PlusCircleIcon } from "@heroicons/react/outline";

const Income: React.FC = () => {
  const { state, dispatch } = useContext(FinanceContext);
  const [amount, setAmount] = useState<number>(0);
  const [source, setSource] = useState("");
  const [date, setDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [notes, setNotes] = useState("");

  // Handle adding new income
  const handleAddIncome = () => {
    if (amount > 0 && source && date) {
      const newIncome = {
        id: Date.now(),
        amount,
        source,
        date,
        paymentMethod,
        notes,
      };
      dispatch({ type: "ADD_INCOME", payload: newIncome });

      // Reset fields
      setAmount(0);
      setSource("");
      setDate("");
      setPaymentMethod("");
      setNotes("");
      alert("Income added successfully!");
    } else {
      alert("Please fill out all required fields!");
    }
  };

  // Handle deleting an income entry
  const handleDeleteIncome = (id: number) => {
    dispatch({ type: "DELETE_INCOME", payload: id });
  };

  // Calculate total income
  const totalIncome = state.income.reduce(
    (total, item) => total + item.amount,
    0
  );

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-green-600">Income</h2>

      {/* Display Total Income */}
      <div className="mb-6 p-4 bg-green-100 border border-green-200 rounded">
        <h3 className="text-lg font-bold text-green-700">
          Total Income: ${totalIncome.toFixed(2)}
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white shadow-lg p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-4">Add New Income</h3>
          <input
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="border p-2 mb-4 w-full rounded"
          />
          <input
            type="text"
            placeholder="Source"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="border p-2 mb-4 w-full rounded"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border p-2 mb-4 w-full rounded"
          />
          <input
            type="text"
            placeholder="Payment Method"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="border p-2 mb-4 w-full rounded"
          />
          <input
            type="text"
            placeholder="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="border p-2 mb-4 w-full rounded"
          />

          <button
            onClick={handleAddIncome}
            className="bg-green-500 text-white p-2 rounded w-full flex items-center justify-center gap-2 hover:bg-green-600"
          >
            <PlusCircleIcon className="h-5 w-5" />
            Add Income
          </button>
        </div>

        <div className="bg-white shadow-lg p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-4">Income List</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border">Date</th>
                  <th className="px-4 py-2 border">Source</th>
                  <th className="px-4 py-2 border">Amount</th>
                  <th className="px-4 py-2 border">Payment Method</th>
                  <th className="px-4 py-2 border">Notes</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {state.income.map((item) => (
                  <tr key={item.id} className="text-center">
                    <td className="px-4 py-2 border">{item.date}</td>
                    <td className="px-4 py-2 border">{item.source}</td>
                    <td className="px-4 py-2 border text-green-500 font-bold">
                      ${item.amount.toFixed(2)}
                    </td>
                    <td className="px-4 py-2 border">{item.paymentMethod}</td>
                    <td className="px-4 py-2 border">{item.notes}</td>
                    <td className="px-4 py-2 border">
                      <button
                        onClick={() => handleDeleteIncome(item.id)}
                        className="text-red-500 flex items-center gap-2 hover:underline"
                      >
                        <TrashIcon className="h-5 w-5" />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {state.income.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="text-center text-gray-500 py-4 border"
                    >
                      No income records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Income;
