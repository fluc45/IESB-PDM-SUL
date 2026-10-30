import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, Text, TextInput, View } from 'react-native';
import { useTasks } from '../store/tasks-context';
import { colors } from '../styles/theme';

export default function NewTaskScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { addTask } = useTasks();

  function handleSave() {
    if (title.trim().length < 3) {
      Alert.alert('Título inválido', 'Digite um título com pelo menos 3 caracteres.');
      return;
    }
    addTask(title, description);
    router.back();
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1, backgroundColor: colors.background }}
    >
      <View style={{ padding: 20 }}>
        <Text style={{ color: colors.text, fontSize: 24, fontWeight: '800', marginBottom: 20 }}>
          Nova tarefa
        </Text>
        <Text style={{ color: colors.text, fontWeight: '700', marginBottom: 8 }}>Título</Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Ex.: Revisar matéria de PDM"
          maxLength={100}
          returnKeyType="next"
          style={{
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: 12,
            padding: 14,
            color: colors.text,
          }}
        />
        <Text style={{ color: colors.text, fontWeight: '700', marginTop: 18, marginBottom: 8 }}>
          Descrição (opcional)
        </Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Adicione detalhes para esta tarefa"
          multiline
          maxLength={500}
          textAlignVertical="top"
          style={{
            minHeight: 110,
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: 12,
            padding: 14,
            color: colors.text,
          }}
        />
        <Pressable
          onPress={handleSave}
          style={{ marginTop: 22, padding: 16, borderRadius: 13, backgroundColor: colors.primary }}
        >
          <Text style={{ color: '#FFFFFF', textAlign: 'center', fontWeight: '700' }}>Salvar tarefa</Text>
        </Pressable>
        <Pressable onPress={() => router.back()} style={{ padding: 14, marginTop: 5 }}>
          <Text style={{ color: colors.muted, textAlign: 'center', fontWeight: '600' }}>Fechar</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}
