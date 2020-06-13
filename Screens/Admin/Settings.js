import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Alert
} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { color } from '../../Assets/color';
import Dialog from "react-native-dialog";
import Modal from 'react-native-modal';
import DateTimePicker from '@react-native-community/datetimepicker';
import Header from '../../Components/NormalHeader';
import firebase from 'react-native-firebase';
import BaseUrl from '../../Config'
function Settings({ navigation }) {
    const [fuelCapPrice, setfuelCapPrice] = useState(null)
    const [isPriceChangerVisible, setisPriceChangerVisible] = useState(false)
    const [taxPercentage, settaxPercentage] = useState(null)
    const [isTaxChangerVisible, setisTaxChangerVisible] = useState(false)
    const [isModalVisible, setisModalVisible] = useState(false)
    const [loading, setloading] = useState(true)
    const [startingdate, setstartingdate] = useState(null)
    const [endingDate, setendingDate] = useState(null)
    const [showCalendar, setshowCalendar] = useState(false)
    const [shopId, setshopId] = useState(null)
    const [date, setdate] = useState(new Date())
    const [isStartingSelection, setisStartingSelection] = useState(false)
    const user = firebase.auth().currentUser
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setshowCalendar(Platform.OS === 'ios');
        if (isStartingSelection) setstartingdate(currentDate)
        else setendingDate(currentDate)
        setdate(currentDate);
    };

    const deleteData=()=>{
        if(startingdate && endingDate){
            Alert.alert(
                '',
                'Are you sure you want to delete?', 
                [
                   {text: 'NO', onPress: () => {}, style: 'cancel'},
                   {text: 'OK', onPress: () => {
                    fetch(BaseUrl.Url + "/admin/storage", {
                        method: 'DELETE',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
            
                            startAt: startingdate.toLocaleDateString(),
                            endAt: endingDate.toLocaleDateString()
            
            
            
                        }),})
                        .then((res)=>res.json())
                        .then((resJson)=>{
                            Alert.alert(
                                'SUCCESS',
                                'Succesfuly deleted ', // <- this part is optional, you can pass an empty string
                                [
                                  {text: 'OK', onPress: () => {}},
                                ],
                                {cancelable: false},
                              );
                           })
                        .catch(()=>alert("Something has wrong"))


                   }},
                ],
                { cancelable: false }
           )
            
        }
        else{
            alert("Please select starting date and ending date")
        }
    }
    const saveSettings = () => {
        fetch(BaseUrl.Url + "/admin/shop/price", {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({

                fuelCapPrice: Number(fuelCapPrice),
                tax: Number(taxPercentage),
                id: shopId



            }),
        }).then((res) => res.json())
            .then((resJson) => {
                Alert.alert(
                    "Success",
                    "Successfuly saved your settings",
                    [
                        { text: "OK", onPress: () => { } }
                    ],
                    { cancelable: false }
                );


            })
            .catch((e) => {
                setloading(false)
                alert("something has wrong")
            })
    }

    const getApiData = () => {
        fetch(BaseUrl.Url + '/admin/shop/price/' + user.uid)
            .then((res) => res.json())
            .then((resJson) => {
                setloading(false);
                settaxPercentage(resJson.tax)
                setfuelCapPrice(resJson.fuelCapPrice)
                setshopId(resJson.shopId)

            })
            .catch((e) => alert("something has wrong"))
    }

    useEffect(() => {
        getApiData()
    }, [])

    return (
        <View style={styles.container}>
            <Header title='Settings' navigation={navigation} />
            {
                loading ?
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size={30} color={color.primaryBlack} />
                    </View>
                    :
                    <>
                        <TouchableOpacity onPress={() => setisPriceChangerVisible(true)} style={styles.setting}>
                            <Text style={styles.settingText}>Fuel Cap Price</Text>
                            <Text style={styles.settingText}>${fuelCapPrice}</Text>
                            <Ionicons name="ios-arrow-forward" size={20} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setisTaxChangerVisible(true)} style={styles.setting}>
                            <Text style={styles.settingText}>Tax Percentage</Text>
                            <Text style={styles.settingText}>{taxPercentage}%</Text>
                            <Ionicons name="ios-arrow-forward" size={20} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setisModalVisible(true)} style={styles.setting}>
                            <Text style={[styles.settingText, { color: color.failedRed }]}>Delete Storage</Text>
                            <Ionicons name="ios-arrow-forward" size={20} />
                        </TouchableOpacity>

                    </>
            }


            <Dialog.Container visible={isPriceChangerVisible}>
                <Dialog.Title>Change fuel cap price</Dialog.Title>
                <Dialog.Input label="$" placeholder="Enter Price" keyboardType='phone-pad' onChangeText={(text) => setfuelCapPrice(text)} />
                <Dialog.Button label="Cancel" onPress={() => {
                    setisPriceChangerVisible(false)

                }} />
                <Dialog.Button label="Save" onPress={() => {
                    setisPriceChangerVisible(false)
                    saveSettings()

                }} />
            </Dialog.Container>
            <Dialog.Container visible={isTaxChangerVisible}>
                <Dialog.Title>Change Tax Percentage</Dialog.Title>
                <Dialog.Input label="%" placeholder="Enter Tax Percentage" keyboardType='phone-pad' onChangeText={(text) => settaxPercentage(text)} />
                <Dialog.Button label="Cancel" onPress={() => {
                    setisTaxChangerVisible(false)
                }} />
                <Dialog.Button label="Save" onPress={() => {
                    setisTaxChangerVisible(false)
                    saveSettings()
                }} />
            </Dialog.Container>
            <Modal isVisible={isModalVisible} onBackdropPress={() => setisModalVisible(false)} useNativeDriver={true}>
                <View style={{ backgroundColor: color.primaryWhite, alignSelf: 'center', height: '50%', width: '90%', borderRadius: 20 }}>
                    <TouchableOpacity onPress={() => {
                        setisStartingSelection(true)
                        setshowCalendar(true)
                    }} style={{ flex: 1, margin: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={styles.settingText}>Select Starting Date:</Text>
                        {startingdate ?
                            <Text>{startingdate.toLocaleDateString()}</Text>
                            :
                            <Ionicons name='ios-calendar' size={30} />}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        setisStartingSelection(false)
                        setshowCalendar(true)
                    }} style={{ flex: 1, margin: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={styles.settingText}>Select Ending Date:</Text>
                        {endingDate ?
                            <Text>{endingDate.toLocaleDateString()}</Text>
                            :
                            <Ionicons name='ios-calendar' size={30} />}
                    </TouchableOpacity>
                    <View style={{ flex: 1, margin: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity onPress={()=>setisModalVisible(false)} style={{ flex: 1, margin: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={[styles.settingText, { fontFamily: 'Montserrat-Bold', color: color.primaryBlue }]}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>deleteData()} style={{ flex: 1, margin: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={[styles.settingText, { fontFamily: 'Montserrat-Bold', color: color.failedRed }]}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            {showCalendar && (
                <DateTimePicker
                    testID="dateTimePicker"
                    timeZoneOffsetInMinutes={0}
                    value={date}
                    mode='date'
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}
        </View>
    );

}

export default Settings;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.primaryWhite,
    },
    headerContainer: {
        height: 66,
        width: '100%',
        backgroundColor: color.primaryWhite,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: .2,
        shadowRadius: 8.30,

        elevation: 3,
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerText: {
        fontFamily: 'Montserrat-Bold',
        textAlign: 'center',
        fontSize: 20,
        letterSpacing: 2,
    },
    icon: {
        height: '100%',
        flex: 0.5,
        marginRight: 20,
        justifyContent: 'center',
        alignItems: 'center',

    },
    setting: {

        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 0.5,
        marginHorizontal: 10,
        alignItems: 'center',
        height: 50
    },
    settingText: {
        fontFamily: 'Montserrat-Semibold',
        fontSize: 10,
        letterSpacing: 2,
    }
});