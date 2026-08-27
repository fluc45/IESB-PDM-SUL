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
    width: "25%",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 16,
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
    justifyContent: "flex-start",
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
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 8,
    textAlign: "center",
    width: "70%",
  },
});
