import { Pressable, StyleSheet, Text, View } from "react-native";

function SeletorCategoria({
  categorias,
  selecionada,
  onSelecionar,
  incluirTodas = false,
  theme,
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
            style={[
              styles.opcao,
              {
                backgroundColor: ativa ? theme.primary : theme.chip,
              },
            ]}
          >
            <Text style={[styles.textoOpcao, { color: ativa ? "#fff" : theme.chipText }]}>
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
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  textoOpcao: {
    fontSize: 13,
    fontWeight: "600",
  },
});

export default SeletorCategoria;
