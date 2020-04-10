import React, { useState, useRef, useEffect } from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import { Label, Item, Input } from 'native-base';
import Reinput from 'reinput'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { color } from '../Assets/color'


function TextBox(props) {
    const [textChanging, settextChanging] = useState(false)
    useEffect(()=>{
    })
    return (
        <View style={styles.container}>
            <Reinput label={props.title}
                ref={props.sendref}
                error={props.error}
                autoCapitalize="none"
                value={props.value}
                activeColor={color.primaryBlue}
                labelColor={props.value ? color.primaryBlue : null}
                labelActiveColor={color.primaryBlue}
                errorColor={color.failedRed}
                marginBottom={0}
                style={{ flex: 1 }}
                fontFamily='Montserrat-Bold'
                underlineActiveHeight={0}
                underlineHeight={0}
                fontSize={15}
                letterSpacing={5}
                paddingTop={0}
                paddingBottom={0}
                iconOverlay={<Ionicons name={props.icon} color={props.error ? color.failedRed : color.primaryBlack} size={props.size ? props.size : 25} />}
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