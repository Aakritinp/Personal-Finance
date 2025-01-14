import React, { useState, useContext } from "react";
import { FinanceContext } from "../context/FinanceContext";

const Expenses: React.FC = () => {
  const { state, dispatch } = useContext(FinanceContext);

  const [amount, setAmount] = useState<number>(0);
  const [category, setCategory] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [tax, setTax] = useState<number>(0);

  const handleAddExpense = () => {
    if (amount > 0 && category && date && paymentMethod) {
      const newExpense = {
        id: Date.now(),
        amount,
        category,
        date,
        paymentMethod,
        notes,
        tax,
      };

      dispatch({ type: "ADD_EXPENSE", payload: newExpense });

      // Clear form
      setAmount(0);
      setCategory("");
      setDate("");
      setPaymentMethod("");
      setNotes("");
      setTax(0);

      alert("Expense added successfully!");
    } else {
      alert("Please fill in all required fields!");
    }
  };

  const handleDeleteExpense = (id: number) => {
    dispatch({ type: "DELETE_EXPENSE", payload: id });
    alert("Expense deleted successfully!");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Expenses</h2>

      {/* Add Expense Form */}
      <div className="mb-6 bg-white shadow-md rounded-lg p-6">
        <h3 className="text-lg font-bold mb-4">Add Expense</h3>

        <div className="grid grid-cols-2 gap-4">
          <input
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Payment Method"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Notes (optional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>

        <button
          onClick={handleAddExpense}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Add Expense
        </button>
      </div>

      {/* Expenses Table */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-lg font-bold mb-4">Expenses List</h3>

        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Category</th>
              <th className="border px-4 py-2">Amount</th>
              <th className="border px-4 py-2">Payment Method</th>
              <th className="border px-4 py-2">Notes</th>

              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {state.expenses.map((expense) => (
              <tr key={expense.id} className="text-center">
                <td className="border px-4 py-2">{expense.date}</td>
                <td className="border px-4 py-2">{expense.category}</td>
                <td className="border px-4 py-2 text-red-500 font-bold">
                  ${expense.amount.toFixed(2)}
                </td>
                <td className="border px-4 py-2">{expense.paymentMethod}</td>
                <td className="border px-4 py-2">{expense.notes || "N/A"}</td>

                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleDeleteExpense(expense.id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Expenses;
