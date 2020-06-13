import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { RNCamera } from 'react-native-camera';
import TextBox from '../../Components/textBox';
import { color } from '../../Assets/color';
import GradientButton from '../../Components/CustomButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import firebase from 'react-native-firebase';
import BaseUrl from '../../Config'
import Header from '../../Components/NormalHeader'
class ScanDMV extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uId: firebase.auth().currentUser.uid,
            loading: false,
            before80: false,
            successfull: false,
            flashMode: RNCamera.Constants.FlashMode.auto,
            year: null,
            make: null,
            model: null,
            engine: null,
            error: null,
            vin:null,
            plate:null
        };

    }

    postVehicalInfo() {

        if (this.state.year && this.state.make && this.state.model && this.state.engine) {
            if (/^[0-9]{4}$/.test(this.state.year)) {
                this.setState({loading:true})
                    fetch(BaseUrl.Url + '/vehicle/' + this.state.uId, {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            plateNumber: " ",
                            enginCapacity: this.state.engine,
                            make: this.state.make,
                            manufacturer: " ",
                            model: this.state.model,
                            year: this.state.year,
                            country: " ",
                            vin: " "
                        }),
                    }).then((resJson)=>{
                        if (resJson.status == 200) {
                            this.props.navigation.navigate("OdometerRead", { serviceList: this.props.route.params.serviceList })
                            this.setState({loading:false})
                        }
                        else {
                            this.setState({loading:false})
                            alert("Something has wrong")
                        }
                    })
                    .catch(()=>{
                        this.setState({loading:false})
                        alert("Something has wrong")})

            }
            else alert("Year is invalid")
        }
        else {
            this.setState({ error: "Please fill all requires" })
        }
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
                this.setState({ loading: false })
                let vin = scanResult.data.substr(2, 10);
                let plate = scanResult.data.substr(20, 7);
                this.setState({vin:vin,plate:plate})
            }
            else {
                let vin = scanResult.data.substr(2, 17);
                let plate = scanResult.data.substr(20, 7);
                this.setState({vin:vin,plate:plate})
                fetch(BaseUrl.Url + '/vehicle/' + this.state.uId + '?plateNumber=' + plate + '&vin=' + vin)
                    .then((response) => response.json())
                    .then((responseJson) => {
                        this.setState({
                            loading: false,
                            year: responseJson.year.toString(),
                            make: responseJson.make,
                            model: responseJson.model,
                            engine: responseJson.enginCapacity,



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
            <SafeAreaView style={{ flex: 1 }}>
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={[color.lightGreen, color.lightBlue]} style={styles.container}>
                    {!this.state.successfull ?
                        <>
                            <Header navigation={this.props.navigation} leftIcon="ios-arrow-back" title="SCAN DMV" />
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
                        <>
                            <Header title="VEHICLE DETAILS" navigation={this.props.navigation} leftIcon="ios-arrow-back" />
                            <ScrollView style={{ flex: 1, zIndex: 0, width: '100%', marginTop: 10 }} contentContainerStyle={{ alignItems: 'center' }} >

                                {!this.state.loading ?
                                    <>
                                        {
                                            this.state.before80 ? <Text style={styles.before80Message}>Your vehicle is older than 1980 please fill below form</Text> : null
                                        }

                                        <View style={styles.formContainer}>
                                            <TextBox title="YEAR" keyboardType="number-pad" underline={true} disabled={!this.state.before80 ? true : false} error={this.state.error} value={this.state.year} onChangeText={(text) => {
                                                this.setState({ year: text, error: null })
                                            }} />
                                            <TextBox title="MAKE" underline={true} disabled={!this.state.before80 ? true : false} error={this.state.error} value={this.state.make} onChangeText={(text) => {
                                                this.setState({ make: text, error: null })
                                            }} />
                                            <TextBox title="MODEL" underline={true} disabled={!this.state.before80 ? true : false} error={this.state.error} value={this.state.model} onChangeText={(text) => {
                                                this.setState({ model: text, error: null })
                                            }} />
                                            <TextBox title="ENGINE SIZE" underline={true} disabled={!this.state.before80 ? true : false} error={this.state.error} value={this.state.engine} onChangeText={(text) => {
                                                this.setState({ engine: text, error: null })
                                            }} />
                                        </View>
                                    </>
                                    :
                                    <View style={styles.formContainer}>
                                        <ActivityIndicator size={40} color="black" />
                                    </View>
                                }
                                <TouchableOpacity onPress={this.postVehicalInfo.bind(this)} style={styles.button}><GradientButton title="NEXT" /></TouchableOpacity>
                            </ScrollView>
                        </>
                    }

                </LinearGradient>
            </SafeAreaView>
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
        height: '60%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    formContainer: {
        height: 400,
        width: '90%',
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
    before80Message: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 20,
        textAlign: 'center',
        letterSpacing: 2,
        color: color.primaryBlack,
        marginBottom: 10
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
    headerTextContainer: {
        height: 100,
        zIndex: 1,
        backgroundColor: color.primaryWhite,
        width: '100%',
        marginBottom: 10,
        flexDirection: 'row',

        justifyContent: 'space-evenly',
        alignItems: 'center'

    }
});