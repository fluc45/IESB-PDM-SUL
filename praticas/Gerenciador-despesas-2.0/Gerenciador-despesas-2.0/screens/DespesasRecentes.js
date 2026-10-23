import { useMemo, useState } from "react";
import { StyleSheet, Text, useColorScheme, useWindowDimensions, View } from "react-native";
import DespesaSaida from "../components/despesa/DespesaSaida";
import SeletorCategoria from "../components/despesa/SeletorCategoria";
import { CATEGORIAS_DESPESA, useExpenses } from "../store/expenses-context";
import { getTheme } from "../constants/theme";

function DespesasRecentes({ navigation }) {
  const { expenses } = useExpenses();
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todas");
  const colorScheme = useColorScheme();
  const theme = getTheme(colorScheme === "dark");
  const { width } = useWindowDimensions();
  const numColumns = width > 600 ? 2 : 1;

  const despesasFiltradas = useMemo(() => {
    const hoje = new Date();
    const seteDiasAtras = new Date();
    seteDiasAtras.setDate(hoje.getDate() - 7);

    return expenses.filter((despesa) => {
      const dataDespesa = new Date(despesa.date ?? despesa.data);
      const naUltimaSemana = dataDespesa >= seteDiasAtras && dataDespesa <= hoje;
      const categoriaCorreta = categoriaSelecionada === "Todas" || despesa.category === categoriaSelecionada;
      return naUltimaSemana && categoriaCorreta;
    });
  }, [categoriaSelecionada, expenses]);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.label, { color: theme.text }]}>Filtrar por categoria</Text>
      <SeletorCategoria
        categorias={CATEGORIAS_DESPESA}
        selecionada={categoriaSelecionada}
        onSelecionar={setCategoriaSelecionada}
        incluirTodas
        theme={theme}
      />
      <DespesaSaida
        despesas={despesasFiltradas}
        periodo="Últimos 7 dias"
        onPressItem={(id) => navigation.navigate("GerenciarDespesa", { expenseId: id })}
        theme={theme}
        numColumns={numColumns}
      />
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
    fontWeight: "700",
    marginBottom: 8,
  },
});

export default DespesasRecentes;
