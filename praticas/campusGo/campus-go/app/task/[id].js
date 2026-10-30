import * as Haptics from 'expo-haptics';
import { router, useLocalSearchParams } from 'expo-router';
import { Alert, Pressable, Text, View } from 'react-native';
import { useTasks } from '../../store/tasks-context';
import { colors, shadow } from '../../styles/theme';

export default function TaskDetailsScreen() {
  const { id } = useLocalSearchParams();
  const taskId = Array.isArray(id) ? id[0] : id;
  const { tasks, toggleTask, deleteTask } = useTasks();
  const task = tasks.find((item) => item.id === taskId);

  if (!task) {
    return (
      <View style={{ flex: 1, padding: 20 }}>
        <View style={{ padding: 20, borderRadius: 18, backgroundColor: colors.surface, ...shadow }}>
          <Text style={{ color: colors.text, fontSize: 24, fontWeight: '800' }}>
            Tarefa número {taskId}
          </Text>
          <Text style={{ color: colors.muted, marginTop: 12 }}>
            Esta tarefa de demonstração ainda não foi cadastrada.
          </Text>
        </View>
        <Pressable
          onPress={() => router.back()}
          style={{ marginTop: 16, padding: 16, borderRadius: 13, backgroundColor: colors.primary }}
        >
          <Text style={{ color: '#FFFFFF', textAlign: 'center', fontWeight: '700' }}>Voltar</Text>
        </Pressable>
      </View>
    );
  }

  async function handleComplete() {
    toggleTask(task.id);
    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (error) {
      console.error('A vibração não está disponível neste dispositivo.', error);
    }
    Alert.alert('Tarefa atualizada', task.completed ? 'Tarefa reaberta.' : 'Tarefa concluída.');
  }

  function handleDelete() {
    Alert.alert('Excluir tarefa', 'Esta ação não pode ser desfeita.', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: () => {
          deleteTask(task.id);
          router.back();
        },
      },
    ]);
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <View style={{ padding: 20, borderRadius: 18, backgroundColor: colors.surface, ...shadow }}>
        <Text style={{ color: colors.muted, fontSize: 13, marginBottom: 8 }}>
          Tarefa número {taskId}
        </Text>
        <Text style={{ color: colors.text, fontSize: 24, fontWeight: '800' }}>{task.title}</Text>
        <Text style={{ color: colors.muted, marginTop: 14, lineHeight: 23 }}>
          {task.description || 'Sem descrição.'}
        </Text>
        <Text style={{ color: task.completed ? colors.success : colors.primary, marginTop: 18, fontWeight: '700' }}>
          {task.completed ? 'Concluída' : 'Pendente'}
        </Text>
      </View>
      <Pressable onPress={handleComplete} style={{ marginTop: 16, padding: 16, borderRadius: 13, backgroundColor: colors.primary }}>
        <Text style={{ color: '#FFFFFF', textAlign: 'center', fontWeight: '700' }}>
          {task.completed ? 'Reabrir' : 'Concluir'}
        </Text>
      </Pressable>
      <Pressable onPress={handleDelete} style={{ marginTop: 8, padding: 16 }}>
        <Text style={{ color: colors.danger, textAlign: 'center', fontWeight: '700' }}>Excluir tarefa</Text>
      </Pressable>
      <Pressable onPress={() => router.back()} style={{ marginTop: 4, padding: 14 }}>
        <Text style={{ color: colors.muted, textAlign: 'center', fontWeight: '600' }}>Voltar</Text>
      </Pressable>
    </View>
  );
}
