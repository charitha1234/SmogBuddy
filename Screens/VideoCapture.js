import React from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

function VideoCapture(props){

return(
    <View style={styles.container}>
        <Text>VideoCapture</Text>
    </View>
    );

}

export default VideoCapture;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});