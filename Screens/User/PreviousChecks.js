import React, {useEffect,useState} from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList
} from "react-native";
import { color } from '../../Assets/color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firebase from 'react-native-firebase';
import { SafeAreaView } from 'react-native-safe-area-context';
import BaseUrl from '../../Config'
function CheckList(props) {
    return (
        <TouchableOpacity onPress={props.onPress} style={[styles.ProcessContainer,props.status=="ONGOING"?{backgroundColor:color.lightGreen}:{backgroundColor:color.primaryWhite}]}>
            <View style={styles.statusContainer}>
                {
                    props.status=="ONGOING"?
                    <Text style={styles.dateText}>ONGOING</Text>:
                    <Text style={styles.dateText}>{props.date}</Text>
                    

                }
                
            </View>
            <View style={styles.CostContainer}>
                <Text style={styles.Costlabel}>Total Cost</Text>
                <Text style={styles.CostText}>${props.cost}</Text>
            </View>
        </TouchableOpacity>
    )
}

function PreviousChecks(props) {
    const [previousChecks, setpreviousChecks] = useState(null)
    useEffect(()=>{
        const user=firebase.auth().currentUser
        fetch(BaseUrl.Url+'/user/inspection/history/' + user.uid)
        .then((res)=>res.json())
        .then((resJson)=>{
            setpreviousChecks(resJson)
        })
    },[])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}><TouchableOpacity onPress={() => props.navigation.goBack()} style={styles.icon}><Ionicons name="ios-close" size={40} /></TouchableOpacity><Text style={styles.headerText}>ALL CHECKS</Text><View /></View>
            <FlatList data={previousChecks} renderItem={({item})=>(<CheckList onPress={()=>props.navigation.navigate("CheckDetails",{details:item})} status={item.status} date={item.date} cost={item.totalCost}/>)}/>
            
        </SafeAreaView>
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