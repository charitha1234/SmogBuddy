import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity
} from "react-native";
import MapView,{Marker} from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { color } from '../../Assets/color';
import { Colors } from "react-native/Libraries/NewAppScreen";
function DriverTrack(props) {
    const [longitude, setlongitude] = useState(null)
    const [latitude, setlatitude] = useState(null)
    const [driverAssigned,setdriverAssigned]= useState(false)
    const [startGiven, setstartGiven] = useState(false)
    return (
        <View style={styles.container}>
            <MapView

            showsUserLocation={true}
                onRegionChange={(change) => {
                    console.log(change);
                    setlatitude(change.latitude);
                    setlongitude(change.longitude);
                }}
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: 6.794791,
                    longitude: 79.900713,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
            </MapView>
            {startGiven?
                
            <View style={styles.detailsContainer}>
                <View style={styles.timeContainer}>
                    <Text>Arrival Time</Text>
                    <Text style={styles.timeText}>13.50</Text>
                </View>
                <View style={styles.contactContainer}></View>
            </View>
            :
            <>
            <Ionicons style={styles.startIcon} name="md-pin" size={30}/>
            <TouchableOpacity onPress={()=>setstartGiven(true)} style={styles.doneButton}><Text>DONE</Text></TouchableOpacity>
            </>
}
        </View>
    );

}

export default DriverTrack;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    detailsContainer: {
        position:'absolute',
        alignSelf:'center',
        bottom:10,
        height:200,
        width:'90%',
        borderRadius:50,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: .2,
        shadowRadius: 8.30,
        elevation: 3,
        backgroundColor: color.primaryWhite


    },
    startIcon:{
        position:'absolute',
        alignSelf:'center',

    },
    doneButton:{
        position:'absolute',
        bottom:0,
        height:50,
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:color.primaryWhite
    },
    timeContainer:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center',
        borderBottomWidth:0.5,
        borderColor:color.gray,
        marginHorizontal:10,


    },
    contactContainer:{
        flex:1,
        marginHorizontal:10

    },
    timeText:{
        fontSize:30
    }
});