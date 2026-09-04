import { Image, StyleSheet, View, Text } from "react-native";
import { useState } from "react";
import MetaList from "./components/MetaList";
import MetaInput from "./components/MetaInput";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { titulo_app } from "./labels";

export default function App() {
  const [metas, setMetas] = useState([]);

  function adicionarMetaHandler(inputMeta) {
    const novaMeta = {
      id: Date.now().toString(),
      texto: inputMeta,
      criadaEm: new Date().toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMetas([...metas, novaMeta]);
  }

  function deletarMetaHandler(id) {
    console.log(id);
    const novasMetas = metas.filter((meta) => meta.id !== id);
    setMetas(novasMetas);
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.screen}>
        <View style={styles.headerContainer}>
          <Image
            style={styles.iconApp}
            source={require("./assets/favicon.png")}
          />
          <Text style={styles.headerText}>{titulo_app}</Text>
        </View>
        <View style={styles.mainContainer}>
          <MetaInput onAddMeta={adicionarMetaHandler} />

          <View style={styles.metaContainer}>
            <MetaList array={metas} onDeleteItem={deletarMetaHandler} />
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "lightgray", //#A47DAB <-- lilás
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  headerContainer: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 24,
    paddingHorizontal: 30,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  item: {
    margin: 8,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "lightblue",
  },
  iconApp: {
    width: 48,
    height: 48,
    marginRight: 50,
  },
  mainContainer: {
    marginTop: 20,
    padding: 30,
    flex: 1,
    flexDirection: "column",
  },
  metaContainer: {
    flex: 15,
  },
});
