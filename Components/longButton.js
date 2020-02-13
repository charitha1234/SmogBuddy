import React from "react";
import {
    StyleSheet,
    Text
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { color } from '../Assets/color';
import Ionicons from 'react-native-vector-icons/Ionicons';
function GradientButton(props) {

    return (
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={[color.buttonUpper, color.buttonLower]} style={styles.container}>
                <Text style={styles.text}>NEXT STEP</Text>
            </LinearGradient>
    );

}

export default GradientButton;

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: 'center',
        width: 200,
        height: 70,
        

    },
    text:{

        fontFamily: 'Montserrat-Bold',
        fontSize: 10,
        letterSpacing: 4,
        color: color.primaryWhite,
    }

});