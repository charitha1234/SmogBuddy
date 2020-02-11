import React,{ useState ,useEffect} from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import {color} from '../Assets/color';
import Logo from '../Assets/logo';
function Splash({navigation}){

    setTimeout(() => {navigation.navigate('Login')}, 2000)
return(
    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={[color.primaryGreen,color.primaryBlue]} style={styles.container}>
        <Logo/>
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