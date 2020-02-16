import React from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

function DriverTrack(props){

return(
    <View style={styles.container}>
        <Text>DriverTrack</Text>
    </View>
    );

}

export default DriverTrack;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});