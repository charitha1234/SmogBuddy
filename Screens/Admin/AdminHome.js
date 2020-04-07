import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity
} from "react-native";
import Header from '../../Components/HeaderBarAdmin';
import { color } from '../../Assets/color';
import OngoingProcessList from '../../data/OngoingProcesses';

function OngoingProcesses(props) {
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

class AdminHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            processList: null,
            isFetching: false,
        }
    }

    getApiData() {

        fetch('https://smogbuddy.herokuapp.com/admin/process')
            .then((res) => res.json())
            .then((resJson) => {
                this.setState({ processList: resJson })
                this.setState({ isFetching: false });

            }

            )
    }
    onRefresh() {
        this.setState({ isFetching: true }, function () { this.getApiData() });
    }
    componentDidMount() {
        this.onRefresh()
    }

    render() {
        return (
            <View style={styles.container}>
                <Header title="SMOGBUDDY" navigation={this.props.navigation} />
                <View style={styles.HeaderTextContainer}><Text style={styles.HeaderText}>Ongoing Processes</Text></View>
                {
                    this.state.processList ?
                        <FlatList data={this.state.processList}
                            onRefresh={() => this.onRefresh()}
                            refreshing={this.state.isFetching}
                            renderItem={({ item }) => (<OngoingProcesses onPress={() => this.props.navigation.navigate("Process", { details: item })} status={item.status} fname={item.user.firstName} lname={item.user.lastName} time={item.totalServiceTime} />)} keyExtractor={item => item.UserId} />
                        :
                        <Text style={styles.processNameText}>No Ongoing Processes</Text>
                }

            </View>
        );
    }
}
export default AdminHome;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    HeaderTextContainer: {
        height: 100,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'

    },
    HeaderText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 25,
        letterSpacing: 2,
    },
    ProcessContainer: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
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