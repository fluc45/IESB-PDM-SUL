import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

function MetaList({ metas, onDelete, onToggleConcluida }) {
  return (
    <FlatList
      data={metas}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContent}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Nenhuma meta cadastrada ainda.</Text>
        </View>
      }
      renderItem={({ item }) => (
        <View style={[styles.item, item.concluida && styles.itemConcluida]}>
          <Pressable
            style={styles.itemButton}
            android_ripple={{ color: "rgba(122, 77, 155, 0.18)" }}
            onPress={() => onToggleConcluida(item.id)}
          >
            <View style={styles.textContainer}>
              <Text style={[styles.metaText, item.concluida && styles.metaTextConcluida]}>
                {item.texto}
              </Text>
              <Text style={styles.metaDate}>{item.criadaEm}</Text>
            </View>
          </Pressable>

          <Pressable
            style={styles.deleteButton}
            android_ripple={{ color: "rgba(255,255,255,0.25)" }}
            onPress={() => onDelete(item.id)}
          >
            <Text style={styles.deleteText}>Excluir</Text>
          </Pressable>
        </View>
      )}
    />
  );
}

export default MetaList;

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 20,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 6,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e6dff2",
    overflow: "hidden",
  },
  itemConcluida: {
    backgroundColor: "#f3ecf9",
  },
  itemButton: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  textContainer: {
    flex: 1,
  },
  metaText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2e1f41",
  },
  metaTextConcluida: {
    textDecorationLine: "line-through",
    color: "#7d6b8c",
  },
  metaDate: {
    marginTop: 6,
    fontSize: 12,
    color: "#6f617d",
  },
  deleteButton: {
    backgroundColor: "#c25d5d",
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: 12,
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 10,
    textAlign: "center",
  },
  emptyContainer: {
    paddingVertical: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    color: "#6a5a7d",
    fontSize: 16,
    textAlign: "center",
  },
});