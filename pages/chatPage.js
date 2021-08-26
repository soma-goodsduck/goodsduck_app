import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {WebView} from 'react-native-webview';

const ChatPage = () => {
  return (
    <View style={styles.container}>
      <WebView
        style={styles.webview}
        source={{uri: 'https://www.goods-duck.com/chatting'}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  webview: {
    flex: 1,
  },
});

export default ChatPage;
