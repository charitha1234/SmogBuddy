import React from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

function DriverProfile(props){

return(
    <View style={styles.container}>
        <Text>DriverProfile</Text>
    </View>
    );

}

export default DriverProfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});