import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Button
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { RNCamera } from 'react-native-camera';
import TextBox from '../Components/textBox';
import { color } from '../Assets/color';
import GradientButton from '../Components/CustomButton';
class ScanDMV extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            before80: false,
            successfull: true,
            flashMode: RNCamera.Constants.FlashMode.auto,
        };
    }

    onBarCodeRead(scanResult) {
        this.setState({ successfull: true });
        if (scanResult.data != null) {
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
                console.log(vin);
                console.log(plate);
            }

        }
    }
   
    render() {

        return (
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={[color.lightGreen, color.lightBlue]} style={styles.container}>
                {!this.state.successfull ?
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
                    ><Text style={styles.scanScreenMessage}>Please scan the DMV</Text></RNCamera>
                    :
                    <View style={styles.container}>
                        <Text style={styles.headerText}>Vehicle Details</Text>
                        <View style={styles.formContainer}>
                            <TextBox title="YEAR" underline={true} disable={true} defaultValue="2003" />
                            <TextBox title="MAKE" underline={true} disable={true} defaultValue="TOYOTA" />
                            <TextBox title="MODEL" underline={true} disable={true} defaultValue="AQUA" />
                            <TextBox title="ENGINE SIZE" underline={true} disable={true} defaultValue="2L" />
                        </View>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("OdometerRead")} style={styles.button}><GradientButton title="NEXT" /></TouchableOpacity>
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
        justifyContent: 'space-between',
        alignItems: 'center'

    },
    preview: {
        flex: 0.5,
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
        color: 'white'
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
    }
});