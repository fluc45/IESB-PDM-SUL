import { StyleSheet, Text, View } from "react-native";
import DespesaSaida from "../components/despesa/DespesaSaida";
import SeletorCategoria from "../components/despesa/SeletorCategoria";
import {
  CATEGORIAS_DESPESA,
  useDespesas,
} from "../DespesasContext";
import { useState } from "react";

function DespesasRecentes() {
  const { despesas } = useDespesas();
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todas");

  function filtrarUltimos7Dias(despesas) {
    const hoje = new Date();
    const seteDiasAtras = new Date();
    seteDiasAtras.setDate(hoje.getDate() - 7);

    return despesas.filter((despesa) => {
      return despesa.data >= seteDiasAtras && despesa.data <= hoje;
    });
  }
  const despesasFiltradas = filtrarUltimos7Dias(despesas).filter(
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
      <DespesaSaida despesas={despesasFiltradas} periodo="Últimos 7 dias" />
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

export default DespesasRecentes;
