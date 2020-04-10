import React,{useState,useEffect} from "react";
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import firebase from 'react-native-firebase';
function HomeDrawer({navigation},props){
    const [imageUrl, setimageUrl] = useState("")
    useEffect(()=>{
        const user=firebase.auth().currentUser;
        fetch('https://smogbuddy.herokuapp.com/user/'+user.uid)
        .then((res)=>res.json())
        .then((resJson)=>setimageUrl(resJson.imageUrl))
    },[])
return(
    <View style={styles.container}>
        <View style={styles.headerContainer}><TouchableOpacity onPress={()=>navigation.closeDrawer()} style={styles.icon}><Ionicons  name="md-arrow-back" size={40}/></TouchableOpacity></View>
        <Image style={styles.imageContainer} resizeMode='cover' source={{uri:imageUrl}}/>
        <TouchableOpacity onPress={()=>navigation.navigate("Profile")} style={styles.content}><Ionicons name="md-person" size={30}/><Text style={styles.contentText}>PROFILE</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate("DriverProfile")} style={styles.content}><Ionicons name="md-car" size={30}/><Text style={styles.contentText}>YOUR DRIVER</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate("DriverTrack")} style={styles.content}><Ionicons name="md-navigate" size={30}/><Text style={styles.contentText}>TRACK CAR</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate("ContactUs")} style={styles.content}><Ionicons name="md-contacts" size={30}/><Text style={styles.contentText}>CONTACT US</Text></TouchableOpacity>
        <View style={{height:70,width:150}}/>
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
        borderRadius:50,
        margin:30,
        alignSelf:'center'

    },
    headerContainer: {
        marginTop:10,
        height:50,
        width:'100%',
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    content:{
        flex:1,
        marginLeft:30,
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