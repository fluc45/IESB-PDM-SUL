import { Pressable, StyleSheet, Text, View } from "react-native";

function SeletorCategoria({
  categorias,
  selecionada,
  onSelecionar,
  incluirTodas = false,
}) {
  const opcoes = incluirTodas ? ["Todas", ...categorias] : categorias;

  return (
    <View style={styles.container}>
      {opcoes.map((categoria) => {
        const ativa = categoria === selecionada;

        return (
          <Pressable
            key={categoria}
            accessibilityRole="button"
            accessibilityState={{ selected: ativa }}
            onPress={() => onSelecionar(categoria)}
            style={[styles.opcao, ativa && styles.opcaoSelecionada]}
          >
            <Text style={[styles.textoOpcao, ativa && styles.textoSelecionado]}>
              {categoria}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  opcao: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#eeeeee",
  },
  opcaoSelecionada: {
    backgroundColor: "#2f6fed",
  },
  textoOpcao: {
    color: "#333333",
    fontSize: 13,
  },
  textoSelecionado: {
    color: "#ffffff",
    fontWeight: "bold",
  },
});

export default SeletorCategoria;
