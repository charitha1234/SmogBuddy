import React,{useEffect,useState} from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import Header from '../../Components/HeaderbarUser';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
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
            console.log("notfihk>>",data)
            if (data.status == 'ASSIGN_CUSTOMER') {

            }
        })
    },[]);

    firebase.notifications().onNotification((notification) => {
        if (notification.data.status == 'ASSIGN_CUSTOMER') {
            
        }
    });

    return (
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={[color.lightGreen, color.lightBlue]} style={styles.container}>
            <Header title="SMOGBUDDY" navigation={navigation} />
            <View style={styles.content}>
                <View style={styles.process}>
                    <View style={styles.processContent}>
                        <Text style={styles.titleText}>SMOG CHECK REQUEST</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate("RequestProcess")} style={styles.button}><GradientButton title="REQUEST" /></TouchableOpacity>
                </View>
                <View style={styles.process}>
                    <View style={styles.processContent}>
                        <Text style={styles.titleText}>PREVIOUS SMOG CHECK</Text>

                    </View>
                    <TouchableOpacity onPress={()=>navigation.navigate("PreviousChecks")} style={styles.button}><GradientButton title="VIEW" /></TouchableOpacity>
                </View>
            </View>
        </LinearGradient>
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
        width: 300,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
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
        margin:20,
    },
    titleText: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 15,
        letterSpacing: 3,
        opacity:0.6
    }
});