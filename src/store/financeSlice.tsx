import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Transaction = {
  id: number;
  amount: number;
  category: string | null;
};

type FinanceState = {
  income: Transaction[];
  expenses: Transaction[];
};

const initialState: FinanceState = {
  income: [],
  expenses: [],
};

const financeSlice = createSlice({
  name: "finance",
  initialState,
  reducers: {
    addIncome: (state, action: PayloadAction<Transaction>) => {
      state.income.push(action.payload);
    },
    addExpense: (state, action: PayloadAction<Transaction>) => {
      state.expenses.push(action.payload);
    },
  },
});

export const { addIncome, addExpense } = financeSlice.actions;
export default financeSlice.reducer;
