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
import {Alert, AppState} from 'react-native';
import Dialog from "react-native-dialog";
import AsyncStorage from '@react-native-community/async-storage';
import BaseUrl from './Config'

class  App extends Component {
  constructor(props){
    super(props);
    this.state={
      dialogboxVisible:false,
      fuelTitle:null,
      fuelBody:null,
      appState: AppState.currentState
    }
  }

      async componentDidMount() {
        this.checkPermission();
        this.createNotificationListeners();
        AppState.addEventListener("change", this._handleAppStateChange);
      }
    
      componentWillUnmount() {
        this.notificationListener();
        this.notificationOpenedListener();
        AppState.removeEventListener("change", this._handleAppStateChange);
    }
    _handleAppStateChange = async ( nextAppState) => {
      if (
        this.state.appState.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        
        try {
          const userId= await AsyncStorage.getItem('userId')
          if(userId !== null) {
            fetch(BaseUrl.Url+"/user/fuelcap/" + userId)
            .then((res)=>res.json())
            .then((resJson)=>console.log("FUELCAP",resJson))
            .catch((e)=>console.log("FUEL ERROR",e))
          }
        } catch(e) {
        }
      }
      this.setState({ appState: nextAppState });
    }
    async createNotificationListeners() {
      /*
      * Triggered when a particular notification has been received in foreground
      * */
      this.notificationListener = firebase.notifications().onNotification((notification) => {
          const { title, body } = notification;
          
          if(notification.data.state=="CUSTOMER_APPROVE_FUEL_CAP"){
            this.showAlert(title,body)
          }

          if(notification.data.status=="CHANGE_FUEL_CAP"){
            console.log(notification.data)
            this.setState({
              dialogboxVisible:true,
              fuelTitle:title,
              fuelBody:body,
            })
          }
           
      });
      /*
      * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
      * */
      // this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      //     if (notificationOpen) {   
      //       const {data } = notificationOpen.notification;
      //       if(data.status=="CHANGE_FUEL_CAP"){
      //         this.setState({
      //           dialogboxVisible:true,
      //           fuelTitle:data.title,
      //           fuelBody:data.body,
      //         })
      //       }
      //   }
      // });
    
      /*
      * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
      * */
      // const notificationOpen = await firebase.notifications().getInitialNotification();
      // if (notificationOpen) {   
      //   const {data } = notificationOpen.notification;
      //   if(data.status=="CHANGE_FUEL_CAP"){
      //     this.setState({
      //       dialogboxVisible:true,
      //       fuelTitle:data.title,
      //       fuelBody:data.body,
      //     })
      //   }
      // }
      /*
      * Triggered for data only payload in foreground
      * */
      // this.messageListener = firebase.messaging().onMessage((message) => {
      //   //process data message
      //   console.log(JSON.stringify(message));
      // });
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
      fcmToken = await AsyncStorage.getItem('fcmToken');
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
    areYouSure(){
      
    }
    
    fuelcapApi(status){
      Alert.alert(
        'Are You Sure',
        '',
        [
            {
                text: 'No',
                onPress: () => {},
                style: 'cancel',
            },
            {
                text: 'Yes', onPress: () => {
                  this.setState({dialogboxVisible:false})
                  const user=firebase.auth().currentUser;
                  fetch(BaseUrl.Url+'/user/fuelcap/confirmation', {
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        uid:user.uid,
                        status:status
                    }),
                })
                .then((res) => res.json())
                .then((resJson) => {})
                    
                .catch((e) => {})
                }
            },
        ],
        { cancelable: false },
    )

    }

    render() {
        return (
          <>
        <Appcontainer/>
        <Dialog.Container visible={this.state.dialogboxVisible}>
        <Dialog.Title>{this.state.fuelTitle}</Dialog.Title>
          <Dialog.Description>
            {this.state.fuelBody}
          </Dialog.Description>
          <Dialog.Button label="NO" onPress={()=>{
            this.fuelcapApi("NO")
        }}/>
          <Dialog.Button label="YES" onPress={()=>{
            
            this.fuelcapApi("YES")
            }}/>
        </Dialog.Container>
        </>
        )
    }
}

export default App;
