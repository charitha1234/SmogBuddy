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
            uId: "charitha",
            imgPath: "",
            imgURL: "",
            loading: false,
        }
    }
    takePicture = async () => {
        if (this.camera) {
            const options = { quality: 0.5, base64: true };
            const data = await this.camera.takePictureAsync(options);
            this.setState({ loading: true });
            this.setState({ picture: data.uri });
            firebase
                .storage()
                .ref(this.state.uId + '/' + uuidv1() + '.jpeg')
                .putFile(data.uri)
                .then((res) => {
                    this.setState({ imgURL: res.downloadURL });
                    this.setState({ imgPath: res.ref });
                    this.setState({ loading: false });
                })
                .catch((e) => alert(e));
        }
    }
    render() {

        return (
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={[color.lightGreen, color.lightBlue]} style={styles.container}>
                {
                    !this.state.picture ?
                        <>
                            <View style={styles.headerTextContainer}>
                                <Text style={styles.headerText}>TAKE A PICTURE OF</Text>
                                <Text style={styles.headerText}>ODOMETER</Text>
                            </View>
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
                            ><TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
                                    <Text style={{ fontSize: 14 }}> SNAP </Text>
                                </TouchableOpacity></RNCamera>
                        </>
                        : this.state.loading ?
                            <View style={styles.container}>
                                <ActivityIndicator size="large" color="#0000ff" />
                            </View>
                            :
                            <View style={styles.container}>
                                <Text style={[styles.headerText,{fontSize:30}]}>ODOMETER</Text>
                                <View style={styles.formContainer}>
                                    <TextBox title="METER READING" underline={true}/>
                                    <TextBox title="FUEL" underline={true}/>
                                </View>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("VideoCapture")} style={styles.button}><GradientButton title="NEXT" /></TouchableOpacity>
                            </View>

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
        justifyContent: 'center'
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
    headerText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 20,
        letterSpacing: 2,

    },
    headerTextContainer: {
        alignItems: 'center',
        flex: 0.25,
        margin: 30,

    },
    formContainer: {
        marginTop:30,
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
    subText:{
        marginVertical:30,
        fontFamily: 'Montserrat-Bold',
        fontSize: 15,
        letterSpacing: 2,
        opacity:0.6,

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