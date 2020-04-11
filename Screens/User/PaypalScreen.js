import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
} from "react-native";
import PayLogo from '../../Assets/payLogo';
import { color } from '../../Assets/color'
import PaypalLogo from '../../Assets/paypalLogo';
import { WebView } from 'react-native-webview';
import VerifiedsSvg from '../../Assets/verified';
import { SafeAreaView } from 'react-native-safe-area-context';
import firebase from 'react-native-firebase';
class PaypalScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            status: 'pending',
            amount: null,
            uid: null
        }
    }
    componentDidMount() {
        const user = firebase.auth().currentUser

        fetch('https://smogbuddy.herokuapp.com/user/amount/' + user.uid)
            .then((res) => res.json())
            .then((resJson) => {

                this.setState({ uid: user.uid, amount: resJson.amount })

            })
            .catch((e) => { })
    }
    handlepayment(data) {
        console.log("DATA", data)

        if (data.title == "SUCCESS" || data.title == "FAILED") {
            this.setState({
                modalVisible: false,
                status: data.title
            })
        }
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <Modal visible={this.state.modalVisible}
                        onRequestClose={() => { this.setState({ modalVisible: false }) }}>
                        {
                            this.state.amount && this.state.uid ?
                                <WebView
                                    source={{ uri: 'https://smogbuddy.herokuapp.com/admin/pay?amount=' + this.state.amount.toString() + '&uid=' + this.state.uid.toString() }}
                                    onNavigationStateChange={(data) => this.handlepayment(data)}
                                /> : null
                        }
                    </Modal>
                    {
                        this.state.status == "pending" ?
                            <>
                                <View style={styles.headerContainer}><Text style={styles.headerText}>Make The Payment</Text></View>
                                <View style={styles.descriptionContainer}>
                                    <Text style={styles.descriptionText}>The Process Has Finished Successfully. Make Your Payment Using Paypal</Text>
                                </View>
                                <Text style={styles.descriptionText}>Your Total Cost Is : ${this.state.amount}</Text>
                                <View style={styles.logoContainer}><PayLogo /></View>
                                <TouchableOpacity style={styles.PayButton} onPress={() => this.setState({ modalVisible: true })}><PaypalLogo /></TouchableOpacity>
                            </>
                            :
                            this.state.status == "SUCCESS" ?
                                <View style={{ flex: 1, alignItems: 'center' }}>
                                    <View style={{ height: 200, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={styles.headerText}>Payment Has Successful</Text>
                                        <Text style={styles.headerText}>Thank You</Text>
                                    </View>
                                    <VerifiedsSvg />
                                    <TouchableOpacity style={styles.PayButton} onPress={() => this.props.navigation.navigate("Home")}><Text style={[styles.headerText, { fontSize: 15 }]}>GO BACK TO HOME</Text></TouchableOpacity>
                                </View>
                                :
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={styles.headerText}>Payment Has Failed</Text>
                                </View>
                    }
                </View>
            </SafeAreaView>
        );
    }
}
export default PaypalScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: color.primaryWhite
    },
    headerContainer: {
        height: 100,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 25,
        textAlign: 'center',
        letterSpacing: 2,

    },
    descriptionContainer: {
        height: 100,
        width: '80%',
        alignItems: 'center',
        opacity: 0.6
    },
    descriptionText: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 15,
        textAlign: 'center',
    },
    logoContainer: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: "center",
    },
    PayButton: {
        position: 'absolute',
        bottom: 50,
        width: 250,
        height: 100,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: color.primaryWhite,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: .2,
        shadowRadius: 8.30,
        borderRadius: 50,

        elevation: 5,
    }
});