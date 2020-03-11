import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";
import firebase from 'react-native-firebase';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { color } from '../../Assets/color';
import StepIndicator from 'react-native-step-indicator';
class SmogTests extends Component {
    constructor(props){
        super(props);
        this.state={
            
        }

    }
    render() {
        return (
            <View style={styles.container}>
                <Text>SmogTests</Text>
            </View>
        );
    }
}
export default SmogTests;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});