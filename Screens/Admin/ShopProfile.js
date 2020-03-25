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
import Ionicons from 'react-native-vector-icons/Ionicons';
import firebase from 'react-native-firebase';
function ShopProfile({ navigation }) {
    const user = firebase.auth().currentUser
    const [name, setname] = useState(null)
    const [address, setaddress] = useState(null)
    const [ard, setard] = useState(null)
    const [stationType, setstationType] = useState(null)
    const [epa, setepa] = useState(null)
    const [phone, setphone] = useState(null)
    const [email, setemail] = useState(null)
    const [loading, setloading] = useState(true)
    useEffect(() => {
        fetch("https://smogbuddy.herokuapp.com/admin/shop?adminUid=" + user.uid)
            .then((res) => res.json())
            .then((resJson) => {
                setname(resJson[0].name)
                setaddress(resJson[0].address)
                setard(resJson[0].ard)
                setstationType(resJson[0].stationType)
                setepa(resJson[0].epaLicenseNumber)
                setphone(resJson[0].phoneNumber)
                setemail(resJson[0].email)
                setloading(false)
            })
            .catch((e) => alert(e))
    })

    return (
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={[color.lightGreen, color.lightBlue]} style={styles.container}>
            <View style={styles.headerContainer}><TouchableOpacity onPress={() => navigation.goBack()} style={styles.icon}><Ionicons name="ios-close" size={40} /></TouchableOpacity><Text style={styles.headerText}>SHOP PROFILE</Text><View /></View>
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    {loading ?
                        <ActivityIndicator size={40} color={color.primaryBlack} />
                        :
                        <>
                            <TextBox title="BUSINESS NAME" value={name} disabled={true} />
                            <TextBox title="ADDRESS" value={address} disabled={true} />
                            <TextBox title="ARD" value={ard} disabled={true} />
                            <TextBox title="STATION TYPE" value={stationType} disabled={true} />
                            <TextBox title="OPTIONAL EPA" value={epa} disabled={true} />
                            <TextBox title="TELEPHONE NUMBER" value={phone} disabled={true} />
                            <TextBox title="EMAIL" value={email} disabled={true} />
                        </>
                    }
                </View>
            </View>
        </LinearGradient>
    );

}

export default ShopProfile;

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
        fontSize: 25,
        letterSpacing: 2,
    },
    formContainer: {
        marginTop: 30,
        height: 500,
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