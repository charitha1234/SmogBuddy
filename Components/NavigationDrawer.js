import React from "react";
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity,Linking
} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import firebase from 'react-native-firebase';
function turnOnMaps(lat, lng) {
    var url = "https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=navigate&destination=" + lat + ',' + lng;
    Linking.canOpenURL(url).then(supported => {
        if (!supported) {
            console.log('Can\'t handle url: ' + url);
        } else {
            return Linking.openURL(url);
        }
    }).catch(err => console.error('An error occurred', err));
}
function NavigationDrawer({navigation},props){

return(
    <View style={styles.container}>
        <TouchableOpacity onPress={()=>turnOnMaps(props.lat,props.lng)} style={styles.content}><Ionicons name="md-maps" size={30}/><Text style={styles.contentText}>NAVIGATION</Text></TouchableOpacity>
        <TouchableOpacity
             style={styles.logout}><Text style={styles.logoutText}>ARRIVED</Text></TouchableOpacity>
    </View>
    );

}

export default NavigationDrawer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageContainer:{
        width:100,
        height:100,
        backgroundColor:'black',
        borderRadius:50,
        margin:30,
        alignSelf:'center'

    },
    content:{
        margin:30,
        flexDirection:'row',
        alignItems:'center'
    },
    contentText:{
        fontFamily: 'Montserrat-Regular',
        fontSize: 15,
        letterSpacing: 2,
        opacity:0.6,
        marginLeft:20,


    },
    logout:{
        position:'absolute',
        bottom:20,
        borderWidth:2,
        width:150,
        height:50,
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center'
    },
    logoutText:{
        fontFamily: 'Montserrat-Regular',
        fontSize: 15,
        letterSpacing: 2,
    }
});