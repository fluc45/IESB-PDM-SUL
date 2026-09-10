import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import {
  placeholder_input,
  texto_botao,
  titulo_app,
  titulo_lista,
} from "./labels";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.titulo}>
        <Text style={styles.textoTitulo}>{titulo_app}</Text>
      </View>
      <TextInput
        style={styles.textInput}
        placeholder={placeholder_input}
      ></TextInput>
      <View style={styles.container}>
        <Button style={styles.botao} title={texto_botao} />
      </View>
      <View style={styles.lista}>
      <Text> {titulo_lista}</Text>
        <Text style={styles.itemLista}>Matéria 1</Text>
        <Text style={styles.itemLista}>Matéria 2</Text>
        <Text style={styles.itemLista}>Matéria 3</Text>
        <Text style={styles.itemLista}>Matéria 4</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  botao: {
    width: "27.5%",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center", //centraliza botao no meio do container
    padding: 16,
  },
  itemLista: {
    backgroundColor: "lightblue",
    margin: 8,
    padding: 8,
    width: "80%",
  },
  lista: {
    flex: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 16,
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  titulo: {
    alignItems: "center",
    padding: 20,
  },
  textoTitulo: {
    fontSize: 20,
    fontWeight: "bold",
  },
  textInput: {
    flexDirection: "row",
    alignSelf: "center", //centralizar sem precisar de um container
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 8,
    textAlign: "center",
    width: "70%",
  },
});
// como a maioria dos elementos é centralizado em relação ao eixo y, utiliza-se o alignItems ao invés de justifyContent