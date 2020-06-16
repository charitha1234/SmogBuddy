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
import { color } from '../Assets/color';
function HeaderBar(props) {

    return (
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={[color.headergreen, color.lightBlue]} style={styles.container}>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.headerBar}>
                    <TouchableOpacity style={{ flex: 0.5, height: '100%', justifyContent: 'center', alignItems: 'center' }} onPress={() => props.navigation.openDrawer()} >
                        <Ionicons style={{ color: color.primaryWhite }} name="ios-menu" size={30} />
                    </TouchableOpacity>
                    <View style={{flex:1,alignItems:'center',justifyContent:'center',height:'100%'}}><Text style={styles.headerTitle}>{props.title}</Text></View>

                    <View style={{ flex: 0.5, flexDirection: 'row', justifyContent: 'space-evenly' }}>

                    </View>
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
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    headerTitle: {
        textAlign: 'center',
        fontSize: 15,
        fontFamily: 'Montserrat-Bold',
        letterSpacing: 3,
        color: color.primaryWhite,
    }
});