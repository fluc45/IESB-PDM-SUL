import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { botaoAdicionar, placeholderCompromisso } from "../labels";

function CompromissoInput({ value, onChangeText, onAdd }) {
  return (
    <View style={styles.inputArea}>
      <TextInput
        placeholder={placeholderCompromisso}
        value={value}
        onChangeText={onChangeText}
        style={styles.inputBox}
      />
      <Pressable
        onPress={onAdd}
        android_ripple={{ color: "#003d80" }}
        style={({ pressed }) => [styles.button, pressed && { opacity: 0.7 }]}
      >
        <Text style={styles.buttonText}>{botaoAdicionar}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  inputArea: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
  },
  inputBox: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    width: "67.5%",
  },
  button: {
    width: "27.5%",
    backgroundColor: "#0066cc",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
});

export default CompromissoInput;