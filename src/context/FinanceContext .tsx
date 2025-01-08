import React, { createContext, useReducer, Dispatch } from "react";

type Income = {
  id: number;
  amount: number;
  source: string;
};

type Expense = {
  id: number;
  amount: number;
  category: string;
};

type FinanceState = {
  income: Income[];
  expenses: Expense[];
};

type FinanceAction =
  | { type: "ADD_INCOME"; payload: Income }
  | { type: "ADD_EXPENSE"; payload: Expense };

const initialState: FinanceState = {
  income: [],
  expenses: [],
};

const FinanceContext = createContext<{
  state: FinanceState;
  dispatch: Dispatch<FinanceAction>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

const financeReducer = (
  state: FinanceState,
  action: FinanceAction
): FinanceState => {
  switch (action.type) {
    case "ADD_INCOME":
      return { ...state, income: [...state.income, action.payload] };
    case "ADD_EXPENSE":
      return { ...state, expenses: [...state.expenses, action.payload] };
    default:
      return state;
  }
};

const FinanceProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(financeReducer, initialState);

  return (
    <FinanceContext.Provider value={{ state, dispatch }}>
      {children}
    </FinanceContext.Provider>
  );
};

export { FinanceContext, FinanceProvider };
