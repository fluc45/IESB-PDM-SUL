import { StyleSheet, View } from "react-native";
import { useState } from "react";
import MetasList from "./components/MetasList";
import MetaInput from "./components/MetaInput";

export default function App() {
  const [metas, setMetas] = useState([]);

  function adicionarMetaHandler(inputMeta) {
    const novaMeta = {id:Math.random().toString, texto: inputMeta};
    setMetas([...metas, novaMeta]);
  }

  function deletarMetaHandler(id) {
    console.log(id);
    const novasMetas = metas.filter(meta => meta.id !== id);
    setMetas(novasMetas);

  }
  
  return (
    <View style={styles.mainContainer}>
      <MetaInput onAddMeta={adicionarMetaHandler} />

      <View style={styles.metaContainer}>
        <MetasList array={metas} 
        onDeleteItem={deletarMetaHandler}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
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
  item: {
    margin: 8,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "lightblue",
  },
});
