import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    ScrollView
} from "react-native";
import { color } from '../../Assets/color';
import LinearGradient from 'react-native-linear-gradient';
import TextBox from '../../Components/textBox';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firebase from 'react-native-firebase';
import { SafeAreaView } from 'react-native-safe-area-context';
import Dialog from "react-native-dialog";

function EmployeeProfile({ navigation, route }) {
    const [firstName, setfirstName] = useState("")
    const [lastName, setlastName] = useState("")
    const [address, setaddress] = useState("")
    const [state, setstate] = useState("")
    const [zipCode, setzipCode] = useState("")
    const [loading, setloading] = useState(true)
    const [title, settitle] = useState("")
    const [body, setbody] = useState("")
    const [editing, setediting] = useState(false)
    const [dialogboxVisible, setdialogboxVisible] = useState(false)
    const { userId } = route.params
    useEffect(() => {
        fetch('https://smogbuddy.herokuapp.com/user/' + userId)
            .then((res) => res.json())
            .then((resJson) => {
                console.log(resJson)
                setloading(false);
                setfirstName(resJson.firstName);
                setlastName(resJson.lastName);
                setaddress(resJson.address);
                setstate(resJson.state);
                setzipCode(resJson.zipCode);
            })
    }, [])

    const deleteUser = () => {
        setloading(true)
        fetch('https://smogbuddy.herokuapp.com/driver/' + userId, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((res) => res.json())
            .then((resJson) => {
                navigation.goBack()
                console.log("resdele", resJson)
            })
            .catch((e) => console.log("deete error", e))
        setloading(false)
    }
    const sendMessage = () => {
        fetch('https://smogbuddy.herokuapp.com/admin/notification', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                uid: userId,
                title: title,
                body: body
            }),
        })
            .then((res) => res.json())
            .then((resJson) => console.log("RES", resJson))
            .catch((e) => alert(e))
    }

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={[color.lightGreen, color.lightBlue]} style={styles.container}>
                <View style={styles.headerContainer}><TouchableOpacity onPress={() => navigation.goBack()} style={styles.icon}><Ionicons name="ios-close" size={40} /></TouchableOpacity><Text style={styles.headerText}>PROFILE</Text>
                    <TouchableOpacity onPress={() => setdialogboxVisible(true)} style={{ marginLeft: -40, marginRight: 20 }}><Ionicons name="ios-mail" size={40} /></TouchableOpacity></View>
                <ScrollView style={styles.container}>
                    <View style={styles.container}>
                        <View style={styles.formContainer}>
                            <TouchableOpacity onPress={() => setediting(prev => !prev)} style={{ zIndex: 100, position: "absolute", top: 0, right: 0, height: 50, width: 50, justifyContent: 'center', alignItems: 'center' }}>
                                {
                                    editing ?
                                        <Text style={styles.saveText}>Save</Text>
                                        :
                                        <Ionicons name="md-create" size={20} />
                                }


                            </TouchableOpacity>
                            {
                                loading ?
                                    <ActivityIndicator size="large" color={color.primaryBlack} />
                                    :
                                    <>
                                        <TextBox title="FIRST NAME" value={firstName} disabled={editing ? false : true}  onChangeText={(text)=>setfirstName(text)} />
                                        <TextBox title="LAST NAME" value={lastName} disabled={editing ? false : true} onChangeText={(text)=>setlastName(text)} />
                                        <TextBox title="ADDRESS" value={address} disabled={editing ? false : true} onChangeText={(text)=>setaddress(text)} />
                                        <TextBox title="STATE" value={state} disabled={editing ? false : true} onChangeText={(text)=>setstate(text)} />
                                        <TextBox title="ZIPCODE" value={zipCode} disabled={editing ? false : true} onChangeText={(text)=>setzipCode(text)} />
                                    </>

                            }

                        </View>
                    </View>
                    <Dialog.Container visible={dialogboxVisible}>
                        <Dialog.Title>Please Enter Message</Dialog.Title>
                        <Dialog.Input wrapperStyle={{ borderBottomWidth: 1 }} label="Type Title" onChangeText={(text) => settitle(text)} />
                        <Dialog.Input wrapperStyle={{ borderBottomWidth: 1 }} label="Type Body" onChangeText={(text) => setbody(text)} />
                        <Dialog.Button onPress={() => { setdialogboxVisible(false) }} label="Cancel" />
                        <Dialog.Button onPress={() => {
                            setdialogboxVisible(false)
                            sendMessage()
                        }} label="SEND" />
                    </Dialog.Container>
                    <TouchableOpacity onPress={() => {
                        Alert.alert(
                            '',
                            'Are you sure you want to delete?',  
                            [
                               {text: 'Cancel', onPress: () => {}, style: 'cancel'},
                               {text: 'OK', onPress: () => deleteUser()},
                            ],
                            { cancelable: false }
                       )
                        
                        }} style={styles.deleteButton}><Text style={styles.deleteText}>DELETE PROFILE</Text></TouchableOpacity>
                </ScrollView>
            </LinearGradient>
        </SafeAreaView>
    );

}

export default EmployeeProfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    headerContainer: {
        flex: 0.25,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 30,
        letterSpacing: 2,
    },
    formContainer: {
        marginTop: 30,
        height: '90%',
        width: '90%',
        alignSelf: 'center',
        justifyContent: 'center',
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
    icon: {
        marginRight: -20,
        marginLeft: 20
    },
    deleteButton: {
        height: 50,
        width: 200,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: color.failedRed,
        borderRadius: 25,
        margin: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: .2,
        shadowRadius: 8.30,

        elevation: 5,
    },
    deleteText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 12,
        letterSpacing: 2,
        color: color.primaryWhite
    },
    saveText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 12,
        letterSpacing: 2,
        color: color.primaryBlue
    }
});