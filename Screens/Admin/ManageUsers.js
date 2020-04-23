import React, { Component, useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList
} from "react-native";
import { color } from '../../Assets/color';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import UsersList from '../../data/Users';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SearchBar } from 'react-native-elements';
import Header from '../../Components/NormalHeader';
import BaseUrl from '../../Config'
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

function ManageUsers({ navigation }) {
    const [search, setsearch] = useState(null)
    const [data, setdata] = useState([])
    const [filteredList, setfilteredList] = useState([])
    const getApidata = (adjust) => {
        fetch(BaseUrl.Url+'/admin/users')
            .then((res) => res.json())
            .then((resJson) => {


                console.log("res", resJson)
                setdata(resJson)
            })
            .catch((e) => { })

    }

    useFocusEffect(
        React.useCallback(() => {
            getApidata()
        }, [])
    );
    useEffect(() => {
        if (search) {
            let user;
            let tempFilteredList = []
            for (user of data) {
                if (user.keyword.toLowerCase().includes(search.toLowerCase())) {
                    tempFilteredList.push(user)
                }
            }
            setfilteredList(tempFilteredList)
        }


    }, [search, data])


    const updateSearch = search => {
        setsearch(search)
    };


    return (
        <SafeAreaView style={styles.container}>
            <Header title="Manage Users" navigation={navigation} />
            <SearchBar
                placeholder="Type Here..."
                onChangeText={updateSearch}
                value={search}
                showCancel
                containerStyle={styles.SearchBarStyles}
                lightTheme
                inputContainerStyle={{ backgroundColor: color.primaryWhite }}
            />
            {search == "" ?
                <TouchableOpacity onPress={() => navigation.navigate("InterfaceSelection")} style={styles.AddUserContainer}><Text style={styles.AddUserText}>ADD USER</Text></TouchableOpacity>
                :
                <FlatList data={filteredList} renderItem={({ item }) => (<Users onPress={() => navigation.navigate(item.role == "CUSTOMER" ? "AdminUserProfile" : "EmployeeProfile", { userId: item.uid })} Fname={item.firstName} Lname={item.lastName} Role={item.role} />)} keyExtractor={item => item.UserId} />


            }

        </SafeAreaView>
    );

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
        height: 50,
        justifyContent: 'center',
        borderRadius: 25,
        alignSelf: 'center',
        backgroundColor: color.primaryBlue,
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