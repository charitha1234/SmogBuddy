import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    TouchableHighlight
} from "react-native";
import firebase from 'react-native-firebase';
import { color } from '../../Assets/color';
import Header from '../../Components/HeaderBarTechnician';
import StepIndicator from 'react-native-step-indicator';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SwipeListView } from 'react-native-swipe-list-view';
import ImagePicker from 'react-native-image-picker';
import Dialog from "react-native-dialog";
const uuidv1 = require('uuid/v1');
function Services(props) {
    return (
        <View
            style={styles.rowFront}
        >
            <View style={{ flex: 1, justifyContent: 'space-evenly', alignItems: 'center' }}>
                <Text style={styles.serviceName} >{props.serviceName}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.serviceName}>{props.yearRange}</Text>
                    {
                        props.failed ?
                            <Ionicons style={{ marginLeft: 20, marginRight: -20 }} name="ios-close" size={40} color={color.failedRed} />
                            :
                            props.passed ?
                                <Ionicons style={{ marginLeft: 20, marginRight: -20 }} name="ios-checkmark" size={40} color={color.primaryBlue} />
                                : null
                    }
                </View>

            </View>

        </View>
    );

}
class SmogTests extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vehicleAssigned: true,
            currentStage: 0,
            noOfServices: 0,
            serviceList: null,
            filePath: null,
            passedId: [],
            failedId: [],
            isFetching: false,
            dialogBoxvisible: false,
            failedParts: [],
            currentServiceId: "",
            failedPart: null,
            fuelCapRequested: false,
            fuelcapApporved: false,
            capLoading: false,
            Completed: false

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
    chooseFile = () => {
        var options = {
            title: 'Select Image',
            quality: 0.5,
            customButtons: [
            ],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.showImagePicker(options, response => {

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else {
                let source = response;
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                this.setState({ filePath: source });
                const user = firebase.auth().currentUser
                console.log(source.uri)
                this.setState({ isFetching: true })
                firebase
                    .storage()
                    .ref(this.formatDate() + '/' + user.uid + '/' + uuidv1() + '.jpeg')
                    .putFile(source.uri)
                    .then((res) => {
                        console.log("SENDING", res)
                        this.setState({ imageUrl: res.downloadURL })
                        this.sendpart("FAIL", this.state.currentServiceId, this.state.imageUrl)
                        this.setState({ failedPart: null })
                    })
                    .catch((e) => alert(e));
            }

        });
    };
    TakeCap = () => {
        var options = {
            title: 'Select Image',
            quality: 0.5,
            customButtons: [
            ],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.showImagePicker(options, response => {

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else {
                let source = response;
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                const user = firebase.auth().currentUser
                this.setState({ capLoading: true })
                firebase
                    .storage()
                    .ref(this.formatDate() + '/' + user.uid + '/' + uuidv1() + '.jpeg')
                    .putFile(source.uri)
                    .then((res) => {
                        console.log("SENDING", res)
                        this.sendCap(res.downloadURL)
                    })
                    .catch((e) => alert(e));
            }

        });
    };
    completeChecks() {

        const user = firebase.auth().currentUser
        fetch("https://smogbuddy.herokuapp.com/technician/complete/" + user.uid,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.statusCode == 500) {
                    console.log("ERR", resJson)
                    alert("Complete All Checks")
                }
                else {
                    console.log("RESPONSEE", resJson)
                }

            })
            .catch((e) => console.log(e))
    }
    getApiData() {
        this.setState({ capLoading: true })
        const user = firebase.auth().currentUser
        console.log("JHJH", this.state.failedPart)
        fetch("https://smogbuddy.herokuapp.com/technician/assign/service/" + user.uid)
            .then((res) => res.json())
            .then((resJson) => {
                console.log(resJson)
                this.setState({ capLoading: false, serviceList: resJson.services, isFetching: false, fuelcapApporved: resJson.isNeedToAddFuelCap == "YES", fuelCapRequested: resJson.isFuelCapRequested })
            })
            .catch((e) => console.log(e))
    }

    onRefresh() {
        this.setState({ isFetching: true }, function () { this.getApiData() })
    }
    sendCap(capUrl) {
        const user = firebase.auth().currentUser
        fetch('https://smogbuddy.herokuapp.com/technician/request/fuelcap', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userUid: user.uid,
                cost: 1000,
                imageUrl: capUrl
            }),
        })
            .then((res) => res.json())
            .then((resJson) => {
                console.log("RESSSS", resJson)
                this.setState({ capLoading: false })
                this.setState({ fuelCapRequested: true })

            }).catch((e) => {
                alert(e)
                this.setState({ capLoading: false })
            })
    }
    componentDidMount() {
        this.getApiData()
    }
    sendpart(status, serviceId, imageUrl) {
        const user = firebase.auth().currentUser
        fetch('https://smogbuddy.herokuapp.com/technician/result', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                serviceId: serviceId,
                userUid: user.uid,
                status: status,
                imageUrl: imageUrl,
                partName: this.state.failedPart
            }),
        })
            .then((res) => res.json())
            .then((resJson) => {
                this.onRefresh()
            })

            .catch((e) => alert(e))
    }
    Passed(rowMap, item) {
        this.setState({ isFetching: true })
        this.setState({ currentServiceId: item.serviceID })
        this.setState({ isFetching: false })
        this.sendpart("PASS", item.serviceID, null)
        rowMap[item.serviceID].closeRow();


    }
    Failed(rowMap, item) {

        this.setState({ dialogBoxvisible: true })
        this.setState({ currentServiceId: item.serviceID })
        rowMap[item.serviceID].closeRow();


    }
    onRowDidOpen(rowKey) {
        console.log('This row opened', rowKey);
    };


    render() {
        return (
            <View style={styles.container}>
                <Header title="SMOGBUDDY" navigation={this.props.navigation} />
                {this.state.vehicleAssigned ?
                    <>
                        <SwipeListView
                            useNativeDriver={true}
                            data={this.state.serviceList}
                            renderItem={(data, rowMap) => (
                                <Services serviceName={data.item.serviceName} passed={data.item.status == "PASSED"} failed={data.item.status == "FAILED"} rowMap={rowMap} yearRange={data.item.yearRange} />
                            )}
                            renderHiddenItem={(data, rowMap) => (

                                data.item.status == "PASSED" || data.item.status == "FAILED" ?
                                    null
                                    :
                                    <View style={styles.rowBack}>
                                        <TouchableOpacity
                                            style={styles.backBtnLeft}
                                            onPress={() => this.Passed(rowMap, data.item)}
                                        >
                                            <Text style={styles.backTextWhite}>PASSED</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.backBtnRight}
                                            onPress={() => this.Failed(rowMap, data.item)}
                                        >
                                            <Text style={styles.backTextWhite}>FAILED</Text>
                                        </TouchableOpacity>
                                    </View>
                            )}
                            leftOpenValue={100}
                            rightOpenValue={-100}
                            previewRowKey={'0'}
                            previewOpenValue={-40}
                            previewOpenDelay={3000}
                            keyExtractor={(item, index) => item.serviceID}
                            refreshing={this.state.isFetching}
                            onRefresh={() => this.onRefresh()}
                        />
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity disabled={this.state.fuelcapApporved} onPress={() => this.TakeCap()} style={styles.fuelCapContainer}>
                                {
                                    this.state.capLoading ?
                                        <ActivityIndicator size={30} color={color.primaryWhite} />
                                        :
                                        !this.state.fuelCapRequested ?
                                            <Text style={styles.fuelCapRequestText}>Send Fuel Cap Request</Text>
                                            :
                                            this.state.fuelcapApporved ?
                                                <Text style={styles.fuelCapRequestText}>Fuel Cap Request Approved</Text>

                                                :
                                                <Text style={styles.fuelCapRequestText}>Fuel Cap Request Sent</Text>

                                }
                            </TouchableOpacity>
                            <TouchableOpacity disabled={this.state.fuelcapApporved} onPress={this.completeChecks.bind(this)} style={[styles.fuelCapContainer, { backgroundColor: color.primaryBlue }]}>
                                {
                                    this.state.capLoading ?
                                        <ActivityIndicator size={30} color={color.primaryWhite} />
                                        :
                                        !this.state.Completed ?
                                            <Text style={styles.fuelCapRequestText}>COMPLETE</Text>
                                            :
                                            <Ionicons name="ios-check" size={40} color={color.primaryBlack} />
                                }
                            </TouchableOpacity>
                        </View>
                    </>
                    :
                    <View style={styles.content}>
                        <Text style={styles.messageText}>No Vehicle Has Assigned</Text>
                    </View>


                }
                <Dialog.Container visible={this.state.dialogBoxvisible}>
                    <Dialog.Title>Enter Part Name</Dialog.Title>
                    <Dialog.Description>
                        Please Enter Failed Part Name
                    </Dialog.Description>
                    <Dialog.Input label="Type Here" onChangeText={(text) => this.setState({ failedPart: text })} />
                    <Dialog.Button onPress={() => { this.setState({ dialogBoxvisible: false }) }} label="Cancel" />
                    <Dialog.Button disabled={!this.state.failedPart} onPress={() => {
                        this.setState({ dialogBoxvisible: false })
                        this.chooseFile()

                    }} label="Next" />
                </Dialog.Container>
            </View>
        );
    }
}
export default SmogTests;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        backgroundColor: color.primaryWhite

    },

    content: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center'


    },
    titleText: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 15,
        letterSpacing: 3,
        opacity: 0.6
    },
    messageText: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 15,
        letterSpacing: 2,
        opacity: 0.6
    },
    fuelCapContainer: {
        height: 50,
        width: '40%',
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: color.failedRed,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: .2,
        shadowRadius: 8.30,

        elevation: 5,
        borderRadius: 25
    },
    fuelCapRequestText: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 15,
        textAlign: 'center',
        letterSpacing: 2,
        color: color.primaryWhite
    },
    rowFront: {
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: color.primaryWhite,
        height: 100,
        zIndex: 1,
        width: '100%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: .2,
        shadowRadius: 8.30,

        elevation: 5,
        marginBottom: 10,


    },
    rowBack: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: color.primaryWhite,
        zIndex: 0,
        marginBottom: 10,



    },
    buttonContainer: {
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '100%',

    },

    backBtnLeft: {
        width: 100,
        height: '100%',
        backgroundColor: color.primaryGreen,
        justifyContent: 'center',
        alignItems: 'center'

    },
    backBtnRight: {
        width: 100,
        height: '100%',
        backgroundColor: color.failedRed,
        justifyContent: 'center',
        alignItems: 'center'
    },
    backTextWhite: {
        fontFamily: 'Montserrat-Bold',
        color: color.primaryWhite,
        fontSize: 15,
        letterSpacing: 2,
    },
    serviceName: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 15,
        letterSpacing: 2,
    }
});