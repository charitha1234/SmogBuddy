import React from "react";
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
function Profile({navigation}) {

    return (
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={[color.lightGreen, color.lightBlue]} style={styles.container}>
            <View style={styles.headerContainer}><TouchableOpacity onPress={()=>navigation.goBack()} style={styles.icon}><Ionicons  name="ios-close" size={30}/></TouchableOpacity><Text style={styles.headerText}>DRIVER PROFILE</Text><View/></View>
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <TextBox title="FIRST NAME" defaultValue="charitha" disabled={true}/>
                    <TextBox title="LAST NAME" defaultValue="weerasooriya" disabled={true}/>
                    <TextBox title="ADDRESS"  defaultValue="kosswatta" disabled={true}/>
                    <TextBox title="STATE" defaultValue="nattandiya" disabled={true}/>
                    <TextBox title="ZIPCODE" defaultValue="9922" disabled={true} />
                </View>
            </View>
        </LinearGradient>
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
    icon:{
        marginRight:-20,
        marginLeft:20
    }
});