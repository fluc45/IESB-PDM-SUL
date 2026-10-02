import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DespesasRecentes from "./screens/DespesasRecentes";
import TodasDespesas from "./screens/TodasDespesas";
import { Ionicons } from "@expo/vector-icons"
import { NavigationContainer } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

function BottomTabScreen() {
  function BottonTabScreen(){
    return (
      <Tab.Navigator >
  
        <Tab.Screen name="DespesasRecentes" component={DespesasRecentes}
        options={{tabBarIcon: ({color, size}) => (<Ionicons name="hourglass"
        size={size} color={color} />),
        tabBarLabel: 'Recentes',
        title: 'Despesas Recentes',
        tabBarLabelStyle: { fontSize: 12 }}}
        />
        <Tab.Screen name="TodasDespesas" component={TodasDespesas}
        options={{tabBarIcon: ({color, size}) => (<Ionicons name="wallet-outline"
        size={size} color={color} />),
        tabBarLabel: 'Todas',
        title: 'Todas as Despesas',
        tabBarLabelStyle: { fontSize: 12 }}}
        />
  
      </Tab.Navigator>
    )
  }
}

export default function App() {
  return (
  <NavigationContainer>

  </NavigationContainer>);
}

const styles = StyleSheet.create({

});
