import { StatusBar } from "expo-status-bar"; //provavelmente não vai precisar usar, excluir se for o caso
import { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, Alert } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CompromissoInput from "./components/CompromissoInput";
import CompromissoList from "./components/CompromissoList";
import { tituloApp } from "./labels";

const CHAVE_STORAGE = '@rotina_iesb_compromissos'

export default function App() {
  const [textoInput, setTextoInput] = useState("");
  const [compromissos, setCompromissos] = useState([]);
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    async function carregarDados() {

      try{
        const dadosSalvos = await AsyncStorage.getItem(CHAVE_STORAGE);
      if (dadosSalvos !== null) {
        setCompromissos(JSON.parse(dadosSalvos));
      }
    } catch (e) {
      Alert.alert('Erro', 'Falha ao carregar os compromisso salvos')
    } finally {
      setCarregado(true)
    }
  }
  carregarDados();
  }, []);

  useEffect(() => {
    if (!carregado) return;

    async function salvarDados() {
      try {
        await AsyncStorage.setItem(CHAVE_STORAGE, JSON.stringify(compromissos))
      } catch (e) {
        Alert.alert('Erro', 'Falha ao salvar as alterações')
      }      
    }
    salvarDados();
}, [compromissos, carregado]);

  // Função para adicionar um novo item na lista
  const adicionarCompromisso = () => {
    if (textoInput.trim() === "") return; // Não adiciona texto vazio

    const novoItem = { id: Date.now().toString(), texto: textoInput };
    setCompromissos([...compromissos, novoItem]); // Atualiza o array
    setTextoInput(""); // Limpa o campo
  };

  const removerCompromisso = (id) => {
    // Mantém na lista apenas os itens com id DIFERENTE do id que foi clicado
    setCompromissos((listaAtual) => listaAtual.filter((item) => item.id !== id));
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
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
