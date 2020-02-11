import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { color } from '../Assets/color';
import Ionicons from 'react-native-vector-icons/Ionicons';
function GradientButton(props) {

    return (
        <View>
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={[color.buttonUpper, color.buttonLower]} style={styles.container}>
                <Ionicons name='ios-play' size={20} color={color.primaryWhite} />
            </LinearGradient>
        </View>
    );

}

export default GradientButton;

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: 'center',
        width: 70,
        height: 70,
        

    },

});