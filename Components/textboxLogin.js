import React, { useState, useRef, useEffect } from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    TextInput
} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { color } from '../Assets/color'


function TextBox(props) {
    return (
        <View style={styles.container}>
            <TextInput
                ref={props.sendref}
                placeholder={props.title}
                autoCapitalize="none"
                value={props.value}
                marginBottom={0}
                style={{ flex: 1 }}
                fontFamily='Montserrat-Bold'
                fontSize={15}
                onChangeText={props.onChangeText}
                onFocus={props.onFocus}
                onBlur={props.onBlur}
                secureTextEntry={props.title == "PASSWORD" ? true : false} />
            <Ionicons name={props.icon} color={props.error ? color.failedRed : color.primaryBlack} size={props.size ? props.size : 25} style={{opacity:0.5}} />
        </View>
    );

}

export default TextBox;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 20,


    },


});