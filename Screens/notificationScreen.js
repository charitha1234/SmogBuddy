import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Switch,
    SafeAreaView
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { color } from '../Assets/color';
import Ionicons from 'react-native-vector-icons/Ionicons';

function NotificationScreen({ navigation }, props) {
    const [pushState, setPushState] = useState(false);
    const [emailState, setEmailState] = useState(false);
    return (
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={[color.primaryGreen, color.primaryBlue]} style={styles.container}>
            <SafeAreaView style={styles.container}>
                <View style={styles.skipButton}><TouchableOpacity onPress={() => navigation.navigate("Home")}><Text style={styles.skipText}>SKIP</Text></TouchableOpacity></View>
                <View style={styles.alert}><Text style={styles.alertText}>ALERTS</Text></View>
                <View style={styles.alertsIcon}><View style={styles.iconOutCircle}><Ionicons style={styles.bellIcon} name="ios-notifications" size={150} color={color.primaryWhite} /></View></View>
                <View style={styles.notifications}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}><Text style={styles.NotificationText}>Push notifications</Text><Switch onValueChange={(value) => setPushState(value)} value={pushState} trackColor={{ true: "black" }} thumbColor="white" /></View>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}><Text style={styles.NotificationText}>Email Notifications</Text><Switch onValueChange={(value) => setEmailState(value)} value={emailState} trackColor={{ true: "black" }} thumbColor="white" /></View>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate("MenuScreens")} style={styles.nextButton}><Text>NEXT</Text></TouchableOpacity>
            </SafeAreaView>
        </LinearGradient>
    );

}

export default NotificationScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center'
    },
    skipButton: {
        flex: 0.5,
        alignSelf: 'flex-end',
    },
    skipText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 12,
        margin: 20,
        letterSpacing: 5,
        color: color.primaryWhite,

    },
    alert: {
        flex: 1,
        alignSelf: 'center',

    },
    alertText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 40,
        letterSpacing: 5,
        color: color.primaryWhite,
    },
    alertsIcon: {
        flex: 2,
        justifyContent: 'center',
        alignSelf: 'center',

    },
    bellIcon: {
        alignSelf: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: .5,
        shadowRadius: 8.30,
        elevation: 5,

    },
    iconOutCircle: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        alignContent: 'center',
        justifyContent: 'center',
        height: 200,
        width: 200,
        borderRadius: 100,

    },
    notifications: {
        flex: 1,
        alignSelf: 'center',
        width: '100%'
    },
    nextButton: {
        flex: 0.5,
        backgroundColor: color.primaryWhite,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    NotificationText: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 15,
        letterSpacing: 2,
        color: color.primaryWhite,
    }
});