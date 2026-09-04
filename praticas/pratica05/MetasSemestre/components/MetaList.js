import { StyleSheet, Text, Pressable, View, FlatList } from "react-native";

function MetaList(props) {
  return (
    <FlatList
      data={props.array}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Pressable
            android_ripple={{ color: "yellow" }}
            onPress={() => props.onDeleteItem(item.id)}
          >
            <Text style={{ padding: 8 }}>{item.texto}</Text>
            <Text>{item.criadaEm}</Text>
          </Pressable>
        </View>
      )}
    />
  );
}

export default MetaList;

const styles = StyleSheet.create({
  item: {
    margin: 8,
    backgroundColor: "lightblue",
  },
});