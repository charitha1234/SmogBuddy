import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView
} from "react-native";
import firebase from 'react-native-firebase';
import { color } from '../../Assets/color';
import Header from '../../Components/HeaderBarTechnician';
import StepIndicator from 'react-native-step-indicator';
const labels = ["Driver Is On The Way", "Driver Arrived","PickedUp The Car", "Arrived To The Service Center", "Completed Service", "Driver Is On The Way", "Driver Arrived", "Finished"];

const customStyles = {
    stepIndicatorSize: 30,
    currentStepIndicatorSize: 40,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: color.primaryBlue,
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: color.primaryBlue,
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: color.primaryBlue,
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: color.primaryBlue,
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: color.primaryBlue,
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: color.primaryBlack,
    labelSize: 13,
    labelAlign: 'flex-start',
    currentStepLabelColor: color.primaryBlue,
    labelFontFamily: 'Montserrat-Light'
}
class SmogTests extends Component {
    constructor(props){
        super(props);
        this.state={
            vehicleAssigned:true ,
            currentStage:0,  
            noOfServices:0,
        }

    }

    componentDidMount(){
        this.setState({noOfServices:8})
    }
    Passed(){
    console.log("PASSED")

    }
    Failed(){
    console.log("FAILED")

    }
    render() {
        return (
            <View style={styles.container}>
                <Header title="SMOGBUDDY" navigation={this.props.navigation}  />
                {this.state.vehicleAssigned?
                <>
                <ScrollView  contentContainerStyle={styles.scrollViewStyles}>
                     <StepIndicator
                    stepCount={this.state.noOfServices}
                    direction="vertical"
                    customStyles={customStyles}
                    currentPosition={this.state.currentStage}
                    labels={labels}
                />
                </ScrollView>
                <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.failedButton} onPress={this.Failed.bind()}><Text style={styles.buttonText}>FAILED</Text></TouchableOpacity>
                <TouchableOpacity style={styles.passedButton} onPress={this.Passed.bind()}><Text style={styles.buttonText}>PASSED</Text></TouchableOpacity>
                </View>
                </>
                :
                <View style={styles.content}>
                <Text style={styles.messageText}>No Vehicle Has Assigned</Text>
                </View>


                }
            </View>
        );
    }
}
export default SmogTests;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        backgroundColor:color.primaryWhite

    },
    scrollViewStyles:{
        height:80*labels.length,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:color.primaryWhite
    },

    content: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center'


    },
    titleText: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 15,
        letterSpacing: 3,
        opacity: 0.6
    },
    messageText:{
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 15,
        letterSpacing: 2,
        opacity: 0.6
    },
    buttonContainer:{
        flexDirection:'row',
        height:70,
        justifyContent:'space-evenly',
        alignItems:'center',

        width:'100%',
        backgroundColor:color.primaryWhite
    },
    buttonText:{
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 15,
        letterSpacing: 1,
        color:color.primaryWhite
    },
    passedButton:{
        alignItems:'center',
        justifyContent:'center',
        borderRadius:25,
        height:50,
        width:150,
        backgroundColor:color.primaryBlue,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: .2,
        shadowRadius: 8.30,
        elevation: 3,
    },
    failedButton:{
        alignItems:'center',
        justifyContent:'center',
        borderRadius:25,
        height:50,
        width:150,
        backgroundColor:color.failedRed,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: .2,
        shadowRadius: 8.30,
        elevation: 3,
    }
});