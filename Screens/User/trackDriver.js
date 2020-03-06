import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity
} from "react-native";
import MapView, { Marker } from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { color } from '../../Assets/color';
import LinearGradient from 'react-native-linear-gradient';
import firebase from 'react-native-firebase';
import Geolocation from '@react-native-community/geolocation';
import MapViewDirections from 'react-native-maps-directions';
Geolocation.setRNConfiguration({ authorizationLevel: 'always' });
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
    const origin = { latitude: latitude, longitude: longitude };
    const GOOGLE_MAPS_APIKEY = "AIzaSyAyKF-HG17K9PNqUveRKsY4d55_mfjDzh4";
    const destination = { latitude: customerLat, longitude: customerLng }
    useEffect(() => {

        const user = firebase.auth().currentUser;
        fetch('https://smogbuddy-dev.herokuapp.com/user/assign/driver/' + user.uid)
            .then((res) => res.json())
            .then((responseJson) => {
                if (responseJson.isDriverAssigned) setdriverAssigned(true);
                if (!responseJson.isDriverAssigned) setdriverAssigned(false);
                if (responseJson.isDriverStarted) {
                    setstartGiven(true);
                    setDriverUid(responseJson.assignedDriver)
                    setcustomerLat(responseJson.userPickupLocation.lat)
                    setcustomerLng(responseJson.userPickupLocation.lng)
                }
                if (!responseJson.isDriverStarted) setstartGiven(false);
                setloading(false)
            })
            .catch((e) => alert(e))
        if (startGiven) {

            firebase.database().ref('location/' + DriverUid).on('value', snapshot => {
                if (snapshot.val()) {
                    const oldDateObj = new Date();
                    const newDateObj = new Date(oldDateObj.getTime() + duration * 60000);
                    var totalminutes = new Date().getHours() * 60 + new Date().getMinutes() + duration;
                    var hours = Math.floor(totalminutes / 60);
                    var minutes = Math.floor(totalminutes % 60);
                    if (minutes / 10 >= 1) setarrivalTime((hours).toString() + ":" + (minutes).toString());
                    else setarrivalTime(newDateObj);
                    setlatitude(snapshot.val().lat),
                        setlongitude(snapshot.val().lng)
                }

            });
        }
    })
    return (
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={[color.lightGreen, color.lightBlue]} style={styles.container}>
            <View style={styles.headerContainer}><TouchableOpacity onPress={() => navigation.goBack()} style={styles.icon}><Ionicons name="ios-close" size={40} /></TouchableOpacity><Text style={styles.headerText}>TRACKING</Text><View /></View>
            {loading ?
                <ActivityIndicator style={{ flex: 1 }} size={40} color={color.primaryBlack} />
                :

                driverAssigned ?
                    <>
                        <MapView

                            showsUserLocation={true}
                            style={{ flex: 1 }}
                            initialRegion={{
                                latitude: 6.794791,
                                longitude: 79.900713,
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
                                            onReady={(info) => {
                                                setdistance(info.distance);
                                                setduration(info.duration);
                                            }}
                                        />
                                        <Marker coordinate={{ "latitude": latitude, "longitude": longitude }} />
                                    </>
                                    :
                                    null
                            }
                        </MapView>
                        {startGiven ?
                            <View style={styles.detailsContainer}>
                                <View style={styles.timeContainer}>
                                    <Text>Arrival Time</Text>
                                    <Text style={styles.timeText}>{arrivalTime}</Text>
                                </View>
                                <View style={styles.contactContainer}></View>
                            </View>
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
    );

}

export default DriverTrack;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    detailsContainer: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: 10,
        height: 200,
        width: '90%',
        borderRadius: 50,
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
        flex: 0.25,
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
    timeContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderColor: color.gray,
        marginHorizontal: 10,


    },
    contactContainer: {
        flex: 1,
        marginHorizontal: 10

    },
    timeText: {
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
});