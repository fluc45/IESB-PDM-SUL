import { Share, Text, View, Pressable, Alert } from 'react-native';
import { useExpenses } from '../../store/expenses-context';
import { colors, shadow } from '../../styles/theme';

export default function WalletScreen() {
  const { expenses } = useExpenses();
  const total = expenses.reduce((sum, item) => sum + item.amount, 0);

  async function shareSummary() {
    try {
      await Share.share({ message: `Gastei R$ ${total.toFixed(2)} este mês.` });
    } catch (error) {
      console.error('Não foi possível compartilhar o resumo.', error);
      Alert.alert('Compartilhamento indisponível', 'Tente novamente mais tarde.');
    }
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ color: colors.text, fontSize: 27, fontWeight: '800' }}>Bolso</Text>
      <Text style={{ color: colors.muted, marginTop: 5 }}>Resumo das suas despesas</Text>
      <View style={{ backgroundColor: colors.surface, padding: 22, borderRadius: 18, marginTop: 20, ...shadow }}>
        <Text style={{ color: colors.muted }}>Total do mês</Text>
        <Text style={{ color: colors.text, fontSize: 34, fontWeight: '800', marginTop: 8 }}>
          R$ {total.toFixed(2)}
        </Text>
        <Text style={{ color: colors.muted, marginTop: 8 }}>
          {expenses.length === 0
            ? 'Nenhuma despesa cadastrada.'
            : `${expenses.length} despesa(s) cadastrada(s).`}
        </Text>
      </View>
      <Pressable
        onPress={shareSummary}
        style={{ marginTop: 18, padding: 16, backgroundColor: colors.primary, borderRadius: 14 }}
      >
        <Text style={{ color: '#FFFFFF', textAlign: 'center', fontWeight: '700' }}>Compartilhar resumo</Text>
      </Pressable>
    </View>
  );
}
