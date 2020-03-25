import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList
} from "react-native";
import { color } from '../../Assets/color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import UsersList from '../../data/Users';
import { SearchBar } from 'react-native-elements';

function Users(props) {
    return (
        <TouchableOpacity onPress={props.onPress} style={styles.UserContainer}>
            <View style={styles.statusContainer}>
                <Text style={styles.NameLabel}>NAME</Text>
                <Text style={styles.NameText}>{props.Fname} {props.Lname}</Text>
            </View>
            <View style={styles.RoleContainer}>
                <Text style={styles.RoleLabel}>ROLE</Text>
                <Text style={styles.RoleText}>{props.Role}</Text>
            </View>
        </TouchableOpacity>
    );
}

class ManageUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            searched:false
        };
    }

    search(){
        this.setState({searched:true})
    }

    updateSearch = search => {
        this.setState({ search:search,searched:false });
    };
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headerContainer}><TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.icon}><Ionicons name="ios-close" size={40} /></TouchableOpacity><Text style={styles.headerText}>MANAGE USERS</Text><View /></View>
                <SearchBar
                    placeholder="Type Here..."
                    onChangeText={this.updateSearch}
                    value={this.state.search}
                    showCancel
                    containerStyle={styles.SearchBarStyles}
                    lightTheme
                    inputContainerStyle={{ backgroundColor: color.primaryWhite }}
                />
                {this.state.search == "" ?
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("InterfaceSelection")} style={styles.AddUserContainer}><Text style={styles.AddUserText}>ADD USER</Text></TouchableOpacity>
                    :
                    <>  
                        
                        {
                            this.state.searched?
                            <FlatList data={UsersList} renderItem={({ item }) => (<Users onPress={() => this.props.navigation.navigate("EmployeeProfile")} Fname={item.UserFirstName} Lname={item.UserLastName} Role={item.Role} />)} keyExtractor={item => item.UserId} />
                            :
                            <TouchableOpacity onPress={()=>this.search()} style={styles.AddUserContainer}><Text style={styles.AddUserText}>SEARCH</Text></TouchableOpacity>
                        }
                        
                    </>
                }

            </View>
        );
    }
}
export default ManageUsers;

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
        marginTop: 30,
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
    RoleContainer: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    RoleLabel: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 20,
    },
    RoleText: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 15,
    },
    SearchBarStyles: {
        borderWidth: 0,
        backgroundColor: color.primaryWhite
    },
    AddUserContainer: {
        marginVertical: 30,
        width: 200,
        height:50,
        justifyContent:'center',
        borderRadius:25,
        alignSelf:'center',
        backgroundColor:color.primaryBlue,
        alignItems: 'center',
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
    AddUserText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 20,
        color: color.primaryWhite
    }


});