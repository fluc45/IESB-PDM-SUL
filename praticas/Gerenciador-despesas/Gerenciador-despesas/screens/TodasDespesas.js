import { StyleSheet, Text, View } from "react-native";
import DespesaSaida from "../components/despesa/DespesaSaida"

function TodasDespesas() {
  const DUMMY_DESPESAS = [
    {
      id: "1",
      descricao: "Conta de luz",
      valor: 100.99,
      data: new Date(2025, 2, 11),
    },
    {
      id: "2",
      descricao: "Conta de Agua",
      valor: 40.99,
      data: new Date(2025, 4, 10),
    },
  ];
  return (
<DespesaSaida despesas={DUMMY_DESPESAS} periodo={'Total'}/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default TodasDespesas;
