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
function Process({navigation}) {

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}><TouchableOpacity onPress={()=>navigation.goBack()} style={styles.icon}><Ionicons  name="ios-close" size={40}/></TouchableOpacity><Text style={styles.headerText}>PROCESS</Text><TouchableOpacity onPress={()=>navigation.navigate("TrackDriver")}><Ionicons style={{marginRight:10}} name="md-navigate" size={40} color={color.primaryBlue}/></TouchableOpacity></View>
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <TextBox title="CUSTOMER NAME" defaultValue="charitha" disabled={true}/>
                    <TextBox title="STATUS" defaultValue="ARRIVING" disabled={true}/>
                    <TextBox title="ASSIGNED DRIVER"  defaultValue="Nimal" disabled={true}/>
                    <TextBox title="ESTIMATED TIME" defaultValue="100 min" disabled={true}/>
                    <TextBox title="DRIVER TELEPHONE NO." defaultValue="453 213 321" disabled={true} />
                    <TextBox title="CUSTOMER TELEPHONE NO." defaultValue="322 122 323" disabled={true} />
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