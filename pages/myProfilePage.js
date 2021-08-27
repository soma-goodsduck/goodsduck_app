import React from 'react';
import {StyleSheet, View} from 'react-native';
import {WebView} from 'react-native-webview';

const MyProfilePage = () => {
  return (
    <View style={styles.container}>
      <WebView
        style={styles.webview}
        source={{uri: 'https://www.goods-duck.com/my-profile'}}
        userAgent="GOODSDUCK APP"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#ffffff',
  },
  webview: {
    flex: 1,
  },
});

export default MyProfilePage;
