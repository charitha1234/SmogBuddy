import React from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

function OdometerRead(props){

return(
    <View style={styles.container}>
        <Text>OdometerRead</Text>
    </View>
    );

}

export default OdometerRead;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});