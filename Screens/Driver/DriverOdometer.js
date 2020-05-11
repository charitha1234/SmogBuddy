import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    ImageBackground,
    ScrollView,
    Dimensions
} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import { RNCamera } from 'react-native-camera';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import TextBox from '../../Components/textBox';
import { color } from '../../Assets/color';
import GradientButton from '../../Components/CustomButton';
import firebase from 'react-native-firebase';
import BaseUrl from '../../Config'

const uuidv1 = require('uuid/v1');

class OdometerRead extends Component {
    constructor(props) {
        super(props);
        this.state = {
            picture: null,
            uid: null,
            images: [],
            loading: false,
            finished: false,
            uploaded: false,
            odometerVal: null,
            error: null
        }
    }
    async setUploaded() {
        try {
            await AsyncStorage.setItem('ODOMETER_UPLOADED', 'UPLOADED')
        } catch (e) {
            alert(e)
        }
    }
    componentDidUpdate(){
        if(this.state.finished){
            fetch(BaseUrl.Url + '/driver/images/images', {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({

                    userUid: this.props.route.params.userId,
                    images: this.state.images


                }),
            }).then((res) => {
                this.setUploaded()
                console.log("responseeeeeee", res)})
                .catch((e) => console.log("ERRR", e))
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

    uploadImage = () => {
        const user = firebase.auth().currentUser;
        this.setState({ uid: user.uid });
        this.setState({ loading: true })
        firebase
            .storage()
            .ref(this.formatDate() + '/' + user.uid + '/' + uuidv1() + '.jpeg')
            .putFile(this.state.picture)
            .then((res) => {
                if (this.state.images.length == 0) this.state.images.push({ imageUrl: res.downloadURL,isOdometer: true,status:this.props.route.params.case })
                else this.state.images.push({ imageUrl: res.downloadURL,isOdometer: false ,status:this.props.route.params.case})
                this.setState({  loading: false, picture: null });
                console.log("CASE",this.props.route.params.case)
                if(this.props.route.params.case!='PICKED_UP'){
                    console.log("FINISHED")
                    this.setState({finished:true})}
                console.log("IMAGE ARRAY",this.state.images)
            })
            .catch((e) => {
                this.setState({ loading: false, picture: null });
                alert(e)
            });
    }
    putOdometerRead() {
        const user = firebase.auth().currentUser;
        if (this.state.odometerVal) {
            if (/^[0-9]+$/.test(this.state.odometerVal)) {
                this.setState({ loading: true })
                fetch(BaseUrl.Url + '/user/odometer', {
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userUid: user.uid,
                        role: "DRIVER",
                        status: this.props.route.params.case,
                        odoMeterRecord: this.state.odometerVal,
                        fuelLevel: " "
                    }),
                })
                    .then((resJson) => {
                        if (resJson.status == 200) {
                            this.props.navigation.goBack()
                            this.setState({ loading: false })
                        }
                        else {
                            this.setState({ loading: false })
                            alert("Something has wrong")
                        }

                    })
                    .catch(() => {
                        alert("Somethins has wrong")
                        this.setState({ loading: false })
                    })
            }
            else {
                alert("Please enter number")
            }

        }
        else this.setState({ error: "Please fill odometer value" })

    }


    takePicture = async () => {

        if (this.camera) {
            const options = { quality: 0.5, base64: true };
            const data = await this.camera.takePictureAsync(options);
            this.setState({ picture: data.uri });
        }
    }
    render() {

        return (
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={[color.lightGreen, color.lightBlue]} style={styles.container}>
                {this.state.images.length > 10 || this.state.finished ?
                    <View style={styles.container}>
                        <View style={styles.headerTextContainer}>
                            <TouchableOpacity style={{ flex: 0.5 }} onPress={() => this.props.navigation.goBack()} ><Ionicons style={{ marginLeft: 10 }} name="ios-arrow-back" size={40} /></TouchableOpacity>
                            <View style={{ flex: 2 }}><Text style={styles.headerText}>ODOMETER</Text></View>
                            <View style={{ flex: 0.5 }} />
                        </View>
                        <KeyboardAwareScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} contentContainerStyle={{ height: 400, justifyContent: 'space-between', alignItems: 'center' }}>
                            <View style={styles.formContainer}>
                            <TextBox title="METER READING" keyboardType="number-pad" value={this.state.odometerVal} error={this.state.error} underline={true} onChangeText={(text) => this.setState({ odometerVal: text, error: null })} />
                            </View>
                            <TouchableOpacity onPress={this.putOdometerRead.bind(this)} style={styles.button}><GradientButton title="NEXT" /></TouchableOpacity>
                        </KeyboardAwareScrollView>
                    </View>
                    :
                    !this.state.picture ?
                        <>
                            {
                                this.state.images.length == 0 ?
                                    <View style={styles.headerTextContainer}>
                                        <TouchableOpacity style={{ flex: 0.5 }} onPress={() => this.props.navigation.goBack()} ><Ionicons style={{ marginLeft: 10 }} name="ios-arrow-back" size={40} /></TouchableOpacity>
                                        <View style={{ flex: 2 }}><Text style={styles.headerText}>TAKE A PICTURE OF ODOMETER</Text></View>
                                        <View style={{ flex: 0.5 }} />
                                    </View>
                                    :
                                    <View style={styles.headerTextContainer}>
                                        <TouchableOpacity style={{ flex: 0.5 }} onPress={() => this.props.navigation.goBack()} ><Ionicons style={{ marginLeft: 10 }} name="ios-arrow-back" size={40} /></TouchableOpacity>
                                        <View style={{ flex: 2 }}><Text style={styles.headerText}>TAKE PICTURES OF CAR</Text></View>
                                        <View style={{ flex: 0.5 }} />
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
                            >

                                <TouchableOpacity disabled={this.state.loading} onPress={this.takePicture.bind(this)}>
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
                        :
                        <ImageBackground source={{ uri: this.state.picture }} style={styles.preview}>
                            <View style={styles.retakeButton}>
                                {
                                    this.state.loading ?
                                        <TouchableOpacity style={styles.uploadButton}><ActivityIndicator size="large" color="black" /></TouchableOpacity>
                                        :
                                        <>
                                            <TouchableOpacity onPress={() => this.setState({ picture: null })} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><Text style={styles.uploadText}>RETAKE</Text></TouchableOpacity>
                                            <TouchableOpacity onPress={this.uploadImage.bind(this)} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><Text style={styles.uploadText}>UPLOAD</Text></TouchableOpacity>
                                        </>
                                }


                            </View>
                        </ImageBackground>

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
    uploadText: {
        textAlign: 'center',
        fontFamily: 'Montserrat-Regular',
        fontSize: 20,
        letterSpacing: 2,
    },
    retakeButton: {
        backgroundColor: 'white',
        flexDirection: 'row',
        width: '100%',
        height: 50,
    },
    headerText: {
        textAlign: 'center',
        fontFamily: 'Montserrat-Bold',
        fontSize: 20,
        letterSpacing: 2,

    },
    headerTextContainer: {
        flexDirection: 'row',
        zIndex:10,
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