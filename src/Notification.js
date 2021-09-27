import React from 'react';
import {
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
  Platform,
} from 'react-native';

const Notification = ({data, clickUrl, onClickNoti}) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        onClickNoti(clickUrl);
      }}>
      <View
        style={
          Platform.OS === 'ios'
            ? styles.notiBoxForIOS
            : styles.notiBoxForAndroid
        }>
        <Image
          style={styles.image}
          source={{
            uri: 'https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/goodsduck.png',
          }}
          resizeMode="contain"
        />
        <Text style={styles.text}>{data}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  notiBoxForIOS: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 60,
    width: '85%',
    zIndex: 9999,

    backgroundColor: '#222222',
    borderRadius: 10,
    padding: 10,
    marginLeft: '7%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  notiBoxForAndroid: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 20,
    width: '85%',
    zIndex: 9999,

    backgroundColor: '#222222',
    borderRadius: 10,
    padding: 10,
    marginLeft: '7%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 200,
    marginRight: 10,
  },
  text: {
    width: '85%',
    color: '#ffffff',
  },
});

export default Notification;
