import React from "react";
import {
    StyleSheet,
    Text,
    View
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { color } from '../Assets/color';
import Ionicons from 'react-native-vector-icons/Ionicons';
function GradientButton(props) {

    return (
            <View style={styles.container}>
                <Text style={styles.text}>{props.title}</Text>
            </View>
    );

}

export default GradientButton;

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: 'center',
        width: 200,
        height: 70,
        borderRadius:35,
        backgroundColor:color.secondryBlue,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: .3,
        shadowRadius: 20,
        borderRadius: 35,
        elevation: 13,
        

    },
    text:{

        fontFamily: 'Montserrat-Bold',
        fontSize: 10,
        letterSpacing: 4,
        color: color.primaryWhite,
    }

});