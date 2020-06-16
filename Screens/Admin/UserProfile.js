import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView,
    Dimensions,
    Alert,
    ImageBackground
} from "react-native";
import { color } from '../../Assets/color';
import LinearGradient from 'react-native-linear-gradient';
import TextBox from '../../Components/textBox';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import BaseUrl from '../../Config'
import Dialog from "react-native-dialog";
import ImagePicker from 'react-native-image-picker';
import Header from '../../Components/TwoButtonHeader'
import firebase from 'react-native-firebase';
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
function EmployeeProfile({ navigation, route }) {
    const [firstName, setfirstName] = useState("")
    const [lastName, setlastName] = useState("")
    const [address, setaddress] = useState("")
    const [state, setstate] = useState("")
    const [zipCode, setzipCode] = useState("")
    const [loading, setloading] = useState(true)
    const [title, settitle] = useState("")
    const [body, setbody] = useState("")
    const [email, setemail] = useState("")
    const [phoneNo, setphoneNo] = useState("")
    const [imageUri, setimageUri] = useState("")
    const [editing, setediting] = useState(false)
    const [dialogboxVisible, setdialogboxVisible] = useState(false)
    const { userId } = route.params
    const getApiData=()=>{
        fetch(BaseUrl.Url + '/user/' + userId)
        .then((res) => res.json())
        .then((resJson) => {
            setemail(resJson.email)
            setimageUri(resJson.imageUrl)
            setphoneNo(resJson.phoneNumber)
            setfirstName(resJson.firstName);
            setlastName(resJson.lastName);
            setaddress(resJson.address);
            setstate(resJson.state);
            setzipCode(resJson.zipCode);
            setloading(false);
        })
    }
    useEffect(() => {
       getApiData()
    }, [])
    const ImagePick = () => {
        const options = {

            title: 'Select Profile Picture',
            customButtons: [
            ],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
            quality: 0.5
        };


        ImagePicker.showImagePicker(options, (response) => {

            if (response.didCancel) {
            } else if (response.error) {
            } else if (response.customButton) {
            } else {
                const source = { uri: response.uri };
                setloading(true)

                firebase
                    .storage()
                    .ref(formatDate() + '/' + userId + '/' + uuidv1() + '.jpeg')
                    .putFile(source.uri)
                    .then((res) => {
                        setimageUri(res.downloadURL)
                        setloading(false)
                    })
                    .catch((e) => {
                        setloading(false)
                        alert(e)
                    });

            }
        });
    }
    const deleteUser = () => {
        setloading(true)
        fetch(BaseUrl.Url + '/driver/' + userId, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((res) => res.json())
            .then((resJson) => {
                navigation.goBack()
            })
            .catch((e) => {})
        setloading(false)
    }
    const sendMessage = () => {
        fetch(BaseUrl.Url + '/admin/notification', {
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
            .then((resJson) => {})
            .catch((e) => alert(e))
    }
    const saveDetails = () => {
        setloading(true)
        fetch(BaseUrl.Url + "/user", {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                address:address,
                phoneNumber:phoneNo,
                state:state,
                imageUrl: imageUri,
                zipCode:zipCode,
                uid: userId



            }),
        }).then((res) => res.json())
            .then((resJson) => { 
                setediting(false)
                getApiData()
                setloading(false) })
            .catch((e) => {
                setloading(false)

                alert(e)
            })
    }


    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={[color.lightGreen, color.lightBlue]} style={styles.container}>
                <Header title="PROFILE" onPress={() => setdialogboxVisible(true)} icon="ios-mail" navigation={navigation} />
                <ScrollView style={styles.container}>
                    <View style={styles.WhiteContainer}>
                        <View style={styles.formContainer}>

                            {
                                loading ?
                                    <ActivityIndicator size="large" color={color.primaryBlack} />
                                    :
                                    <>
                                        <View style={styles.ImagesContainer}>
                                            <TouchableOpacity onPress={() => ImagePick()} disabled={editing ? false : true} style={{ borderWidth: 1, borderRadius: (windowWidth - 60) / 3 }}>
                                                <ImageBackground source={{ uri: imageUri }} style={styles.logoContainer} imageStyle={{ borderRadius: (windowWidth - 60) / 3 }}>
                                                    {
                                                        editing ?
                                                            <Ionicons name="ios-add-circle" style={{ position: 'absolute', top: Math.sqrt(2) * (windowWidth - 60) / 6 - (windowWidth - 60) / 6 - 20, right: Math.sqrt(2) * (windowWidth - 60) / 6 - (windowWidth - 60) / 6 - 20 }} size={30} color={color.failedRed} />
                                                            : null
                                                    }
                                                </ImageBackground>
                                            </TouchableOpacity>
                                        </View>
                                        <TouchableOpacity activeOpacity={1} onPress={()=>{
                                            Alert.alert(
                                                "Unable to Change",
                                                "Email can not be change",
                                                [
  
                                                  { text: "OK", onPress: () => {} }
                                                ],
                                                { cancelable: false }
                                              );
                                          
                                        }} disabled={editing ? false : true}>
                                            <TextBox title="EMAIL" value={email} disabled={true} />
                                        </TouchableOpacity>
                                        <TextBox title="FIRST NAME" value={firstName} disabled={editing ? false : true} onChangeText={(text) => setfirstName(text)} />
                                        <TextBox title="LAST NAME" value={lastName} disabled={editing ? false : true} onChangeText={(text) => setlastName(text)} />
                                        <TextBox title="ADDRESS" value={address} disabled={editing ? false : true} onChangeText={(text) => setaddress(text)} />
                                        <TextBox title="PHONE NUMBER" value={phoneNo} disabled={editing ? false : true} onChangeText={(text) => setphoneNo(text)} />
                                        <TextBox title="STATE" value={state} disabled={editing ? false : true} onChangeText={(text) => setstate(text)} />
                                        <TextBox title="ZIPCODE" value={zipCode} disabled={editing ? false : true} onChangeText={(text) => setzipCode(text)} />
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
                    <View style={styles.buttonContainer}>
                        {
                            editing ?
                                <>
                                    <TouchableOpacity onPress={() => setediting(false)} style={styles.button}>
                                        <Text style={styles.buttonText}>CANCEL</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => saveDetails()} style={[styles.button, { backgroundColor: color.failedRed }]}>
                                        <Text style={styles.buttonText}>SAVE</Text>
                                    </TouchableOpacity>
                                </>
                                :
                                <>
                                    <TouchableOpacity onPress={() => setediting(prev => !prev)} style={styles.button}>
                                        <Text style={styles.buttonText}>EDIT</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        Alert.alert(
                                            '',
                                            'Are you sure you want to delete?',
                                            [
                                                { text: 'Cancel', onPress: () => { }, style: 'cancel' },
                                                { text: 'OK', onPress: () => deleteUser() },
                                            ],
                                            { cancelable: false }
                                        )

                                    }} style={[styles.button, { backgroundColor: color.failedRed }]}>
                                        <Text style={styles.buttonText}>DELETE</Text>
                                    </TouchableOpacity>
                                </>

                        }

                    </View>
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
        marginVertical: 20,
        justifyContent: 'space-evenly',


    },
    WhiteContainer: {
        backgroundColor: color.primaryWhite,
        alignSelf: 'center',
        marginVertical: 30,
        width: '90%',
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

    saveText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 12,
        letterSpacing: 2,
        color: color.primaryBlue
    },
    buttonContainer: {
        height: 50,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    buttonText: {
        fontFamily: 'Montserrat-Bold',
        color: color.primaryWhite,
        fontSize: 15,
        letterSpacing: 2,
    },
    button: {
        backgroundColor: color.secondryBlue,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        width: '40%',
        marginHorizontal: 10,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: .2,
        shadowRadius: 8.30,
        elevation: 3,
    },
    ImagesContainer: {
        marginVertical: 20,
        marginHorizontal: 10,
        alignItems: 'center'
    },
    logoContainer: {
        width: (windowWidth - 60) / 3,
        height: (windowWidth - 60) / 3,
        borderRadius: 50
    },
});