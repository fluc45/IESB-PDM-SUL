import { StyleSheet, Text, View } from "react-native";
import DespesaSaida from "../components/despesa/DespesaSaida"
import SeletorCategoria from "../components/despesa/SeletorCategoria";
import {
  CATEGORIAS_DESPESA,
  useDespesas,
} from "../DespesasContext";
import { useState } from "react";

function TodasDespesas() {
  const { despesas } = useDespesas();
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todas");
  const despesasFiltradas = despesas.filter(
    (despesa) =>
      categoriaSelecionada === "Todas" ||
      despesa.categoria === categoriaSelecionada,
  );

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Filtrar por categoria</Text>
      <SeletorCategoria
        categorias={CATEGORIAS_DESPESA}
        selecionada={categoriaSelecionada}
        onSelecionar={setCategoriaSelecionada}
        incluirTodas
      />
      <DespesaSaida despesas={despesasFiltradas} periodo="Total" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
  },
});

export default TodasDespesas;
