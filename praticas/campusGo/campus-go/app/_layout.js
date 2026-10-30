import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ExpensesContextProvider } from '../store/expenses-context';
import { TasksContextProvider } from '../store/tasks-context';
import { colors } from '../styles/theme';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ExpensesContextProvider>
        <TasksContextProvider>
          <Stack
            screenOptions={{
              headerTintColor: colors.primary,
              headerStyle: { backgroundColor: colors.surface },
              headerTitleStyle: { color: colors.text, fontWeight: '700' },
              contentStyle: { backgroundColor: colors.background },
            }}
          >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="task/[id]" options={{ title: 'Tarefa' }} />
            <Stack.Screen
              name="new-task"
              options={{ presentation: 'modal', title: 'Nova tarefa' }}
            />
          </Stack>
        </TasksContextProvider>
      </ExpensesContextProvider>
    </SafeAreaProvider>
  );
}
