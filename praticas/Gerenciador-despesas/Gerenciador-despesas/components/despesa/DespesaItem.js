import { View, Text, StyleSheet } from "react-native";

function getDataFormatada(data) {
  return (
    data.getDate() + "/" + (data.getMonth() + 1) + "/" + data.getFullYear()
  );
}

function DespesaItem({ item }) {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.dataCategoria}>
        <Text style={styles.data}>{getDataFormatada(item.data)}</Text>
        <Text style={styles.categoria}>{item.categoria}</Text>
      </View>
      <View style={styles.detalhes}>
        <Text style={styles.descricao}>{item.descricao}</Text>
        <Text style={styles.valor}>R$ {item.valor.toFixed(2)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    padding: 12,
    marginVertical: 5,
    backgroundColor: "#f4f4f4",
    borderRadius: 8,
  },
  dataCategoria: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  data: {
    color: "#555555",
    fontSize: 12,
  },
  categoria: {
    backgroundColor: "#e0e0e0",
    borderRadius: 12,
    color: "#333333",
    fontSize: 12,
    overflow: "hidden",
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  detalhes: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  descricao: {
    flex: 1,
    fontWeight: "bold",
    marginRight: 12,
  },
  valor: {
    fontWeight: "bold",
  },
});

export default DespesaItem;
