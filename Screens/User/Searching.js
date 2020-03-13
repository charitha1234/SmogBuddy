import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native";
var Spinner = require('react-native-spinkit');
import Geolocation from '@react-native-community/geolocation';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { color } from '../../Assets/color';
import firebase from 'react-native-firebase';
import MapView, { Marker } from 'react-native-maps';
import GradientButton from '../../Components/CustomButton';
Geolocation.setRNConfiguration({ authorizationLevel: 'always' });
class Searching extends Component {
    constructor(props) {
        super(props);
        this.state = {
            placed: false,
            locationSelected: false,
            midlat: null,
            midlng: null,

        }

    }

    componentDidMount() {

        Geolocation.watchPosition(info => {});
        



    }
    requestingDriver(){
        console.log("HERE")
        this.setState({locationSelected:true})
        const user = firebase.auth().currentUser;
        console.log("HERE>>>>")
            fetch('https://smogbuddy.herokuapp.com/user/request', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    uid: user.uid,
                    serviceList: this.props.route.params.serviceList,
                    pickupLocation: { lat: this.state.midlat, lng: this.state.midlng },
                    images: this.props.route.params.images

                }),
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson);
                    this.setState({
                        placed: true,
                        totalServiceTime: responseJson.totalServiceTime,
                        totalCost: responseJson.totalCost,

                    });
                });
    }

    render() {
        return (
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={[color.lightGreen, color.lightBlue]} style={styles.container}>
                <View style={styles.headerTextContainer}>
                    {
                        this.state.locationSelected ?
                            !this.state.placed ?
                                <Text style={styles.headerText}>REQUESTING DRIVER</Text>
                                :
                                <Text style={styles.headerText}>REQUEST COMPLETED</Text>
                            :
                            <Text style={styles.headerText}>SELECT PICKUP LOCATION</Text>
                    }
                </View>
                {
                    this.state.locationSelected ?
                        !this.state.placed ?
                        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                            <Spinner style={styles.spinner} isVisible={true} size={200} type='Bounce' color={color.primaryBlack} />
                            </View>
                            :
                            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                            <View style={styles.messageContainer}>
                                <View style={styles.TextContainer}>
                                    <Text style={styles.bodyText}>Your Request Is Placed. totalServiceTime is {this.state.totalServiceTime} and totalcost is {this.state.totalCost}. We Will Notify You In A Moment</Text>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate("UserHomeScreen")} style={styles.button}><GradientButton title="GO TO HOME" /></TouchableOpacity>
                                </View>
                            </View>
                            </View>
                        :
                        <>
                            <MapView
                                onRegionChange={(info) => {
                                    this.state.locationSelected?
                                    null:
                                    this.setState({
                                        midlat: info.latitude,
                                        midlng: info.longitude
                                    })
                                }}
                                showsUserLocation={true}
                                style={{ flex: 1 }}
                                initialRegion={{
                                    latitude: 6.794791,
                                    longitude: 79.900713,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421,
                                }}
                            />

                            <Ionicons style={styles.startIcon} name="md-pin" size={30} />
                            <TouchableOpacity onPress={this.requestingDriver.bind(this)} style={styles.doneButton}><Text>SELECT</Text></TouchableOpacity>
                        </>
                }
            </LinearGradient>
        );
    }
}
export default Searching;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerText: {
        textAlign: 'center',
        fontFamily: 'Montserrat-Bold',
        fontSize: 30,
        textAlign: 'center',
        letterSpacing: 2,

    },
    headerTextContainer: {
        position: 'absolute',
        top: 20,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 30,
        zIndex: 1

    },
    bodyText: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 18,
        textAlign: 'center',
        letterSpacing: 2,

    },

    spinner: {
        flex: 0.5,
    },
    messageContainer: {
        alignSelf: 'center',
        backgroundColor: 'white',
        width: 300,
        height: 250,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: .2,
        shadowRadius: 8.30,
        elevation: 8,

    },
    TextContainer: {
        flex: 1,
        justifyContent: 'space-evenly',
        margin: 10,
    },
    button: {
        alignSelf: 'center',
        margin: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: .2,
        shadowRadius: 8.30,

        elevation: 5,
    },
    startIcon: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: '50%'

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
});