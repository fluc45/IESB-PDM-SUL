import * as Location from 'expo-location';

export async function getCurrentPlace() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') return null;

  try {
    const { coords } = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });
    const [address] = await Location.reverseGeocodeAsync(coords);
    const label = address
      ? [address.street, address.name, address.district, address.city].filter(Boolean).join(', ')
      : `${coords.latitude.toFixed(4)}, ${coords.longitude.toFixed(4)}`;
    return { latitude: coords.latitude, longitude: coords.longitude, label };
  } catch (error) {
    console.error('Não foi possível obter a localização atual.', error);
    throw new Error('GPS indisponível. Verifique a localização do dispositivo e tente novamente.');
  }
}
