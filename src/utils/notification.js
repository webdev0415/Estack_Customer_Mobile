import { Platform, Linking } from 'react-native';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
// import Vibration from 'react-native-vibration';
// import SoundPlayer from 'react-native-sound-player';

PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: (token) => {
    console.log('TOKEN:', token);
  },

  // (required) Called when a remote or local notification is opened or received
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);
    this.onNotificationCallback?.(notification);
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  permissions: {
    alert: true,
    badge: true,
    sound: true
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   */
  requestPermissions: true
});

export const sendLocalNotification = (body) => {
  console.log('sendLocalNotification', body);
  // Vibration.vibrate(700);
  // SoundPlayer.playUrl('https://zvukipro.com/uploads/files/2019-03/1551852658_sms_uvedomlenie_na_iphone.mp3');

  PushNotification.localNotification({
    userInfo: {
      date: body.text,
    },
    title: body.title,
    message: body.text, // (required)
  });
};

export default PushNotification;
