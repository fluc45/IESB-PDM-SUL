import { Image, StyleSheet, View } from "react-native";
import { useState } from "react";
import MetaList from "./components/MetaList";
import MetaInput from "./components/MetaInput";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  const [metas, setMetas] = useState([]);

  function adicionarMetaHandler(inputMeta) {
    const novaMeta = { id: Math.random().toString(), texto: inputMeta };
    setMetas([...metas, novaMeta]);
  }

  function deletarMetaHandler(id) {
    console.log(id);
    const novasMetas = metas.filter((meta) => meta.id !== id);
    setMetas(novasMetas);
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.headerContainer}>
          <Image
            style={styles.iconApp}
            source={require("./assets/favicon.png")}
          />
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
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  headerContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  item: {
    margin: 8,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "lightblue",
  },
  iconApp: {
    width: 50,
    height: 50,
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
