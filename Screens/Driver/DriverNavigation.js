import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    ColorPropType,
    Linking
} from "react-native";
import MapView, { Marker } from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { color } from '../../Assets/color';
import firebase from 'react-native-firebase';
import Geolocation from '@react-native-community/geolocation';
import MapViewDirections from 'react-native-maps-directions';
Geolocation.setRNConfiguration({ authorizationLevel: 'always' });

async function checkStatus() {
    const status = await BackgroundTask.statusAsync()

    if (status.available) {
        return
    }

    const reason = status.unavailableReason
    if (reason === BackgroundTask.UNAVAILABLE_DENIED) {
        Alert.alert('Denied', 'Please enable background "Background App Refresh" for this app')
    } else if (reason === BackgroundTask.UNAVAILABLE_RESTRICTED) {
        Alert.alert('Restricted', 'Background tasks are restricted on your device')
    }
}

function turnOnMaps(lat, lng) {
    var url = "https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=navigate&destination=" + lat + ',' + lng;
    Linking.canOpenURL(url).then(supported => {
        if (!supported) {
        } else {
            return Linking.openURL(url);
        }
    }).catch(err => console.error('An error occurred', err));
}

function DriverTrack({ navigation, route }) {
    const { userPickupLocation, uid } = route.params;
    const [userlongitude, setuserlongitude] = useState(null)
    const [userlatitude, setuserlatitude] = useState(null)
    const [lat, setlat] = useState(null)
    const [lng, setlng] = useState(null)
    const [accepted, setaccepted] = useState(false)
    const [distance, setdistance] = useState(null)
    const [duration, setduration] = useState(null)
    const [driverAssigned, setdriverAssigned] = useState(false)
    const [startGiven, setstartGiven] = useState(false)
    const origin = { latitude: lat, longitude: lng };
    const destination = { latitude: userPickupLocation.lat, longitude: userPickupLocation.lng }
    const GOOGLE_MAPS_APIKEY = "AIzaSyA55_OOjalixvTwraAZeNY2M27NTKwDBxM";
    useEffect(() => {
        BackgroundTask.schedule({
            period: 1,
        });
        Geolocation.watchPosition(info => {
            setlat(info.coords.latitude);
            setlng(info.coords.longitude);
        }, e => {}, { distanceFilter: 0 });
        firebase.database().ref('location/' + uid).update({
            lat,
            lng,
        });
        checkStatus();
    });

    return (
        <View style={styles.container}>
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
                <MapViewDirections
                    origin={origin}
                    destination={destination}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={accepted ? 3 : 0}
                    strokeColor={color.primaryBlack}
                    resetOnChange={false}
                    onReady={(info) => {
                        setdistance(info.distance);
                        setduration(info.duration);
                    }}
                />
                <Marker
                    coordinate={{
                        "latitude": userPickupLocation.lat,
                        "longitude": userPickupLocation.lng,
                    }}
                />
            </MapView>
            {startGiven ?

                <View style={styles.detailsContainer}>
                    <View style={styles.timeContainer}>
                        <Text>Arrival Time</Text>
                        <Text style={styles.timeText}>13.50</Text>
                    </View>
                    <View style={styles.contactContainer}></View>
                </View>
                :
                <>
                    <TouchableOpacity onPress={() => {
                        setstartGiven(true);
                        turnOnMaps(userPickupLocation.lat, userPickupLocation.lng);
                    }} style={styles.doneButton}><Text>START</Text></TouchableOpacity>
                </>
            }
        </View>
    );

}

export default DriverTrack;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
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
    }
});