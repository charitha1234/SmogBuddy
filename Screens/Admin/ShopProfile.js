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
function ShopProfile({navigation}) {

    return (
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={[color.lightGreen, color.lightBlue]} style={styles.container}>
            <View style={styles.headerContainer}><TouchableOpacity onPress={()=>navigation.goBack()} style={styles.icon}><Ionicons  name="ios-close" size={40}/></TouchableOpacity><Text style={styles.headerText}>SHOP PROFILE</Text><View/></View>
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <TextBox title="BUSINESS NAME" defaultValue="charitha" disabled={true}/>
                    <TextBox title="ADDRESS" defaultValue="weerasooriya" disabled={true}/>
                    <TextBox title="ARD"  defaultValue="kosswatta" disabled={true}/>
                    <TextBox title="STATION TYPE" defaultValue="nattandiya" disabled={true}/>
                    <TextBox title="OPTIONAL EPA" defaultValue="9922" disabled={true} />
                    <TextBox title="TELEPHONE NUMBER" defaultValue="9922" disabled={true} />
                    <TextBox title="EMAIL" defaultValue="9922" disabled={true} />
                </View>
            </View>
        </LinearGradient>
    );

}

export default ShopProfile;

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