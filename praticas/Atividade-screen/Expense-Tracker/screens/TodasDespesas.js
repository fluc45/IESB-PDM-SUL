import { StyleSheet, Text, View } from "react-native";

function TodasDespesas() {
    return (
        <View style={styles.container}>
            <Text>Todas as Despesas</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});

export default TodasDespesas;