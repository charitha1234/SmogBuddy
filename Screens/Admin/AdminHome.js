import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity
} from "react-native";
import Header from '../../Components/HeaderBarAdmin';
import { color } from '../../Assets/color';
import { SafeAreaView } from 'react-native-safe-area-context';
import BaseUrl from '../../Config'

function OngoingProcesses(props) {
    return (
        <TouchableOpacity onPress={props.onPress} style={styles.ProcessContainer}>
            {
                props.image ?
                    <Image style={{ width: 100, height: 100, borderTopLeftRadius: 30, borderBottomLeftRadius: 30 }} source={{ uri: props.image }} />
                    :
                    <View style={{ width: 100, height: 100, borderTopLeftRadius: 30, borderBottomLeftRadius: 30 }} />
            }

            <View style={styles.statusContainer}>
                <Text numberOfLines={2} style={styles.processNameText}>{props.fname} {props.lname}</Text>
                <Text numberOfLines={2} style={styles.processStatusText}>{props.status}</Text>
            </View>
            <View style={styles.EstimatedTimeContainer}>
                <Text numberOfLines={2} style={styles.EstimatedTimelabel}>Estimated Time</Text>
                <Text numberOfLines={2} style={styles.EstimatedTimeText}>{props.time} min</Text>
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

        fetch(BaseUrl.Url + '/admin/process')
            .then((res) => res.json())
            .then((resJson) => {
                let tempres=resJson
                for( let i in tempres){
                    if(!tempres[i].user){
                        tempres.splice(i, 1)
                    }
                }
                this.setState({ processList: tempres })
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
            <SafeAreaView style={styles.container}>
                <Header title="SMOGBUDDY" navigation={this.props.navigation} />
                <View style={styles.HeaderTextContainer}><Text style={styles.HeaderText}>Ongoing Processes</Text></View>
                {
                    this.state.processList?.length != 0 ?
                        <FlatList data={this.state.processList}
                            onRefresh={() => this.onRefresh()}
                            refreshing={this.state.isFetching}
                            renderItem={({ item }) => (<OngoingProcesses onPress={() => this.props.navigation.navigate("Process", { details: item, onRefresh:this.onRefresh.bind(this) })} status={item.status} fname={item.user.firstName} lname={item.user.lastName} time={item.totalServiceTime} image={item.user.imageUrl} />)} keyExtractor={item => item.UserId} />
                        :
                        <Text style={styles.processNameText}>No Ongoing Processes</Text>
                }

            </SafeAreaView>
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
        marginHorizontal:5,
        justifyContent: 'center',
        backgroundColor: color.primaryWhite,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: .2,
        shadowRadius: 2.30,
        borderRadius: 30,
        elevation: 3,
    },
    processStatusText: {
        fontFamily: 'Montserrat-Light',
        fontSize: 10,

    },
    processNameText: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 15,
        textAlign:'center',
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
        marginRight: 5
    },
    EstimatedTimeText: {
        fontFamily: 'Montserrat-Regular',
        textAlign: 'center',
        fontSize: 15,
    },
    EstimatedTimelabel: {
        textAlign: 'center',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 12,
    }
});