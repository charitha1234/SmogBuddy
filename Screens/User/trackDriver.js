import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    Dimensions
} from "react-native";
import MapView, { Marker } from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { color } from '../../Assets/color';
import LinearGradient from 'react-native-linear-gradient';
import firebase from 'react-native-firebase';
import BottomSheet from 'reanimated-bottom-sheet'
import Geolocation from '@react-native-community/geolocation';
import { SafeAreaView } from 'react-native-safe-area-context';
import StepIndicator from 'react-native-step-indicator';
import MapViewDirections from 'react-native-maps-directions';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
Geolocation.setRNConfiguration({ authorizationLevel: 'always' });
const labels = ["Driver Is On The Way", "Driver Arrived", "PickedUp The Car", "Arrived To The Service Center", "Completed Service", "Driver Is On The Way", "Driver Arrived", "Finished"];
const buttonLabels = ["IM ON THE WAY", "I've ARRIVED", "CAR IS PICKED UP", "ARRIVED TO THE STATION", "SERVICE COMPLETED", "IM ON THE WAY", "I've ARRIVED", "FINISHED"]
const customStyles = {
    stepIndicatorSize: 30,
    currentStepIndicatorSize: 40,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: color.primaryBlue,
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: color.primaryBlue,
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: color.primaryBlue,
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: color.primaryBlue,
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: color.primaryBlue,
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: color.primaryBlack,
    labelSize: 13,
    labelAlign: 'flex-start',
    currentStepLabelColor: color.primaryBlue,
    labelFontFamily: 'Montserrat-Light'
}

function RenderContent(props) {
    const [currentStage, setcurrentStage] = useState(0)
    useEffect(() => {
        console.log("Called")
        setcurrentStage(props.currentStage);
        if (currentStage == 8) props.navigation.navigate("UserReview")
    })
    return (
        <View style={styles.detailsContainer}>
            <Ionicons name="ios-remove" size={50} style={styles.bottomsheetMoreIcon} />

            <View style={styles.timeContainer}>
                <Text style={styles.timeText}>{props.arrivalTime}</Text>
                <Text style={styles.label}>Arrival Time</Text>
            </View>
            <View style={styles.contactContainer}>
                <StepIndicator
                    stepCount={8}
                    direction="vertical"
                    customStyles={customStyles}
                    currentPosition={currentStage}
                    labels={labels}
                />
            </View>
        </View>
    );
}
function DriverTrack({ navigation }, props) {
    const [DriverUid, setDriverUid] = useState(null)
    const [longitude, setlongitude] = useState(null)
    const [latitude, setlatitude] = useState(null)
    const [distance, setdistance] = useState(null)
    const [duration, setduration] = useState(null)
    const [customerLat, setcustomerLat] = useState(null)
    const [customerLng, setcustomerLng] = useState(null)
    const [driverAssigned, setdriverAssigned] = useState(false)
    const [startGiven, setstartGiven] = useState(false)
    const [arrivalTime, setarrivalTime] = useState("")
    const [loading, setloading] = useState(true)
    const [ownLat, setownLat] = useState(null)
    const [ownLng, setownLng] = useState(null)
    const [currentStage, setcurrentStage] = useState(0)
    const [fetching, setfetching] = useState(true)
    const [showAlert, setshowAlert] = useState(true)
    const origin = { latitude: latitude, longitude: longitude };
    const GOOGLE_MAPS_APIKEY = "AIzaSyAyKF-HG17K9PNqUveRKsY4d55_mfjDzh4";
    const destination = { latitude: customerLat, longitude: customerLng }

    const getApiData = () => {
        if (fetching) {
            const user = firebase.auth().currentUser;
            fetch('https://smogbuddy.herokuapp.com/user/assign/driver/' + user.uid)
                .then((res) => res.json())
                .then((responseJson) => {
                    console.log("RESSSSS", responseJson)
                    setfetching(false)
                    if (responseJson.isDriverAssigned) {
                        setdriverAssigned(true);

                    }
                    if (!responseJson.isDriverAssigned) setdriverAssigned(false);
                    if (responseJson.isDriverStarted) {
                        setstartGiven(true);
                        setDriverUid(responseJson.assignedDriver)
                        setcustomerLat(responseJson.userPickupLocation.lat)
                        setcustomerLng(responseJson.userPickupLocation.lng)
                    }
                    if (!responseJson.isDriverStarted) setstartGiven(false);
                    setloading(false)
                    if (responseJson.isDriverAssigned && !responseJson.isDriverStarted) {
                        alert("Driver Will Depart in 8 minutes")
                    }
                })
                .catch((e) => alert(e))
        }
    }
    useEffect(() => {
        getApiData()
    }, [])
    useEffect(() => {


        console.log("USEEFFECT", DriverUid)
        Geolocation.getCurrentPosition(info => {
            setownLat(info.coords.latitude);
            setownLng(info.coords.longitude);
        }, e => console.log(e), { distanceFilter: 0 });
        if (startGiven) {

            firebase.database().ref('location/' + DriverUid).on('value', snapshot => {
                console.log("snp", snapshot.val())
                if (snapshot.val()) {


                    var hours = Math.floor(duration / 60);
                    var minutes = Math.floor(duration % 60);

                    if (minutes / 10 >= 1) {
                        if (hours == 0) setarrivalTime((minutes).toString() + " min");
                        else setarrivalTime((hours).toString() + "h " + (minutes).toString() + " min");
                    }

                    else {
                        if (hours == 0) setarrivalTime("0" + (minutes).toString() + " min");
                        else setarrivalTime((hours).toString() + "h " + (minutes).toString() + " min");
                    }
                    setlatitude(snapshot.val().lat),
                        setlongitude(snapshot.val().lng)
                    setcurrentStage(snapshot.val().currentStage)
                }

            });
        }
    })
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={[color.lightGreen, color.lightBlue]} style={styles.container}>
                <View style={styles.headerContainer}><TouchableOpacity onPress={() => navigation.goBack()} style={styles.icon}><Ionicons name="ios-close" size={40} /></TouchableOpacity><Text style={styles.headerText}>TRACKING</Text><View /></View>
                {loading || !ownLat || !ownLng ?
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size={40} color={color.primaryBlack} />
                    </View>
                    :

                    driverAssigned ?
                        <>
                            <MapView

                                showsUserLocation={true}
                                style={{ flex: 1 }}
                                initialRegion={{
                                    latitude: ownLat,
                                    longitude: ownLng,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421,
                                }}
                            >
                                {
                                    startGiven && latitude && longitude ?
                                        <>
                                            <MapViewDirections
                                                origin={origin}
                                                destination={destination}
                                                apikey={GOOGLE_MAPS_APIKEY}
                                                strokeWidth={3}
                                                strokeColor={color.primaryBlack}
                                                resetOnChange={false}
                                                onStart={(info) => console.log("Starting", info)}
                                                onReady={(info) => {
                                                    console.log("READY", info)
                                                    setdistance(info.distance);
                                                    setduration(info.duration);
                                                }}
                                            />
                                            <Marker coordinate={{ "latitude": latitude, "longitude": longitude }}>
                                                <Ionicons name="md-car" size={30} />
                                            </Marker>
                                            <Marker coordinate={{ "latitude": customerLat, "longitude": customerLng }}>
                                                <Ionicons name="md-man" size={30} />
                                            </Marker>
                                        </>
                                        :
                                        null
                                }
                            </MapView>
                            {startGiven ?
                                <BottomSheet
                                    borderRadius={40}
                                    snapPoints={['70%', '20%']}
                                    enabledBottomClamp={true}
                                    initialSnap={1}
                                    renderContent={() => <RenderContent navigation={navigation} currentStage={currentStage} arrivalTime={arrivalTime} />}
                                />
                                :
                                driverAssigned ?
                                    null
                                    :
                                    <>
                                        <Ionicons style={styles.startIcon} name="md-pin" size={30} />

                                        <TouchableOpacity onPress={() => setstartGiven(true)} style={styles.doneButton}><Text>DONE</Text></TouchableOpacity>
                                    </>
                            }
                        </>
                        :
                        <View style={styles.headerTextContainer}><Text style={styles.headerText}>No Driver has assigned</Text></View>
                }
            </LinearGradient>
        </SafeAreaView>
    );

}

export default DriverTrack;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    label: {
        marginHorizontal: 10,
        fontFamily: 'Montserrat-Light',
        fontSize: 15,
    },
    scrollContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '50%'
    },
    timeContainer: {
        height: 100,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginHorizontal: 10,
    },
    detailsContainer: {
        alignSelf: 'center',
        height: 900,
        width: '100%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: .2,
        shadowRadius: 8.30,
        elevation: 3,
        backgroundColor: color.primaryWhite
    },
    headerContainer: {
        height:66,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: color.primaryWhite
    },
    icon: {
        marginRight: -20,
        marginLeft: 20
    },
    startIcon: {
        position: 'absolute',
        alignSelf: 'center',

    },
    doneButton: {
        position: 'absolute',
        bottom: 0,
        height: 50,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.primaryWhite
    },
    contactContainer: {
        flex: 5,
        marginHorizontal: 10

    },
    timeText: {
        margin: 10,
        color: color.primaryBlue,
        fontSize: 30

    },
    headerText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 30,
        textAlign: 'center',
        letterSpacing: 2,

    },
    headerTextContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 0.25,
        margin: 30,

    },
    swipHeaderContainer: {
        backgroundColor: color.primaryWhite,
        height: 200,
        width: '90%',
    },
    bottomsheetMoreIcon: {
        color: color.primaryBlack,
        alignSelf: 'center'

    },
    StepIndicator: {
        height: 500,
        width: '100%'
    },
});