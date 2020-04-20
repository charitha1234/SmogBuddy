import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from "react-native";
import { color } from '../../Assets/color';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TextBox from '../../Components/textBox';
import ImagePicker from 'react-native-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SafeAreaView } from 'react-native-safe-area-context';
import GradientButton from '../../Components/longButton';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
function UserRegistration({ navigation }) {
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("")
    const [address, setaddress] = useState("");
    const [state, setstate] = useState("");
    const [error, seterror] = useState(false)
    const [imageError, setimageError] = useState(false)
    const [filePath, setfilePath] = useState(null)
    const chooseFile = () => {
        var options = {
            title: 'Select Image',
            quality: 0.5,
            customButtons: [
            ],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.showImagePicker(options, response => {

            if (response.didCancel) {
            } else if (response.error) {
            } else if (response.customButton) {
            } else {
                let source = response;
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                setimageError(false)
                setfilePath(source);
            }
        });
    };

    return (
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={[color.primaryGreen, color.primaryBlue]} style={styles.container}>
            <SafeAreaView style={styles.container}>
                <KeyboardAwareScrollView style={{ flex: 1, zIndex: 0 }} contentContainerStyle={{ height:windowHeight,justifyContent:'space-between' }}>
                    <View style={styles.upperContainer}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                            <Ionicons name="ios-arrow-dropleft-circle" size={40} color={color.primaryWhite} />
                        </TouchableOpacity>
                        <Text style={styles.waterMarkText}>SMOGBUDDY </Text>
                        <Text style={styles.smallText}>|</Text>
                        <Text style={styles.smallText}> CUSTOMER</Text>
                    </View>
                    <View style={[styles.selection, (error || imageError) ? { borderColor: color.failedRed, borderWidth: 3 } : null]}>
                        <View style={styles.insideArea}>
                            <TextBox title="First NAME" error={error} underline={true} value={firstName} onChangeText={text => {
                                seterror(false)
                                setfirstName(text)
                            }} />
                            <TextBox title="Last NAME" error={error} underline={true} value={lastName} onChangeText={text => {
                                seterror(false)
                                setlastName(text)
                            }} />
                            <TextBox title="ADDRESS" error={error} underline={true} value={address} onChangeText={text => {
                                seterror(false)
                                setaddress(text)
                            }} />
                            <TextBox title="STATE" error={error} underline={true} value={state} onChangeText={text => {
                                seterror(false)
                                setstate(text)
                            }} />
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity onPress={chooseFile} style={[styles.imageContainer, imageError ? { borderColor: color.failedRed, borderWidth: 3 } : filePath ? { borderColor: color.primaryBlue, borderWidth: 3 } : null]}>
                                    <Ionicons name="ios-camera" size={30} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', zIndex: 1, marginHorizontal: 20, justifyContent: 'space-between' }}>
                            <Text style={styles.subText}>1/2</Text>
                            <TouchableOpacity style={styles.buttonContainer} onPress={() => {
                                if (firstName == "" || lastName == "" || address == "" || state == "") seterror("Please Fill All Requires")
                                else if (!filePath) {
                                    setimageError(true)
                                    alert("Please upload an image")
                                }
                                else navigation.navigate("UserRegistration_2", { firstName: firstName, lastName: lastName, address: address, state: state, imageUrl: filePath })
                            }}><GradientButton style={styles.button} /></TouchableOpacity>
                        </View>
                    </View>
                    <View />
                </KeyboardAwareScrollView>
            </SafeAreaView>
        </LinearGradient>

    );

}

export default UserRegistration;

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
        justifyContent: 'space-evenly',
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