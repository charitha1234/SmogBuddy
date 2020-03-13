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
import Ionicons from 'react-native-vector-icons/Ionicons';
function Process({navigation,route}) {
const {details}=route.params;
const [Name, setName] = useState("")
const [status, setstatus] = useState("")
const [assignedDriver, setassignedDriver] = useState("")
const [estimatedTime, setestimatedTime] = useState("")
const [driverTelephoneNo, setdriverTelephoneNo] = useState("")
const [customerTelephoneNo, setcustomerTelephoneNo] = useState("")
const [assignedTechnician, setassignedTechnician] = useState("")
useEffect(() => {
    setName(details.user.firstName+" "+details.user.lastName);
    setstatus(details.status);
    if(details.driver){
    setassignedDriver(details.driver.firstName+" "+details.driver.lastName)
    setdriverTelephoneNo(details.driver.phoneNumber)
    setestimatedTime(details.driver.estimatedTime)
    setassignedTechnician(details.technician.firstName+" "+details.technician.lastName)
    }
    else{
    setassignedDriver("_")
    setestimatedTime("_")
    setdriverTelephoneNo("_")
    setassignedTechnician("_")
    }
    setcustomerTelephoneNo(details.user.phoneNumber)
   
})
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}><TouchableOpacity onPress={()=>navigation.goBack()} style={styles.icon}><Ionicons  name="ios-close" size={40}/></TouchableOpacity><Text style={styles.headerText}>PROCESS</Text><TouchableOpacity onPress={()=>navigation.navigate("TrackDriver")}><Ionicons style={{marginRight:10}} name="md-navigate" size={40} color={color.primaryBlue}/></TouchableOpacity></View>
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <TextBox title="CUSTOMER NAME" defaultValue={Name}  disabled={true}/>
                    <TextBox title="STATUS" defaultValue={status} disabled={true}/>
                    <TextBox title="ASSIGNED DRIVER"  defaultValue={assignedDriver} disabled={true}/>
                    <TextBox title="ASSIGNED TECHNICIAN"  defaultValue={assignedTechnician} disabled={true}/>
                    <TextBox title="ESTIMATED TIME" defaultValue={estimatedTime} disabled={true}/>
                    <TextBox title="DRIVER TELEPHONE NO." defaultValue={driverTelephoneNo} disabled={true} />
                    <TextBox title="CUSTOMER TELEPHONE NO." defaultValue={customerTelephoneNo} disabled={true} />
                </View>
            </View>
        </View>
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
    icon:{
        marginRight:-20,
        marginLeft:20
    }
});