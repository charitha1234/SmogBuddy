import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
} from "react-native";
import { color } from '../../Assets/color';
import DateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Modal from 'react-native-modal';
import firebase from "react-native-firebase";
import Header from '../../Components/TwoButtonHeader'
import BaseUrl from '../../Config'


function CheckList(props) {
    return (
        <TouchableOpacity onPress={props.onPress} style={[styles.ProcessContainer, { backgroundColor: color.primaryWhite }]}>
            <View style={styles.statusContainer}>
                <Text style={styles.nameText}>{props.name}</Text>
                <Text style={styles.dateText}>{props.date}</Text>
            </View>
            <View style={styles.CostContainer}>
                <Text style={styles.Costlabel}>Total Cost</Text>
                <Text style={styles.CostText}>${props.cost}</Text>
            </View>
            <View style={styles.CostContainer}>
                <View><Ionicons name="ios-download" size={30} /></View>
            </View>
        </TouchableOpacity>
    )
}
class Sales extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isDateVisible: true,
            startingDate: null,
            endDate: null,
            showEnding: false,
            showStarting: false,
            transactionList: null,
            loading: false,
            date: new Date()
        }
    }
    onChangeStart = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        this.setState({ showStarting: (Platform.OS === 'ios') });
        this.setState({ startingDate: currentDate });
    };
    onChangeEnd = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        this.setState({ showEnding: (Platform.OS === 'ios') });
        this.setState({ endDate: currentDate });
    };

    closeStartTimePicker = () => {
        this.setState({ showStarting: false, startingDate: this.state.startingDate || new Date() });
    }

    closeEndTimePicker = () => {
        this.setState({ showEnding: false, endDate: this.state.endDate || new Date() });
    }

    getTransactionList() {
        this.setState({ loading: true })
        const user = firebase.auth().currentUser
        fetch(BaseUrl.Url + '/admin/sales?startAt=' + this.state.startingDate.toLocaleDateString() + '&endAt=' + this.state.endDate.toLocaleDateString())
            .then((res) => res.json())
            .then((resJson) => {
                this.setState({ transactionList: resJson, loading: false })})
            .catch((e) => alert(e))
        this.setState({ isDateVisible: false })
    }


    toggleModal = () => {
        this.setState({ isDateVisible: !this.state.isDateVisible });
    };
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Header title="SALES" navigation={this.props.navigation} onPress={() => this.setState({ isDateVisible: true })} icon="ios-calendar" />
                {this.state.loading ?
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                        <ActivityIndicator size={40} color={color.primaryBlack} />
                    </View>
                    :
                    <FlatList
                        data={this.state.transactionList ? this.state.transactionList : []}
                        renderItem={({ item }) => (<CheckList onPress={() => this.props.navigation.navigate("PdfViewer", { reportUrl: item.reportUrl })} name={item.user} date={item.timestamp} cost={item.totalCost} />)} />
                }

                {this.state.showStarting && (
                    <View>
                        <DateTimePicker
                            testID="dateTimePicker"
                            timeZoneOffsetInMinutes={0}
                            value={this.state.startingDate ? this.state.startingDate : this.state.date}
                            mode={'date'}
                            is24Hour={true}
                            display="default"
                            onChange={this.onChangeStart}
                        />
                        <TouchableOpacity onPress={this.closeStartTimePicker} style={styles.buttonContainer}><Text style={styles.buttonText}>Set</Text></TouchableOpacity>
                    </View>
                )}

                {this.state.showEnding && (
                    <View>
                        <DateTimePicker
                            testID="dateTimePicker"
                            timeZoneOffsetInMinutes={0}
                            value={this.state.endDate ? this.state.endDate : this.state.date}
                            mode={'date'}
                            is24Hour={true}
                            display="default"
                            onChange={this.onChangeEnd}
                        />
                        <TouchableOpacity onPress={this.closeEndTimePicker} style={styles.buttonContainer}><Text style={styles.buttonText}>Set</Text></TouchableOpacity>
                    </View>
                )}

                {
                    !this.state.showEnding && !this.state.showStarting && (
                        <Modal useNativeDriver={true} isVisible={this.state.isDateVisible} onBackdropPress={() => this.setState({ isDateVisible: false })}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ backgroundColor: color.primaryWhite, alignSelf: 'center', height: '50%', width: '90%', borderRadius: 20 }}>
                                    <TouchableOpacity onPress={() => this.setState({ showStarting: true })} style={{ flex: 1, margin: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Text style={styles.settingText}>Select Starting Date:</Text>
                                        {this.state.startingDate ?
                                            <Text>{this.state.startingDate.toLocaleDateString()}</Text>
                                            :
                                            <Ionicons name='ios-calendar' size={30} />}
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => this.setState({ showEnding: true })} style={{ flex: 1, margin: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Text style={styles.settingText}>Select Ending Date:</Text>
                                        {this.state.endDate ?
                                            <Text>{this.state.endDate.toLocaleDateString()}</Text>
                                            :
                                            <Ionicons name='ios-calendar' size={30} />}
                                    </TouchableOpacity>


                                    <TouchableOpacity onPress={this.getTransactionList.bind(this)} disabled={!(this.state.startingDate && this.state.endDate)} style={styles.buttonContainer}><Text style={styles.buttonText}>SEARCH</Text></TouchableOpacity>

                                </View>
                            </View>
                        </Modal>
                    )
                }


            </SafeAreaView>
        );
    }
}
export default Sales;

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    headerContainer: {
        height: 66,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: color.primaryWhite,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: .2,
        shadowRadius: 8.30,
        elevation: 3,
    },
    modalheaderContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    modalHeader: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 15,
        textAlign: 'center',
        letterSpacing: 2,
    },
    buttonContainer: {
        height: 40,
        width: 200,
        margin: 20,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        backgroundColor: color.secondryBlue,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: .2,
        shadowRadius: 8.30,
        elevation: 5,
    },
    headerText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 25,
        letterSpacing: 2,
    },
    calenderIcon: {
        flex: 1,
        marginLeft: 20,
        justifyContent: 'center'
    },
    buttonText: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 20,
        letterSpacing: 2,
        color: color.primaryWhite
    },
    dateText: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 15,
        letterSpacing: 2,
        color: color.primaryBlack
    },
    nameText: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 15,
        color: color.primaryBlack
    },
    icon: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0.5,

    },
    modalIcon: {
        flex: 0.5,
        marginRight: -20,
        marginLeft: 20
    },
    modalContainer: {
        backgroundColor: color.primaryWhite,
        alignItems: 'center',
        height: 300,
        justifyContent: 'space-between',
        width: '90%'
    },
    ProcessContainer: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        height: 100,
        marginHorizontal:5,
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: .2,
        shadowRadius: 8.30,
        borderRadius: 30,
        elevation: 3,
    },
    driverNameText: {
        fontFamily: 'Montserrat-Light',
        fontSize: 15,

    },
    dateText: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 20,
        letterSpacing: 2,
    },
    statusContainer: {
        flex: 2,
        justifyContent: 'space-evenly',
        marginLeft: 10
    },
    CostContainer: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    CostText: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 20,
    },
    Costlabel: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 15,
    },

});

