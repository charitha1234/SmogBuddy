import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Image
} from "react-native";
import { color } from '../../Assets/color';
import LinearGradient from 'react-native-linear-gradient';
import TextBox from '../../Components/textBox';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firebase from 'react-native-firebase';
import BaseUrl from '../../Config'
import Header from '../../Components/NormalHeader'
function Profile({ navigation }) {
    const [driverAssigned, setdriverAssigned] = useState(false)
    const [loading, setloading] = useState(true)
    const [name, setname] = useState(null)
    const [licenseNumber, setlicenseNumber] = useState(null)
    const [imageUrl, setimageUrl] = useState("")
    useEffect(() => {
        const user = firebase.auth().currentUser;
        fetch(BaseUrl.Url+'/user/assign/driver/' + user.uid)
            .then((res) => res.json())
            .then((responseJson) => {
                if (responseJson.isDriverAssigned) {
                    setdriverAssigned(true);
                    fetch(BaseUrl.Url+'/user/' + responseJson.assignedDriver)
                        .then((res) => res.json())
                        .then((responseJson) => {
                            setname(responseJson.firstName)
                            setlicenseNumber(responseJson.licenseNumber)
                            setimageUrl(responseJson.imageUrl)

                        })

                }

                if (!responseJson.isDriverAssigned) setdriverAssigned(false);
                setloading(false)
            })
            .catch((e) => alert(e))
    }, [])
    return (
        <SafeAreaView style={{flex:1}}>
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={[color.lightGreen, color.lightBlue]} style={styles.container}>
                <Header navigation={navigation} title="DRIVER PROFILE"/>
                {
                    loading ?
                        <View style={{ flex: 1, justifyContent: 'center' }}><ActivityIndicator size={40} color={color.primaryBlack} /></View>
                        :
                        driverAssigned ?
                            <View style={styles.container}>
                                <View style={styles.formContainer}>
                                    <Image style={styles.imageContainer} resizeMode='cover' source={{ uri: imageUrl }} />
                                    <TextBox title="FIRST NAME" value={name} disabled={true} />
                                    <TextBox title="LICENCE NUMBER" value={licenseNumber} disabled={true} />
                                </View>
                            </View>
                            :
                            <View style={styles.container}>
                                <Text style={styles.subText}>Driver Is Not Assigned yet</Text>
                            </View>
                }
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
        flex: 0.25,
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
    subText: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 20,
        letterSpacing: 2,
    },
    formContainer: {
        marginTop: 30,
        height: 400,
        width: '90%',
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
    },
    imageContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        margin: 30,
        alignSelf: 'center'

    },
});