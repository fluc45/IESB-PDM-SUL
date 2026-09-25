import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DespesasRecentes from './screens/DespesasRecentes';
import GerenciarDespesa from './screens/GerenciarDespesa';
import TodasDespesas from './screens/TodasDespesas';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {

  const Tab = createBottomTabNavigator();

  function BottomTabScreen() {

    return (
      <Tab.Navigator>
        <Tab.Screen name="DespesasRecentes" component={DespesasRecentes}/>
        <Tab.Screen name="TodasDespesas" component={TodasDespesas}/>
      </Tab.Navigator>
    );
  }

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Despesas" component={BottomTabScreen} options={{headerShown:false}}/>
        <Stack.Screen name="GerenciarDespesa" component={GerenciarDespesa}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
