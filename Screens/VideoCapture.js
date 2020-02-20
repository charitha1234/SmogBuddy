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
import firebase from 'react-native-firebase';
const uuidv1 = require('uuid/v1');
class VideoCapture extends Component {
    constructor(props) {
        super(props);
        this.state = {
            picture: "",
            uId: "charitha",
            vidPath: "",
            vidURL: "",
            loading: false,
            recording:false,
            processing:false,
        }
    }
    async startRecording() {
        this.setState({ recording: true });
        // default to mp4 for android as codec is not set
        const { uri, codec = "mp4" } = await this.camera.recordAsync();
        this.setState({vidURI:uri})
        console.log(this.state.vidURL)
    }
    stopRecording() {
        this.camera.stopRecording();
        this.setState({recording:false});
        
    }
    async upload(){
        console.log("Uploading")
        firebase
                .storage()
                .ref('gvtlkm/' + uuidv1() + '.mp4')
                .putFile(this.state.vidURI)
                .then((res) => {
                    console.log("finished")
                    console.log(res);
                })
                .catch((e) => alert(e));

    }
    render() {
        let button = (
            <TouchableOpacity
              onPress={this.startRecording.bind(this)}
              style={styles.capture}
            >
              <Text style={{ fontSize: 14 }}> RECORD </Text>
            </TouchableOpacity>
          );
      
          if (this.state.recording) {
            button = (
              <TouchableOpacity
                onPress={this.stopRecording.bind(this)}
                style={styles.capture}
              >
                <Text style={{ fontSize: 14 }}> STOP </Text>
              </TouchableOpacity>
            );
          }
      
          if (this.state.processing) {
            button = (
              <View style={styles.capture}>
                <ActivityIndicator animating size={18} />
              </View>
            );
          }
        return (
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={[color.lightGreen, color.lightBlue]} style={styles.container}>
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerText}>TAKE A VIDEO OF</Text>
                    <Text style={styles.headerText}>THE VEHICLE</Text>
                </View>
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    defaultVideoQuality={RNCamera.Constants.VideoQuality['4:3']}
                    defaultTouchToFocus
                    mirrorImage={false}
                    onFocusChanged={() => { }}
                    onZoomChanged={() => { }}
                    permissionDialogTitle={'Permission to use camera'}
                    permissionDialogMessage={'We need your permission to use your camera phone'}
                    style={styles.preview}
                >{button}</RNCamera>
                <Button onPress={this.upload.bind(this)} title="UPLOAD"/>
            </LinearGradient>
        );

    }
}

export default VideoCapture;

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
        marginVertical: 30,

    },
});