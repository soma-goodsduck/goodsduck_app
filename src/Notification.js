import React from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';

const Notification = ({data}) => {
  return (
    <View style={styles.notiBox}>
      <Image
        style={styles.image}
        source={{
          uri: 'https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/goodsduck.png',
        }}
        resizeMode="contain"
      />
      <Text style={styles.text}>{data}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  notiBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 20,
    width: '85%',

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
