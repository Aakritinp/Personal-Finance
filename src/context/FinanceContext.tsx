import React, {
  createContext,
  useReducer,
  ReactNode,
  Dispatch,
  useEffect,
} from "react";

// Define the types for your data
type Income = {
  id: number;
  amount: number;
  source: string;
  date: string;
  paymentMethod?: string;
  notes?: string;
};

type Expense = {
  paymentMethod: ReactNode;
  id: number;
  amount: number;
  category: string;
  date: string;
  notes?: string;
};

type SavingsGoal = {
  title: ReactNode;
  name: ReactNode;
  target: number;
  id: number;
  goal: string;
  amount: number;
  progress: number;
};

// Define the structure of the finance state
type FinanceState = {
  income: Income[];
  expenses: Expense[];
  savingsGoals: SavingsGoal[];
};

// Define the possible actions for the reducer
type FinanceAction =
  | { type: "ADD_INCOME"; payload: Income }
  | { type: "DELETE_INCOME"; payload: number }
  | { type: "ADD_EXPENSE"; payload: Expense }
  | { type: "DELETE_EXPENSE"; payload: number }
  | { type: "ADD_SAVINGS_GOAL"; payload: SavingsGoal }
  | { type: "DELETE_SAVINGS_GOAL"; payload: number }
  | { type: "SET_INITIAL_STATE"; payload: FinanceState };

// Define the initial state
const initialState: FinanceState = {
  income: [],
  expenses: [],
  savingsGoals: [],
};

// Create the context
const FinanceContext = createContext<{
  state: FinanceState;
  dispatch: Dispatch<FinanceAction>;
}>(null!);

// Reducer function to handle state updates
const financeReducer = (
  state: FinanceState,
  action: FinanceAction
): FinanceState => {
  switch (action.type) {
    case "ADD_INCOME":
      return {
        ...state,
        income: [...state.income, action.payload],
      };
    case "DELETE_INCOME":
      return {
        ...state,
        income: state.income.filter((item) => item.id !== action.payload),
      };

    case "ADD_EXPENSE":
      return { ...state, expenses: [...state.expenses, action.payload] };
    case "DELETE_EXPENSE":
      return {
        ...state,
        expenses: state.expenses.filter(
          (expense) => expense.id !== action.payload
        ),
      };
    case "ADD_SAVINGS_GOAL":
      return {
        ...state,
        savingsGoals: [...state.savingsGoals, action.payload],
      };
    case "DELETE_SAVINGS_GOAL":
      return {
        ...state,
        savingsGoals: state.savingsGoals.filter(
          (goal) => goal.id !== action.payload
        ),
      };
    case "SET_INITIAL_STATE":
      return action.payload;
    default:
      return state;
  }
};

// Create the provider component
export const FinanceProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(financeReducer, initialState);

  // Load data from localStorage on mount
  useEffect(() => {
    const storedData = localStorage.getItem("financeData");
    if (storedData) {
      dispatch({ type: "SET_INITIAL_STATE", payload: JSON.parse(storedData) });
    }
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem("financeData", JSON.stringify(state));
  }, [state]);

  return (
    <FinanceContext.Provider value={{ state, dispatch }}>
      {children}
    </FinanceContext.Provider>
  );
};

export { FinanceContext };
