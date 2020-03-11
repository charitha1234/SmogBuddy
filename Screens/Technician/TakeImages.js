import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import { RNCamera } from 'react-native-camera';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { color } from '../../Assets/color';
import firebase from 'react-native-firebase';

const uuidv1 = require('uuid/v1');

class TakeImages extends Component {
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
    handleFinish(){
        this.props.navigation.goBack();
    }
    render() {

        return (
            <View style={styles.container}>
                        <View style={styles.headerTextContainer}>
                            <Text style={styles.headerText}>TAKE A PICTURES OF THE CONDITION</Text>
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
                        ><TouchableOpacity disabled={this.state.loading} onPress={this.takePicture.bind(this)}>
                                {this.state.loading ?
                                    <ActivityIndicator size={80} color={color.primaryWhite} style={{ margin: 30 }} />
                                    :
                                    <Ionicons name="ios-radio-button-off" color={color.primaryWhite} size={80} style={{ margin: 30 }} />
                                }
                            </TouchableOpacity></RNCamera>
                        {
                            this.state.images.length > 0 ?
                                <TouchableOpacity onPress={this.handleFinish.bind(this)} style={styles.uploadButton}>{this.state.uploading ? <ActivityIndicator size="large" color="black" /> : <Text style={styles.uploadText}>NEXT</Text>}</TouchableOpacity>
                                :
                                null
                        }
            </View>
        );
    }

}

export default TakeImages;

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
        textAlign:'center',

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