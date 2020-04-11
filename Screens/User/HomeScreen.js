import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import Header from '../../Components/HeaderbarUser';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { color } from '../../Assets/color';
import firebase from 'react-native-firebase';
import GradientButton from '../../Components/CustomButton';
async function notification() {

    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
        return notificationOpen.notification['data'];
    }
}


function Home({ navigation }, props) {
    useEffect(() => {
        notification().then(data => {
            if (data.status == 'ASSIGN_CUSTOMER') {

            }
        })
    }, []);

    firebase.notifications().onNotification((notification) => {
        if (notification.data.status == 'ASSIGN_CUSTOMER') {

        }
    });

    return (
        <SafeAreaView style={styles.container}>
            <Header title="SMOGBUDDY" navigation={navigation} />
            <View style={styles.content}>
                <View style={styles.process}>
                    <TouchableOpacity onPress={() => navigation.navigate("RequestProcess")} style={styles.processContent}>
                        <Text style={styles.titleText}>SMOG CHECK REQUEST</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.process}>
                    <TouchableOpacity onPress={() => navigation.navigate("PreviousChecks")} style={styles.processContent}>
                        <Text style={styles.titleText}>PREVIOUS SMOG CHECK</Text>
                    </TouchableOpacity>
                </View>
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
        shadowOpacity: .2,
        shadowRadius: 8.30,
        borderRadius: 50,
        elevation: 5,
    },
    button: {
        alignSelf: 'center',
        marginBottom: -20,
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
        alignItems:'center'
    },
    titleText: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 15,
        letterSpacing: 3,
        opacity: 0.6
    }
});