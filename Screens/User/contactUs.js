import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import { color } from '../../Assets/color';
import LinearGradient from 'react-native-linear-gradient';
import TextBox from '../../Components/textBox';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../../Components/NormalHeader'
import { SafeAreaView } from "react-native-safe-area-context";
function ContactUs({ navigation }) {

    return (
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation} title="CONTACT US"/>
        </SafeAreaView>
    );

}

export default ContactUs;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: color.primaryWhite
    },
    container: {
        flex: 1,
        alignItems: 'center',

    },
    headerContainer: {
        height: 100,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 30,
        letterSpacing: 2,
    },
    icon: {
        marginRight: -20,
        marginLeft: 20
    }
});