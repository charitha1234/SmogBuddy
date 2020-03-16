import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import { color } from '../../Assets/color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firebase from 'react-native-firebase';
function CheckList(props) {
    return (
        <TouchableOpacity onPress={props.onPress} style={styles.ProcessContainer}>
            <View style={styles.statusContainer}>
                <Text style={styles.dateText}>{props.date}</Text>
                <Text style={styles.driverNameText}>Driver: {props.driver}</Text>
            </View>
            <View style={styles.CostContainer}>
                <Text style={styles.Costlabel}>Total Cost</Text>
                <Text style={styles.CostText}>${props.cost}</Text>
            </View>
        </TouchableOpacity>
    )
}

function PreviousChecks(props) {

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}><TouchableOpacity onPress={() => props.navigation.goBack()} style={styles.icon}><Ionicons name="ios-close" size={40} /></TouchableOpacity><Text style={styles.headerText}>ALL CHECKS</Text><View /></View>
            <CheckList onPress={()=>props.navigation.navigate("CheckDetails")} driver="Jude" date="12/23/2019" cost="200"/>
        </View>
    );

}

export default PreviousChecks;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        height:100,
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
    icon: {
        marginRight: -20,
        marginLeft: 20
    },
    ProcessContainer: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom:10,
        height: 100,
        width: '100%',
        justifyContent: 'center',
        backgroundColor: color.primaryWhite,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: .2,
        shadowRadius: 8.30,
        borderRadius: 30,
        elevation: 3,
    },
    driverNameText: {
        fontFamily: 'Montserrat-Light',
        fontSize: 15,

    },
    dateText: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 20,
        letterSpacing: 2,
    },
    statusContainer: {
        flex: 2,
        justifyContent: 'space-evenly',
        marginLeft: 10
    },
    CostContainer: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    CostText: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 20,
    },
    Costlabel: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 15,
    }
});