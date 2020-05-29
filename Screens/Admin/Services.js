import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList
} from "react-native";
import { color } from '../../Assets/color';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../../Components/TwoButtonHeader'
import BaseUrl from '../../Config'
function Service(props) {
    return (
        <TouchableOpacity onPress={props.onPress} style={styles.UserContainer}>
            <View style={styles.statusContainer}>
                <Text style={styles.NameLabel}>SERVICE NAME</Text>
                <Text style={styles.NameText}>{props.name}</Text>
            </View>
            <View style={styles.YearRangeContainer}>
                <Text style={styles.YearRangeLabel}>YEAR RANGE</Text>
                <Text style={styles.YearRangeText}>{props.yearRange}</Text>
            </View>
        </TouchableOpacity>
    );
}

class Services extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            serviceList: null,
            isFetching: false,
        };
    }

    getApiData() {
        fetch(BaseUrl.Url + '/service')
            .then((res) => res.json())
            .then((resJson) => {
                this.setState({ serviceList: resJson });
                this.setState({ isFetching: false });
            }

            )
    }
    onRefresh() {
        this.setState({ isFetching: true }, function () { this.getApiData() });
    }


    componentDidMount() {
        this.getApiData()
    }

    updateSearch = search => {
        this.setState({ search });
    };
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Header navigation={this.props.navigation} title="SERVICES" onPress={() => this.props.navigation.navigate("AddService")} icon="ios-add" />
                <FlatList data={this.state.serviceList}
                    style={styles.list}
                    onRefresh={() => this.onRefresh()}
                    refreshing={this.state.isFetching}
                    renderItem={({ item }) => (<Service onPress={() => this.props.navigation.navigate("ServiceInfo", { info: item })} name={item.serviceName} yearRange={item.yearRange} />)} keyExtractor={item => item.UserId} />

            </SafeAreaView>
        );
    }
}
export default Services;

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    list: {
        paddingHorizontal: 10
    },
    headerContainer: {
        height: 100,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 25,
        letterSpacing: 2,
    },
    icon: {
        marginRight: -20,
        marginLeft: 20
    },
    UserContainer: {
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 10,
        height: 100,
        width: '100%',
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
    NameText: {
        fontFamily: 'Montserrat-Light',
        fontSize: 15,

    },
    NameLabel: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 20,
        letterSpacing: 2,
    },
    statusContainer: {
        flex: 2,
        justifyContent: 'space-evenly',
        marginLeft: 10
    },
    YearRangeContainer: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    YearRangeLabel: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 15,
        marginRight: 5,
    },
    YearRangeText: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 15,
    },
    SearchBarStyles: {
        borderWidth: 0,
        backgroundColor: color.primaryWhite
    },
    AddUserContainer: {
        marginVertical: 30,
        width: '100%',
        alignItems: 'center',
    },
    AddUserText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 20,
        color: color.primaryBlue
    }


});