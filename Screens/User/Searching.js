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
import { color } from '../../Assets/color';
import firebase from 'react-native-firebase';
import GradientButton from '../../Components/CustomButton';

class Searching extends Component {
    constructor(props) {
        super(props);
        this.state = {
            placed: false,

        }

    }

    componentDidMount() {
        const user = firebase.auth().currentUser;
        Geolocation.getCurrentPosition(info => {
            fetch('https://smogbuddy-dev.herokuapp.com/user/request', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    uid: user.uid,
                    serviceList: this.props.route.params.serviceList,
                    pickupLocation: { lat: info.coords.latitude, lng: info.coords.longitude },
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
        });

    }

    render() {
        return (
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={[color.lightGreen, color.lightBlue]} style={styles.container}>
                <View style={styles.headerTextContainer}>
                    {!this.state.placed ?
                        <Text style={styles.headerText}>REQUESTING DRIVER</Text>
                        :
                        <Text style={styles.headerText}>REQUEST COMPLETED</Text>
                    }
                </View>
                {
                    !this.state.placed ?
                        <Spinner style={styles.spinner} isVisible={true} size={200} type='Bounce' color={color.primaryBlack} />
                        :
                        <View style={styles.messageContainer}>
                            <View style={styles.TextContainer}>
                                <Text style={styles.bodyText}>Your Request Is Placed. totalServiceTime is {this.state.totalServiceTime} and totalcost is {this.state.totalCost}. We Will Notify You In A Moment</Text>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("UserHomeScreen")} style={styles.button}><GradientButton title="GO TO HOME" /></TouchableOpacity>
                            </View>
                        </View>
                }
            </LinearGradient>
        );
    }
}
export default Searching;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
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
    }
});