import React from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

function ManageParts(props){

return(
    <View style={styles.container}>
        <Text>ManageParts</Text>
    </View>
    );

}

export default ManageParts;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});