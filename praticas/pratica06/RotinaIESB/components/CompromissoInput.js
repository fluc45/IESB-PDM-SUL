import { View, Text, TextInput, Pressable } from "react-native";
import { botaoAdicionar, placeholderCompromisso } from "../labels";

function CompromissoInput({ value, onChangeText, onAdd }) {
  return (
    <View>
      <TextInput placeholder={placeholderCompromisso} value={value} onChangeText={onChangeText} />
      <Pressable onPress={onAdd}>
        <Text>{botaoAdicionar}</Text>
      </Pressable>
    </View>
  );
}

export default CompromissoInput;
