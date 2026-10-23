import {
  CATEGORIES,
  CATEGORIAS_DESPESA,
  ExpensesContextProvider,
  useExpenses,
} from "./store/expenses-context";

export { CATEGORIES, CATEGORIAS_DESPESA, ExpensesContextProvider };

export function DespesasProvider({ children }) {
  return <ExpensesContextProvider>{children}</ExpensesContextProvider>;
}

export function useDespesas() {
  return useExpenses();
}
