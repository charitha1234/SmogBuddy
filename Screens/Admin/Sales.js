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
import UsersList from '../../data/Users';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SearchBar } from 'react-native-elements';
import Modal from 'react-native-modal';
import firebase from "react-native-firebase";



function CheckList(props) {
    return (
        <View style={[styles.ProcessContainer,{backgroundColor:color.primaryWhite}]}>
            <View style={styles.statusContainer}>

                    <Text style={styles.nameText}>{props.name}</Text>
                    <Text style={styles.dateText}>{props.date}</Text>

            </View>
            <View style={styles.CostContainer}>
                <Text style={styles.Costlabel}>Total Cost</Text>
                <Text style={styles.CostText}>${props.cost}</Text>
            </View>
            <View style={styles.CostContainer}>
                <TouchableOpacity onPress={props.onPress}><Ionicons name="ios-download" size={30}/></TouchableOpacity>
            </View>
        </View>
    )
}
class Sales extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isDateVisible: false,
            startingDate: new Date(),
            endDate: new Date(),
            showEnding:false,
            showStarting:false,
            transactionList:null,
            loading:false,
        }
    }
    onChangeStart = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        this.setState({showStarting:(Platform.OS === 'ios')});
        this.setState({startingDate:currentDate});
    };
    onChangeEnd = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        this.setState({showEnding:(Platform.OS === 'ios')});
        this.setState({endDate:currentDate});
    };
    getTransactionList(){
        this.setState({loading:true})
        const user = firebase.auth().currentUser
        console.log("UID",user.uid)
        console.log("STARTING",this.state.startingDate.toLocaleDateString())
        console.log("ENDING",this.state.endDate.toLocaleDateString())
        fetch('https://smogbuddy.herokuapp.com/admin/sales?startAt='+this.state.startingDate.toLocaleDateString()+'&endAt='+this.state.endDate.toLocaleDateString())
        .then((res)=>res.json())
        .then((resJson)=>this.setState({transactionList:resJson,loading:false}))
        .catch((e)=>alert(e))
        this.setState({isDateVisible:false})


    }


    toggleModal = () => {
        this.setState({ isDateVisible: !this.state.isDateVisible });
    };
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.icon}><Ionicons name="ios-close" size={40} /></TouchableOpacity>
                    <Text style={styles.headerText}>SALES</Text>
                    <TouchableOpacity style={{ marginRight: 20, marginLeft: -40 }} onPress={() => this.setState({ isDateVisible: true })}><Ionicons name="ios-calendar" size={40} /></TouchableOpacity>
                </View>
                {this.state.loading?
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}} >
                <ActivityIndicator size={40} color={color.primaryBlack}/>
                </View>
                :
                <FlatList data={this.state.transactionList} renderItem={({item})=>(<CheckList onPress={()=>this.props.navigation.navigate("PdfViewer")}  name={item.user} date={item.timestamp} cost={item.totalCost}/>)}/>
                }
                
                <Modal useNativeDriver={true} isVisible={this.state.isDateVisible}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={styles.modalContainer}>
                            <View style={styles.modalheaderContainer}>
                                <TouchableOpacity onPress={() => this.setState({ isDateVisible: false })} style={styles.modalIcon}><Ionicons name="ios-close" size={40} /></TouchableOpacity>
                                <View style={{ flex: 2 }}><Text style={styles.modalHeader}>Choose starting and ending dates</Text></View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                                <TouchableOpacity onPress={()=>this.setState({showStarting:true})} style={styles.calenderIcon}><Ionicons name="ios-calendar" size={40} /></TouchableOpacity>
                                <View style={{ flex: 1, justifyContent: 'center' }}><Text style={styles.dateText}>{this.state.startingDate.toLocaleDateString()}</Text>
                                {this.state.showStarting && (
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        timeZoneOffsetInMinutes={0}
                                        value={this.state.startingDate}
                                        mode={'date'}
                                        is24Hour={true}
                                        display="default"
                                        onChange={this.onChangeStart}
                                    />
                                )}
                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                                <TouchableOpacity onPress={()=>this.setState({showEnding:true})} style={styles.calenderIcon}><Ionicons name="ios-calendar" size={40} /></TouchableOpacity>
                                <View style={{ flex: 1, justifyContent: 'center' }}><Text style={styles.dateText}>{this.state.endDate.toLocaleDateString()}</Text>
                                {this.state.showEnding && (
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        timeZoneOffsetInMinutes={0}
                                        value={this.state.endDate}
                                        mode={'date'}
                                        is24Hour={true}
                                        display="default"
                                        onChange={this.onChangeEnd}
                                    />
                                )}
                                </View>
                            </View>
                            <TouchableOpacity onPress={this.getTransactionList.bind(this)} style={styles.buttonContainer}><Text style={styles.buttonText}>SEARCH</Text></TouchableOpacity>
                        </View>
                    </View>
                </Modal>

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
        height: 100,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        backgroundColor: color.primaryBlue,
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
    nameText:{
        fontFamily: 'Montserrat-Regular',
        fontSize: 15,
        color: color.primaryBlack
    },
    icon: {
        marginRight: -20,
        marginLeft: 20
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
        marginBottom:10,
        height: 100,
        width: '100%',
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

