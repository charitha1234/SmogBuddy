/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import 'react-native-gesture-handler';
import Appcontainer from './Navigation';
import firebase from 'react-native-firebase';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class  App extends Component {

      async componentDidMount() {
        this.checkPermission();
        this.createNotificationListeners();
      }
    
      componentWillUnmount() {
        this.notificationListener();
        this.notificationOpenedListener();
    }
    async createNotificationListeners() {
      /*
      * Triggered when a particular notification has been received in foreground
      * */
      this.notificationListener = firebase.notifications().onNotification((notification) => {
          const { title, body } = notification;
          // this.showAlert(title, body);
      });
      /*
      * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
      * */
      this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
          const { title, body } = notificationOpen.notification;
          // this.showAlert(title, body);
      });
    
      /*
      * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
      * */
      const notificationOpen = await firebase.notifications().getInitialNotification();
      if (notificationOpen) {
          const { title, body } = notificationOpen.notification;
      }
      /*
      * Triggered for data only payload in foreground
      * */
      this.messageListener = firebase.messaging().onMessage((message) => {
        //process data message
        console.log(JSON.stringify(message));
      });
    }
    
    showAlert(title, body) {
      Alert.alert(
        title, body,
        [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false },
      );
    }
    
    async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
        this.getToken();
    } else {
        this.requestPermission();
    }
    }
      //3
      async getToken() {
      let fcmToken = await AsyncStorage.getItem('fcmToken');
      if (!fcmToken) {
          fcmToken = await firebase.messaging().getToken();
          if (fcmToken) {
            await AsyncStorage.setItem('fcmToken', fcmToken);
          }
      }
     
    }
    
      //2
    async requestPermission() {
      try {
          await firebase.messaging().requestPermission();
          this.getToken();
      } catch (error) {
          console.log('permission rejected',error);
      }
    }
    
    render() {
        return <Appcontainer/>
    }
}

export default App;
