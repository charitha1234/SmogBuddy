import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Alert,
    TouchableOpacity,
} from "react-native";
import { color } from '../Assets/color';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TextBox from '../Components/textBox';
import firebase from 'react-native-firebase'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SafeAreaView } from 'react-native-safe-area-context';
import GradientButton from '../Components/longButton';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
function ForgotPassword({ navigation }) {
    const [email, setemail] = useState("");
    const [error, seterror] = useState(false)
    const [loading, setloading] = useState(false)
    const validateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    const sendReset = () => {
        setloading(true)
        if (validateEmail(email)) {
            firebase.auth().sendPasswordResetEmail(email).then(function () {
                Alert.alert(
                    "Password reset sent",
                    "We've emailed you instructions for setting your password, if an account exist with the email you entered.\nYou should receive them shortly",
                    [
                      { text: "OK", onPress: () => navigation.navigate("Login") }
                    ],
                    { cancelable: false }
                  );
                  setloading(false)
            }).catch(function (error) {
                setloading(false)
                Alert.alert(
                    "Password reset failed",
                    "There is no user record corresponding to this email",
                    [
                      { text: "OK", onPress: () => {} }
                    ],
                    { cancelable: false }
                  );
                // An error happened.
            });
        }
        else{
            seterror("Invalid Email")
            Alert.alert(
                "Invalid Email",
                "Please check your email",
                [
                  { text: "OK", onPress: () => {} }
                ],
                { cancelable: false }
              );
        }
    }

    return (
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={[color.primaryGreen, color.primaryBlue]} style={styles.container}>
            <SafeAreaView style={styles.container}>
                <KeyboardAwareScrollView style={{ flex: 1, zIndex: 0 }} contentContainerStyle={{ height: windowHeight }}>
                    <View style={styles.upperContainer}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                            <Ionicons name="ios-arrow-dropleft-circle" size={40} color={color.primaryWhite} />
                        </TouchableOpacity>
                        <Text style={styles.waterMarkText}>SMOGBUDDY </Text>
                        <Text style={styles.smallText}>|</Text>
                        <Text style={styles.smallText}> Forgot Password</Text>
                    </View>
                    <View style={[styles.selection, error ? { borderColor: color.failedRed, borderWidth: 3 } : null]}>
                        <View style={styles.insideArea}>
                            <TextBox title="EMAIL" error={error} underline={true} value={email} onChangeText={text => {
                                seterror(null)
                                setemail(text)
                            }} />
                        </View>
                        <View style={{ flexDirection: 'row', zIndex: 1, marginHorizontal: 20, justifyContent: 'space-between' }}>
                            <Text style={styles.subText}></Text>
                            <TouchableOpacity disabled={loading} style={styles.buttonContainer} onPress={() => sendReset()}><GradientButton loading={loading} title="SEND LINK" /></TouchableOpacity>
                        </View>
                    </View>
                    <View />
                </KeyboardAwareScrollView>
            </SafeAreaView>
        </LinearGradient>

    );

}

export default ForgotPassword;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'space-between'
    },
    selection: {
        marginTop: 30,
        alignSelf: 'center',
        backgroundColor: 'white',
        width: '90%',
        borderRadius: 20,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: .2,
        shadowRadius: 8.30,
        elevation: 8,
        zIndex: 0

    }
    ,
    imageContainer: {
        marginVertical: 25,
        flex: 1,
        height: 60,
        justifyContent: 'space-evenly',
        marginHorizontal: 10,
        alignItems: 'center',
        borderRadius: 25,
        backgroundColor: color.primaryWhite,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: .2,
        shadowRadius: 8.30,

        elevation: 5,
    },
    smallText: {
        fontFamily: 'Montserrat-regular',
        fontSize: 10,
        letterSpacing: 2,
        color: color.primaryWhite,
    },
    subText: {
        fontFamily: 'Montserrat-regular',
        fontSize: 12,
        letterSpacing: 4,
        color: color.primaryBlack,
        marginLeft: 20,
        opacity: 0.5
    },
    waterMarkText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 10,
        letterSpacing: 6,
        color: color.primaryWhite,

    },
    insideArea: {
        alignItems: 'stretch',
        justifyContent: 'space-between',
        margin: 20,
        zIndex: 0
    },
    upperContainer: {
        height: 66,
        flexDirection: 'row',
        alignSelf: 'flex-start',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },

    buttonContainer: {
        marginRight: -30,
        marginBottom: -10,
        zIndex: 1
    },
    backButton: {
        marginHorizontal: 20,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: .2,
        shadowRadius: 8.30,

        elevation: 5,

    },
    icon: {
        color: '#ac47ff',
        zIndex: 0,
    },
    icon1: {
        color: color.buttonLower,
        marginRight: -45,
        marginTop: -20,
        zIndex: 1,
    }

});