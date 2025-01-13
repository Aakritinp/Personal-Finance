import React, {
  createContext,
  useReducer,
  ReactNode,
  Dispatch,
  useEffect,
} from "react";

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
  progress: number;
  id: number;
  goal: string;
  amount: number;
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
  | { type: "SET_INITIAL_STATE"; payload: FinanceState };

const initialState: FinanceState = {
  income: [],
  expenses: [],
  savingsGoals: [],
};

const FinanceContext = createContext<{
  state: FinanceState;
  dispatch: Dispatch<FinanceAction>;
}>(null!);

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
    case "SET_INITIAL_STATE":
      return action.payload;
    default:
      return state;
  }
};

export const FinanceProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(financeReducer, initialState);

  useEffect(() => {
    const storedData = localStorage.getItem("financeData");
    if (storedData) {
      dispatch({ type: "SET_INITIAL_STATE", payload: JSON.parse(storedData) });
    }
  }, []);

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
