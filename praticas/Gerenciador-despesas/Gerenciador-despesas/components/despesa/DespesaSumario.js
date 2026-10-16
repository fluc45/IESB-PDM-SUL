import { Text, View, StyleSheet } from "react-native";

function DespesaSumario({despesas, periodo}) {
  const somaDespesas = despesas.reduce((total, despesa) => {
    return total + despesa.valor;
  }, 0);
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>{periodo}</Text>
      <Text style={styles.texto}>R$ {somaDespesas.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: '#888888',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  texto: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default DespesaSumario;
