import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {WebView} from 'react-native-webview';

const App = () => {
  return (
    <View style={styles.container}>
      <WebView
        style={styles.webview}
        source={{uri: 'https://www.goods-duck.com/'}}
      />
      <View style={styles.nav}>
        <TouchableOpacity style={styles.icon} onPress={() => alert('Home')}>
          <Image
            style={styles.iconImg}
            source={{
              uri: 'https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/app_home.png',
            }}
            resizeMode="contain"
          />
          <Text style={styles.iconLabel}>홈</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon} onPress={() => alert('Home')}>
          <Image
            style={styles.iconImg}
            source={{
              uri: 'https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/app_chat.png',
            }}
            resizeMode="contain"
          />
          <Text style={styles.iconLabel}>채팅</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon} onPress={() => alert('Home')}>
          <Image
            style={styles.iconImg}
            source={{
              uri: 'https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/app_upload.png',
            }}
            resizeMode="contain"
          />
          <Text style={styles.iconLabel}>등록</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon} onPress={() => alert('Home')}>
          <Image
            style={styles.iconImg}
            source={{
              uri: 'https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/app_profile.png',
            }}
            resizeMode="contain"
          />
          <Text style={styles.iconLabel}>내 정보</Text>
        </TouchableOpacity>
      </View>
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
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginLeft: 10,
    marginRight: 10,
  },
  icon: {alignItems: 'center'},
  iconImg: {width: 25, height: 25},
  iconLabel: {textAlign: 'center', marginTop: 7},
});

export default App;
