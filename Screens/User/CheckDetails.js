import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList
} from "react-native";
import { color } from '../../Assets/color';
import LinearGradient from 'react-native-linear-gradient';
import TextBox from '../../Components/textBox';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Item } from "native-base";

function ServiceList(props) {
    return (
        <View style={styles.ProcessContainer}>
            <View style={styles.statusContainer}>
                <Text style={styles.driverNameText}>{props.ServiceName}</Text>
                {
                    props.status == "FAILED" ?
                        <Text style={styles.dateText}>{props.status}:{props.failedPart}</Text> :
                        <Text style={styles.dateText}>{props.status}</Text>



                }


            </View>
            <View style={styles.CostContainer}>
                <Text style={styles.Costlabel}>Cost</Text>
                <Text style={styles.CostText}>${props.cost}</Text>
            </View>
        </View>
    )
}

function Process({ navigation, route }) {
    const { details } = route.params;

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.icon}>
                    <Ionicons name="ios-close" size={40} />
                </TouchableOpacity>
                <View><Text style={styles.headerText}>INSPECTIOIN HISTORY</Text></View>
                <View />
            </View>
            <FlatList data={details.serviceList} renderItem={({ item }) => (<ServiceList ServiceName={item.serviceName} failedPart={item.partName} status={item.status} cost={item.cost} />)} />
        </View>
    );

}

export default Process;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        height: 100,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 20,
        letterSpacing: 2,
    },

    icon: {
        marginRight: -20,
        marginLeft: 20
    },
    ProcessContainer: {
        flexDirection: 'row',
        marginTop: 1,
        marginBottom: 1,
        height: 100,
        width: '100%',
        justifyContent: 'center',
        backgroundColor: color.primaryWhite,

        borderBottomWidth: 0.2

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