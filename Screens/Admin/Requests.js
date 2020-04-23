import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity
} from "react-native";
import { color } from '../../Assets/color';
import { SafeAreaView } from 'react-native-safe-area-context';
import OngoingProcessList from '../../data/OngoingProcesses';
import Ionicons from 'react-native-vector-icons/Ionicons';
function Request(props) {
    return (
        <TouchableOpacity onPress={props.onPress} style={styles.ProcessContainer}>
            <View style={styles.statusContainer}>
    <Text style={styles.processNameText}>{props.fname} {props.lname}</Text>
                <Text style={styles.processStatusText}>{props.status}</Text>
            </View>
            <View style={styles.EstimatedTimeContainer}>
                <Text style={styles.EstimatedTimelabel}>Estimated Time</Text>
                <Text style={styles.EstimatedTimeText}>{props.time} min</Text>
            </View>
        </TouchableOpacity>
    );
}
class Requests extends Component {
    constructor(props){
        super(props);
        this.state={
            processList:null,
            isFetching: false,
        }
    }
    getApiData(){

        fetch('https://smogbuddy.herokuapp.com/admin/process')
        .then((res) => res.json())
        .then((resJson) => {
            this.setState({processList:resJson})
            this.setState({ isFetching: false });
            console.log("PROCESS LIST",resJson)
            
        }
        
    )
    }
    onRefresh() {
        this.setState({ isFetching: true }, function() { this.getApiData() });
     }
     componentDidMount(){
        this.onRefresh()
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
               <View style={styles.headerContainer}><TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.icon}><Ionicons name="ios-close" size={40} /></TouchableOpacity><Text style={styles.headerText}>REQUESTS</Text></View>
               <FlatList data={this.state.processList}
                onRefresh={() => this.onRefresh()}
                refreshing={this.state.isFetching} 
                renderItem={({ item }) => item.status=="PENDING"? (<Request onPress={()=>this.props.navigation.navigate("AssignEmployees",{details:item})} status={item.status} fname={item.user.firstName} lname={item.user.lastName} time={item.totalServiceTime} />):null} keyExtractor={item => item.UserId} />
            </SafeAreaView>
        );
    }
}
export default Requests;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
       height: 100,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 25,
        letterSpacing: 2,
    },
    icon: {
        height:50,
        width:50,
        marginRight:20,
        justifyContent:'center',
        alignItems:'center',

    },
    ProcessContainer: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom:10,
        height: 100,
        width: '100%',
        justifyContent: 'center',
        backgroundColor: color.primaryWhite,
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
    processStatusText: {
        fontFamily: 'Montserrat-Light',
        fontSize: 15,

    },
    processNameText: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 20,
        letterSpacing: 2,
    },
    statusContainer: {
        flex: 2,
        justifyContent: 'space-evenly',
        marginLeft: 10
    },
    EstimatedTimeContainer: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    EstimatedTimeText: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 20,
    },
    EstimatedTimelabel: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 15,
    }
});