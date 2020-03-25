import React, { useState } from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import { Label, Item, Input } from 'native-base';
import Reinput from 'reinput'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {color} from '../Assets/color'


function TextBox(props) {
    const [textChanging, settextChanging] = useState(false)
    return (
        <View style={styles.container}>
            <Reinput label={props.title}
                error={props.error}
                autoCapitalize="none"
                value={props.value}
                activeColor={color.primaryBlue}
                labelColor={props.value?color.primaryBlue:null}
                labelActiveColor={color.primaryBlue}
                errorColor={color.failedRed}
                underlineHeight={0}
                underlineActiveHeight={0}
                marginBottom={0}
                height={100}
                fontFamily='Montserrat-Bold'
                fontSize={15}
                letterSpacing= {5}
                underlineActiveColor='transparent'
                underlineColor='transparent'
                iconOverlay={<Ionicons name={props.icon} color={props.error?color.failedRed:color.primaryBlack} size={props.size ? props.size : 25} />}
                onChangeText={props.onChangeText}
                onFocus={props.onFocus}
                onBlur={props.onBlur}
                secureTextEntry={props.title == "PASSWORD" ? true : false} />
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