import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Platform,
  LogBox,
  BackHandler,
  Alert,
  Linking,
} from 'react-native';
import {WebView} from 'react-native-webview';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo';

import {fcmService} from './src/FCMService';
import {localNotificationService} from './src/LocalNotificationService';
import Notification from './src/Notification';

import SplashScreen from 'react-native-splash-screen';

export default function App() {
  const [webviewURL, setWebviewURL] = useState('https://www.goods-duck.com/');

  const [token, setToken] = useState('');
  const [showNoti, setShowNoti] = useState(false);
  const [notiInfo, setNotiInfo] = useState(null);
  const [notiUrl, setNotiUrl] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  let webviewRef = useRef();

  const onNavigationStateChange = async navState => {
    const url = navState.url.split('/');
    const _chatRoomId = String(url[url.length - 1]);

    if (_chatRoomId) {
      await AsyncStorage.setItem('chatRoomId', _chatRoomId);
    }
  };

  const handleEndLoading = () => {
    console.log('handleEndLoading');
  };

  const sendAuthStatus = async () => {
    const authStatus = await AsyncStorage.getItem('isAlertEnabled');
    const data = {type: 'AUTH_STATUS', data: authStatus};
    webviewRef.current.postMessage(JSON.stringify(data));
  };

  const sendFcmToken = () => {
    const data = {type: 'TOKEN', data: token};
    webviewRef.current.postMessage(JSON.stringify(data));
  };

  const reqBackBtn = () => {
    const data = {type: 'BACK_ANDROID'};
    webviewRef.current.postMessage(JSON.stringify(data));
  };

  const handleClickNoti = _notiUrl => {
    setWebviewURL(`https://www.goods-duck.com/${_notiUrl}`);
  };

  useEffect(() => {
    LogBox.ignoreAllLogs();

    // Splash Screen
    setTimeout(() => {
      SplashScreen.hide();
    }, 1500);

    // FCM
    fcmService.registerAppWithFCM();
    fcmService.register(onRegister, onNotification, onOpenNotification);
    localNotificationService.configure(onOpenNotification);

    function onRegister(_token) {
      console.log('[App] onRegister : token :', _token);
      setToken(_token);
    }

    async function onNotification(notify) {
      console.log('[App] onNotification : notify :', notify.notification);

      const chatRoomId = await AsyncStorage.getItem('chatRoomId');
      if (notify.data.type === 'CHAT') {
        if (notify.data.chatRoomId === chatRoomId) {
          return;
        }
      }

      setNotiInfo(notify.notification.body);
      if (Platform.OS === 'ios') {
        setNotiUrl(notify.data.clickAction);
      } else {
        setNotiUrl(notify.data.clickAction);
      }

      if (notify.data.type === 'LEVEL_UP') {
        setTimeout(() => {
          setShowNoti(true);
        }, 3000);

        setTimeout(() => {
          setShowNoti(false);
        }, 8000);
      } else {
        setShowNoti(true);
        setTimeout(() => {
          setShowNoti(false);
        }, 3000);
      }

      const options = {
        soundName: 'default',
        playSound: true,
      };
      localNotificationService.showNotification(
        0,
        notify.notification.title,
        notify.notification.body,
        notify,
        options,
      );
    }

    function onOpenNotification(notify) {
      if (Platform.OS === 'ios') {
        console.log('[App] onOpenNotification : ios notify :', notify);
        setWebviewURL(`https://www.goods-duck.com/${notify.data.clickAction}`);
      } else {
        console.log('[App] onOpenNotification : android notify :', notify);
        setWebviewURL(`https://www.goods-duck.com/${notify.clickAction}`);
      }
    }

    const onBackPress = () => {
      reqBackBtn();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      onBackPress,
    );

    const handleConnectivityChange = state => {
      if (state.isConnected) {
        setIsConnected(true);
      } else {
        Alert.alert(
          '⚠️ 서버에 연결할 수 없습니다. 잠시 후 다시 이용해주세요.',
          [{text: '확인', onPress: () => BackHandler.exitApp()}],
        );
        setIsConnected(false);
      }
    };
    NetInfo.addEventListener(handleConnectivityChange);

    return () => {
      console.log('[App] unRegister');
      fcmService.unRegister();
      localNotificationService.unregister();
      backHandler.remove();
      NetInfo.removeEventListener(handleConnectivityChange());
    };
  }, []);

  const debugging = `
    const consoleLog = (type, log) => window.ReactNativeWebView.postMessage(JSON.stringify({'type': 'Console', 'data': {'type': type, 'log': log}}));
    console = {
        log: (log) => consoleLog('log', log),
        debug: (log) => consoleLog('debug', log),
        info: (log) => consoleLog('info', log),
        warn: (log) => consoleLog('warn', log),
        error: (log) => consoleLog('error', log),
      };
  `;

  const onMessage = payload => {
    let dataPayload;
    try {
      dataPayload = JSON.parse(payload.nativeEvent.data);
    } catch (e) {
      console.log(e);
    }

    if (dataPayload.type === 'REQ_AUTH_STATUS') {
      sendAuthStatus();
    }

    if (dataPayload.type === 'REQ_SHOW_SETTING') {
      Linking.openSettings();
    }

    if (dataPayload.type === 'REQ_FCM_TOKEN') {
      sendFcmToken();
    }

    if (dataPayload.type === 'REQ_EXIT_ANDROID') {
      BackHandler.exitApp();
    }

    if (dataPayload) {
      if (dataPayload.type === 'Console') {
        console.info(`[Console] ${JSON.stringify(dataPayload.data)}`);
      } else {
        console.log(dataPayload);
      }
    }
  };

  return (
    <SafeAreaView barStyle="white-content" style={styles.container}>
      {showNoti && (
        <Notification
          data={notiInfo}
          clickUrl={notiUrl}
          onClickNoti={handleClickNoti}
        />
      )}
      {isConnected && (
        <WebView
          style={styles.webview}
          source={{uri: webviewURL}}
          userAgent={Platform.OS === 'ios' ? 'IOS APP' : 'ANDROID APP'}
          webviewRef={webviewRef}
          ref={webviewRef}
          onLoadEnd={handleEndLoading}
          onNavigationStateChange={onNavigationStateChange}
          injectedJavaScript={debugging}
          onMessage={onMessage}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});
