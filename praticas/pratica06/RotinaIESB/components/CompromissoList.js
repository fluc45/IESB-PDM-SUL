import React from "react";
import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import {
  tituloLista as labelTitulo,
  listaVazia as labelVazia,
} from "../labels";

export default function CompromissoList({
  itens = [],
  onDelete,
  tituloLista,
  listaVazia,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>
        {tituloLista || labelTitulo || "Meus Compromissos"}
      </Text>

      <FlatList
        data={itens}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <View style={styles.textContainer}>
              <Text style={styles.itemText}>{item.texto}</Text>
              {item.criadoEm && (
                <Text style={styles.timeText}>Criado às: {item.criadoEm}</Text>
              )}
            </View>

            <Pressable
              style={({ pressed }) => [
                styles.deleteButton,
                pressed && styles.pressed,
              ]}
              android_ripple={{ color: "#ff8888" }}
              onPress={() => onDelete(item.id)}
            >
              <Text style={styles.deleteText}>✕</Text>
            </Pressable>
          </View>
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {listaVazia || labelVazia || "Nenhum compromisso cadastrado."}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  itemCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  textContainer: {
    flex: 1,
    marginRight: 8,
  },
  itemText: {
    fontSize: 16,
    color: "#333",
  },
  timeText: {
    fontSize: 11,
    color: "#888",
    marginTop: 2,
  },
  deleteButton: {
    backgroundColor: "#ff4d4d",
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  deleteText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  pressed: {
    opacity: 0.6,
  },
  emptyContainer: {
    padding: 20,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 14,
    color: "#888",
    fontStyle: "italic",
  },
});