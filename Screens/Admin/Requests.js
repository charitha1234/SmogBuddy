import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

class Requests extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Requests</Text>
            </View>
        );
    }
}
export default Requests;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});