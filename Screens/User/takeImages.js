import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
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
    render() {

        return (
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={[color.lightGreen, color.lightBlue]} style={styles.container}>
                {this.state.images.length > 10 || this.state.finished ?
                    <View style={styles.container}>
                        <View style={styles.headerTextContainer}>
                                    <TouchableOpacity style={{flex:0.5}} onPress={() => this.props.navigation.goBack()} ><Ionicons style={{ marginLeft: 10}} name="ios-arrow-back" size={40} /></TouchableOpacity>
                                    <View style={{flex:2}}><Text style={styles.headerText}>ODOMETER</Text></View>
                                    <View style={{flex:0.5}}/>
                                </View>
                        <View style={styles.formContainer}>
                            <TextBox  title="METER READING" underline={true} />
                            <TextBox title="FUEL" underline={true} />
                        </View>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("Searching", { serviceList: this.props.route.params.serviceList, images: this.state.images })} style={styles.button}><GradientButton title="NEXT" /></TouchableOpacity>
                    </View>
                    :
                    <>
                        {
                            this.state.images.length == 0 ?
                                <View style={styles.headerTextContainer}>
                                    <TouchableOpacity style={{flex:0.5}} onPress={() => this.props.navigation.goBack()} ><Ionicons style={{ marginLeft: 10}} name="ios-arrow-back" size={40} /></TouchableOpacity>
                                    <View style={{flex:2}}><Text style={styles.headerText}>TAKE A PICTURE OF ODOMETER</Text></View>
                                    <View style={{flex:0.5}}/>
                                </View>
                                :
                                <View style={styles.headerTextContainer}>
                                    <TouchableOpacity style={{flex:0.5}} onPress={() => this.props.navigation.goBack()} ><Ionicons style={{ marginLeft: 10}} name="ios-arrow-back" size={40} /></TouchableOpacity>
                                    <View style={{flex:2}}><Text style={styles.headerText}>TAKE PICTURES OF CAR</Text></View>
                                    <View style={{flex:0.5}}/>
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
        justifyContent: 'space-between',
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
        textAlign: 'center',
        fontFamily: 'Montserrat-Bold',
        fontSize: 20,
        letterSpacing: 2,

    },
    headerTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 100,
        width: '100%',
        justifyContent: 'space-between',
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