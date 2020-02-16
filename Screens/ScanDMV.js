import React from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

function ScanDMV(props){

return(
    <View style={styles.container}>
        <Text>ScanDMV</Text>
    </View>
    );

}

export default ScanDMV;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});