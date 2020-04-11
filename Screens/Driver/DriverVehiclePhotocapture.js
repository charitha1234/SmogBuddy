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
import { SafeAreaView } from 'react-native-safe-area-context';
import GradientButton from '../../Components/CustomButton';
import Video from 'react-native-video';
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
      recording: false,
      recorded: false,
      processing: false,
      uploading: false,
      uploaded: false,
    }
  }
  async startRecording() {
    this.setState({ recording: true });
    // default to mp4 for android as codec is not set
    const { uri, codec = "mp4", } = await this.camera.recordAsync({ quality: RNCamera.Constants.VideoQuality['480p'] });
    this.setState({ vidURL: uri })

  }
  stopRecording() {
    this.camera.stopRecording();
    this.setState({ recorded: true });
    this.setState({ recording: false });

  }
  async upload() {

    this.setState({ uploading: true })

    firebase
      .storage()
      .ref('gvtlkm/' + uuidv1() + '.mp4')
      .putFile(this.state.vidURL)
      .then((res) => {

        this.props.navigation.navigate("Searching", { serviceList: this.props.route.params.serviceList })
        this.setState({ uploading: false });

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

    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={[color.lightGreen, color.lightBlue]} style={styles.container}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>TAKE A VIDEO OF</Text>
            <Text style={styles.headerText}>THE VEHICLE</Text>
          </View>
          {!this.state.recorded ? <RNCamera
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
            :
            <Video source={{ uri: this.state.vidURL }}
              ref={(ref) => {
                this.player = ref
              }}
              fullscreen={true}
              resizeMode="contain"
              onBuffer={this.onBuffer}
              onError={this.videoError}
              style={styles.preview} />
          }
          {this.state.recorded ? <TouchableOpacity onPress={this.upload.bind(this)} style={styles.uploadButton}>{this.state.uploading ? <ActivityIndicator size="large" color="black" /> : <Text style={styles.uploadText}>REQUEST DRIVER</Text>}</TouchableOpacity> : null}
        </LinearGradient>
      </SafeAreaView>
    );

  }
}

export default VideoCapture;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  preview: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
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
  uploadButton: {
    backgroundColor: 'white',
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  uploadText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
    letterSpacing: 2,
  }
});