import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity, ScrollView, KeyboardAvoidingView,
    ActivityIndicator
} from "react-native";
import { color } from '../../Assets/color';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CheckBox from '@react-native-community/checkbox';
import TextBox from '../../Components/textBox';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import GradientButton from '../../Components/longButton';
import firebase from 'react-native-firebase';

const uuidv1 = require('uuid/v1');
function newUser(firstName, lastName, email, date, employNo, phoneNo, imageUri,licenceNo, role, position,navigation, setloading) {
    const isAdmin=false
    if(role=="MANAGER")isAdmin=true
    firebase
        .storage()
        .ref('employee/' + uuidv1() + '.jpeg')
        .putFile(imageUri)
        .then((res) => {
            fetch('https://smogbuddy.herokuapp.com/driver/', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    dateOfHire: date,
                    employNumber: employNo,
                    phoneNumber: phoneNo,
                    imageUrl: res.downloadURL,
                    isAdmin: isAdmin,
                    licenseNumber: licenceNo,
                    role: role,
                    position: position
                }),
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    setloading(false)
                    navigation.popToTop()
                    
                })
                .catch((error) => {
                    console.error(error);
                });

        })
        .catch((e) => alert(e));

}
function EmployeeRegistration_2({ navigation, route }) {
    const { firstName, lastName, email, role, date, imageUri } = route.params;
    const [position, setposition] = useState("");
    const [employNo, setemployNo] = useState(null);
    const [licenceNo, setlicenceNo] = useState("");
    const [phoneNo, setphoneNo] = useState("");
    const [loading, setloading] = useState(false);
    const [isAdmin, setisAdmin] = useState(false);

    return (
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={[color.primaryGreen, color.primaryBlue]} style={styles.container}>
            <KeyboardAwareScrollView style={{ flex: 1, zIndex: 0 }} contentContainerStyle={{ height: 650, justifyContent: 'space-between' }}>
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
                                <Text style={styles.smallText}> {role}</Text>
                            </View>
                            <View style={styles.selection}>
                                <View style={styles.insideArea}>
                                    <TextBox title="POSITION" underline={true} onChangeText={text => setposition(text)} />
                                    <TextBox title="PHONE NO" underline={true} onChangeText={text => setphoneNo(text)} />
                                    <TextBox title="EMPLOY NO" underline={true} onChangeText={text => setemployNo(text)} />
                                    {
                                        role == "DRIVER" ?
                                            <TextBox title="LICENCE NO" underline={true} onChangeText={text => setlicenceNo(text)} />
                                            :
                                            null
                                    }
                                </View>
                                <View style={{ flexDirection: 'row', zIndex: 1, marginHorizontal: 20, justifyContent: 'space-between' }}>
                                    <Text style={styles.subText}>2/2</Text>
                                    <TouchableOpacity style={styles.buttonContainer} onPress={() => {
                                        setloading(true)
                                        newUser(firstName, lastName, email, date, employNo, phoneNo, imageUri,licenceNo, role, position, navigation,setloading)
                                    }}
                                    ><GradientButton title="SUBMIT" style={styles.button} /></TouchableOpacity>
                                </View>
                            </View>
                            <View />
                        </>

                }

            </KeyboardAwareScrollView>
        </LinearGradient>

    );

}

export default EmployeeRegistration_2;

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
        height: 500,
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
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'space-between',
        margin: 20,
        zIndex: 0
    },
    upperContainer: {
        height: 50,
        flexDirection: 'row',
        alignSelf: 'flex-start',
        alignItems: 'center',
        marginVertical: 20,
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
    },
    isAdminText: {
        fontFamily: 'Montserrat-regular',
        fontSize: 12,
        letterSpacing: 4,
    },
    isAdminStyle: {
        margin: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }

});