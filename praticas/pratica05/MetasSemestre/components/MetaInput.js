import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { placeholder_input, texto_botao } from "../labels";

function MetaInput({ value, onChangeText, onAdd }) {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputText}
          placeholder={placeholder_input}
          value={value}
          onChangeText={onChangeText}
          returnKeyType="done"
          onSubmitEditing={onAdd}
        />
      </View>

      <Pressable
        style={styles.button}
        onPress={onAdd}
        android_ripple={{ color: "rgba(255,255,255,0.25)" }}
      >
        <Text style={styles.buttonText}>{texto_botao}</Text>
      </Pressable>
    </View>
  );
}

export default MetaInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 14,
  },
  inputContainer: {
    flex: 1,
  },
  inputText: {
    borderColor: "#d6d0dd",
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: "#ffffff",
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: "#2e1f41",
  },
  button: {
    backgroundColor: "#7a4d9b",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "700",
  },
});