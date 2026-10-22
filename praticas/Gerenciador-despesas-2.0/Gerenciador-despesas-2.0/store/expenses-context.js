import { createContext, useContext, useReducer } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@expenses";

export const ExpensesContext = createContext(null);
/** Recebe a lista atual + a ação e devolve a lista nova. */
function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [{ ...action.payload, id: Date.now().toString() }, ...state];
    case "UPDATE":
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, ...action.payload.data }
          : item
      );
    case "DELETE":
      return state.filter((item) => item.id !== action.payload);
    case "SET":
      return action.payload;
    default:
      return state;
  }
}

/** Guarda as despesas e oferece as ações para todas as telas. */
export function ExpensesContextProvider({ children }) {
  const [expenses, dispatch] = useReducer(expensesReducer, []);

  // --- INÍCIO DO CÓDIGO DE PERSISTÊNCIA ---
  const [isLoaded, setIsLoaded] = useState(false);

  // 1. Carregar ao abrir
  useEffect(() => {
    async function loadExpenses() {
      try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        if (json) {
          const saved = JSON.parse(json).map((item) => ({
            ...item,
            date: new Date(item.date), // converte o texto do JSON de volta para Date
          }));
          dispatch({ type: "SET", payload: saved });
        }
      } catch (error) {
        console.log("Erro ao carregar despesas", error);
      } finally {
        setIsLoaded(true);
      }
    }
    loadExpenses();
  }, []);

  // 2. Salvar a cada mudança
  useEffect(() => {
    if (!isLoaded) return; // evita sobrescrever os dados salvos com array vazio ao iniciar
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  }, [expenses, isLoaded]);
  // --- FIM DO CÓDIGO DE PERSISTÊNCIA ---

  const addExpense = (data) => dispatch({ type: "ADD", payload: data });
  const updateExpense = (id, data) =>
    dispatch({ type: "UPDATE", payload: { id, data } });
  const deleteExpense = (id) => dispatch({ type: "DELETE", payload: id });
  const value = { expenses, addExpense, updateExpense, deleteExpense };
  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}
/** Atalho para usar o contexto em qualquer tela. */
export function useExpenses() {
  const context = useContext(ExpensesContext);
  if (!context) throw new Error("Faltou o ExpensesContextProvider");
  return context;
}
