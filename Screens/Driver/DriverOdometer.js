import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import { RNCamera } from 'react-native-camera';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TextBox from '../../Components/textBox';
import { color } from '../../Assets/color';
import GradientButton from '../../Components/CustomButton';
import firebase from 'react-native-firebase';

const uuidv1 = require('uuid/v1');

class OdometerRead extends Component {
    constructor(props) {
        super(props);
        this.state = {
            picture: false,
            uid: null,
            images: [],
            loading: false,
            finished: false,
            odometerValue: null,
            fuelValue: null
        }
    }
    formatDate() {
        let d = new Date(),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) {
            month = '0' + month;
        }
        if (day.length < 2) {
            day = '0' + day;
        }

        return [year, month, day].join('-');
    }
    takePicture = async () => {
        const user = firebase.auth().currentUser;
        this.setState({ uid: user.uid });
        if (this.camera) {
            const options = { quality: 0.5, base64: true };
            const data = await this.camera.takePictureAsync(options);
            this.setState({ loading: true });
            this.setState({ picture: data.uri });
            firebase
                .storage()
                .ref(this.formatDate() + '/' + user.uid + '/' + uuidv1() + '.jpeg')
                .putFile(data.uri)
                .then((res) => {
                    if (this.state.images.length == 0) this.state.images.push({ imageUrl: res.downloadURL, imagePath: res.ref, isOdometer: true })
                    else this.state.images.push({ imageUrl: res.downloadURL, imagePath: res.ref, isOdometer: false })
                    this.setState({ loading: false });
                })
                .catch((e) => alert(e));
        }
    }
    odometerUploded = async () => {
        try {
          await AsyncStorage.setItem('ODOMETER_UPLOADED','UPLOADED')
        } catch (e) {
          alert(e)
        }
      }

    sendMeterValues() {
        this.setState({ loading: true });
        fetch("https://smogbuddy.herokuapp.com/user/odometer",
            {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userUid: this.props.route.params.userId,
                    role: "DRIVER",
                    status: this.props.route.params.case,
                    odoMeterRecord: this.state.odometerValue,
                    fuelLevel: this.state.fuelValue



                }),
            })
            .then((res) => res.json())
            .then((resJson) => {
                this.odometerUploded()
                this.setState({loading:false})
                this.props.navigation.goBack()
            })
            .catch((e) => console.error(e))
    }
    render() {

        return (
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={[color.lightGreen, color.lightBlue]} style={styles.container}>
                {this.state.images.length > 10 || this.state.finished ?
                    <View style={styles.container}>
                        <Text style={[styles.headerText, { fontSize: 30 }]}>ODOMETER</Text>
                        <View style={styles.formContainer}>
                            {
                                this.state.loading ?
                                    <ActivityIndicator size={50} color={color.primaryBlack} />
                                    :
                                    <>
                                        <TextBox title="METER READING" underline={true} onChangeText={text => this.setState({ odometerValue: text })} />
                                        <TextBox title="FUEL" underline={true} onChangeText={text => this.setState({ fuelValue: text })} />
                                    </>
                            }
                        </View>
                        <TouchableOpacity onPress={() => this.sendMeterValues()} style={styles.button}><GradientButton title="NEXT" /></TouchableOpacity>
                    </View>
                    :
                    <>
                        {
                            this.state.images.length == 0 ?
                                <View style={styles.headerTextContainer}>
                                    <Text style={styles.headerText}>TAKE A PICTURE OF</Text>
                                    <Text style={styles.headerText}>ODOMETER</Text>
                                </View>
                                :
                                <View style={styles.headerTextContainer}>
                                    <Text style={styles.headerText}>TAKE PICTURES OF</Text>
                                    <Text style={styles.headerText}>CAR</Text>
                                </View>
                        }
                        <RNCamera
                            ref={ref => {
                                this.camera = ref;
                            }}
                            defaultTouchToFocus
                            mirrorImage={false}
                            onFocusChanged={() => { }}
                            onZoomChanged={() => { }}
                            permissionDialogTitle={'Permission to use camera'}
                            permissionDialogMessage={'We need your permission to use your camera phone'}
                            style={styles.preview}
                        ><TouchableOpacity disabled={this.state.loading} onPress={this.takePicture.bind(this)}>
                                {this.state.loading ?
                                    <ActivityIndicator size={80} color={color.primaryWhite} style={{ margin: 30 }} />
                                    :
                                    <Ionicons name="ios-radio-button-off" color={color.primaryWhite} size={80} style={{ margin: 30 }} />
                                }
                            </TouchableOpacity></RNCamera>
                        {
                            this.state.images.length > 0 ?
                                <TouchableOpacity onPress={() => { this.setState({ finished: true }) }} style={styles.uploadButton}>{this.state.uploading ? <ActivityIndicator size="large" color="black" /> : <Text style={styles.uploadText}>NEXT</Text>}</TouchableOpacity>
                                :
                                null
                        }
                    </>

                }
            </LinearGradient>
        );
    }

}

export default OdometerRead;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    preview: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    capture: {
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },
    uploadButton: {
        backgroundColor: 'white',
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 20,
        letterSpacing: 2,

    },
    headerTextContainer: {
        alignItems: 'center',
        height: 100,
        width: '100%',
        justifyContent: 'center',
        backgroundColor: color.primaryWhite


    },
    formContainer: {
        marginTop: 30,
        height: 200,
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
    subText: {
        marginVertical: 30,
        fontFamily: 'Montserrat-Bold',
        fontSize: 15,
        letterSpacing: 2,
        opacity: 0.6,

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