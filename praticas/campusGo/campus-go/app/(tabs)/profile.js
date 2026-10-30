import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Alert, Image, Pressable, Text, View } from 'react-native';
import { pickImage, takePhoto } from '../../services/media';
import { colors, shadow } from '../../styles/theme';

const PHOTO_KEY = '@profile-photo';

export default function ProfileScreen() {
  const [photoUri, setPhotoUri] = useState(null);

  useEffect(() => {
    let active = true;
    AsyncStorage.getItem(PHOTO_KEY)
      .then((savedUri) => {
        if (active && savedUri) setPhotoUri(savedUri);
      })
      .catch((error) => {
        console.error('Não foi possível carregar a foto do perfil.', error);
        Alert.alert('Foto indisponível', 'Não foi possível carregar a foto salva.');
      });
    return () => {
      active = false;
    };
  }, []);

  async function savePhoto(uri) {
    if (!uri) return;
    try {
      await AsyncStorage.setItem(PHOTO_KEY, uri);
      setPhotoUri(uri);
    } catch (error) {
      console.error('Não foi possível salvar a foto do perfil.', error);
      Alert.alert('Falha ao salvar', 'A foto não pôde ser salva neste dispositivo.');
    }
  }

  function choosePhoto() {
    Alert.alert('Atualizar foto', 'Escolha como deseja adicionar uma foto.', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Galeria', onPress: async () => savePhoto(await pickImage()) },
      { text: 'Câmera', onPress: async () => savePhoto(await takePhoto()) },
    ]);
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ color: colors.text, fontSize: 27, fontWeight: '800' }}>Perfil</Text>
      <View style={{ alignItems: 'center', padding: 24, marginTop: 18, borderRadius: 18, backgroundColor: colors.surface, ...shadow }}>
        <Pressable onPress={choosePhoto} accessibilityRole="button" accessibilityLabel="Alterar foto do perfil">
          <Image
            source={photoUri ? { uri: photoUri } : require('../../assets/icon.png')}
            style={{ width: 120, height: 120, borderRadius: 60, backgroundColor: colors.lavender }}
          />
        </Pressable>
        <Text style={{ color: colors.text, fontSize: 21, fontWeight: '800', marginTop: 16 }}>Maria Souza</Text>
        <Text style={{ color: colors.muted, marginTop: 5 }}>Engenharia de Software</Text>
        <Text style={{ color: colors.muted }}>Turno noturno</Text>
        <Pressable
          onPress={choosePhoto}
          style={{ marginTop: 20, paddingVertical: 12, paddingHorizontal: 18, backgroundColor: colors.lavender, borderRadius: 12 }}
        >
          <Text style={{ color: colors.primary, fontWeight: '700' }}>Alterar foto</Text>
        </Pressable>
      </View>
      <Text style={{ color: colors.muted, marginTop: 16, lineHeight: 21 }}>
        Sua foto fica salva neste dispositivo. A câmera e a galeria só são acessadas quando você solicitar.
      </Text>
    </View>
  );
}
