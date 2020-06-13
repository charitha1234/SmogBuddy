import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView,
    Dimensions,
    ImageBackground
} from "react-native";
import { color } from '../../Assets/color';
import Geolocation from '@react-native-community/geolocation';
import TextBox from '../../Components/textBox';
import MapView from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firebase from 'react-native-firebase';
import Header from '../../Components/NormalHeader'
import BaseUrl from '../../Config'
import ImagePicker from 'react-native-image-picker';
import Modal from 'react-native-modal';
Geolocation.setRNConfiguration({ authorizationLevel: "always" });
const uuidv1 = require('uuid/v1');
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
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
    const [shopId, setshopId] = useState(null)
    const [imageUri, setimageUri] = useState("")
    const [isModalVisible, setisModalVisible] = useState(false)
    const [midlat, setmidlat] = useState(null)
    const [midlng, setmidlng] = useState(null)

    const formatDate = () => {
        let d = new Date(),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) {
            month = '0' + month;
        }
        if (day.length < 2) {
            day = '0' + day;
        }

        return [year, month, day].join('-');
    }
    const ImagePick = () => {
        const options = {

            title: 'Select Logo',
            customButtons: [
            ],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
            quality: 0.5
        };


        ImagePicker.showImagePicker(options, (response) => {

            if (response.didCancel) {
            } else if (response.error) {
            } else if (response.customButton) {
            } else {
                const source = { uri: response.uri };
                setloading(true)

                firebase
                    .storage()
                    .ref(formatDate() + '/' + user.uid + '/' + uuidv1() + '.jpeg')
                    .putFile(source.uri)
                    .then((res) => {
                        setimageUri(res.downloadURL)
                        setloading(false)
                    })
                    .catch((e) => {
                        setloading(false)
                        alert(e)
                    });

            }
        });
    }

    useEffect(() => {
        Geolocation.getCurrentPosition(info => {
            setmidlat(info.coords.latitude)
            setmidlng(info.coords.longitude)
        })
        fetch(BaseUrl.Url + "/admin/shop?adminUid=" + user.uid)
            .then((res) => res.json())
            .then((resJson) => {
                if (!resJson[0].location.lat == 0 && !resJson[0].location.lng == 0) {
                    setmidlat(resJson[0].location.lat)
                    setmidlng(resJson[0].location.lng)
                }

                setimageUri(resJson[0].logoUrl)
                setshopId(resJson[0].id)
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
    }, [])
    const saveDetails = () => {
        setloading(true)
        fetch(BaseUrl.Url + "/admin/shop", {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({

                adminUid: user.uid,
                id: shopId,
                address: address,
                ard: ard,
                email: email,
                epaLicenseNumber: epa,
                logoUrl: imageUri,
                name: name,
                phoneNumber: phone,
                stationType: stationType,
                lat: midlat,
                lng: midlng



            }),
        }).then((res) => res.json())
            .then((resJson) => { setloading(false) })
            .catch((e) => {
                setloading(false)

                alert(e)
            })
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <Header title="SHOP PROFILE" navigation={navigation} letterSize={20} />
                <ScrollView style={styles.container}>
                    <View style={styles.WhiteContainer}>
                        <View style={styles.formContainer}>
                            {loading ?
                                <ActivityIndicator size={40} color={color.primaryBlack} />
                                :
                                <>
                                    <View style={styles.ImagesContainer}>
                                        <TouchableOpacity onPress={() => ImagePick()} disabled={editing ? false : true} style={{ borderWidth: 1, borderRadius: (windowWidth - 60) / 3 }}>
                                            <ImageBackground source={{ uri: imageUri }} style={styles.logoContainer} imageStyle={{ borderRadius: (windowWidth - 60) / 3 }}>
                                                <Ionicons name="ios-add-circle" style={{ position: 'absolute', top: Math.sqrt(2) * (windowWidth - 60) / 6 - (windowWidth - 60) / 6 - 20, right: Math.sqrt(2) * (windowWidth - 60) / 6 - (windowWidth - 60) / 6 - 20 }} size={30} color={color.failedRed} />
                                            </ImageBackground>
                                        </TouchableOpacity>
                                    </View>

                                    <TextBox title="BUSINESS NAME" value={name} disabled={editing ? false : true} onChangeText={(text) => setname(text)} />
                                    <TextBox title="ADDRESS" value={address} disabled={editing ? false : true} onChangeText={(text) => setaddress(text)} />
                                    <TextBox title="ARD" value={ard} disabled={editing ? false : true} onChangeText={(text) => setard(text)} />
                                    <TextBox title="STATION TYPE" value={stationType} disabled={editing ? false : true} onChangeText={(text) => setstationType(text)} />
                                    <TextBox title="OPTIONAL EPA" value={epa} disabled={editing ? false : true} onChangeText={(text) => setepa(text)} />
                                    <TextBox title="TELEPHONE NUMBER" value={phone} disabled={editing ? false : true} onChangeText={(text) => setphone(text)} />
                                    <TextBox title="EMAIL" value={email} disabled={editing ? false : true} onChangeText={(text) => setemail(text)} />
                                </>
                            }
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        {
                            editing ?
                                <>
                                    <TouchableOpacity onPress={() => setediting(false)} style={styles.button}>
                                        <Text style={styles.buttonText}>CANCEL</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => saveDetails()} style={[styles.button, { backgroundColor: color.failedRed }]}>
                                        <Text style={styles.buttonText}>SAVE</Text>
                                    </TouchableOpacity>
                                </>
                                :
                                <>
                                    <TouchableOpacity onPress={() => setediting(prev => !prev)} style={styles.button}>
                                        <Text style={styles.buttonText}>EDIT</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => setisModalVisible(true)} style={[styles.button, { backgroundColor: color.failedRed }]}>
                                        <Text style={styles.buttonText}>LOCATION</Text>
                                    </TouchableOpacity>
                                </>

                        }

                    </View>
                </ScrollView>
                <Modal style={{ margin: 0 }} deviceHeight={windowHeight} deviceWidth={windowWidth} isVisible={isModalVisible} onBackdropPress={() => setisModalVisible(false)} useNativeDriver={true} backdropOpacity={0.9} onBackButtonPress={() => setisModalVisible(false)} >
                    <View style={{ flex: 1, backgroundColor: color.primaryWhite }}>
                        <View style={{ zIndex: 10, position: 'absolute', top: 0, width: '100%', height: 50, backgroundColor: 'rgba(0,0,0,0.5)' }}>
                            <TouchableOpacity onPress={() => setisModalVisible(false)} style={{ height: 50, width: 50, alignItems: 'center', justifyContent: 'center' }}>
                                <Ionicons name="ios-close" color={color.primaryWhite} size={30} />
                            </TouchableOpacity>
                        </View>
                        {
                            (midlat && midlng) ?
                                <MapView
                                    onRegionChange={(info) => {
                                        setmidlat(info.latitude)
                                        setmidlng(info.longitude)
                                    }}
                                    showsUserLocation={true}
                                    style={{ flex: 1 }}
                                    initialRegion={{
                                        latitude: midlat,
                                        longitude: midlng,
                                        latitudeDelta: 0.0922,
                                        longitudeDelta: 0.0421,
                                    }}
                                />
                                :
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <ActivityIndicator size={40} color={color.primaryBlack} />

                                </View>


                        }
                        <Ionicons style={styles.startIcon} name="md-pin" size={30} />
                        <TouchableOpacity onPress={()=>{
                            setisModalVisible(false)
                            saveDetails()
                        }} style={styles.doneButton}><Text>SELECT</Text></TouchableOpacity>
                    </View>
                </Modal>
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
        marginVertical: 20,
        justifyContent: 'space-evenly',


    },
    WhiteContainer: {
        backgroundColor: color.primaryWhite,
        alignSelf: 'center',
        marginVertical: 30,
        width: '90%',
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
    },
    buttonContainer: {
        height: 50,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    buttonText: {
        fontFamily: 'Montserrat-Bold',
        color: color.primaryWhite,
        fontSize: 15,
        letterSpacing: 2,
    },
    button: {
        backgroundColor: color.primaryBlue,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        width: '40%',
        marginHorizontal: 10,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: .2,
        shadowRadius: 8.30,
        elevation: 3,
    },
    ImagesContainer: {
        marginVertical: 20,
        marginHorizontal: 10,
        alignItems: 'center'
    },
    logoContainer: {
        width: (windowWidth - 60) / 3,
        height: (windowWidth - 60) / 3,
        borderRadius: 50
    },
    startIcon: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: '50%'

    },
    doneButton: {
        position: 'absolute',
        bottom: 0,
        height: 50,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.primaryWhite
    },

});