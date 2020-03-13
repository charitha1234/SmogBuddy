import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Image
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { RNCamera } from 'react-native-camera';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TextBox from '../../Components/textBox';
import { color } from '../../Assets/color';
import GradientButton from '../../Components/CustomButton';
import firebase from 'react-native-firebase';
class ScanDMV extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uId: firebase.auth().currentUser.uid,
            loading: false,
            before80: false,
            successfull: false,
            flashMode: RNCamera.Constants.FlashMode.auto,
        };

    }
    onBarCodeRead(scanResult) {
        if (scanResult.data != null) {
            this.setState({
                successfull: true,
                loading: true
            });
            let before80 = false;
            let i = scanResult.data.length;
            while (i--) {
                if (scanResult.data.charAt(i) == " ") {
                    this.setState({ before80: true })
                    before80 = true;
                    break;
                }
            }
            if (before80) {
                let vin = scanResult.data.substr(2, 10);
                let plate = scanResult.data.substr(20, 7);
                console.log(vin);
                console.log(plate);
            }
            else {
                let vin = scanResult.data.substr(2, 17);
                let plate = scanResult.data.substr(20, 7);
                fetch('https://smogbuddy.herokuapp.com/vehicle/' + this.state.uId + '?plateNumber=' + plate + '&vin=' + vin)
                    .then((response) => response.json())
                    .then((responseJson) => {
                            this.setState({
                                loading: false,
                                year: responseJson.year.toString(),
                                make: responseJson.make,
                                model:responseJson.model,
                                engine:responseJson.enginCapacity,
                            


                            });

                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }

        }
    }

    render() {

        return (
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={[color.lightGreen, color.lightBlue]} style={styles.container}>
                {!this.state.successfull ?
                <>
                <View style={styles.headerTextContainer}><Text style={styles.scanScreenMessage}>SCAN YOUR DMV</Text></View>
                    <RNCamera
                        ref={ref => {
                            this.camera = ref;
                        }}
                        defaultTouchToFocus
                        mirrorImage={false}
                        onBarCodeRead={this.onBarCodeRead.bind(this)}
                        onFocusChanged={() => { }}
                        onZoomChanged={() => { }}
                        permissionDialogTitle={'Permission to use camera'}
                        permissionDialogMessage={'We need your permission to use your camera phone'}
                        style={styles.preview}
                    ></RNCamera>
                    </>
                    :
                    <View style={styles.container}>
                        <Text style={styles.headerText}>Vehicle Details</Text>
                        {!this.state.loading ?

                            <View style={styles.formContainer}>
                                <TextBox title="YEAR" underline={true} disable={true} defaultValue={this.state.year} />
                                <TextBox title="MAKE" underline={true} disable={true} defaultValue={this.state.make} />
                                <TextBox title="MODEL" underline={true} disable={true} defaultValue={this.state.model} />
                                <TextBox title="ENGINE SIZE" underline={true} disable={true} defaultValue={this.state.engine} />
                            </View>
                            :
                            <View style={styles.formContainer}>
                                <ActivityIndicator size="large" color="black" />
                            </View>
                        }
                        <TouchableOpacity onPress={() =>{!this.state.loading? this.props.navigation.navigate("OdometerRead",{serviceList:this.props.route.params.serviceList}):null}} style={styles.button}><GradientButton title="NEXT" /></TouchableOpacity>
                    </View>
                }

            </LinearGradient>
        );
    }

}

export default ScanDMV;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'

    },
    preview: {
        height:'60%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    formContainer: {
        height: 400,
        width: 300,
        justifyContent: 'center',
        backgroundColor: color.primaryWhite,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: .2,
        shadowRadius: 8.30,

        elevation: 5,
    },
    headerText: {
        margin: 30,
        fontFamily: 'Montserrat-Bold',
        fontSize: 30,
        letterSpacing: 2,
    },
    scanScreenMessage: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 20,
        letterSpacing: 2,
        color: color.primaryBlack
    },
    middleLine: {
        flex: 1,
        borderBottomColor: 'black',
        borderBottomWidth: 0.5,
        marginHorizontal: 20,
        marginVertical: 20,
        opacity: 0.5
    },
    button: {
        alignSelf: 'flex-end',
        margin: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: .2,
        shadowRadius: 8.30,

        elevation: 5,
    },
    headerTextContainer:{
        height:100,
        backgroundColor:color.primaryWhite,
        width:'100%',
        marginBottom:10,
        justifyContent:'center',
        alignItems:'center'

    }
});