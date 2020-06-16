import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import firebase from 'react-native-firebase';
import { color } from '../Assets/color';
function HeaderBar(props) {

    return (
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={[color.headergreen, color.lightBlue]} style={styles.container}>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.headerBar}>
                    <TouchableOpacity onPress={()=>{
                        firebase.auth().signOut();
                    }} style={{flex:1}}>
                    <Ionicons style={{marginLeft:20,color:color.primaryWhite}} name="ios-log-out" size={30}/>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>{props.title}</Text>
                    <View style={{flex:1}}/>
                </View>
            </SafeAreaView>
        </LinearGradient>
    );

}

export default HeaderBar;

const styles = StyleSheet.create({
    container: {
        height: 66,
        width: '100%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: .2,
        shadowRadius: 8.30,
        elevation: 5,

    },
    headerBar: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    headerTitle: {
        flex:2,
        textAlign: 'center',
        fontSize: 15,
        fontFamily: 'Montserrat-Bold',
        letterSpacing: 3,
        color: color.primaryWhite,
    }
});