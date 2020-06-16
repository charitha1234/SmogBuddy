import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { color } from '../Assets/color';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

function Header(props) {

    return (
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={[color.headergreen,color.lightBlue]} style={styles.headerContainer}>
            <TouchableOpacity onPress={() => props.navigation.goBack()} style={styles.icon}><Ionicons name={props.leftIcon?props.leftIcon:"ios-close"} size={30} color={color.primaryWhite} /></TouchableOpacity>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><Text style={[styles.headerText, props.letterSize ? { fontSize: props.letterSize } : null,{color:color.primaryWhite}]}>{props.title}</Text></View>

            <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }} />
        </LinearGradient>
    );

}

export default Header;

const styles = StyleSheet.create({
    headerContainer: {
        height: 66,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: color.primaryWhite,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: .2,
        shadowRadius: 8.30,
        elevation: 3,
    },
    headerText: {
        fontFamily: 'Montserrat-Bold',
        fontSize:15,
        letterSpacing: 2,
        textAlign: 'center'
    },
    icon: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0.5,

    },
});