import { Pressable, StyleSheet, Text, View } from "react-native";

function getDataFormatada(data) {
  const parsedDate = data instanceof Date ? data : new Date(data);
  return `${parsedDate.getDate()}/${parsedDate.getMonth() + 1}/${parsedDate.getFullYear()}`;
}

function DespesaItem({ item, onPress, theme, numColumns = 1 }) {
  const value = Number(item.amount ?? item.valor ?? 0);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.itemContainer,
        numColumns > 1 && styles.gridItem,
        {
          backgroundColor: theme.surface,
          borderColor: theme.border,
          opacity: pressed ? 0.85 : 1,
          shadowColor: theme.shadow,
        },
      ]}
    >
      <View style={styles.dataCategoria}>
        <Text style={[styles.data, { color: theme.muted }]}>{getDataFormatada(item.date ?? item.data)}</Text>
        <Text style={[styles.categoria, { backgroundColor: theme.primarySoft, color: theme.primary }]}>
          {item.category ?? item.categoria}
        </Text>
      </View>
      <View style={styles.detalhes}>
        <Text style={[styles.descricao, { color: theme.text }]}>{item.description ?? item.descricao}</Text>
        <Text style={[styles.valor, { color: theme.text }]}>R$ {value.toFixed(2)}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 10,
    padding: 12,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },
  gridItem: {
    flex: 1,
    marginHorizontal: 4,
  },
  dataCategoria: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  data: {
    fontSize: 12,
  },
  categoria: {
    borderRadius: 12,
    fontSize: 12,
    overflow: "hidden",
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  detalhes: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  descricao: {
    flex: 1,
    fontWeight: "700",
    marginRight: 12,
  },
  valor: {
    fontWeight: "700",
  },
});

export default DespesaItem;
