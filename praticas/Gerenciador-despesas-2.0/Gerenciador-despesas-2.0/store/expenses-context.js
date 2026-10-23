import { createContext, useContext, useEffect, useReducer, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@expenses";

const INITIAL_EXPENSES = [];

export const CATEGORIES = ["Alimentação", "Transporte", "Lazer", "Contas"];
export const CATEGORIAS_DESPESA = CATEGORIES;

export const ExpensesContext = createContext(null);

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [{ ...action.payload, id: String(action.payload.id ?? Date.now()) }, ...state];
    case "UPDATE":
      return state.map((item) =>
        item.id === action.payload.id ? { ...item, ...action.payload.data } : item
      );
    case "DELETE":
      return state.filter((item) => item.id !== action.payload);
    case "SET":
      return action.payload;
    default:
      return state;
  }
}

export function ExpensesContextProvider({ children }) {
  const [expenses, dispatch] = useReducer(expensesReducer, INITIAL_EXPENSES);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function loadExpenses() {
      try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);

        if (json) {
          const saved = JSON.parse(json).map((item) => ({
            ...item,
            date: item.date ? new Date(item.date) : new Date(),
            amount: Number(item.amount ?? item.valor ?? 0),
            description: item.description ?? item.descricao ?? "",
            category: item.category ?? item.categoria ?? "",
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

  useEffect(() => {
    if (!isLoaded) return;

    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(expenses)).catch((error) => {
      console.log("Erro ao salvar despesas", error);
    });
  }, [expenses, isLoaded]);

  const addExpense = (data) => dispatch({ type: "ADD", payload: data });
  const updateExpense = (id, data) =>
    dispatch({ type: "UPDATE", payload: { id, data } });
  const deleteExpense = (id) => dispatch({ type: "DELETE", payload: id });
  const setExpenses = (data) => dispatch({ type: "SET", payload: data });

  const value = { expenses, addExpense, updateExpense, deleteExpense, setExpenses };

  return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>;
}

export function useExpenses() {
  const context = useContext(ExpensesContext);

  if (!context) {
    throw new Error("Faltou o ExpensesContextProvider");
  }

  return context;
}
