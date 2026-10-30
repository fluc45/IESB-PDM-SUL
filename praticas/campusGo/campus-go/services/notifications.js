import { Platform } from 'react-native';
import Constants, { ExecutionEnvironment } from 'expo-constants';
// The package entry point also loads the Android push-topic module, which Expo Go may not include.
import { requestPermissionsAsync } from 'expo-notifications/build/NotificationPermissions';
import { AndroidImportance } from 'expo-notifications/build/NotificationChannelManager.types';
import { setNotificationHandler } from 'expo-notifications/build/NotificationsHandler';
import { SchedulableTriggerInputTypes } from 'expo-notifications/build/Notifications.types';
import { scheduleNotificationAsync } from 'expo-notifications/build/scheduleNotificationAsync';
import { setNotificationChannelAsync } from 'expo-notifications/build/setNotificationChannelAsync';

setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export async function scheduleReminder(title, seconds = 10) {
  const isExpoGo = Constants.executionEnvironment === ExecutionEnvironment.StoreClient;

  if (Platform.OS === 'android' && !isExpoGo) {
    await setNotificationChannelAsync('default', {
      name: 'Lembretes',
      importance: AndroidImportance.DEFAULT,
    });
  }

  const { granted } = await requestPermissionsAsync();
  if (!granted) return false;

  await scheduleNotificationAsync({
    content: {
      title: 'CampusGo',
      body: `Não esqueça: ${title}`,
    },
    trigger: {
      type: SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds,
    },
  });
  return true;
}
