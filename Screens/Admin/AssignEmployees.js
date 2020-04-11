import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Picker,
} from "react-native";
import { color } from '../../Assets/color';
import LinearGradient from 'react-native-linear-gradient';
import TextBox from '../../Components/textBox';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GradientButton from '../../Components/longButton';
import { SafeAreaView } from 'react-native-safe-area-context';
function deleteProfile() {

}
function Assign(pickUp, technician, driver, userId, setloading, navigation) {
    console.log(pickUp, ":", technician, ":", driver, ":", userId, ":", setloading)
    fetch('https://smogbuddy.herokuapp.com/admin/assign/driver', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userUid: userId,
            driverUid: driver,
            technicianUid: technician,
            userPickupLocation: pickUp
        }),
    })
        .then((response) => response.json())
        .then((responseJson) => {
            setloading(false)
            navigation.goBack()

        })
        .catch((e) => Alert(e))
}
function AssignEmployees({ navigation, route }) {
    const [Name, setName] = useState("")
    const [loading, setloading] = useState(true)
    const [employeeList, setemployeeList] = useState(null)
    const [technician, settechnician] = useState(null)
    const [driver, setdriver] = useState(null)
    const [fetching, setfetching] = useState(true)
    const { details } = route.params;
    const handleTechnician = (val) => {
        if (val !== 0) {
            settechnician(val);
        }
    }
    const handleDriver = (val) => {
        if (val !== 0) {
            setdriver(val);
        }
    }
    const getApiData = () => {
        fetch('https://smogbuddy.herokuapp.com/driver/available-list')
            .then((res) => res.json())
            .then((resJson) => {
                console.log("RESJSON>>", resJson)
                setemployeeList(resJson);
                setfetching(false);
                setloading(false);
                setName(details.user.firstName + " " + details.user.lastName);
            })
            .catch((e) => alert(e))
    }
    useEffect(() => {
        if (fetching) getApiData();

    })

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={[color.lightGreen, color.lightBlue]} style={styles.container}>
                <View style={styles.headerContainer}><TouchableOpacity onPress={() => navigation.goBack()} style={styles.icon}><Ionicons name="ios-close" size={40} /></TouchableOpacity><Text style={styles.headerText}>ASSIGN EMPLOYEES</Text><View /></View>
                <View style={styles.container}>
                    <View style={styles.formContainer}>
                        {
                            loading ?
                                <ActivityIndicator size="large" color={color.primaryBlack} />
                                :
                                <>
                                    <TextBox title="CUSTOMER NAME" value={Name} disabled={true} />
                                    <Picker style={styles.picker} itemStyle={styles.pickerItems}
                                        selectedValue={driver}
                                        onValueChange={(itemValue, itemIndex) =>
                                            handleDriver(itemValue)
                                        }>
                                        <Picker.Item label='Select a Driver' value='0' />
                                        {employeeList.drivers.map(element => {
                                            return (
                                                <Picker.Item label={element.firstName + " " + element.lastName} value={element.uid} />
                                            );
                                        })

                                        }

                                    </Picker>
                                    <Picker style={styles.picker}
                                        selectedValue={technician}
                                        onValueChange={(itemValue, itemIndex) =>
                                            handleTechnician(itemValue)
                                        }
                                        itemStyle={styles.pickerItems}
                                    >
                                        <Picker.Item label='Select a Technician' value='0' />
                                        {employeeList.technicians.map(element => {
                                            return (
                                                <Picker.Item label={element.firstName + " " + element.lastName} value={element.uid} />
                                            );
                                        })

                                        }

                                    </Picker>
                                </>

                        }
                        {
                            !loading ?
                                <TouchableOpacity onPress={() => {

                                    if (technician == null || driver == null) alert("Please Select Driver And Technician")
                                    else {
                                        setloading(true);

                                        Assign(details.pickupLocation, technician, driver, details.userId, setloading, navigation);
                                    }
                                }
                                } style={styles.buttonContainer}><GradientButton title="SUBMIT" style={styles.button} /></TouchableOpacity>
                                :
                                null
                        }
                    </View>
                </View>
            </LinearGradient>
        </SafeAreaView>
    );

}

export default AssignEmployees;

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    headerContainer: {
        height: 100,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 20,
        letterSpacing: 2,
    },
    formContainer: {
        marginTop: 30,
        height: 400,
        width: 300,
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

    picker: {
        flex: 1,
        margin: 25,


    },
    button: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: .2,
        shadowRadius: 8.30,

        elevation: 5,


    },
    buttonContainer: {
        alignItems: 'center',
        marginBottom: -20,
        marginRight: -10,
        zIndex: 1
    },
    pickerItems: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 15,
        letterSpacing: 2,
    }
});