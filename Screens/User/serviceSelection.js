import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    Alert

} from "react-native";
import CheckBox from 'react-native-check-box'
import LinearGradient from 'react-native-linear-gradient';
import { color } from '../../Assets/color';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GradientButton from '../../Components/CustomButton';
import firebase from 'react-native-firebase';
import BaseUrl from '../../Config'
import Header from '../../Components/NormalHeader'

function Service(props) {
    return (
        <View style={[styles.serviceContainer,{borderBottomWidth:1,borderColor:'rgba(0,0,0,0.3)'}]}>
            <View style={{ flex: 2 }}>
                <Text style={[styles.serviceNameText, { fontFamily: 'Montserrat-SemiBold' }]}>{props.serviceName}</Text>
                <Text style={styles.serviceNameText}>{props.serviceYear}</Text>
            </View>
            <View style={{ flex: 0.25,alignItems:'flex-end' }}>
                <CheckBox onClick={props.onChange} isChecked={props.Checked} />
            </View>
        </View>

    );
}


class ServiceSelection extends Component {
    constructor(props) {
        super(props)
        this.state = {
            check: {},
            serviceList: null,
            checkAll: false,
            uid: null,
            loading: true,
            selectedList: [],
            totalTime: 0,
        }

    }

    isEmpty = (list) => {
        let x;
        for (x in list) {
            if (list[x]) return false
        }
        return true
    }
    handleRequest = () => {
        const list = this.state.check
        if (!this.isEmpty(list)) {
            this.setState({ selectedList: [] });
            let totalTime = 0;
            for (const sId in this.state.check) {
                if (this.state.check[sId]) {
                    for (const service of this.state.serviceList) {
                        if (sId == service.serviceID) {
                            totalTime += parseInt(service.averageTime)
                        }
                    }
                    this.state.selectedList.push({ serviceID: sId })
                }
            }
            if (new Date().getTime() + totalTime * 60000 >= new Date(new Date().toLocaleDateString()).getTime()+61200000) {
                Alert.alert(
                    "Cannot request a driver",
                    "Service Station Closes At 5 PM",
                    [
                      { text: "OK", onPress: () => {} }
                    ],
                    { cancelable: false }
                  );
            }
            else {
                this.props.navigation.navigate("ScanDMV", { serviceList: this.state.selectedList })
            }
        }
        else {
            Alert.alert(
                "Please select services",
                "No services have selected",
                
                [
                  { text: "OK", onPress: () => {} }
                ],
                { cancelable: false }
              );}
    }

    checkBox_Test = (id) => {
        const checkCopy = { ...this.state.check }
        if (checkCopy[id]) {
            checkCopy[id] = false;
        }
        else {
            checkCopy[id] = true;

        }
        this.setState({ check: checkCopy });
    }
    CheckAll = () => {
        const checkCopy = { ...this.state.check }
        let x;
        for (x of this.state.serviceList) {
            if (this.state.checkAll) checkCopy[x.serviceID] = false;
            else checkCopy[x.serviceID] = true;
        }
        this.setState({ check: checkCopy });
        this.setState({ checkAll: !this.state.checkAll })
    }
    componentDidMount() {
        const user = firebase.auth().currentUser;
        this.setState({ uid: user });
        fetch(BaseUrl.Url + '/service')
            .then((res) => res.json())
            .then((resJson) => {
                this.setState({ serviceList: resJson, loading: false });
            }
            )
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={[color.lightGreen, color.lightBlue]} style={styles.container}>
                    <Header navigation={this.props.navigation} title="SELECT SERVICES" />
                    {
                        this.state.loading ?
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <ActivityIndicator size={30} color={color.primaryBlack} />
                            </View>
                            :
                            <>
                                <View style={styles.serviceListContainer}>
                                    <View style={styles.serviceContainer}>
                                        <View style={{ flex: 2 }}>
                                            <Text style={styles.selectAllText}>SELECT ALL</Text>
                                        </View>
                                        <View style={{ flex: 0.25,alignItems:'flex-end' }}>
                                            <CheckBox isChecked={this.state.checkAll} onClick={this.CheckAll} />
                                        </View>
                                    </View>
                                    <FlatList data={this.state.serviceList} renderItem={({ item }) => (<Service serviceName={item.serviceName} serviceYear={item.yearRange} Checked={this.state.check[item.serviceID]} onChange={() => this.checkBox_Test(item.serviceID)} />)} keyExtractor={item => item.serviceID} />
                                    <Ionicons name="ios-arrow-down" size={20} style={{ marginVertical: 5, alignSelf: 'center' }} />
                                </View>
                                <View style={styles.buttonContainer}><TouchableOpacity onPress={this.handleRequest.bind(this)}><GradientButton style={styles.button} title="NEXT" /></TouchableOpacity></View>
                            </>

                    }

                </LinearGradient>
            </SafeAreaView>
        );
    }
}
export default ServiceSelection;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'space-between'
    },
    headerTextContainer: {
        height: 100,
        backgroundColor: color.primaryWhite,
        width: '100%',
        marginBottom: 10,
        flexDirection: 'row',

        justifyContent: 'space-evenly',
        alignItems: 'center'

    },
    headerText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 25,
        letterSpacing: 2,
    },
    selectAllText: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 15,
        opacity: 0.8
    },
    serviceListContainer: {
        flex: 2,
        alignItems: 'stretch'

    },
    serviceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height:50,
        marginHorizontal: 30,
        

    },
    imageContainer: {
        width: 75,
        height: 75,
        backgroundColor: 'black'

    },
    serviceNameText: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 15,


    },

    buttonContainer: {
        marginVertical: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -3,
        },
        shadowOpacity: .5,
        shadowRadius: 8.30,
        elevation: 10,
        alignItems: 'center',


    },
    button: {
        marginVertical: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: .5,
        shadowRadius: 8.30,
        elevation: 5,
    },
});