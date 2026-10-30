import { Link } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Pressable, Text, View } from 'react-native';
import { FadeIn } from '../../components/FadeIn';
import { useNotices } from '../../hooks/useNotices';
import { api } from '../../services/api';
import { colors, shadow } from '../../styles/theme';

export default function HomeScreen() {
  const { notices, isLoading, error, reload } = useNotices();
  const [isCreatingNotice, setIsCreatingNotice] = useState(false);

  async function createSampleNotice() {
    setIsCreatingNotice(true);
    try {
      const notice = await api.create('posts', {
        title: 'Aviso de demonstração',
        body: 'Aviso criado pela atividade prática do CampusGo.',
        userId: 1,
      });
      if (notice?.id == null) throw new Error('A API não retornou o identificador do aviso.');
      Alert.alert('Aviso criado', `A API retornou o ID ${notice.id}.`);
    } catch (createError) {
      console.error('Não foi possível criar o aviso de demonstração.', createError);
      Alert.alert(
        'Falha ao criar aviso',
        createError instanceof Error ? createError.message : 'Tente novamente mais tarde.',
      );
    } finally {
      setIsCreatingNotice(false);
    }
  }

  return (
    <FlatList
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 20, paddingBottom: 32 }}
      data={notices}
      keyExtractor={(item) => String(item.id)}
      refreshing={isLoading}
      onRefresh={reload}
      ListHeaderComponent={
        <View>
          <Text style={{ color: colors.muted, fontSize: 14 }}>Engenharia de Software · Noturno</Text>
          <Text style={{ color: colors.text, fontSize: 28, fontWeight: '800', marginTop: 5 }}>
            Olá, Maria!
          </Text>
          <Link href="/new-task" asChild>
            <Pressable
              style={{
                marginTop: 20,
                marginBottom: 25,
                padding: 18,
                borderRadius: 18,
                backgroundColor: colors.primary,
              }}
            >
              <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '700' }}>
                +  Adicionar uma tarefa
              </Text>
              <Text style={{ color: '#E8EAFF', marginTop: 5 }}>Organize o seu dia no campus</Text>
            </Pressable>
          </Link>
          <Text style={{ color: colors.text, fontSize: 20, fontWeight: '800', marginBottom: 12 }}>
            Mural do campus
          </Text>
          <Pressable
            disabled={isCreatingNotice}
            onPress={createSampleNotice}
            style={{ alignSelf: 'flex-start', marginBottom: 14, opacity: isCreatingNotice ? 0.6 : 1 }}
          >
            <Text style={{ color: colors.primary, fontWeight: '700' }}>
              {isCreatingNotice ? 'Criando aviso...' : '+ Criar aviso de demonstração'}
            </Text>
          </Pressable>
          {isLoading && notices.length === 0 ? (
            <ActivityIndicator color={colors.primary} style={{ marginVertical: 28 }} />
          ) : null}
          {error ? (
            <View style={{ padding: 16, borderRadius: 14, backgroundColor: '#FFF0F0', marginBottom: 15 }}>
              <Text style={{ color: colors.danger, fontWeight: '700' }}>Não foi possível carregar os avisos</Text>
              <Text style={{ color: colors.text, marginTop: 5 }}>{error}</Text>
              <Pressable onPress={reload} style={{ marginTop: 12 }}>
                <Text style={{ color: colors.primary, fontWeight: '700' }}>Tentar novamente</Text>
              </Pressable>
            </View>
          ) : null}
        </View>
      }
      renderItem={({ item, index }) => (
        <FadeIn style={{ marginBottom: 12 }}>
          <View
            style={{
              padding: 16,
              borderRadius: 16,
              backgroundColor: colors.surface,
              ...shadow,
            }}
          >
            <Text style={{ color: colors.primary, fontSize: 12, fontWeight: '700', marginBottom: 6 }}>
              AVISO 0{index + 1}
            </Text>
            <Text style={{ color: colors.text, fontSize: 16, fontWeight: '700' }}>{item.title}</Text>
            <Text numberOfLines={3} style={{ color: colors.muted, lineHeight: 21, marginTop: 7 }}>
              {item.body}
            </Text>
          </View>
        </FadeIn>
      )}
      ListEmptyComponent={
        !isLoading && !error ? (
          <Text style={{ color: colors.muted, textAlign: 'center', marginTop: 20 }}>Nenhum aviso publicado.</Text>
        ) : null
      }
    />
  );
}
