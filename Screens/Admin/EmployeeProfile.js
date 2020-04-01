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
function deleteProfile(){
    
}

function EmployeeProfile({ navigation,route }) {
    const [firstName, setfirstName] = useState("")
    const [lastName, setlastName] = useState("")
    const [role, setrole] = useState("")
    const [position, setposition] = useState("")
    const [employeeNo, setemployeeNo] = useState("")
    const [licenceNo, setlicenceNo] = useState("")
    const [loading, setloading] = useState(true)
    const {userId}= route.params
    useEffect(() => {
        fetch('https://smogbuddy.herokuapp.com/user/' + userId)
            .then((res) => res.json())
            .then((resJson) => {
                console.log(resJson)
                setloading(false);
                setfirstName(resJson.firstName);
                setlastName(resJson.lastName);
                setemployeeNo(resJson.employNumber);
                setposition(resJson.position);
                setlicenceNo(resJson.licenseNumber)
                setrole(resJson.role);

            })
    },[])

    return (
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
                                {
                                    role=="DRIVER"?
                                    <TextBox title="LICENCE NUMBER" value={licenceNo} disabled={true} />
                                    :null

                                }

                                <TextBox title="EMPLOYEE NUMBER" value={employeeNo} disabled={true} />
                                <TextBox title="POSITION" value={position} disabled={true} />
                            </>

                    }

                </View>
            </View>
            <TouchableOpacity onPress={()=>deleteProfile()} style={styles.deleteButton}><Text style={styles.deleteText}>DELETE PROFILE</Text></TouchableOpacity>
        </LinearGradient>
    );

}

export default EmployeeProfile;

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
    icon: {
        marginRight: -20,
        marginLeft: 20
    },
    deleteButton:{
        height:50,
        width:200,
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'center',
        backgroundColor:color.failedRed,
        borderRadius:25,
        margin:30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: .2,
        shadowRadius: 8.30,

        elevation: 5,
    },
    deleteText:{
        fontFamily: 'Montserrat-Bold',
        fontSize: 12,
        letterSpacing: 2,
        color:color.primaryWhite
    }
});