import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";
import MapView,{Marker} from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { color } from '../../Assets/color';
function DriverTrack(props) {
    const [longitude, setlongitude] = useState(null)
    const [latitude, setlatitude] = useState(null)
    return (
        <View style={styles.container}>
            <MapView
            showsUserLocation={true}
                onRegionChange={(change) => {
                    console.log(change);
                    setlatitude(change.latitude);
                    setlongitude(change.longitude);
                }}
                style={{ flex: 1,justifyContent:'center',alignItems:'center' }}
                initialRegion={{
                    latitude: 6.794791,
                    longitude: 79.900713,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
            </MapView>
            <Ionicons style={{position:'absolute',left:'50%',bottom:'62.5%',transform:[{translateX:-7.5}]}} name="md-pin" size={30}/>
            <View style={styles.detailsContainer}></View>
        </View>
    );

}

export default DriverTrack;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    detailsContainer: {
        flex: 0.25,
        backgroundColor: color.primaryWhite


    }
});