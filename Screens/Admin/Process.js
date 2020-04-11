import React,{useState,useEffect} from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import { color } from '../../Assets/color';
import LinearGradient from 'react-native-linear-gradient';
import TextBox from '../../Components/textBox';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
function Process({navigation,route}) {
const {details}=route.params;
const [Name, setName] = useState("")
const [status, setstatus] = useState("")
const [assignedDriver, setassignedDriver] = useState("")
const [estimatedTime, setestimatedTime] = useState("")
const [customerTelephoneNo, setcustomerTelephoneNo] = useState("")
const [assignedTechnician, setassignedTechnician] = useState("")
useEffect(() => {
    console.log(details)
    setName(details.user.firstName+" "+details.user.lastName);
    setstatus(details.status);
    if(details.driver){
    setassignedDriver(details.driver.firstName+" "+details.driver.lastName)
    setestimatedTime(details.driver.estimatedTime)
    setassignedTechnician(details.technician.firstName+" "+details.technician.lastName)
    }
    else{
    setassignedDriver("_")
    setestimatedTime("_")
    setassignedTechnician("_")
    }
    setcustomerTelephoneNo(details.user.phoneNumber)
   
})
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}><TouchableOpacity onPress={()=>navigation.goBack()} style={styles.icon}><Ionicons  name="ios-close" size={40}/></TouchableOpacity><Text style={styles.headerText}>PROCESS</Text><TouchableOpacity onPress={()=>navigation.navigate("TrackDriver",{userId:details.userId})}><Ionicons style={{marginRight:10}} name="md-navigate" size={40} color={color.primaryBlue}/></TouchableOpacity></View>
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <TextBox title="CUSTOMER NAME" value={Name}  disabled={true}/>
                    <TextBox title="STATUS" value={status} disabled={true}/>
                    <TextBox title="ASSIGNED DRIVER"  value={assignedDriver} disabled={true}/>
                    <TextBox title="ASSIGNED TECHNICIAN"  value={assignedTechnician} disabled={true}/>
                    <TextBox title="ESTIMATED TIME" value={estimatedTime} disabled={true}/>
                    <TextBox title="CUSTOMER TELEPHONE NO." value={customerTelephoneNo} disabled={true} />
                </View>
            </View>
        </SafeAreaView>
    );

}

export default Process;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    headerContainer: {
        height:100,
        width:'100%',
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 25,
        letterSpacing: 2,
    },
    formContainer: {
        marginTop:30,
        height: '90%',
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
    icon:{
        marginRight:-20,
        marginLeft:20
    }
});