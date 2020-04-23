import React from "react";
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

function Settings({navigation}){

return(
    <View style={styles.container}>
        <View style={styles.headerContainer}><TouchableOpacity onPress={() => navigation.goBack()} style={styles.icon}><Ionicons name="ios-close" size={40} /></TouchableOpacity><Text style={styles.headerText}>SETTINGS</Text></View>
    </View>
    );

}

export default Settings;

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    headerContainer: {
        height: 100,
         width: '100%',
         flexDirection: 'row',
         alignItems: 'center',
     },
     headerText: {
         fontFamily: 'Montserrat-Bold',
         fontSize: 25,
         letterSpacing: 2,
     },
     icon: {
         height:50,
         width:50,
         marginRight:20,
         justifyContent:'center',
         alignItems:'center',
 
     },
});