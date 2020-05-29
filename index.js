/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import firebase from 'react-native-firebase';
var firebaseConfig = {
    apiKey: "AIzaSyBQeeK-bCrzb1dWEtJzgtHOBs0yl0qj9b8",
    authDomain: "smog-buddy-dev.firebaseapp.com",
    databaseURL: "https://smog-buddy-dev.firebaseio.com",
    projectId: "smog-buddy-dev",
    storageBucket: "smog-buddy-dev.appspot.com",
    messagingSenderId: "414626078341",
    appId: "1:414626078341:ios:5dfb700b08e4ea2c6093ec",

    // enable persistence by adding the below flag
    persistence: true,
};
const SecondApp = firebase.initializeApp(
    firebaseConfig,
    'SecondApp',
);
AppRegistry.registerComponent(appName, () => App);