import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    ActivityIndicator
} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import { color } from '../Assets/color';
import Logo from '../Assets/logo';
import GradientButton from '../Components/gradientButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import TextBox from '../Components/textboxLogin';
import firebase from 'react-native-firebase';

async function authentication(username, password, navigation) {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    firebase.auth().signInWithEmailAndPassword(username, password)
        .then((res) => {
            fetch('https://smogbuddy-dev.herokuapp.com/user/' + res.user.uid)
                .then((response) => response.json())
                .then((responseJson) => {
                    fetch('https://smogbuddy-dev.herokuapp.com/user/fcm/' + res.user.uid, {
                        method: 'PUT',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            fcm: fcmToken
                        }),
                    }).then((res) => {})
                        .catch((e) => alert(e));

                })
                .catch((error) => {
                    console.error(error);
                });



        })
        .catch((e) => alert(e));


}

function Login({ navigation }) {
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [loading, setloading] = useState(false);

    return (
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={[color.primaryGreen, color.primaryBlue]} style={styles.container}>
            <SafeAreaView style={styles.container}>
                {!loading ?
                    <KeyboardAwareScrollView
                        contentContainerStyle={styles.container}
                    >
                        <View style={{ flex: 1 }}>
                            <Text style={styles.watermarkText}>SMOGBUDDY</Text>
                            <Logo style={styles.Logo} />
                        </View>
                        <View style={styles.LoginForm}>
                            <View style={{ flex: 1, marginTop: 30, marginBottom: -30 }}><TextBox onChangeText={text => {
                                setusername(text);
                            }} title="USERNAME" icon="md-person" /></View>
                            <View style={styles.middleLine} />
                            <View style={{ flex: 1 }}><TextBox onChangeText={text => {
                                setpassword(text);
                            }} title="PASSWORD" icon="md-key" /></View>
                            <View style={styles.button}>
                                <TouchableOpacity onPress={() => {
                                    setloading(true);
                                    authentication(username, password, navigation)
                                }}>
                                    <GradientButton />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{ flex: 0.4 }}>
                            <TouchableOpacity onPress={() => { navigation.navigate("NewUser") }} style={{ position: 'absolute', bottom: "5%" }}><Text style={styles.bottomText}>NEW ACCOUNT</Text></TouchableOpacity>
                        </View>
                    </KeyboardAwareScrollView>
                    :
                    <ActivityIndicator size={40} color={color.primaryBlack} />
                }
            </SafeAreaView>
        </LinearGradient>



    );

}

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    Logo: {
        alignSelf: 'center',
    },
    bottomText: {
        flex: 1,
        fontFamily: 'Montserrat-Bold',
        fontSize: 10,
        letterSpacing: 6,
        color: color.primaryWhite,
        margin: 20
    },
    watermarkText: {
        flex: 1,
        alignSelf: 'flex-start',
        fontFamily: 'Montserrat-Bold',
        fontSize: 10,
        margin: 20,
        letterSpacing: 6,
        marginLeft: 30,
        color: color.primaryWhite,

    },
    button: {
        alignSelf: 'flex-end',
        marginBottom: -20,
        marginRight: -20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: .2,
        shadowRadius: 8.30,

        elevation: 10,

    },
    LoginForm: {
        alignSelf: 'center',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        width: 300,
        height: 250,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: .2,
        shadowRadius: 8.30,
        elevation: 8,

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