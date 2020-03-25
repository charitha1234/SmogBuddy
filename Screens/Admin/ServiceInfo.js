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
function deleteService(serviceID,setloading,navigation) {
    setloading(true)
    fetch("https://smogbuddy.herokuapp.com/service/" + serviceID,
    {
    method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    }
    )
    .then((res)=>res.json())
    .then((resJson)=>{
        console.log("RES",resJson)
        setloading(false)
        
    }
        )
    .catch((e)=>navigation.goBack())
}

function ServiceInfo({ navigation,route }) {
    const [name, setname] = useState("");
    const [yearRange, setyearRange] = useState("");
    const [cost, setcost] = useState("");
    const [averageTime, setaverageTime] = useState("")
    const [loading, setloading] = useState(false)
    const {info}=route.params;
    useEffect(()=>{
        setname(info.serviceName)
        setyearRange(info.yearRange)
        setcost(info.cost.toString())
        setaverageTime(info.averageTime.toString())
    });
    return (
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={[color.lightGreen, color.lightBlue]} style={styles.container}>
            <View style={styles.headerContainer}><TouchableOpacity onPress={() => navigation.goBack()} style={styles.icon}><Ionicons name="ios-close" size={40} /></TouchableOpacity><Text style={styles.headerText}>SERVICE</Text><View /></View>
            <View style={styles.container}>
                <View style={styles.formContainer}>

                    <TextBox title="SERVICE NAME" underline={true} value={name} onChangeText={text => setname(text)} disabled={true} />
                    <TextBox title="YEAR RANGE" underline={true} value={yearRange} onChangeText={text => setyearRange(text)} disabled={true} />
                    <TextBox title="COST" underline={true} value={cost} onChangeText={text => setcost(text)} disabled={true} />
                    <TextBox title="AVERAGE TIME" underline={true} value={averageTime} onChangeText={text => setaverageTime(text)} disabled={true} />

                </View>
            </View>
            <TouchableOpacity onPress={() => deleteService(info.serviceID,setloading,navigation)} style={styles.deleteButton}><Text style={styles.deleteText}>DELETE SERVICE</Text></TouchableOpacity>
        </LinearGradient>
    );

}

export default ServiceInfo;

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
    },
    deleteButton: {
        height: 50,
        width: 200,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: color.failedRed,
        borderRadius: 25,
        margin: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: .2,
        shadowRadius: 8.30,

        elevation: 5,
    },
    deleteText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 12,
        letterSpacing: 2,
        color: color.primaryWhite
    }
});