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
function newUser(username, password, firstName, lastName, dateOfHire, state, zipCode, phoneNo, position) {
    fetch('https://smogbuddy-dev.herokuapp.com/user/', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            uid: res.user.uid,
            firstName: firstName,
            lastName: lastName,
            dateOfHire: dateOfHire,
            employNumber: "",
            isAdmin: false,
            phoneNumber: phoneNo,
            role: "DRIVER",
            position: position
        }),
    })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
        })
        .catch((error) => {
            console.error(error);
        });

}
function EmployeeRegistration_2({ navigation, route }) {
    const {role}=route.params;
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
                                        role=="DRIVER"?
                                        <TextBox title="LICENCE NO" underline={true} onChangeText={text => setlicenceNo(text)} />
                                        :
                                        null
                                    }
                                    <View style={styles.isAdminStyle}>
                                        <Text style={styles.isAdminText}>ADMIN?</Text>
                                        <CheckBox onValueChange={()=>setisAdmin(!isAdmin)} value={isAdmin} />
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', zIndex: 1, marginHorizontal: 20, justifyContent: 'space-between' }}>
                                    <Text style={styles.subText}>2/3</Text>
                                    <TouchableOpacity style={styles.buttonContainer} onPress={() => {
                                        setloading(true)
                                        newUser(username, password, route.params.firstName, route.params.lastName, route.params.address, route.params.state, zipcode, phoneNo, navigation)
                                    }}
                                    ><GradientButton style={styles.button} /></TouchableOpacity>
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
    isAdminText:{
        fontFamily: 'Montserrat-regular',
        fontSize: 12,
        letterSpacing: 4,
    },
    isAdminStyle:{
        margin:25,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    }

});