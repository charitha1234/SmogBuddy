import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator
} from "react-native";
import { color } from '../../Assets/color';
import LinearGradient from 'react-native-linear-gradient';
import TextBox from '../../Components/textBox';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firebase from 'react-native-firebase';

function Profile({ navigation }) {
    const [firstName, setfirstName] = useState("")
    const [lastName, setlastName] = useState("")
    const [address, setaddress] = useState("")
    const [state, setstate] = useState("")
    const [zipCode, setzipCode] = useState("")
    const [loading, setloading] = useState(true)
    useEffect(() => {
        const user = firebase.auth().currentUser;
        fetch('https://smogbuddy.herokuapp.com/user/' + user.uid)
            .then((res) => res.json())
            .then((resJson) => {
                setloading(false);
                setfirstName(resJson.firstName);
                setlastName(resJson.lastName);
                setaddress(resJson.address);
                setstate(resJson.state);
                setzipCode(resJson.zipCode);
            })
    }, []);

    return (
        <SafeAreaView style={{flex:1}}>
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={[color.lightGreen, color.lightBlue]} style={styles.container}>
                <View style={styles.headerContainer}><TouchableOpacity onPress={() => navigation.goBack()} style={styles.icon}><Ionicons name="ios-close" size={40} /></TouchableOpacity><Text style={styles.headerText}>PROFILE</Text><View /></View>
                <View style={styles.container}>
                    <View style={styles.formContainer}>
                        {
                            loading ?
                                <ActivityIndicator size="large" color={color.primaryBlack} />
                                :
                                <>
                                    <TextBox title="FIRST NAME" value={firstName} disabled={true} />
                                    <TextBox title="LAST NAME" value={lastName} disabled={true} />
                                    <TextBox title="ADDRESS" value={address} disabled={true} />
                                    <TextBox title="STATE" value={state} disabled={true} />
                                    <TextBox title="ZIPCODE" value={zipCode} disabled={true} />
                                </>

                        }

                    </View>
                </View>
            </LinearGradient>
        </SafeAreaView>
    );

}

export default Profile;

const styles = StyleSheet.create({
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
    formContainer: {
        marginTop: 30,
        height: 400,
        width: 300,
        justifyContent: 'center',
        backgroundColor: color.primaryWhite,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: .2,
        shadowRadius: 8.30,

        elevation: 5,
    },
    icon: {
        marginRight: -20,
        marginLeft: 20
    }
});