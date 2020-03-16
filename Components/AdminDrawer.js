import React from "react";
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import firebase from 'react-native-firebase';
import { color } from '../Assets/color';
function HomeDrawer({navigation},props){

return(
    <View style={styles.container}>
        <View style={styles.headerContainer}><TouchableOpacity onPress={()=>navigation.closeDrawer()} style={styles.icon}><Ionicons  name="md-arrow-back" size={40}/></TouchableOpacity><View style={styles.imageContainer}></View><View/></View>
        <TouchableOpacity onPress={()=>navigation.navigate("RequestStack")} style={styles.content}><Ionicons name="ios-mail-unread" color={color.failedRed} size={30}/><Text style={[styles.contentText,{color:color.failedRed}]}>REQUESTS</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate("ShopProfile")} style={styles.content}><Ionicons name="ios-business" size={30}/><Text style={styles.contentText}>SHOP PROFILE</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate("ManageUsersStack")} style={styles.content}><Ionicons name="ios-people" size={30}/><Text style={styles.contentText}>MANAGE USERS</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate("ServicesStack")} style={styles.content}><Ionicons name="ios-list" size={30}/><Text style={styles.contentText}>SERVICES</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate("Sales")} style={styles.content}><Ionicons name="ios-trending-up" size={30}/><Text style={styles.contentText}>SALES</Text></TouchableOpacity>
        <View style={styles.content}/>
        <TouchableOpacity onPress={()=>{
            firebase.auth().signOut();}}
             style={styles.logout}><Text style={styles.logoutText}>LOGOUT</Text></TouchableOpacity>
    </View>
    );

}

export default HomeDrawer;

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
    headerContainer: {
        marginTop:10,
        height:150,
        width:'100%',
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    content:{
        margin:30,
        flex:1,
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
    },
    icon:{
        marginRight:-20,
        marginLeft:20
    }
});