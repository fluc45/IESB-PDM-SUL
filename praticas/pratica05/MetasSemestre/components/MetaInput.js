import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";
import { placeholder_input, texto_botao } from "../labels";

function MetaInput(props) {
  const [inputMetaText, setInputMetaText] = useState("");

  function metaInputHandler(inputText) {
    setInputMetaText(inputText);
  }

  function addMetaHandler(){
    props.onAddMeta(inputMetaText);
    setInputMetaText('');
  }

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        flex: 1,
      }}
    >
      <View style={{ width: "65%" }}>
        <TextInput
          style={styles.inputText}
          placeholder={placeholder_input}
          onChangeText={metaInputHandler}
        />
      </View>

      <View style={{ width: "30%" }}>
        <Button
          title={texto_botao}
          onPress={addMetaHandler}
        />
      </View>
    </View>
  );
}

export default MetaInput;

const styles = StyleSheet.create({
    inputText: {
        borderColor: "#cccccc",
        borderWidth: 1,
      },
})