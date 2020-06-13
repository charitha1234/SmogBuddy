import React, { useState, useEffect, useRef } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Keyboard,
    TextInput,
    TouchableWithoutFeedback
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { color } from '../Assets/color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Logo from '../Assets/logo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import TextBox from '../Components/textboxLogin';
import firebase from 'react-native-firebase';

async function authentication(username, password, navigation, setloading) {

    firebase.auth().signInWithEmailAndPassword(username, password)
        .then((res) => {

        })
        .catch((e) => {
            alert(e)
            setloading(false)
        }
        );


}

function Login({ navigation }) {
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [loading, setloading] = useState(false);
    const [onFocus, setonFocus] = useState(false)
    const [usernameError, setusernameError] = useState(null)
    const [passwordError, setpasswordError] = useState(null)
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    const textBox1 = useRef(null)
    const textBox2 = useRef(null)
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            (data) => {
                setKeyboardVisible(true); // or some other action
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false); // or some other action
            }
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);
    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={[color.primaryGreen, color.primaryBlue]} style={styles.container}>

                {!loading ?
                    <KeyboardAwareScrollView
                        contentContainerStyle={styles.container}
                    >
                        <Text style={styles.watermarkText}>SMOGBUDDY</Text>
                        {
                            isKeyboardVisible ?
                                null :

                                <Logo style={styles.Logo} />
                        }
                        <View style={[styles.LoginForm, usernameError||passwordError ? { borderColor: color.failedRed, borderWidth: 3 } : null]}>
                            <TouchableWithoutFeedback onPress={() => textBox1.current.focus()}>
                                <View style={styles.InputContainer}>
                                    <TextBox sendref={textBox1} onFocus={() => setonFocus(true)} value={username} error={usernameError} onBlur={() => setonFocus(false)} onChangeText={text => {
                                        setusernameError(false)
                                        setusername(text);
                                    }} title="USERNAME" icon="md-person" /></View></TouchableWithoutFeedback>
                            <View style={{ borderBottomWidth: 1, opacity: 0.2, marginHorizontal: 10 }} />
                            <TouchableWithoutFeedback onPress={() => textBox2.current.focus()}>
                                <View style={styles.InputContainer}>
                                    <TextBox sendref={textBox2} error={passwordError} value={password} onFocus={() => setonFocus(true)} onBlur={() => setonFocus(false)} onChangeText={text => {
                                        setpasswordError(false)
                                        setpassword(text);
                                    }} title="PASSWORD" icon="md-key" /></View></TouchableWithoutFeedback>
                            <TouchableOpacity style={styles.shadowButton} onPress={() => {


                                if (username && password) {
                                    setloading(true);
                                    authentication(username, password, navigation, setloading)
                                }
                                else {
                                    if (!username) setusernameError("Username is empty")
                                    if (!password) setpasswordError("Password is empty")
                                }
                            }}>
                                <Ionicons name="ios-play" size={20} color={color.primaryWhite} />
                            </TouchableOpacity>
                        </View>


                        {
                            isKeyboardVisible ?
                                null :
                                <View style={{margin:20,flexDirection:'row',justifyContent:'space-between'}}>
                                <TouchableOpacity style={{flex:1}}  onPress={() => { navigation.navigate("NewUser") }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={styles.bottomText}>NEW ACCOUNT</Text>
                                        <Ionicons name="ios-play" size={20} color={color.primaryWhite} />
                                    </View>
                                    <Text style={[styles.bottomText,{opacity:0.5}]}>Register here</Text>


                                </TouchableOpacity>
                                <TouchableOpacity style={{flex:0.7,alignItems:'flex-end'}}  onPress={() => { navigation.navigate("ForgotPassword") }}>
                                        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                                </TouchableOpacity>
                                </View>
                        }

                    </KeyboardAwareScrollView>
                    :
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <ActivityIndicator size={40} color={color.primaryBlack} />
                    </View>
                }

            </LinearGradient>
        </SafeAreaView>



    );

}

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between'
    },
    Logo: {
        alignSelf: 'center',
    },
    bottomText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 12,
        letterSpacing: 3,
        color: color.primaryWhite,
        marginRight:10
    },
    forgotPasswordText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 11,
        color: color.primaryWhite,
    },
    watermarkText: {
        height: 20,
        alignSelf: 'flex-start',
        fontFamily: 'Montserrat-Bold',
        fontSize: 10,
        margin: 10,
        letterSpacing: 6,
        marginLeft: 30,
        color: color.primaryWhite,

    },
    button: {
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignSelf: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: .2,
        shadowRadius: 8.30,

        elevation: 10,

    },
    shadowButton: {
        position: 'absolute',
        bottom: -15,
        right: -15,
        backgroundColor: color.secondryBlue,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
        width: 60,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: .2,
        shadowRadius: 20,

        elevation: 10,
    },
    LoginForm: {
        alignSelf: 'center',
        marginBottom: 20,
        backgroundColor: 'white',
        borderRadius: 25,
        width: '90%',
        height: 200,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: .2,
        shadowRadius: 8.30,
        elevation: 8,

    },
    InputContainer: {
        alignSelf: 'center',
        marginBottom: 20,
        alignItems: 'stretch',
        justifyContent: 'flex-end',
        width: '90%',
        height: 80,
    },
    middleLine: {
        flex: 1,
        borderBottomColor: 'black',
        borderBottomWidth: 0.5,
        marginHorizontal: 20,
        marginVertical: 20,
        opacity: 0.5
    }
});