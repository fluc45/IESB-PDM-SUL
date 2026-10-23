import DateTimePicker from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from "react-native";
import { CATEGORIAS_DESPESA, useExpenses } from "../store/expenses-context";
import { getTheme } from "../constants/theme";

function validate(values) {
  const nextErrors = {};
  const description = values.description?.trim() ?? "";
  const amount = Number(values.amount ?? 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const selectedDate = new Date(values.date ?? new Date());
  selectedDate.setHours(0, 0, 0, 0);

  if (description.length < 3) {
    nextErrors.description = "A descrição deve ter pelo menos 3 caracteres.";
  }

  if (!values.amount || !Number.isFinite(amount) || amount <= 0) {
    nextErrors.amount = "O valor deve ser maior que zero.";
  }

  if (selectedDate > today) {
    nextErrors.date = "A data não pode ser futura.";
  }

  if (!values.category) {
    nextErrors.category = "Selecione uma categoria.";
  }

  return nextErrors;
}

function GerenciarDespesa({ navigation, route }) {
  const { expenses, addExpense, updateExpense, deleteExpense } = useExpenses();
  const expenseId = route.params?.expenseId;
  const isEditing = Boolean(expenseId);
  const colorScheme = useColorScheme();
  const theme = getTheme(colorScheme === "dark");
  const [form, setForm] = useState({
    description: "",
    amount: "",
    date: new Date(),
    category: "",
  });
  const [errors, setErrors] = useState({});
  const [showPicker, setShowPicker] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Editar despesa" : "Nova despesa",
    });
  }, [isEditing, navigation]);

  useEffect(() => {
    if (!expenseId) return;

    const selectedExpense = expenses.find((item) => item.id === expenseId);

    if (selectedExpense) {
      setForm({
        description: selectedExpense.description ?? selectedExpense.descricao ?? "",
        amount: String(selectedExpense.amount ?? selectedExpense.valor ?? ""),
        date: new Date(selectedExpense.date ?? selectedExpense.data ?? new Date()),
        category: selectedExpense.category ?? selectedExpense.categoria ?? "",
      });
    }
  }, [expenseId, expenses]);

  const handleChange = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = () => {
    const nextErrors = validate(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const payload = {
      description: form.description.trim(),
      amount: parseFloat(form.amount),
      date: form.date,
      category: form.category,
    };

    if (isEditing) {
      updateExpense(expenseId, payload);
    } else {
      addExpense({ ...payload, id: Date.now().toString() });
    }

    navigation.goBack();
  };

  const handleDelete = () => {
    Alert.alert(
      "Excluir despesa",
      "Tem certeza que deseja remover esta despesa?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => {
            deleteExpense(expenseId);
            navigation.goBack();
          },
        },
      ],
    );
  };

  const fieldStyle = (fieldName) => [
    styles.input,
    {
      backgroundColor: theme.surface,
      borderColor: errors[fieldName] ? theme.alert : theme.border,
      color: theme.text,
    },
  ];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.screen, { backgroundColor: theme.background }]}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: theme.text }]}>Descrição</Text>
          <TextInput
            value={form.description}
            onChangeText={(value) => handleChange("description", value)}
            placeholder="Ex.: Conta de luz"
            placeholderTextColor={theme.muted}
            maxLength={40}
            style={fieldStyle("description")}
          />
          {errors.description ? <Text style={[styles.errorText, { color: theme.alert }]}>{errors.description}</Text> : null}
        </View>

        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: theme.text }]}>Valor da despesa</Text>
          <TextInput
            value={form.amount}
            onChangeText={(value) => {
              const normalized = value.replace(",", ".");
              if (/^\d*\.?\d{0,2}$/.test(normalized) || normalized === "") {
                handleChange("amount", normalized);
              }
            }}
            keyboardType="decimal-pad"
            placeholder="0,00"
            placeholderTextColor={theme.muted}
            style={fieldStyle("amount")}
          />
          {errors.amount ? <Text style={[styles.errorText, { color: theme.alert }]}>{errors.amount}</Text> : null}
        </View>

        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: theme.text }]}>Categoria</Text>
          <Pressable
            onPress={() => setShowCategoryModal(true)}
            style={fieldStyle("category")}
          >
            <Text style={{ color: form.category ? theme.text : theme.muted }}>
              {form.category || "Selecione uma categoria"}
            </Text>
          </Pressable>
          {errors.category ? <Text style={[styles.errorText, { color: theme.alert }]}>{errors.category}</Text> : null}
        </View>

        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: theme.text }]}>Data da despesa</Text>
          <Pressable onPress={() => setShowPicker(true)} style={fieldStyle("date")}>
            <Text style={{ color: theme.text }}>{form.date.toLocaleDateString("pt-BR")}</Text>
          </Pressable>
          {showPicker && (
            <DateTimePicker
              value={form.date}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowPicker(false);
                if (selectedDate) {
                  handleChange("date", selectedDate);
                }
              }}
            />
          )}
          {errors.date ? <Text style={[styles.errorText, { color: theme.alert }]}>{errors.date}</Text> : null}
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={handleSubmit}
          style={({ pressed }) => [
            styles.botao,
            { backgroundColor: theme.primary },
            pressed && styles.botaoPressionado,
          ]}
        >
          <Text style={styles.textoBotao}>{isEditing ? "Salvar alterações" : "Adicionar despesa"}</Text>
        </Pressable>

        {isEditing ? (
          <Pressable
            accessibilityRole="button"
            onPress={handleDelete}
            style={({ pressed }) => [
              styles.botaoExcluir,
              pressed && styles.botaoPressionado,
            ]}
          >
            <Text style={styles.textoBotaoExcluir}>Excluir</Text>
          </Pressable>
        ) : null}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent
        visible={showCategoryModal}
        onRequestClose={() => setShowCategoryModal(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setShowCategoryModal(false)}>
          <View style={[styles.modalContent, { backgroundColor: theme.surface }]}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>Selecione a categoria</Text>
            {CATEGORIAS_DESPESA.map((categoria) => (
              <Pressable
                key={categoria}
                onPress={() => {
                  handleChange("category", categoria);
                  setShowCategoryModal(false);
                }}
                style={[
                  styles.modalItem,
                  { backgroundColor: form.category === categoria ? theme.primarySoft : theme.background },
                ]}
              >
                <Text style={{ color: form.category === categoria ? theme.primary : theme.text }}>{categoria}</Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  scrollContent: {
    padding: 18,
    paddingBottom: 32,
  },
  inputContainer: {
    marginBottom: 18,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  errorText: {
    fontSize: 12,
    marginTop: 6,
  },
  botao: {
    alignItems: "center",
    borderRadius: 10,
    marginTop: 8,
    paddingVertical: 14,
  },
  botaoExcluir: {
    alignItems: "center",
    backgroundColor: "#d93d3d",
    borderRadius: 10,
    marginTop: 12,
    paddingVertical: 14,
  },
  botaoPressionado: {
    opacity: 0.85,
  },
  textoBotao: {
    color: "#ffffff",
    fontWeight: "700",
  },
  textoBotaoExcluir: {
    color: "#ffffff",
    fontWeight: "700",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.35)",
  },
  modalContent: {
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    padding: 18,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },
  modalItem: {
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
});

export default GerenciarDespesa;
