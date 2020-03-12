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
import TextBox from '../../Components/textBox';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import GradientButton from '../../Components/longButton';
function newService(name, yearRange, cost, averageTime, navigation,route) {
    fetch('https://smogbuddy-dev.herokuapp.com/service', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            serviceName: name,
            yearRange: yearRange,
            averageTime: averageTime,
            cost: cost,
        }),
    })
        .then((response) => response.json())
        .then((responseJson) => {
            navigation.popToTop()
        })
        .catch((error) => {
            console.error(error);
        });
}
function AddServices({ navigation, route }) {
    const [name, setname] = useState("");
    const [yearRange, setyearRange] = useState("");
    const [cost, setcost] = useState("");
    const [averageTime, setaverageTime] = useState("")
    const [loading, setloading] = useState(false)

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
                                <Text style={styles.HeaderText}>ADD SERVICE</Text>

                            </View>
                            <View style={styles.selection}>
                                <View style={styles.insideArea}>
                                    <TextBox title="SERVICE NAME" underline={true} onChangeText={text => setname(text)} />
                                    <TextBox title="YEAR RANGE" underline={true} onChangeText={text => setyearRange(text)} />
                                    <TextBox title="COST" underline={true} onChangeText={text => setcost(text)} />
                                    <TextBox title="AVERAGE TIME" underline={true} onChangeText={text => setaverageTime(text)} />
                                </View>
                                <View style={{ flexDirection: 'row', zIndex: 1, marginHorizontal: 20, justifyContent: 'space-between' }}>
                                    <Text style={styles.subText}></Text>
                                    <TouchableOpacity style={styles.buttonContainer} onPress={() => {
                                        setloading(true)
                                        newService(name, yearRange, cost, averageTime, navigation,route)
                                    }}
                                    ><GradientButton title="ADD" style={styles.button} /></TouchableOpacity>
                                </View>
                            </View>
                            <View />
                        </>

                }

            </KeyboardAwareScrollView>
        </LinearGradient>

    );

}

export default AddServices;

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
    HeaderText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 15,
        letterSpacing: 3,
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
    }

});