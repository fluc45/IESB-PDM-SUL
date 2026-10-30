import * as Haptics from 'expo-haptics';
import { Link } from 'expo-router';
import { useState } from 'react';
import { Alert, FlatList, Pressable, Text, View } from 'react-native';
import { DoneIcon } from '../../components/DoneIcon';
import { getCurrentPlace } from '../../services/location';
import { scheduleReminder } from '../../services/notifications';
import { useTasks } from '../../store/tasks-context';
import { colors, shadow } from '../../styles/theme';

export default function TasksScreen() {
  const { tasks, toggleTask, isHydrated } = useTasks();
  const [placeLabel, setPlaceLabel] = useState('Sem check-in');

  async function handleCheckIn() {
    try {
      const place = await getCurrentPlace();
      if (!place) {
        Alert.alert('Sem localização', 'Permissão negada. Ative a localização para registrar o check-in.');
        return;
      }
      setPlaceLabel(place.label);
    } catch (error) {
      Alert.alert('Localização indisponível', error.message);
    }
  }

  async function handleReminder() {
    try {
      const scheduled = await scheduleReminder('Estudar para a próxima aula', 10);
      Alert.alert(
        scheduled ? 'Lembrete criado' : 'Permissão necessária',
        scheduled ? 'Você receberá uma notificação em cerca de 10 segundos.' : 'Ative as notificações para receber lembretes.',
      );
    } catch (error) {
      console.error('Não foi possível agendar o lembrete.', error);
      Alert.alert(
        'Falha no lembrete',
        error instanceof Error ? error.message : 'Não foi possível agendar a notificação.',
      );
    }
  }

  async function handleComplete(id) {
    const completing = !tasks.find((task) => task.id === id)?.completed;
    toggleTask(id);
    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (error) {
      console.error('A vibração não está disponível neste dispositivo.', error);
    }
    Alert.alert(
      completing ? 'Tarefa concluída' : 'Tarefa reaberta',
      completing ? 'Parabéns pelo progresso!' : 'A tarefa voltou para sua lista de pendências.',
    );
  }

  const activeTasks = tasks.filter((task) => !task.completed);

  return (
    <FlatList
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 20, paddingBottom: 36 }}
      data={tasks}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <View>
          <Text style={{ color: colors.text, fontSize: 27, fontWeight: '800' }}>Sua rotina</Text>
          <Text style={{ color: colors.muted, marginTop: 5, marginBottom: 18 }}>
            {isHydrated ? `${activeTasks.length} tarefa(s) pendente(s)` : 'Carregando tarefas...'}
          </Text>
          <Link href="/new-task" asChild>
            <Pressable style={{ backgroundColor: colors.primary, padding: 15, borderRadius: 14, marginBottom: 12 }}>
              <Text style={{ color: '#FFFFFF', fontWeight: '700', textAlign: 'center' }}>+ Nova tarefa</Text>
            </Pressable>
          </Link>
          <Link href="/task/42" asChild>
            <Pressable style={{ paddingVertical: 10 }}>
              <Text style={{ color: colors.primary, fontWeight: '700', textAlign: 'center' }}>
                Abrir tarefa de demonstração (42)
              </Text>
            </Pressable>
          </Link>
          <View style={{ flexDirection: 'row', gap: 10, marginBottom: 15 }}>
            <Pressable
              onPress={handleCheckIn}
              style={{ flex: 1, backgroundColor: colors.mint, padding: 13, borderRadius: 13 }}
            >
              <Text style={{ color: colors.success, fontWeight: '700', textAlign: 'center' }}>Estudei aqui</Text>
            </Pressable>
            <Pressable
              onPress={handleReminder}
              style={{ flex: 1, backgroundColor: colors.lavender, padding: 13, borderRadius: 13 }}
            >
              <Text style={{ color: colors.primary, fontWeight: '700', textAlign: 'center' }}>Lembrar em 10 s</Text>
            </Pressable>
          </View>
          <Text style={{ color: colors.muted, marginBottom: 20 }}>📍 {placeLabel}</Text>
        </View>
      }
      renderItem={({ item }) => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 13,
            padding: 16,
            marginBottom: 11,
            borderRadius: 16,
            backgroundColor: colors.surface,
            ...shadow,
          }}
        >
          <DoneIcon completed={item.completed} onPress={() => handleComplete(item.id)} />
          <Link href={{ pathname: '/task/[id]', params: { id: item.id } }} asChild>
            <Pressable style={{ flex: 1 }}>
              <Text
                style={{
                  color: item.completed ? colors.muted : colors.text,
                  fontSize: 16,
                  fontWeight: '700',
                  textDecorationLine: item.completed ? 'line-through' : 'none',
                }}
              >
                {item.title}
              </Text>
              {item.description ? (
                <Text numberOfLines={2} style={{ color: colors.muted, marginTop: 5 }}>
                  {item.description}
                </Text>
              ) : null}
            </Pressable>
          </Link>
        </View>
      )}
      ListEmptyComponent={
        isHydrated ? (
          <View style={{ padding: 24, borderRadius: 16, backgroundColor: colors.surface, alignItems: 'center' }}>
            <Text style={{ color: colors.text, fontWeight: '700' }}>Tudo em dia por aqui!</Text>
            <Text style={{ color: colors.muted, marginTop: 5 }}>Adicione uma tarefa para começar.</Text>
          </View>
        ) : null
      }
    />
  );
}
