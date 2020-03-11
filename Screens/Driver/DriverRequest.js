import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Linking, ActivityIndicator,
    Image,
    Alert
} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import MapTheme from '../../Assets/mapsStyle';
import { color } from '../../Assets/color';
import Geolocation from '@react-native-community/geolocation';
import MapViewDirections from 'react-native-maps-directions';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../Components/HederBarNavigation';
import MapView, { Marker } from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BottomSheet from 'reanimated-bottom-sheet'
import firebase from 'react-native-firebase';
import StepIndicator from 'react-native-step-indicator';

const labels = ["Driver Is On The Way", "Driver Arrived", "PickedUp The Car", "Arrived To The Service Center", "Completed Service", "Driver Is On The Way", "Driver Arrived", "Finished"];
const buttonLabels = ["IM ON THE WAY", "I've ARRIVED", "CAR IS PICKED UP", "ARRIVED TO THE STATION", "SERVICE COMPLETED", "IM ON THE WAY", "I've ARRIVED", "FINISHED"]
const cases = ['DRIVER_ON_THE_WAY_TO_USER', 'DRIVER_ARRIVED', 'PICKED_UP', 'DRIVER_ARRIVED_TO_SHOP', 'SERVICE_COMPLETED', 'DRIVER_ON_THE_WAY_TO_USER_AFTER_COMPLETE', 'DRIVER_ARRIVED_AFTER_COMPLETE', 'FINISHED']
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



function navigationStart(userId) {
    const user = firebase.auth().currentUser;
    fetch('https://smogbuddy-dev.herokuapp.com/driver/start',
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userUid: userId,
                driverUid: user.uid


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
async function checkUploaded() {
    try {
        const value = await AsyncStorage.getItem('ODOMETER_UPLOADED')
        if (value !== 'UPLOADED') {
            console.log("CheckUploaded>>", value)
            return false
        }
        else return true
    } catch (e) {
        alert(e)
    }
}
async function removeUploaded() {
    try {
        await AsyncStorage.setItem('ODOMETER_UPLOADED', 'NOT_UPLOADED')
    } catch (e) {
        alert(e)
    }
}
function RenderContent(props) {
    const [currentStage, setcurrentStage] = useState(0)
    useEffect(() => {
        const user = firebase.auth().currentUser;
        firebase.database().ref('location/' + user.uid).update({
            currentStage
        });
    });
    return (
        <View style={styles.detailsContainer}>
            <Ionicons name="ios-remove" size={50} style={styles.bottomsheetMoreIcon} />

            <View style={styles.timeContainer}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.timeText}>{props.arrivalTime}</Text>
                    <Text style={styles.label}>Arrival Time</Text>
                </View>
                <TouchableOpacity disabled={!(currentStage == 2 || currentStage == 4 || currentStage == 7)} onPress={() => props.navigation.navigate("DriverOdometer", { case: cases[currentStage], userId: props.userId })} style={styles.IconContainer}>
                    <Ionicons name="ios-camera" size={50} />
                </TouchableOpacity>
            </View>
            <View style={styles.contactContainer}>
                <StepIndicator
                    stepCount={8}
                    direction="vertical"
                    customStyles={customStyles}
                    currentPosition={currentStage}
                    labels={labels}
                />
                <TouchableOpacity style={styles.completeButton} onPress={() => {
                    if (currentStage == 2 || currentStage == 4 || currentStage == 7) {
                        checkUploaded().then((val) => {
                            if (val) {
                                Alert.alert(
                                    'Are You Sure',
                                    '',
                                    [
                                        {
                                            text: 'No',
                                            onPress: () => setcurrentStage(currentStage),
                                            style: 'cancel',
                                        },
                                        {
                                            text: 'Yes', onPress: () => {
                                                removeUploaded()
                                                const user = firebase.auth().currentUser;
                                                fetch('https://smogbuddy-dev.herokuapp.com/driver/status',
                                                    {
                                                        method: 'PUT',
                                                        headers: {
                                                            Accept: 'application/json',
                                                            'Content-Type': 'application/json',
                                                        },
                                                        body: JSON.stringify({
                                                            userUid: props.userId,
                                                            driverUid: user.uid,
                                                            status:cases[currentStage]


                                                        }),
                                                    })
                                                    .then((response) => response.json())
                                                    .then((responseJson) => {
                                                        console.log("RESPONEJSON>>>", responseJson);

                                                    })
                                                    .catch((error) => {
                                                        console.error(error);
                                                    });
                                                setcurrentStage(currentStage + 1)
                                            }
                                        },
                                    ],
                                    { cancelable: false },
                                )
                            }
                            else {
                                alert("Car Images are not Upoaded")
                            }
                        })

                    }
                    else {
                        Alert.alert(
                            'Are You Sure',
                            '',
                            [
                                {
                                    text: 'No',
                                    onPress: () => setcurrentStage(currentStage),
                                    style: 'cancel',
                                },
                                {
                                    text: 'Yes', onPress: () => {
                                        const user = firebase.auth().currentUser;
                                        removeUploaded()
                                        fetch('https://smogbuddy-dev.herokuapp.com/driver/status',
                                                    {
                                                        method: 'PUT',
                                                        headers: {
                                                            Accept: 'application/json',
                                                            'Content-Type': 'application/json',
                                                        },
                                                        body: JSON.stringify({
                                                            userUid: props.userId,
                                                            driverUid: user.uid,
                                                            status:cases[currentStage]


                                                        }),
                                                    })
                                                    .then((response) => response.json())
                                                    .then((responseJson) => {
                                                        console.log("RESPONEJSON>>>", responseJson);

                                                    })
                                                    .catch((error) => {
                                                        console.error(error);
                                                    });
                                        setcurrentStage(currentStage + 1)
                                    }
                                },
                            ],
                            { cancelable: false },

                        )
                    }
                }}><Text style={styles.completeButtonText}>{buttonLabels[currentStage]}</Text></TouchableOpacity>
            </View>
        </View>
    );
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
        const user = firebase.auth().currentUser;
        var hours = Math.floor(duration / 60);
        var minutes = Math.floor(duration % 60);
        if (minutes / 10 >= 1) setarrivalTime((hours).toString() + " h " + (minutes).toString() + " min");
        else setarrivalTime((hours).toString() + " h 0" + (minutes).toString() + " min");
        Geolocation.watchPosition(info => {

            setlat(info.coords.latitude);
            setlng(info.coords.longitude);
        }, e => console.log(e), { distanceFilter: 0 });
        firebase.database().ref('location/' + user.uid).update({
            lat,
            lng,
        });
    });

    return (
        <View style={styles.container}>
            <Header lat={lat} lng={lng} title="SMOGBUDDY" navigationEnabled={started} navigation={navigation} onPressRightIcon={() => turnOnMaps(location.lat, location.lng)} />
            {!started ?
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
                    strokeWidth={accepted ? 4 : 0}
                    strokeColor={color.primaryBlue}
                    resetOnChange={false}
                    onReady={(info) => {
                        setloading(false);
                        setdistance(info.distance);
                        setduration(info.duration);
                    }}
                />
                <Marker coordinate={{ "longitude": location.lng, "latitude": location.lat }}>
                    <Ionicons name="ios-man" size={30} />
                </Marker>

            </MapView>
            {started ?
                <BottomSheet
                    borderRadius={40}
                    snapPoints={[500, 250]}
                    enabledBottomClamp={true}
                    initialSnap={1}
                    renderContent={() => <RenderContent userId={userUid} navigation={navigation} arrivalTime={arrivalTime} />}
                />
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
                                    navigationStart(userUid);
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
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginHorizontal: 10,
    },
    detailsContainer: {
        alignSelf: 'center',
        height: 800,
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
    timeText: {
        margin: 10,
        color: color.primaryBlue,
        fontSize: 30

    },
    contactContainer: {
        flex: 5,
        marginHorizontal: 10

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
    completeButton: {
        backgroundColor: color.primaryBlue,
        width: 300,
        height: 50,
        borderRadius: 25,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 100,
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: .2,
        shadowRadius: 8.30,
        elevation: 3,
    },
    completeButtonText: {
        color: color.primaryWhite,
        fontFamily: 'Montserrat-Regular',
        fontSize: 15,
        letterSpacing: 2,
    },
    IconContainer: {
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }

});