import { StyleSheet, Text, View } from "react-native";

function DespesaSumario({ despesas, periodo, theme }) {
  const somaDespesas = despesas.reduce((total, despesa) => total + Number(despesa.amount ?? despesa.valor ?? 0), 0);

  return (
    <View style={[styles.container, { backgroundColor: theme.surfaceAlt, borderColor: theme.border }]}>
      <View>
        <Text style={[styles.label, { color: theme.muted }]}>{periodo}</Text>
        <Text style={[styles.quantidade, { color: theme.text }]}>{despesas.length} despesas</Text>
      </View>
      <Text style={[styles.total, { color: somaDespesas > 200 ? theme.alert : theme.primary }]}>
        R$ {somaDespesas.toFixed(2)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 4,
  },
  quantidade: {
    fontSize: 14,
    fontWeight: "700",
  },
  total: {
    fontSize: 18,
    fontWeight: "700",
  },
});

export default DespesaSumario;
