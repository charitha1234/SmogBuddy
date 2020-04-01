import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    Dimensions,
    TouchableOpacity, ScrollView, KeyboardAvoidingView
} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { color } from '../../Assets/color';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-picker';

import TextBox from '../../Components/textBox';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import GradientButton from '../../Components/longButton';
function EmployeeRegistration({ navigation, route }) {
    console.log("ROUTE>>",route)
    const { role } = route.params
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [email, setemail] = useState("")
    const [filePath, setfilePath] = useState(null)
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("")
    const [address, setaddress] = useState("");
    const [state, setstate] = useState("");
    const chooseFile = () => {
        var options = {
          title: 'Select Image',
          quality:0.5,
          customButtons: [
          ],
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        ImagePicker.showImagePicker(options, response => {
          console.log('Response = ', response);
    
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
            alert(response.customButton);
          } else {
            let source = response;
            // You can also display the image using data:
            // let source = { uri: 'data:image/jpeg;base64,' + response.data };
            setfilePath(source);
          }
        });
      };
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };


    return (
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={[color.primaryGreen, color.primaryBlue]} style={styles.container}>
            <KeyboardAwareScrollView style={{ flex: 1, zIndex: 0 }} contentContainerStyle={{ height: 650 }}>
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
                        <TextBox title="First NAME" underline={true} onChangeText={text => setfirstName(text)} />
                        <TextBox title="Last NAME" underline={true} onChangeText={text => setlastName(text)} />
                        <TextBox title="EMAIL" underline={true} onChangeText={text => setemail(text)} />
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={chooseFile} style={styles.imageContainer}>
                                <Ionicons name="ios-camera" size={30} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={showDatepicker} style={styles.dateContainer}>
                                <Text style={styles.dateLabel}>PICK DATE</Text>
                                <Text style={styles.dateText}>{date.toLocaleDateString()}</Text>
                                {show && (
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        timeZoneOffsetInMinutes={0}
                                        value={date}
                                        mode={mode}
                                        is24Hour={true}
                                        display="default"
                                        onChange={onChange}
                                    />
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', zIndex: 1, marginHorizontal: 20, justifyContent: 'space-between' }}>
                        <Text style={styles.subText}>1/2</Text>
                        <TouchableOpacity style={styles.buttonContainer} onPress={() => {
                            if (firstName == "" || lastName == "" || email == "") alert("Please Fill All Requires")
                            else navigation.navigate("EmployeeRegistration_2", { firstName: firstName, lastName: lastName, email: email, role: role, date: date,imageUri:filePath.uri })
                        }}><GradientButton style={styles.button} /></TouchableOpacity>
                    </View>
                </View>
                <View />
            </KeyboardAwareScrollView>
        </LinearGradient>

    );

}

export default EmployeeRegistration;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'space-between'
    },
    selection: {
        alignSelf: 'center',
        backgroundColor: 'white',
        width: '90%',
        height:Dimensions.get('window').height*0.7,
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
    dateContainer: {
        flex: 2,
        marginVertical: 25,
        marginHorizontal: 10,
        height: 60,
        justifyContent: 'space-evenly',
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
    dateLabel: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 12,
        letterSpacing: 3,
        opacity: 0.5,
    },
    dateText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 15,
        letterSpacing: 3,
    },
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
    }

});