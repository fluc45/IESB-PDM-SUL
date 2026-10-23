import { FlatList, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DespesaItem from "./DespesaItem";

function DespesaLista({ despesas, onPressItem, theme, numColumns = 1 }) {
  return (
    <FlatList
      key={numColumns}
      data={despesas}
      numColumns={numColumns}
      keyExtractor={(item) => item.id}
      contentContainerStyle={[styles.listContent, numColumns > 1 && styles.gridContent]}
      columnWrapperStyle={numColumns > 1 ? styles.gridRow : undefined}
      renderItem={({ item }) => (
        <DespesaItem
          item={item}
          onPress={() => onPressItem?.(item.id)}
          theme={theme}
          numColumns={numColumns}
        />
      )}
      ListEmptyComponent={
        <View style={[styles.emptyState, { backgroundColor: theme.surface, borderColor: theme.border }]}>
          <Ionicons name="wallet-outline" size={32} color={theme.primary} />
          <Text style={[styles.emptyTitle, { color: theme.text }]}>Nenhuma despesa.</Text>
          <Text style={[styles.emptyText, { color: theme.muted }]}>Toque em + para adicionar.</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 20,
  },
  gridContent: {
    paddingHorizontal: 4,
  },
  gridRow: {
    justifyContent: "space-between",
  },
  emptyState: {
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 16,
    marginTop: 16,
    padding: 24,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginTop: 12,
  },
  emptyText: {
    marginTop: 6,
    textAlign: "center",
  },
});

export default DespesaLista;
