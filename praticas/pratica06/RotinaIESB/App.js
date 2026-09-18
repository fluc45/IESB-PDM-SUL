import { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, Alert } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CompromissoInput from "./components/CompromissoInput";
import CompromissoList from "./components/CompromissoList";
import { tituloApp } from "./labels";

const CHAVE_STORAGE = "@rotina_iesb_compromissos";

export default function App() {
  const [textoInput, setTextoInput] = useState("");
  const [compromissos, setCompromissos] = useState([]);
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    async function carregarDados() {
      try {
        const dadosSalvos = await AsyncStorage.getItem(CHAVE_STORAGE);
        if (dadosSalvos !== null) {
          setCompromissos(JSON.parse(dadosSalvos));
        }
      } catch (e) {
        Alert.alert("Erro", "Falha ao carregar os compromissos salvos");
      } finally {
        setCarregado(true);
      }
    }
    carregarDados();
  }, []);

  useEffect(() => {
    if (!carregado) return;

    async function salvarDados() {
      try {
        await AsyncStorage.setItem(CHAVE_STORAGE, JSON.stringify(compromissos));
      } catch (e) {
        Alert.alert("Erro", "Falha ao salvar as alterações");
      }
    }
    salvarDados();
  }, [compromissos, carregado]);

  const adicionarCompromisso = () => {
    if (textoInput.trim() === "") {
      Alert.alert("Alerta", "Por favor, insira um compromisso");
      return;
    }

    const novoItem = {
      id: Date.now().toString(),
      texto: textoInput,
      criadoEm: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setCompromissos([...compromissos, novoItem]);
    setTextoInput("");
  };

  const removerCompromisso = (id) => {
    setCompromissos((listaAtual) =>
      listaAtual.filter((item) => item.id !== id)
    );
  };

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
          <View style={styles.input}>
            <CompromissoInput
              value={textoInput}
              onChangeText={setTextoInput}
              onAdd={adicionarCompromisso}
            />
          </View>
          <View style={styles.list}>
            <CompromissoList
              itens={compromissos}
              onDelete={removerCompromisso}
            />
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f2f2f1",
  },
  header: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  headerImage: {
    width: 48,
    height: 48,
    marginRight: 12,
  },
  headerText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#c41200",
  },
  main: {
    flex: 6.5,
  },
  input: {
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  list: {
    flex: 1,
  },
});