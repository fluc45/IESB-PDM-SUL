import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import { Alert } from 'react-native';

const STORAGE_KEY = '@campus-tasks';
const TasksContext = createContext(null);

function tasksReducer(state, action) {
  switch (action.type) {
    case 'SET':
      return action.tasks;
    case 'ADD':
      return [action.task, ...state];
    case 'TOGGLE':
      return state.map((task) =>
        task.id === action.id ? { ...task, completed: !task.completed } : task,
      );
    case 'DELETE':
      return state.filter((task) => task.id !== action.id);
    default:
      return state;
  }
}

export function TasksContextProvider({ children }) {
  const [tasks, dispatch] = useReducer(tasksReducer, []);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    let active = true;

    async function restoreTasks() {
      try {
        const savedTasks = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedTasks) {
          const parsedTasks = JSON.parse(savedTasks);
          if (!Array.isArray(parsedTasks)) {
            throw new Error('Os dados salvos de tarefas estão em formato inválido.');
          }
          if (active) dispatch({ type: 'SET', tasks: parsedTasks });
        }
      } catch (error) {
        console.error('Não foi possível carregar as tarefas salvas.', error);
        Alert.alert('Tarefas indisponíveis', 'Não foi possível carregar suas tarefas salvas.');
      } finally {
        if (active) setIsHydrated(true);
      }
    }

    restoreTasks();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)).catch((error) => {
      console.error('Não foi possível salvar as tarefas.', error);
      Alert.alert('Falha ao salvar', 'Suas alterações não puderam ser salvas no dispositivo.');
    });
  }, [isHydrated, tasks]);

  const addTask = useCallback((title, description) => {
    const task = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      title: title.trim(),
      description: description.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };
    dispatch({ type: 'ADD', task });
    return task.id;
  }, []);

  const toggleTask = useCallback((id) => dispatch({ type: 'TOGGLE', id }), []);
  const deleteTask = useCallback((id) => dispatch({ type: 'DELETE', id }), []);
  const value = useMemo(
    () => ({ tasks, addTask, toggleTask, deleteTask, isHydrated }),
    [tasks, addTask, toggleTask, deleteTask, isHydrated],
  );

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>;
}

export function useTasks() {
  const context = useContext(TasksContext);
  if (!context) throw new Error('useTasks deve ser usado dentro de TasksContextProvider.');
  return context;
}
