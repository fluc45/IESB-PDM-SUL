import { StyleSheet, View } from "react-native";
import DespesaLista from "./DespesaLista";
import DespesaSumario from "./DespesaSumario";

function DespesaSaida({ despesas, periodo, onPressItem, theme, numColumns = 1 }) {
  return (
    <View style={styles.container}>
      <DespesaSumario despesas={despesas} periodo={periodo} theme={theme} />
      <DespesaLista
        despesas={despesas}
        onPressItem={onPressItem}
        theme={theme}
        numColumns={numColumns}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default DespesaSaida;
