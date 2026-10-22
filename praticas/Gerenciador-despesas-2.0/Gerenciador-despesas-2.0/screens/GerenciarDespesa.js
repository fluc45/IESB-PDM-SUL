import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  CATEGORIAS_DESPESA,
  useDespesas,
} from "../DespesasContext";
import SeletorCategoria from "../components/despesa/SeletorCategoria";

function GerenciarDespesa({ navigation }) {
  const [data, setData] = useState(new Date());
  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [erro, setErro] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const { adicionarDespesa } = useDespesas();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || data;
    setShowPicker(false);
    setData(currentDate);
  };

  const handleChangeValor = (text) => {
    const cleanText = text.replace(",", ".");
    const match = cleanText.match(/^\d*\.?\d{0,2}$/);

    if (match) {
      setValor(cleanText);
    }
  };

  function handleSubmit() {
    const valorNumerico = Number(valor);

    if (
      !descricao.trim() ||
      !valor.trim() ||
      !categoria ||
      !Number.isFinite(valorNumerico) ||
      valorNumerico <= 0
    ) {
      setErro("Preencha a descrição, um valor maior que zero e a categoria.");
      return;
    }

    adicionarDespesa({
      id: Date.now().toString(),
      descricao: descricao.trim(),
      valor: valorNumerico,
      data,
      categoria,
    });
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={styles.input}
          maxLength={20}
          value={descricao}
          onChangeText={setDescricao}
          placeholder="Ex.: Conta de luz"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Valor da Despesa</Text>
        <TextInput
          style={styles.input}
          keyboardType={"decimal-pad"}
          maxLength={10}
          value={valor}
          onChangeText={handleChangeValor}
          placeholder="0,00"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Categoria</Text>
        <SeletorCategoria
          categorias={CATEGORIAS_DESPESA}
          selecionada={categoria}
          onSelecionar={setCategoria}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Data da Despesa</Text>
        <Pressable onPress={() => setShowPicker(true)} style={styles.input}>
          <Text>{data.toLocaleDateString("pt-BR")}</Text>
        </Pressable>
        {showPicker && (
          <DateTimePicker
            value={data}
            mode="date"
            display="default"
            onChange={onChange}
          />
        )}
      </View>

      {erro ? <Text style={styles.erro}>{erro}</Text> : null}

      <Pressable
        accessibilityRole="button"
        onPress={handleSubmit}
        style={({ pressed }) => [styles.botao, pressed && styles.botaoPressionado]}
      >
        <Text style={styles.textoBotao}>Adicionar despesa</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 16,
  },
  label: {
    fontSize: 12,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
  },
  erro: {
    color: "#b00020",
    marginHorizontal: 4,
    marginBottom: 12,
  },
  botao: {
    alignItems: "center",
    backgroundColor: "#2f6fed",
    borderRadius: 8,
    marginHorizontal: 4,
    padding: 14,
  },
  botaoPressionado: {
    opacity: 0.8,
  },
  textoBotao: {
    color: "#ffffff",
    fontWeight: "bold",
  },
});

export default GerenciarDespesa;
