import React from 'react';
import {StyleSheet, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import UserAgentIOS from 'rn-ios-user-agent';

import HomePage from './pages/homePage';
import ChatPage from './pages/chatPage';
import UploadPage from './pages/uploadPage';
import MyProfilePage from './pages/myProfilePage';

const Tab = createBottomTabNavigator();
const TabBarIcon = (focused, name) => {
  let iconImagePath;
  let focusIconImagePath;

  if (name === 'home') {
    iconImagePath = require('./assets/icon/app_home.png');
    focusIconImagePath = require('./assets/icon/app_home_click.png');
  } else if (name === 'chat') {
    iconImagePath = require('./assets/icon/app_chat.png');
    focusIconImagePath = require('./assets/icon/app_chat_click.png');
  } else if (name === 'upload') {
    iconImagePath = require('./assets/icon/app_upload.png');
    focusIconImagePath = require('./assets/icon/app_upload_click.png');
  } else if (name === 'profile') {
    iconImagePath = require('./assets/icon/app_profile.png');
    focusIconImagePath = require('./assets/icon/app_profile_click.png');
  }

  return (
    <Image
      style={{width: 24, height: 24, marginTop: 10}}
      source={focused ? focusIconImagePath : iconImagePath}
    />
  );
};

const App = () => {
  // UserAgentIOS.set('GOODSDUCK iOS');

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="home"
        tabBarOptions={{
          activeTintColor: '#222222',
          inactiveTintColor: '#bbbbbb',
        }}
        screenOptions={({route}) => ({
          tabBarLabel: route.name,
          tabBarIcon: ({focused}) => TabBarIcon(focused, route.name),
          headerShown: false,
        })}>
        <Tab.Screen
          name="home"
          component={HomePage}
          options={{
            tabBarLabel: '홈',
            tabBarLabelStyle: {fontSize: 13, paddingTop: 7},
          }}
        />
        <Tab.Screen
          name="chat"
          component={ChatPage}
          options={{
            tabBarLabel: '채팅',
            tabBarLabelStyle: {fontSize: 13, paddingTop: 7},
            // tabBarBadge: 3,
            // tabBarBadgeStyle: {backgroundColor: '#006e5e'},
          }}
        />
        <Tab.Screen
          name="upload"
          component={UploadPage}
          options={{
            tabBarLabel: '등록',
            tabBarLabelStyle: {fontSize: 13, paddingTop: 7},
          }}
        />
        <Tab.Screen
          name="profile"
          component={MyProfilePage}
          options={{
            tabBarLabel: '내정보',
            tabBarLabelStyle: {fontSize: 13, paddingTop: 7},
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
