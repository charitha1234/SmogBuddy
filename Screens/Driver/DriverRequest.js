import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Linking, ActivityIndicator,
} from "react-native";
import { color } from '../../Assets/color';
import Geolocation from '@react-native-community/geolocation';
import MapViewDirections from 'react-native-maps-directions';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../Components/HeaderbarUser';
import MapView, { Marker } from 'react-native-maps';
import firebase from 'react-native-firebase';
Geolocation.setRNConfiguration({ authorizationLevel: 'always' });
function feedback(navigation, request, uid, userPickupLocation, distance, duration) {
    fetch('https://smogbuddy-dev.herokuapp.com/driver/confirmation', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userUid: uid,
            status: request,
            totalDistance: distance,
            travelTime: duration,


        }),
    })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log("RESPONEJSON>>>", responseJson);
            // navigation.navigate("DriverNavigation", { userPickupLocation: JSON.parse(userPickupLocation), uid: uid });
        })
        .catch((error) => {
            console.error(error);
        });
}

function navigationStart(userId){
    const user = firebase.auth().currentUser;
    fetch('https://smogbuddy-dev.herokuapp.com/driver/start',
    {method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userUid: userId,
            driverUid:user.uid


        }),
    })
    .then((response) => response.json())
        .then((responseJson) => {
            console.log("RESPONEJSON>>>", responseJson);

        })
        .catch((error) => {
            console.error(error);
        });
}
function turnOnMaps(lat, lng) {
    var url = "https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=navigate&destination=" + lat + ',' + lng;
    Linking.canOpenURL(url).then(supported => {
        if (!supported) {
            console.log('Can\'t handle url: ' + url);
        } else {
            return Linking.openURL(url);
        }
    }).catch(err => console.error('An error occurred', err));
}

function DriverRequest({ navigation, route }) {
    const { userUid, userPickupLocation } = route.params;

    const location = JSON.parse(userPickupLocation);
    const [lat, setlat] = useState(null)
    const [lng, setlng] = useState(null)
    const [loading, setloading] = useState(true)
    const [distance, setdistance] = useState(null)
    const [duration, setduration] = useState(null)
    const [accepted, setaccepted] = useState(false)
    const [started, setstarted] = useState(false)
    const [arrivalTime, setarrivalTime] = useState("")
    const origin = { latitude: lat, longitude: lng };
    const GOOGLE_MAPS_APIKEY = "AIzaSyAyKF-HG17K9PNqUveRKsY4d55_mfjDzh4";
    const destination = { latitude: location.lat, longitude: location.lng }
    useEffect(() => {
        var hours = Math.floor(duration / 60);
        var minutes = Math.floor(duration % 60);
        setarrivalTime((new Date().getHours() + hours).toString() + ":" + (new Date().getMinutes() + minutes).toString());
        Geolocation.watchPosition(info => {
            setlat(info.coords.latitude);
            setlng(info.coords.longitude);
        }, e => console.log(e), { distanceFilter: 0 });
        firebase.database().ref('location/' + uid).update({
            lat,
            lng,
        });
    });

    return (
        <View style={styles.container}>
            <Header lat={lat} lng={lng} title="SMOGBUDDY" navigation={navigation} />
            {!started?
            <View style={styles.DetailsContainer}><Text style={styles.headerText}>USER REQUEST</Text></View>
            :
            null
            }
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
                        setloading(false);
                        setdistance(info.distance);
                        setduration(info.duration);
                    }}
                />
                <Marker coordinate={{ "longitude": location.lng, "latitude": location.lat }} />

            </MapView>
            {started ?
                <View style={styles.detailsContainer}>
                    <View style={styles.timeContainer}>
                        <Text>Arrival Time</Text>
                        <Text style={styles.timeText}>{arrivalTime}</Text>
                    </View>
                    <View style={styles.contactContainer}></View>
                </View>
                :
                <View style={styles.ButtonContainer}>
                    {
                        loading ?
                            <ActivityIndicator style={{ alignSelf: 'center' }} size={30} color={color.primaryBlack} />
                            :

                            !accepted ?
                                <>
                                    <TouchableOpacity style={styles.Button} onPress={() => {
                                        feedback(navigation, 'ACCEPT', userUid, userPickupLocation, distance, duration)
                                        setaccepted(true)
                                    }}><Text style={styles.ButtonText}>ACCEPT</Text></TouchableOpacity>
                                    <TouchableOpacity style={styles.Button} onPress={() => feedback(navigation, 'REJECT', userUid, userPickupLocation, distance, duration)}><Text style={styles.ButtonText}>REJECT</Text></TouchableOpacity>
                                </>
                                :
                                <TouchableOpacity style={styles.Button} onPress={() => {
                                    setstarted(true);
                                    navigationStart(userUid,);
                                    //turnOnMaps(location.lat,location.lng)
                                }}><Text style={styles.ButtonText}>START</Text></TouchableOpacity>

                    }
                </View>
            }
        </View>

    );

}

export default DriverRequest;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    headerText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 25,
        letterSpacing: 2,
    },
    DetailsContainer: {
        position: 'absolute',
        top: '15%',
        zIndex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ButtonContainer: {
        height: 50,
        flexDirection: 'row',
        backgroundColor: color.primaryWhite,
        justifyContent: 'center'


    },
    Button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    ButtonText: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 15,
        letterSpacing: 2,
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
    timeText: {
        fontSize: 30
    },
    contactContainer: {
        flex: 1,
        marginHorizontal: 10

    },

});