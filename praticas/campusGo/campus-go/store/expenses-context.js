import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import { Alert } from 'react-native';

const STORAGE_KEY = '@expenses';
const ExpensesContext = createContext(null);
export const CATEGORIES = ['Alimentação', 'Transporte', 'Lazer', 'Contas'];
export const CATEGORIAS_DESPESA = CATEGORIES;

function normalizeExpense(expense) {
  const parsedDate = expense.date ?? expense.data;
  const date = parsedDate ? new Date(parsedDate) : new Date();

  return {
    ...expense,
    id: String(expense.id ?? Date.now()),
    date: Number.isNaN(date.getTime()) ? new Date() : date,
    amount: Number(expense.amount ?? expense.valor ?? 0),
    description: expense.description ?? expense.descricao ?? '',
    category: expense.category ?? expense.categoria ?? '',
  };
}

function expensesReducer(state, action) {
  switch (action.type) {
    case 'SET':
      return action.payload;
    case 'ADD':
      return [normalizeExpense(action.payload), ...state];
    case 'UPDATE':
      return state.map((expense) =>
        expense.id === action.payload.id
          ? normalizeExpense({ ...expense, ...action.payload.data, id: expense.id })
          : expense,
      );
    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

export function ExpensesContextProvider({ children }) {
  const [expenses, dispatch] = useReducer(expensesReducer, []);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    let active = true;

    async function restoreExpenses() {
      try {
        const savedExpenses = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedExpenses) {
          const parsedExpenses = JSON.parse(savedExpenses);
          if (!Array.isArray(parsedExpenses)) {
            throw new Error('Os dados salvos de despesas estão em formato inválido.');
          }
          if (active) {
            dispatch({ type: 'SET', payload: parsedExpenses.map(normalizeExpense) });
          }
        }
      } catch (error) {
        console.error('Não foi possível carregar as despesas salvas.', error);
        Alert.alert('Despesas indisponíveis', 'Não foi possível carregar suas despesas salvas.');
      } finally {
        if (active) setIsHydrated(true);
      }
    }

    restoreExpenses();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(expenses)).catch((error) => {
      console.error('Não foi possível salvar as despesas.', error);
      Alert.alert('Falha ao salvar', 'Suas despesas não puderam ser salvas no dispositivo.');
    });
  }, [expenses, isHydrated]);

  const addExpense = useCallback((expense) => {
    dispatch({ type: 'ADD', payload: expense });
  }, []);
  const updateExpense = useCallback((id, data) => {
    dispatch({ type: 'UPDATE', payload: { id: String(id), data } });
  }, []);
  const deleteExpense = useCallback((id) => dispatch({ type: 'DELETE', payload: String(id) }), []);
  const setExpenses = useCallback((items) => {
    if (!Array.isArray(items)) {
      throw new Error('A lista de despesas precisa ser um array.');
    }
    dispatch({ type: 'SET', payload: items.map(normalizeExpense) });
  }, []);
  const value = useMemo(
    () => ({ expenses, addExpense, updateExpense, deleteExpense, setExpenses, isHydrated }),
    [expenses, addExpense, updateExpense, deleteExpense, setExpenses, isHydrated],
  );

  return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>;
}

export function useExpenses() {
  const context = useContext(ExpensesContext);
  if (!context) throw new Error('useExpenses deve ser usado dentro de ExpensesContextProvider.');
  return context;
}
