import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import MetaInput from "./components/MetaInput";
import MetaList from "./components/MetaList";
import { titulo_app } from "./labels";

const STORAGE_KEY = "@metas_semestre";

export default function App() {
  const [metas, setMetas] = useState([]);
  const [inputMeta, setInputMeta] = useState("");
  const [carregada, setCarregada] = useState(false);

  useEffect(() => {
    async function carregarMetas() {
      try {
        const metasSalvas = await AsyncStorage.getItem(STORAGE_KEY);

        if (!metasSalvas) {
          setCarregada(true);
          return;
        }

        const metasParseadas = JSON.parse(metasSalvas);

        if (Array.isArray(metasParseadas)) {
          setMetas(metasParseadas);
        }
      } catch (error) {
        Alert.alert("Erro", "Não foi possível carregar suas metas salvas.");
      } finally {
        setCarregada(true);
      }
    }

    carregarMetas();
  }, []);

  useEffect(() => {
    if (!carregada) {
      return;
    }

    async function salvarMetas() {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(metas));
      } catch (error) {
        Alert.alert("Erro", "Não foi possível salvar as metas no dispositivo.");
      }
    }

    salvarMetas();
  }, [metas, carregada]);

  function adicionarMetaHandler() {
    const texto = inputMeta.trim();

    if (!texto) {
      Alert.alert("Campo vazio", "Digite uma meta antes de adicionar.");
      return;
    }

    const novaMeta = {
      id: Date.now().toString(),
      texto,
      criadaEm: new Date().toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      concluida: false,
    };

    setMetas((metasAtuais) => [novaMeta, ...metasAtuais]);
    setInputMeta("");
  }

  function deletarMetaHandler(id) {
    setMetas((metasAtuais) => metasAtuais.filter((meta) => meta.id !== id));
  }

  function toggleMetaHandler(id) {
    setMetas((metasAtuais) =>
      metasAtuais.map((meta) =>
        meta.id === id ? { ...meta, concluida: !meta.concluida } : meta,
      ),
    );
  }

  const pendentes = metas.filter((meta) => !meta.concluida).length;
  const concluidas = metas.length - pendentes;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.screen}>
        <View style={styles.headerContainer}>
          <Image style={styles.iconApp} source={require("./assets/favicon.png")} />
          <View style={styles.titleGroup}>
            <Text style={styles.headerText}>{titulo_app}</Text>
            <Text style={styles.counterText}>
              {pendentes} pendentes / {concluidas} concluídas
            </Text>
          </View>
        </View>

        <View style={styles.mainContainer}>
          <MetaInput
            value={inputMeta}
            onChangeText={setInputMeta}
            onAdd={adicionarMetaHandler}
          />

          <View style={styles.metaContainer}>
            <MetaList
              metas={metas}
              onDelete={deletarMetaHandler}
              onToggleConcluida={toggleMetaHandler}
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
    backgroundColor: "#f3f1f7",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 18,
    paddingBottom: 10,
  },
  titleGroup: {
    flex: 1,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2e1f41",
  },
  counterText: {
    marginTop: 4,
    fontSize: 14,
    color: "#5a4a6d",
    fontWeight: "600",
  },
  iconApp: {
    width: 52,
    height: 52,
    marginRight: 16,
    borderRadius: 12,
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  metaContainer: {
    flex: 1,
    marginTop: 12,
  },
});
