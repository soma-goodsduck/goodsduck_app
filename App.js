import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, StyleSheet, Platform} from 'react-native';
import {WebView} from 'react-native-webview';

import {fcmService} from './src/FCMService';
import {localNotificationService} from './src/LocalNotificationService';

import SplashScreen from 'react-native-splash-screen';

export default function App() {
  const [token, setToken] = useState('');

  // webview 통신
  let webviewRef = useRef();

  const handleSetRef = _ref => {
    webviewRef = _ref;
  };

  const handleEndLoading = () => {
    console.log('handleEndLoading');

    const data = {type: 'TOKEN', data: token};
    webviewRef.postMessage(JSON.stringify(data));
  };

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1500);
  }, []);

  useEffect(() => {
    fcmService.registerAppWithFCM();
    fcmService.register(onRegister, onNotification, onOpenNotification);
    localNotificationService.configure(onOpenNotification);

    function onRegister(token) {
      console.log('[App] onRegister : token :', token);
      setToken(token);
    }

    function onNotification(notify) {
      console.log('[App] onNotification : notify :', notify);

      const options = {
        soundName: 'default',
        playSound: true,
      };
      localNotificationService.showNotification(
        0,
        notify.title,
        notify.body,
        notify,
        options,
      );
    }

    function onOpenNotification(notify) {
      console.log('[App] onOpenNotification : notify :', notify);
      alert(notify.body);
    }
    return () => {
      console.log('[App] unRegister');
      fcmService.unRegister();
      localNotificationService.unregister();
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
    } catch (e) {}

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
      <WebView
        style={styles.webview}
        source={{uri: 'https://www.goods-duck.com/'}}
        // source={{uri: 'https://541e5a4ccbbbc9.localhost.run'}}
        userAgent={Platform.OS === 'ios' ? 'IOS APP' : 'ANDROID APP'}
        webviewRef={webviewRef}
        ref={handleSetRef}
        onLoadEnd={handleEndLoading}
        injectedJavaScript={debugging}
        onMessage={onMessage}
      />
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
