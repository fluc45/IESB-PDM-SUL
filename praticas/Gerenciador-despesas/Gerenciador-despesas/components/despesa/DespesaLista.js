import { Text, FlatList, View } from "react-native";
import DespesaItem from "./DespesaItem";

function renderDespesaItem(itemData) {
  return (
    <View>
      <Text>{itemData.item.descricao}</Text>
      <Text>R$ {itemData.item.valor}</Text>
    </View>
  );
}

function DespesaLista({despesas}) {
  return (
    <FlatList data={despesas} renderItem={DespesaItem} 
    keyExtractor={(item) => item.id} />
  );
}

export default DespesaLista;
