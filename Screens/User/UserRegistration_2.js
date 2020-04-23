import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity, ScrollView, KeyboardAvoidingView,
    ActivityIndicator,
    Dimensions
} from "react-native";
import { color } from '../../Assets/color';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TextBox from '../../Components/textBox';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import GradientButton from '../../Components/longButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import firebase from 'react-native-firebase';
import BaseUrl from '../../Config'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const uuidv1 = require('uuid/v1');
function formatDate() {
    let d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) {
        month = '0' + month;
    }
    if (day.length < 2) {
        day = '0' + day;
    }

    return [year, month, day].join('-');
}
function newUser(username, password, firstName, lastName, imageUrl, address, state, zipCode, phoneNo, navigation, setloading, setserverError) {
    console.log("User", username, password)
    firebase.auth().createUserWithEmailAndPassword(username, password)
        .then((res) => {
            firebase
                .storage()
                .ref(formatDate() + '/' + res.user.uid + '/' + uuidv1() + '.jpeg')
                .putFile(imageUrl.uri)
                .then((imageRes) => {
                    fetch(BaseUrl.Url+'/user/', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            uid: res.user.uid,
                            firstName: firstName,
                            lastName: lastName,
                            address: address,
                            state: state,
                            imageUrl: imageRes.downloadURL,
                            zipCode: zipCode,
                            phoneNumber: phoneNo,
                            email: username,
                            role: "CUSTOMER"
                        }),
                    }).then((res) => res.json())
                        .then((responseJson) => {
                            setloading(false)
                            firebase.auth().signOut()
                            navigation.navigate("Login")
                        })
                        .catch((error) => {
                            setserverError(true)
                            setloading(false)
                            res.user.delete().then(function () {
                            }, function (error) {
                                // An error happened.
                            });
                            alert(error)
                        });
                })
                .catch((e) => {
                    setloading(false)
                    res.user.delete().then(function () {
                    }, function (error) {
                        // An error happened.
                    });
                    alert(e)
                });
        })
        .catch((e) => {
            setserverError(true)
            setloading(false)
            console.log("USER NOT created")
            alert(e)
        }
        )

}
function UserRegistration_2({ navigation, route }) {
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [retypePassword, setretypePassword] = useState("")
    const [zipcode, setzipcode] = useState("");
    const [phoneNo, setphoneNo] = useState("");
    const [loading, setloading] = useState(false)
    const [error, seterror] = useState(null)
    const [isMissmatched, setisMissmatched] = useState(null)
    const [serverError, setserverError] = useState(false)

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={[color.primaryGreen, color.primaryBlue]} style={styles.container}>
                <KeyboardAwareScrollView style={{ flex: 1, zIndex: 0 }} contentContainerStyle={{ height:windowHeight, }}>
                    {
                        loading ?
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <ActivityIndicator size={50} color={color.primaryBlack} />
                            </View>
                            :
                            <>
                                <View style={styles.upperContainer}>
                                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                                        <Ionicons name="ios-arrow-dropleft-circle" size={40} color={color.primaryWhite} />
                                    </TouchableOpacity>
                                    <Text style={styles.waterMarkText}>SMOGBUDDY </Text>
                                    <Text style={styles.smallText}>|</Text>
                                    <Text style={styles.smallText}> CUSTOMER</Text>
                                </View>
                                <View style={[styles.selection, (error || isMissmatched || serverError) ? { borderWidth: 3, borderColor: color.failedRed } : null]}>
                                    <View style={styles.insideArea}>
                                        <TextBox title="ZIP CODE" value={zipcode} error={error} underline={true} onChangeText={text => {
                                            setisMissmatched(false)
                                            setserverError(false)
                                            seterror(false)
                                            setzipcode(text)
                                        }} keyboardType='phone-pad' />
                                        <TextBox title="PHONE NO" value={phoneNo} error={error} underline={true} onChangeText={text => {
                                            setisMissmatched(false)
                                            setserverError(false)
                                            seterror(false)
                                            setphoneNo(text)
                                        }} keyboardType='phone-pad' />
                                        <TextBox title="EMAIL" value={username} error={error} underline={true} onChangeText={text => {
                                            setisMissmatched(false)
                                            setserverError(false)
                                            seterror(false)
                                            setusername(text)
                                        }} disabled={false} keyboardType='email-address' />
                                        <TextBox title="PASSWORD" value={password} error={error} underline={true} onChangeText={text => {
                                            setisMissmatched(false)
                                            setserverError(false)
                                            seterror(false)
                                            setpassword(text)
                                        }} disabled={false} />
                                        <TextBox title="RETYPE PASSWORD" value={retypePassword} isMissmatched={isMissmatched} error={error ? error : isMissmatched ? isMissmatched : null} underline={true} onChangeText={text => {
                                            setisMissmatched(false)
                                            setserverError(false)
                                            seterror(false)
                                            setretypePassword(text)
                                        }} disabled={false} />
                                    </View>
                                    <View style={{ flexDirection: 'row', zIndex: 1, marginHorizontal: 20, justifyContent: 'space-between' }}>
                                        <Text style={styles.subText}>2/2</Text>
                                        <TouchableOpacity style={styles.buttonContainer} onPress={() => {
                                            if (username &&
                                                password &&
                                                retypePassword &&
                                                zipcode &&
                                                phoneNo
                                            ) {
                                                if (password == retypePassword) {
                                                    setloading(true)
                                                    newUser(username, password, route.params.firstName, route.params.lastName, route.params.imageUrl, route.params.address, route.params.state, zipcode, phoneNo, navigation, setloading, setserverError)
                                                }
                                                else {
                                                    setisMissmatched("Password is not matched")
                                                }

                                            }
                                            else {
                                                seterror("Please fill these requirements")
                                            }

                                        }}
                                        ><GradientButton style={styles.button} /></TouchableOpacity>
                                    </View>
                                </View>
                                <View />
                            </>

                    }

                </KeyboardAwareScrollView>
            </LinearGradient>
        </SafeAreaView>

    );

}

export default UserRegistration_2;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'space-between'
    },
    selection: {
        alignSelf: 'center',
        backgroundColor: 'white',
        width: 300,
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
    smallText: {
        fontFamily: 'Montserrat-regular',
        fontSize: 10,
        letterSpacing: 6,
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
        justifyContent: 'space-evenly'
    },
    button: {

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: .2,
        shadowRadius: 8.30,

        elevation: 10,


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