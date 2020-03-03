import React, { useState, useEffect } from "react";
import {
    StyleSheet
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { color } from '../Assets/color';
import Logo from '../Assets/logo';
import firebase from 'react-native-firebase';


function Splash({ navigation }) {
    useEffect(() => {

        firebase.auth().onAuthStateChanged(user => {
            if (!user) {
                navigation.navigate('Login')
            }
            fetch('https://smogbuddy-dev.herokuapp.com/user/' + user.uid)
                .then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson.role == 'CUSTOMER') navigation.navigate('UserMenuScreens');
                    else if (responseJson.role == 'DRIVER') navigation.navigate('DriverMenuScreens');
                })
                .catch((error) => {
                    console.error(error);
                });
        })
    });
    return (
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={[color.primaryGreen, color.primaryBlue]} style={styles.container}>
            <Logo />
        </LinearGradient>
    );

}

export default Splash;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});