import React, { createContext, useReducer, ReactNode, Dispatch } from "react";

// Define types for income, expenses, and savings goals
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

type SavingsGoal = {
  id: number;
  name: string;
  target: number;
  progress: number;
};

type FinanceState = {
  income: Income[];
  expenses: Expense[];
  savingsGoals: SavingsGoal[];
};

type FinanceAction =
  | { type: "ADD_INCOME"; payload: Income }
  | { type: "ADD_EXPENSE"; payload: Expense }
  | { type: "ADD_SAVINGS_GOAL"; payload: SavingsGoal }
  | {
      type: "UPDATE_SAVINGS_PROGRESS";
      payload: { id: number; progress: number };
    };

// Initial state
const initialState: FinanceState = {
  income: [],
  expenses: [],
  savingsGoals: [],
};

// Create context
const FinanceContext = createContext<{
  state: FinanceState;
  dispatch: Dispatch<FinanceAction>;
}>(null!);

// Reducer function
const financeReducer = (
  state: FinanceState,
  action: FinanceAction
): FinanceState => {
  switch (action.type) {
    case "ADD_INCOME":
      return { ...state, income: [...state.income, action.payload] };
    case "ADD_EXPENSE":
      return { ...state, expenses: [...state.expenses, action.payload] };
    case "ADD_SAVINGS_GOAL":
      return {
        ...state,
        savingsGoals: [...state.savingsGoals, action.payload],
      };
    case "UPDATE_SAVINGS_PROGRESS":
      return {
        ...state,
        savingsGoals: state.savingsGoals.map((goal) =>
          goal.id === action.payload.id
            ? { ...goal, progress: action.payload.progress }
            : goal
        ),
      };
    default:
      return state;
  }
};

// Provider component
export const FinanceProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(financeReducer, initialState);

  return (
    <FinanceContext.Provider value={{ state, dispatch }}>
      {children}
    </FinanceContext.Provider>
  );
};

export { FinanceContext };
