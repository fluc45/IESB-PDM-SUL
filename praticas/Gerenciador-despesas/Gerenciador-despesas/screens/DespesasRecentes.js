import { StyleSheet, Text, View } from "react-native";
import DespesaSaida from "../components/despesa/DespesaSaida";

function DespesasRecentes() {
  function filtrarUltimos7Dias(despesas) {
    const hoje = new Date();
    const seteDiasAtras = new Date();
    seteDiasAtras.setDate(hoje.getDate() - 7);

    return despesas.filter(despesa => {
      return despesa.data >= seteDiasAtras && despesa.data <= hoje;
    });
  }
  const DUMMY_DESPESAS = [
    {
      id: "1",
      descricao: "Conta de luz",
      valor: 100.99,
      data: new Date(2026, 8, 11),
    },
    {
      id: "2",
      descricao: "Conta de Agua",
      valor: 40.99,
      data: new Date(2026, 9, 10),
    },
  ];
  return (
    <DespesaSaida
      despesas={filtrarUltimos7Dias(DUMMY_DESPESAS)}
      periodo={"Últimos 7 dias"}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default DespesasRecentes;
