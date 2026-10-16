import { FlatList, StyleSheet, Text } from "react-native";
import DespesaItem from "./DespesaItem";

function DespesaLista({ despesas }) {
  return (
    <FlatList
      data={despesas}
      renderItem={DespesaItem}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={
        <Text style={styles.mensagemVazia}>
          Nenhuma despesa encontrada para esta categoria.
        </Text>
      }
    />
  );
}

const styles = StyleSheet.create({
  mensagemVazia: {
    color: "#666666",
    paddingVertical: 20,
    textAlign: "center",
  },
});

export default DespesaLista;
