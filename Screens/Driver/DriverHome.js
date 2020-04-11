import React, { useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import Header from '../../Components/HeaderBarDriver';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { color } from '../../Assets/color';
import GradientButton from '../../Components/CustomButton';
import firebase from 'react-native-firebase';
import { SafeAreaView } from 'react-native-safe-area-context';

async function notification() {

    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {

        return notificationOpen.notification['data'];
    }
}

function Home({ navigation }, props) {
    useEffect(() => {
        const user = firebase.auth().currentUser;
        fetch('https://smogbuddy.herokuapp.com/driver/status/' + user.uid)
            .then((res) => res.json())
            .then((resJson) => {
                console.log("driver res", resJson)
                if (resJson.isDriverAssign) {

                    navigation.navigate("DriverRequest", { userUid: resJson.userUid, userPickupLocation: resJson.pickupLocation, status: resJson.status, stationLocation: resJson.shopLocation });
                }
            })
        notification().then(data => {
            navigation.navigate("DriverRequest", { userUid: data.userUid, userPickupLocation: data.userPickupLocation, status: data.status, stationLocation: data.shopLocation });

        })
        firebase.notifications().onNotification((notification) => {
            if (notification.data.status == 'ASSIGN_CUSTOMER') {
                const location = JSON.parse(notification.data.userPickupLocation)
                navigation.navigate("DriverRequest", { userUid: notification.data.userUid, status: notification.data.status, userPickupLocation: location, stationLocation: notification.data.shopLocation });
            }
        });

    }, []);


    return (
        <SafeAreaView style={styles.container}>
            <Header title="SMOGBUDDY" navigation={navigation} />
            <View style={styles.content}>
                <Text style={styles.titleText}>No Customer Has Assigned</Text>
            </View>
        </SafeAreaView>
    );

}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',

    },
    content: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center'


    },
    process: {
        backgroundColor: color.primaryWhite,
        height: 100,
        width: 300,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        borderRadius:50,

        shadowOpacity: .2,
        shadowRadius: 8.30,
        elevation: 5,
    },
    button: {
        alignSelf: 'flex-end',
        marginBottom: -20,
        marginRight: -20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: .2,
        shadowRadius: 8.30,
        elevation: 5,

    },
    processContent: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
        margin: 20,
        
    },
    titleText: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 15,
        letterSpacing: 3,
        opacity: 0.6
    }
});