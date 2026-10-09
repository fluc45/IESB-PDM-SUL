import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DespesasRecentes from "./screens/DespesasRecentes";
import GerenciarDespesa from "./screens/GerenciarDespesa";
import TodasDespesas from "./screens/TodasDespesas";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "./components/IconButton";

const Tab = createBottomTabNavigator();

export default function App() {
  function BottomTabScreen() {
    const navigation = useNavigation();

    return (
      <Tab.Navigator
        screenOptions={{ headerRight: () => 
            <IconButton
              icon="add"
              size={24}
              onPress={() => {
                
              }}
            />
        
        }}
        >
        <Tab.Screen
          name="DespesasRecentes"
          component={DespesasRecentes}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="hourglass" size={size} color={color} />
              ),
              tabBarLabel: "Recentes",
              title: "Despesas Recentes",
              tabBarLabelStyle: { fontSize: 12 },
            }}
            />
        <Tab.Screen
          name="TodasDespesas"
          component={TodasDespesas}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="wallet-outline" size={size} color={color} />
              ),
              tabBarLabel: "Todas",
              title: "Todas as Despesas",
              tabBarLabelStyle: { fontSize: 12 },
            }}
            />
      </Tab.Navigator>
    );
  }}
  {
  
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Despesas" component={BottomTabScreen} />
        <Stack.Screen name="GerenciarDespesas" component={GerenciarDespesa} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
