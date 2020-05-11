import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
    Dimensions
} from "react-native";
import { color } from '../../Assets/color';
import LinearGradient from 'react-native-linear-gradient';
import TextBox from '../../Components/textBox';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../../Components/TwoButtonHeader';
import Modal from 'react-native-modal';
import Swiper from 'react-native-swiper'
import BaseUrl from '../../Config'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
function Process({ navigation, route }) {
    const { details } = route.params;
    const [isModalVisible, setisModalVisible] = useState(false)
    const [userId, setuserId] = useState(null)
    const [Name, setName] = useState("")
    const [images, setimages] = useState(null)
    const [status, setstatus] = useState("")
    const [assignedDriver, setassignedDriver] = useState("")
    const [estimatedTime, setestimatedTime] = useState("")
    const [customerTelephoneNo, setcustomerTelephoneNo] = useState("")
    const [assignedTechnician, setassignedTechnician] = useState("")
    console.log('details', details)
    const getImages = () => {
        console.log("USERID",userId)
        fetch(BaseUrl.Url + '/user/images/' + details.userId)
            .then((res) => res.json())
            .then((resJson) => {
                console.log("response", resJson)
                setimages(resJson)
            })
            .catch((e) => { console.log("errr", e) })
    }


    useEffect(() => {
        console.log(details)
        setName(details.user.firstName + " " + details.user.lastName);
        setstatus(details.status);
        if (details.driver) {
            setassignedDriver(details.driver.firstName + " " + details.driver.lastName)
            setestimatedTime(details.driver.estimatedTime)
            if (details.technician) setassignedTechnician(details.technician.firstName + " " + details.technician.lastName)
            else setassignedTechnician("_")
        }
        else {
            setassignedDriver("_")
            setestimatedTime("_")
            setassignedTechnician("_")
        }
        setcustomerTelephoneNo(details.user.phoneNumber)
        getImages()

    }, [])
    return (
        <SafeAreaView style={styles.container}>
            <Header title="PROCESS" navigation={navigation} icon='ios-map' onPress={() => navigation.navigate("TrackDriver", { userId: details.userId })} />
            <ScrollView style={styles.container}>
                <View style={styles.whitebackground}>
                    <View style={styles.formContainer}>
                        <TextBox title="CUSTOMER NAME" value={Name} disabled={true} />
                        <TextBox title="STATUS" value={status} disabled={true} />
                        <TextBox title="ASSIGNED DRIVER" value={assignedDriver} disabled={true} />
                        <TextBox title="ASSIGNED TECHNICIAN" value={assignedTechnician} disabled={true} />
                        <TextBox title="ESTIMATED TIME" value={estimatedTime} disabled={true} />
                        <TextBox title="CUSTOMER TELEPHONE NO." value={customerTelephoneNo} disabled={true} />
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => setisModalVisible(true)} style={styles.button}>
                        <Text style={styles.buttonText}>IMAGES</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, { backgroundColor: color.failedRed }]}>
                        <Text style={[styles.buttonText]}>DELETE</Text>
                    </TouchableOpacity>
                </View>
                <Modal style={{ margin: 0 }} deviceHeight={windowHeight} deviceWidth={windowWidth} isVisible={isModalVisible} onBackdropPress={() => setisModalVisible(false)} useNativeDriver={true} backdropOpacity={0.9} >
                    <View style={{ flex: 1 }}>
                        <View style={{ zIndex: 10, position: 'absolute', top: 0, width: '100%', height: 50, backgroundColor: 'rgba(0,0,0,0.5)' }}>
                            <TouchableOpacity onPress={() => setisModalVisible(false)} style={{ height: 50, width: 50, alignItems: 'center', justifyContent: 'center' }}>
                                <Ionicons name="ios-close" color={color.primaryWhite} size={30} />
                            </TouchableOpacity>

                        </View>
                        {
                            images ?
                                <Swiper dotColor={'rgba(255,255,255,0.5)'} showsButtons={true} loop={false}>
                                    {
                                        images.map((data) => {
                                            return (
                                                <View style={{ flex: 1 }}>
                                                    <Image source={{ uri: data.imageUrl }} resizeMode="contain" style={{ height: '100%', width: '100%' }} />
                                                    <View style={{ position:'absolute',bottom:50, height: 100, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                                        <Text style={styles.statusText}>{data.status}</Text>
                                                        <Text style={styles.dateText}>{data.date}</Text>
                                                    </View>
                                                </View>
                                            )
                                        }
                                        )
                                    }
                                </Swiper>
                                :
                                null
                        }

                    </View>
                </Modal>
            </ScrollView>
        </SafeAreaView>
    );

}

export default Process;

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
        fontSize: 25,
        letterSpacing: 2,
    },
    formContainer: {
        marginVertical: 20,
        justifyContent: 'center',
        backgroundColor: color.primaryWhite,

    },
    whitebackground: {
        alignSelf: 'center',
        marginVertical: 20,
        width: '90%',
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
    buttonContainer: {
        height: 50,
        width: '100%',
        flexDirection: 'row'
    },
    buttonText: {
        fontFamily: 'Montserrat-Bold',
        color: color.primaryWhite,
        fontSize: 15,
        letterSpacing: 2,
    },
    statusText: {
        fontFamily: 'Montserrat-Bold',
        color: color.primaryWhite,
        fontSize: 15,
        letterSpacing: 2,
    },
    dateText: {
        fontFamily: 'Montserrat-Regular',
        color: color.primaryWhite,
        fontSize: 15,
        letterSpacing: 2,
    },
    button: {
        flex: 1,
        backgroundColor: color.secondryBlue,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
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

});