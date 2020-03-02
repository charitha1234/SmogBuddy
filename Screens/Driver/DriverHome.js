import React from "react";
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
function Home({ navigation }, props) {

    return (
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={[color.lightGreen, color.lightBlue]} style={styles.container}>
            <Header title="SMOGBUDDY" navigation={navigation} />
            <View style={styles.content}>
                <View style={styles.process}>
                    <View style={styles.processContent}>
                        <Text style={styles.titleText}>DRIVER PROFILE</Text>

                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate("DriverDriverProfile")} style={styles.button}><GradientButton title="VIEW" /></TouchableOpacity>
                </View>
                <View style={styles.process}>
                    <View style={styles.processContent}>
                        <Text style={styles.titleText}>VEHICLE PROFILE</Text>

                    </View>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("DriverVehicleProfile")} ><GradientButton title="VIEW" /></TouchableOpacity>
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