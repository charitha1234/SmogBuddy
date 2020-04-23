import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView
} from "react-native";
import { color } from '../../Assets/color';
import LinearGradient from 'react-native-linear-gradient';
import TextBox from '../../Components/textBox';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firebase from 'react-native-firebase';
import Header from '../../Components/NormalHeader'
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
    const [editing, setediting] = useState(false)
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
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <Header title="SHOP PROFILE" navigation={navigation} letterSize={20} />
                <ScrollView style={styles.container}>
                    <View style={styles.container}>
                        <View style={styles.formContainer}>
                            {loading ?
                                <ActivityIndicator size={40} color={color.primaryBlack} />
                                :
                                <>
                                    <TouchableOpacity onPress={() => setediting(prev => !prev)} style={{ zIndex: 100, position: "absolute", top: 0, right: 0, height: 50, width: 50, justifyContent: 'center', alignItems: 'center' }}>
                                        {
                                            editing ?
                                                <Text style={styles.saveText}>Save</Text>
                                                :
                                                <Ionicons name="md-create" size={20} />
                                        }


                                    </TouchableOpacity>
                                    <TextBox title="BUSINESS NAME" value={name} disabled={editing ? false : true} />
                                    <TextBox title="ADDRESS" value={address} disabled={editing ? false : true} />
                                    <TextBox title="ARD" value={ard} disabled={editing ? false : true} />
                                    <TextBox title="STATION TYPE" value={stationType} disabled={editing ? false : true} />
                                    <TextBox title="OPTIONAL EPA" value={epa} disabled={editing ? false : true} />
                                    <TextBox title="TELEPHONE NUMBER" value={phone} disabled={editing ? false : true} />
                                    <TextBox title="EMAIL" value={email} disabled={editing ? false : true} />
                                </>
                            }
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );

}

export default ShopProfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,

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
        height: '90%',
        width: '90%',
        alignSelf: 'center',
        justifyContent: 'space-evenly',
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
    },
    saveText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 12,
        letterSpacing: 2,
        color: color.primaryBlue
    }
});