import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Linking, ActivityIndicator,
    Image,
    Alert,
    ScrollView,
    Modal,
    FlatList
} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import MapTheme from '../../Assets/mapsStyle';
import { color } from '../../Assets/color';
import Geolocation from '@react-native-community/geolocation';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapViewDirections from 'react-native-maps-directions';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../Components/HederBarNavigation';
import MapView, { Marker } from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BottomSheet from 'reanimated-bottom-sheet'
import firebase from 'react-native-firebase';
import StepIndicator from 'react-native-step-indicator';
import BaseUrl from '../../Config'

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
function feedback(navigation, request, uid, userPickupLocation, distance, duration, setaccepted) {
    fetch(BaseUrl.Url+'/driver/confirmation', {
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
            setaccepted(true)
            // navigation.navigate("DriverNavigation", { userPickupLocation: JSON.parse(userPickupLocation), uid: uid });
        })
        .catch((error) => {
        });
}



function navigationStart(userId) {
    const user = firebase.auth().currentUser;
    fetch(BaseUrl.Url+'/driver/start',
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

        })
        .catch((error) => {
            console.error(error);
        });
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
async function checkUploaded() {
    try {
        const value = await AsyncStorage.getItem('ODOMETER_UPLOADED')
        if (value !== 'UPLOADED') {
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
function Service(props) {
    return (
        <View style={styles.serviceContainer}>
            <Text style={styles.serviceNameText,{marginRight:20}}>{props.number + 1}</Text>
            <View style={{ flex: 1 }}>
                <Text style={styles.serviceNameText}>{props.serviceName}</Text>
                <Text style={styles.serviceNameText}>{props.serviceYear}</Text>
            </View>
        </View>

    );
}
function RenderContent(props) {
    const [currentStage, setcurrentStage] = useState(1)
    const [loading, setloading] = useState(false)
    const [serviceList, setserviceList] = useState(null)
    const [fetching, setfetching] = useState(true)
    const [modalVisible, setmodalVisible] = useState(false)
    const user = firebase.auth().currentUser;
    const fetchFirebaseStart = () => {
        firebase.database().ref('location/' + user.uid).once('value', snapshot => {
            if (snapshot.val().currentStage) setcurrentStage(snapshot.val().currentStage)
            setfetching(false)
        })
    }
    const isUserPaid=()=>{
        fetch(BaseUrl.Url+'/driver/is-pay/' +user.uid)
        .then((res) => res.json())
        .then((resJson) => {
            if(resJson.isPaid){
                setloading(true)

                fetch(BaseUrl.Url+'/driver/status',
                    {
                        method: 'PUT',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            userUid: props.userId,
                            driverUid: user.uid,
                            status: cases[currentStage]


                        }),
                    })
                    .then((response) => response.json())
                    .then((responseJson) => {
                        removeUploaded()
                        setcurrentStage(currentStage + 1)
                        setloading(false)

                    })
                    .catch((error) => {
                        setloading(false)
                        alert(error);
                    });
            }
            else{
                alert("Customer has not paid. Please check")
            }
        })
        .catch((e) => {})
    }
    const getServiceList = () => {
        setmodalVisible(true)
        fetch(BaseUrl.Url+'/driver/assign/service/' + user.uid)
            .then((res) => res.json())
            .then((resJson) => {
                setserviceList(resJson.services)
            })
            .catch((e) => {})
    }

    useEffect(() => {
        if (fetching) fetchFirebaseStart()
        if (currentStage == 3) props.setreturnToStation(true)
        else props.setreturnToStation(false)
        if (currentStage == 8) props.navigation.navigate("DriverHomeScreen")
        if (!fetching && currentStage != 8) {
            firebase.database().ref('location/' + user.uid).update({
                currentStage
            });
        }
    },[currentStage]);
    return (
        <View style={styles.detailsContainer}>
            <Ionicons name="ios-remove" size={50} style={styles.bottomsheetMoreIcon} />

            <View style={styles.timeContainer}>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text style={styles.timeText}>{props.arrivalTime}</Text>
                    <Text style={styles.label}>Arrival Time</Text>
                </View>
                <View style={styles.IconContainer}>
                    <TouchableOpacity disabled={!(currentStage == 2 || currentStage == 4 || currentStage == 7)} onPress={() => props.navigation.navigate("DriverOdometer", { case: cases[currentStage], userId: props.userId })} >
                        <Ionicons name="ios-camera" size={50} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => getServiceList()} >
                        <Ionicons name="ios-list-box" size={50} />
                    </TouchableOpacity>
                </View>
                <Modal visible={modalVisible} onRequestClose={() => setmodalVisible(false)}>
                    <View style={styles.headerContainer}><TouchableOpacity onPress={() => setmodalVisible(false)} style={styles.icon}><Ionicons name="ios-close" size={40} /></TouchableOpacity><Text style={styles.headerText}>CHECK LIST</Text><View /></View>
                    <FlatList data={serviceList} renderItem={({ item, index }) => (
                        <Service serviceName={item.serviceName} number={index} serviceYear={item.yearRange} />
                    )} keyExtractor={item => item.serviceID} />

                </Modal>
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
                                                if(currentStage==7){
                                                    
                                                    isUserPaid()
                                                }
                                                else{
                                                setloading(true)

                                                fetch(BaseUrl.Url+'/driver/status',
                                                    {
                                                        method: 'PUT',
                                                        headers: {
                                                            Accept: 'application/json',
                                                            'Content-Type': 'application/json',
                                                        },
                                                        body: JSON.stringify({
                                                            userUid: props.userId,
                                                            driverUid: user.uid,
                                                            status: cases[currentStage]


                                                        }),
                                                    })
                                                    .then((response) => response.json())
                                                    .then((responseJson) => {
                                                        removeUploaded()
                                                        setcurrentStage(currentStage + 1)
                                                        setloading(false)
                                                        

                                                    })
                                                    .catch((error) => {
                                                        setloading(false)
                                                        alert(error);
                                                    });
                                                }
                                                

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
                                        setloading(true)
                                        
                                        fetch(BaseUrl.Url+'/driver/status',
                                            {
                                                method: 'PUT',
                                                headers: {
                                                    Accept: 'application/json',
                                                    'Content-Type': 'application/json',
                                                },
                                                body: JSON.stringify({
                                                    userUid: props.userId,
                                                    driverUid: user.uid,
                                                    status: cases[currentStage]


                                                }),
                                            })
                                            .then((response) => response.json())
                                            .then((responseJson) => {
                                                removeUploaded()
                                                setcurrentStage(currentStage + 1)
                                                setloading(false)
                                                

                                            })
                                            .catch((error) => {
                                                setloading(false)
                                                alert(error);
                                            });
                                    }
                                },
                            ],
                            { cancelable: false },

                        )
                    }
                }}>{
                        loading ?
                            <ActivityIndicator size={30} color={color.primaryWhite} />
                            :
                            <Text style={styles.completeButtonText}>{buttonLabels[currentStage]}</Text>
                    }
                </TouchableOpacity>
            </View>
        </View>
    );
}


function DriverRequest({ navigation, route }) {
    const [returnToStation, setreturnToStation] = useState(false)
    const { userUid, userPickupLocation, stationLocation, status } = route.params;
    const location = !returnToStation ? userPickupLocation : stationLocation;
    
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
    const user = firebase.auth().currentUser;

    useEffect(() => {

        if (status == "DRIVER_ASSIGN") { }
        else if (status == "DRIVER_ACCEPTED") setaccepted(true)
        else if (status == "DRIVER_STARTED") {
            setaccepted(true)
            setstarted(true)
        }
        else {
            setaccepted(true)
            setstarted(true)
        }


        var hours = Math.floor(duration / 60);
        var minutes = Math.floor(duration % 60);

        if (minutes / 10 >= 1) setarrivalTime((hours).toString() + " h " + (minutes).toString() + " min");
        else setarrivalTime((hours).toString() + " h 0" + (minutes).toString() + " min");
        
        
        Geolocation.getCurrentPosition(info => {
            setlat(info.coords.latitude);
            setlng(info.coords.longitude);
        }, e => {}, { distanceFilter: 0 });
        Geolocation.watchPosition(info => {
            setlat(info.coords.latitude);
            setlng(info.coords.longitude);
        }, e => {}, { distanceFilter: 0 });
        
    },[]);
    useEffect(()=>{
        firebase.database().ref('location/' + user.uid).update({
            lat,
            lng,
        });
    },[lat,lng])

    return (
        <SafeAreaView style={styles.container}>
            <Header lat={lat} lng={lng} title="SMOGBUDDY" navigationEnabled={started} navigation={navigation} onPressRightIcon={() => turnOnMaps(location.lat, location.lng)} />
            {!started ?
                <View style={styles.DetailsContainer}><Text style={styles.headerText}>USER REQUEST</Text></View>
                :
                null
            }
            {
                lat && lng ?
                    <MapView
                        showsUserLocation={true}
                        style={{ flex: 1 }}
                        initialRegion={{
                            latitude: lat,
                            longitude: lng,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    >
                        <MapViewDirections
                            origin={origin}
                            destination={destination}
                            apikey={GOOGLE_MAPS_APIKEY}
                            strokeWidth={4}
                            strokeColor={color.primaryBlue}
                            resetOnChange={false}
                            onReady={(info) => {
                                setloading(false);
                                setdistance(info.distance);
                                setduration(info.duration);
                            }}
                        />
                        {
                            location.lat && location.lng ?
                                <Marker coordinate={{ "longitude": location.lng, "latitude": location.lat }}>
                                    <Ionicons name="ios-man" size={30} />
                                </Marker>
                                : null
                        }
                    </MapView>
                    :
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator size={40} color={color.primaryBlack} />
                    </View>
            }

            {started ?
                <BottomSheet
                    borderRadius={40}
                    snapPoints={[500, '30%']}
                    enabledBottomClamp={true}
                    initialSnap={1}
                    renderContent={() => <RenderContent userId={userUid} setreturnToStation={setreturnToStation} navigation={navigation} arrivalTime={arrivalTime} />}
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
                                        feedback(navigation, 'ACCEPT', userUid, userPickupLocation, distance, duration, setaccepted)
                                    }}><Text style={styles.ButtonText}>ACCEPT</Text></TouchableOpacity>
                                    <TouchableOpacity style={styles.Button} disabled={true} onPress={() => feedback(navigation, 'REJECT', userUid, userPickupLocation, distance, duration)}><Text style={styles.ButtonText}>REJECT</Text></TouchableOpacity>
                                </>
                                :
                                <TouchableOpacity disabled={!accepted} style={styles.Button} onPress={() => {
                                    setstarted(true);
                                    navigationStart(userUid);
                                    //turnOnMaps(location.lat,location.lng)
                                }}><Text style={styles.ButtonText}>START</Text></TouchableOpacity>

                    }
                </View>
            }
        </SafeAreaView>

    );

}

export default DriverRequest;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    headerContainer: {
        height: 100,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    icon: {
        marginRight: -20,
        marginLeft: 20
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
        height: 100,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginHorizontal: 10,
    },
    serviceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 10,
        marginHorizontal: 30,

    },
    serviceNameText: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 15,
        opacity: 0.8


    },
    detailsContainer: {
        alignSelf: 'center',
        height: 950,
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
        height: 700,
        marginHorizontal: 10,

    },
    bottomsheetMoreIcon: {
        color: color.primaryBlack,
        alignSelf: 'center',

    },
    StepIndicator: {
        height: 500,
        width: '100%'
    },
    completeButton: {
        backgroundColor: color.secondryBlue,
        width: '90%',
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