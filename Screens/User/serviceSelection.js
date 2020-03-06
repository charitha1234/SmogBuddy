import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    FlatList,

} from "react-native";
import CheckBox from '@react-native-community/checkbox';
import LinearGradient from 'react-native-linear-gradient';
import { color } from '../../Assets/color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GradientButton from '../../Components/CustomButton';
import firebase from 'react-native-firebase';

function Service(props) {
    return (
        <View style={styles.serviceContainer}>
            <View style={styles.imageContainer}>
            </View>
            <View style={styles.serviceTextContainer}>
                <Text style={styles.serviceNameText}>{props.serviceName}</Text>
                <Text style={styles.serviceNameText}>{props.serviceYear}</Text>
            </View>
            <CheckBox onChange={props.onChange} value={props.Checked} />
        </View>

    );
}


class ServiceSelection extends Component {
    constructor(props) {
        super(props)
        this.state = {
            check: {},
            serviceList:null,
            checkAll: false,
            uid:null,
            selectedList:[]
        }

    }
    handleRequest=()=>{
        this.setState({selectedList:[]});
        for (const sId in this.state.check) {
            if(this.state.check[sId]) this.state.selectedList.push({serviceID:sId})
        } 
        console.log("ServiceLISt",this.state.selectedList)
        this.props.navigation.navigate("ScanDMV",{serviceList:this.state.selectedList})
    }
    CheckAll = () => {
        this.setState({ checkAll:!this.state.checkAll })
    }
    checkBox_Test = (id) => {
        const checkCopy = { ...this.state.check }
        if (checkCopy[id]) {
            checkCopy[id] = false;
        }
        else{
            checkCopy[id] = true;
            
        }
        this.setState({ check: checkCopy });
    }
    componentDidMount(){
        const user=firebase.auth().currentUser;
        this.setState({uid:user});
        fetch('https://smogbuddy-dev.herokuapp.com/service')
        .then((res)=>res.json())
        .then((resJson)=>{
            this.setState({serviceList:resJson});
        }
            )
    }
    render() {
        return (
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={[color.lightGreen, color.lightBlue]} style={styles.container}>
                <SafeAreaView style={styles.container}>
                    <View style={styles.headerContainer}><Text style={styles.headerText}>SELECT SERVICES</Text></View>
                    <View style={styles.serviceListContainer}>
                        <View style={styles.serviceContainer}><Text style={styles.selectAllText}>SELECT ALL</Text><CheckBox value={this.state.checkAll} onChange={this.CheckAll} /></View>
                        <FlatList data={this.state.serviceList} renderItem={({ item }) => (<Service serviceName={item.serviceName} serviceYear={item.yearRange} Checked={this.state.check[item.serviceID]} onChange={() => this.checkBox_Test(item.serviceID)} />)} keyExtractor={item => item.serviceID} />

                    </View>
                    <TouchableOpacity onPress={this.handleRequest.bind(this)} style={styles.buttonContainer}><GradientButton style={styles.button} title="NEXT" /></TouchableOpacity>

                </SafeAreaView>
            </LinearGradient>
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
    headerContainer: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 30,
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
        margin: 10,
        marginHorizontal: 30,

    },
    imageContainer: {
        width: 75,
        height: 75,
        backgroundColor: 'black'

    },
    serviceNameText: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 15,
        opacity: 0.8


    },

    buttonContainer: {
        margin: 10,
        alignItems: 'flex-end',


    },
    button: {
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