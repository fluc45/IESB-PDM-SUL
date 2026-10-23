import { useMemo, useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  useWindowDimensions,
  View,
} from "react-native";
import DespesaSaida from "../components/despesa/DespesaSaida";
import SeletorCategoria from "../components/despesa/SeletorCategoria";
import { CATEGORIAS_DESPESA, useExpenses } from "../store/expenses-context";
import { useDebounce } from "../hooks/useDebounce";
import { getTheme } from "../constants/theme";

function TodasDespesas({ navigation }) {
  const { expenses, setExpenses } = useExpenses();
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todas");
  const [termoBusca, setTermoBusca] = useState("");
  const [buscaDebounced] = useDebounce(termoBusca, 200);
  const colorScheme = useColorScheme();
  const theme = getTheme(colorScheme === "dark");
  const { width } = useWindowDimensions();
  const numColumns = width > 600 ? 2 : 1;

  const despesasFiltradas = useMemo(() => {
    const textoBusca = buscaDebounced.trim().toLowerCase();

    return expenses.filter((despesa) => {
      const description = (despesa.description ?? despesa.descricao ?? "").toLowerCase();
      const categoriaCorreta =
        categoriaSelecionada === "Todas" || despesa.category === categoriaSelecionada;
      const buscaCorresponde = !textoBusca || description.includes(textoBusca);

      return categoriaCorreta && buscaCorresponde;
    });
  }, [buscaDebounced, categoriaSelecionada, expenses]);

  const handleClearAll = () => {
    Alert.alert(
      "Limpar todas as despesas",
      "Esta ação não pode ser desfeita. Deseja continuar?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Limpar tudo",
          style: "destructive",
          onPress: () => setExpenses([]),
        },
      ],
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.label, { color: theme.text }]}>Buscar despesa</Text>
      <TextInput
        value={termoBusca}
        onChangeText={setTermoBusca}
        placeholder="Buscar por descrição"
        placeholderTextColor={theme.muted}
        style={[
          styles.input,
          {
            backgroundColor: theme.surface,
            borderColor: theme.border,
            color: theme.text,
          },
        ]}
      />
      <Text style={[styles.label, { color: theme.text }]}>Filtrar por categoria</Text>
      <SeletorCategoria
        categorias={CATEGORIAS_DESPESA}
        selecionada={categoriaSelecionada}
        onSelecionar={setCategoriaSelecionada}
        incluirTodas
        theme={theme}
      />
      {expenses.length > 0 ? (
        <Pressable
          accessibilityRole="button"
          onPress={handleClearAll}
          style={({ pressed }) => [
            styles.clearButton,
            { borderColor: theme.alert, opacity: pressed ? 0.75 : 1 },
          ]}
        >
          <Text style={[styles.clearButtonText, { color: theme.alert }]}>
            Limpar todas as despesas
          </Text>
        </Pressable>
      ) : null}
      <DespesaSaida
        despesas={despesasFiltradas}
        periodo="Total"
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
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  clearButton: {
    alignSelf: "flex-end",
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  clearButtonText: {
    fontSize: 13,
    fontWeight: "700",
  },
});

export default TodasDespesas;
