import React, { Component, useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Image,
    Dimensions
} from "react-native";
import { color } from '../../Assets/color';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import UsersList from '../../data/Users';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SearchBar } from 'react-native-elements';
import Modal from 'react-native-modal';
import Header from '../../Components/TwoButtonHeader';
import BaseUrl from '../../Config'
const windowWidth = Dimensions.get('window').width
function Users(props) {
    return (
        <TouchableOpacity onPress={props.onPress} style={styles.UserContainer}>
            {
                props.image ?
                    <Image style={{ width: 100, height: 100, borderTopLeftRadius: 30, borderBottomLeftRadius: 30 }} source={{ uri: props.image }} />
                    :
                    <View style={{ width: 100, height: 100, borderTopLeftRadius: 30, borderBottomLeftRadius: 30 }} />
            }

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
    const [isVisible, setisVisible] = useState(false)
    const [filterValue, setfilterValue] = useState("")
    const getApidata = (adjust) => {
        fetch(BaseUrl.Url + '/admin/users')
            .then((res) => res.json())
            .then((resJson) => {
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
                    if (filterValue) {
                        if(user.role==filterValue)tempFilteredList.push(user)
                    }
                    else {
                        tempFilteredList.push(user)
                    }
                }
            }
            setfilteredList(tempFilteredList)
        }
    }, [search, data,filterValue])


    const updateSearch = search => {
        setsearch(search)
    };


    return (
        <SafeAreaView style={styles.container}>
            <Header title="Manage Users" navigation={navigation} icon="ios-funnel" onPress={() => setisVisible(true)} />
            <SearchBar
                placeholder="Type Here..."
                onChangeText={updateSearch}
                value={search}
                showCancel
                containerStyle={styles.SearchBarStyles}
                lightTheme
                inputContainerStyle={{ backgroundColor: color.primaryWhite }}
            />
            {!search ?
                <TouchableOpacity onPress={() => navigation.navigate("InterfaceSelection")} style={styles.AddUserContainer}><Text style={styles.AddUserText}>ADD USER</Text></TouchableOpacity>
                :
                <FlatList data={filteredList} renderItem={({ item }) => (<Users onPress={() => navigation.navigate(item.role == "CUSTOMER" ? "AdminUserProfile" : "EmployeeProfile", { userId: item.uid })} Fname={item.firstName} Lname={item.lastName} Role={item.role} image={item.imageUrl} />)} keyExtractor={item => item.UserId} />


            }
            <Modal style={{ margin: 0 }} isVisible={isVisible} useNativeDriver={true} onBackdropPress={() => setisVisible(false)} onBackButtonPress={() => isVisible(false)} >

                <View style={{ position: 'absolute', bottom: 0, width: '100%' }}>
                    <View style={{ alignItems: 'flex-end', marginBottom: 10 }}>
                        <TouchableOpacity onPress={() => setisVisible(false)} style={{ marginRight: 20, backgroundColor: color.primaryWhite, height: 40, width: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                            <Ionicons name="ios-close" size={30} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ borderTopLeftRadius: 30, borderTopRightRadius: 30, backgroundColor: color.primaryWhite, width: '100%' }}>
                        <View style={{ margin: 20 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
                                <Text style={styles.NameLabel} >Filter</Text>
                                <TouchableOpacity onPress={() => {
                                    setfilterValue("")
                                    setisVisible(false)
                                }} style={{ height: 30, borderRadius: 15, backgroundColor: color.failedRed, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={[styles.NameLabel, { color: color.primaryWhite, marginHorizontal: 20 }]}>Clear</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
                                <TouchableOpacity onPress={() => setfilterValue("DRIVER")} style={[{ backgroundColor: color.primaryWhite, height: 40, borderRadius: 20, width: (windowWidth - 90) / 3, borderWidth: 1, justifyContent: 'center', alignItems: 'center' }, filterValue == "DRIVER" ? { borderColor: color.primaryBlue } : { borderColor: color.gray }]}>
                                    <Text style={[styles.NameText, { textAlign: 'center' }]}>Drivers</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setfilterValue("TECHNICIAN")} style={[{ backgroundColor: color.primaryWhite, height: 40, borderRadius: 20, width: (windowWidth - 90) / 3, borderWidth: 1, justifyContent: 'center', alignItems: 'center' }, filterValue == "TECHNICIAN" ? { borderColor: color.primaryBlue } : { borderColor: color.gray }]}>
                                    <Text style={[styles.NameText, { textAlign: 'center' }]}>Technicians</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setfilterValue("CUSTOMER")} style={[{ backgroundColor: color.primaryWhite, height: 40, borderRadius: 20, width: (windowWidth - 90) / 3, borderWidth: 1, justifyContent: 'center', alignItems: 'center' }, filterValue == "CUSTOMER" ? { borderColor: color.primaryBlue } : { borderColor: color.gray }]}>
                                    <Text style={[styles.NameText, { textAlign: 'center' }]}>Customers</Text>
                                </TouchableOpacity>
                            </View>


                        </View>
                    </View>
                </View>
            </Modal>

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
    logoText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 50,
        color: color.primaryWhite
    },
    UserContainer: {
        flexDirection: 'row',
        margin: 10,
        height: 100,
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
        fontSize: 12,

    },
    NameLabel: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 15,
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
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 15,
    },
    RoleText: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 10,
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
        backgroundColor: color.secondryBlue,
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