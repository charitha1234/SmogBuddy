import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import Header from '../../Components/HeaderbarUser';
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
                    <View style={styles.processContent}>
                        <Text style={styles.titleText}>SMOG CHECK REQUEST</Text>
                        <Text style={styles.bodyText}>Meet your smogcheck driver at your doorsteps</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate("RequestProcess")}  style={styles.button}>
                        <GradientButton title="ORDER NOW" />
                    </TouchableOpacity>
                </View>
                <View style={styles.process}>
                    <View style={styles.processContent}>
                        <Text style={styles.titleText}>PREVIOUS SMOG CHECK</Text>
                        <Text style={styles.bodyText}>Check your previous smogchecks</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate("PreviousChecks")}  style={styles.button}>
                        <GradientButton title="OLD RECORDS" />
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
        height: 150,
        width: '80%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: .3,
        shadowRadius: 20,
        borderRadius: 35,
        elevation: 13,
    },
    button: {
        alignSelf: 'center',
        marginLeft:50,
        marginBottom: -20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: .2,
        shadowRadius: 20,
        elevation: 13,

    },
    processContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bodyText:{
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 12,
        color:color.primaryBlack,
        opacity: 0.4,
        marginTop:5,
        marginHorizontal:25
    },
    titleText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 15,
        color:color.darkBlue,
        letterSpacing: 3,
        opacity: 0.6
    }
});