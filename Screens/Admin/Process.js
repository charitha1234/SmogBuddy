import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
    TextInput,
    Alert,
    Dimensions,
    ActivityIndicator
} from "react-native";
import { color } from '../../Assets/color';
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
    const [loading, setloading] = useState(false)
    const [userId, setuserId] = useState(null)
    const [Name, setName] = useState("")
    const [images, setimages] = useState(null)
    const [status, setstatus] = useState("")
    const [assignedDriver, setassignedDriver] = useState("")
    const [estimatedTime, setestimatedTime] = useState("")
    const [deleteModal, setdeleteModal] = useState(false)
    const [reason, setreason] = useState("")
    const [customerTelephoneNo, setcustomerTelephoneNo] = useState("")
    const [assignedTechnician, setassignedTechnician] = useState("")
    const getImages = () => {
        fetch(BaseUrl.Url + '/user/images/' + details.userId)
            .then((res) => res.json())
            .then((resJson) => {
                setimages(resJson)
            })
            .catch((e) => { })
    }
    const DeleteProcess = () => {

        if (reason.trim()) {
            setloading(true)
            fetch(BaseUrl.Url + "/admin/process/" + details.userId + '?reason=' + reason,
                {
                    method: 'DELETE',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                }
            )
                .then((res) => res.json())
                .then((resJson) => {
                    route.params.onRefresh()
                    setloading(false)
                    navigation.goBack()

                }
                )
                .catch((e) => setloading(false))
        }
        else {
            Alert.alert(
                "Reason field is empty",
                "Please give a reason to delete the Process",
                [

                    { text: "OK", onPress: () => { } }
                ],
                { cancelable: false }
            );
        }

    }


    useEffect(() => {
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
                    <TouchableOpacity onPress={() => setdeleteModal(true)} style={[styles.button, { backgroundColor: color.failedRed }]}>
                        <Text style={[styles.buttonText]}>DELETE</Text>
                    </TouchableOpacity>
                </View>
                <Modal deviceHeight={windowHeight} deviceWidth={windowWidth} isVisible={deleteModal} onBackdropPress={() => setdeleteModal(false)} useNativeDriver={true}  >
                    <View style={{ width: '90%', backgroundColor: color.primaryWhite, alignSelf: 'center', borderRadius: 10 }}>
                        <Text style={[styles.rejectText, { textAlign: 'center', marginVertical: 10 }]} >Deleting Process</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 5, marginTop: 20 }}>
                            <Text style={[styles.rejectReason, { marginVertical: 5, marginHorizontal: 15 }]}>Reason</Text>
                            <Text style={[styles.rejectReason, { marginVertical: 5, marginHorizontal: 15 }]}>{reason?.length ? reason.length : "0"}/200</Text>
                        </View>
                        <View style={{ height: 100, marginHorizontal: 10, backgroundColor: '#e0e0e0', marginVertical: 20, borderRadius: 10 }}>
                            <TextInput maxLength={200} value={reason} multiline={true} placeholder="Give Reason..." textAlignVertical="top" style={{ flex: 1 }} onChangeText={(text) => setreason(text)} />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                            <TouchableOpacity disabled={loading} onPress={() => DeleteProcess()} style={{ alignSelf: 'center', marginTop: 10, elevation: 3, marginHorizontal: 10, marginBottom: 10, flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: color.failedRed, borderRadius: 25, height: 50 }}>
                                {
                                    loading ?
                                        <ActivityIndicator size={30} color={color.primaryWhite} />
                                        :
                                        <Text style={[styles.buttonText]}>Reject</Text>
                                }

                            </TouchableOpacity>
                            <TouchableOpacity disabled={loading} onPress={() => setdeleteModal(false)} style={{ alignSelf: 'center', marginTop: 10, elevation: 3, marginHorizontal: 10, marginBottom: 10, flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: color.gray, borderRadius: 25, height: 50 }}>
                                <Text style={[styles.buttonText, { color: color.primaryBlack }]}>Cancel</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </Modal>

                <Modal style={{ margin: 0 }} deviceHeight={windowHeight} deviceWidth={windowWidth} isVisible={isModalVisible} onBackdropPress={() => setisModalVisible(false)} useNativeDriver={true} backdropOpacity={0.9} >
                    <SafeAreaView style={{ flex: 1 }}>
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
                                                    <View style={{ position: 'absolute', bottom: 50, height: 100, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
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

                    </SafeAreaView>
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
    rejectText: {
        fontFamily: 'Montserrat-Bold',
        color: color.primaryBlack,
        fontSize: 15,
        letterSpacing: 2,
    },
    rejectReason: {
        fontFamily: 'Montserrat-SemiBold',
        color: color.primaryBlack,
        fontSize: 11,
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