import * as ImagePicker from 'expo-image-picker';
import { Alert, Linking } from 'react-native';

export async function pickImage() {
  try {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.7,
    });
    return result.canceled ? null : result.assets[0]?.uri ?? null;
  } catch (error) {
    console.error('Não foi possível abrir a galeria.', error);
    Alert.alert('Galeria indisponível', 'Não foi possível abrir a galeria neste dispositivo.');
    return null;
  }
}

export async function takePhoto() {
  const permission = await ImagePicker.requestCameraPermissionsAsync();
  if (!permission.granted) {
    Alert.alert(
      'Permissão necessária',
      'Permita o acesso à câmera nas configurações para tirar uma foto.',
      [
        { text: 'Agora não', style: 'cancel' },
        { text: 'Abrir ajustes', onPress: () => Linking.openSettings() },
      ],
    );
    return null;
  }

  try {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      quality: 0.7,
    });
    return result.canceled ? null : result.assets[0]?.uri ?? null;
  } catch (error) {
    console.error('Não foi possível abrir a câmera.', error);
    Alert.alert('Câmera indisponível', 'Não foi possível abrir a câmera neste dispositivo.');
    return null;
  }
}
