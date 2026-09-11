import { StatusBar } from "expo-status-bar"; //provavelmente não vai precisar usar, excluir se for o caso
import { StyleSheet, Text, View, Image } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { CompromissoInput } from "./components/CompromissoInput";
import { tituloApp } from "./labels";

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.screen}>
        <View style={styles.header}>
          <Image
            style={styles.headerImage}
            source={require("./assets/logo.png")}
          />
          <Text style={styles.headerText}>{tituloApp}</Text>
        </View>
        <View style={styles.main}>
          <View style={styles.input}>{CompromissoInput}</View>
          <View style={styles.list}></View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  header: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  headerImage: {
    margin: 32,
    width: 64,
    height: 64,
  },
  headerText: {
    marginLeft: "auto",
    marginRight: 85,
    fontSize: 32,
    fontWeight: "bold",
    color: "red",
  },
  main: {
    flex: 6.5,
    backgroundColor: "yellow",
  },
  input: {
    backgroundColor: "green",
  },
  list: {
    backgroundColor: "blue",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
