import React, { useState, useEffect } from "react";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import firebase from 'react-native-firebase';

import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import InterfaceSelection from '../Screens/Admin/interfaceSelection';
import UserRegistration_1 from '../Screens/User/UserRegistration_1';
import UserRegistration_2 from '../Screens/User/UserRegistration_2';
import Login from '../Screens/login';
import Splash from '../Screens/splash';
import AdminHome from '../Screens/Admin/AdminHome';
import Home from '../Screens/User/HomeScreen';
import HomeDrawerContent from '../Components/HomeDrawer';
import AdminDrawerContent from '../Components/AdminDrawer';
import TrackDriver from '../Screens/Admin/TrackDriver';
import Process from '../Screens/Admin/Process';
import ShopProfile from '../Screens/Admin/ShopProfile';
import ManageUsers from '../Screens/Admin/ManageUsers';
import Sales from '../Screens/Admin/Sales';
import Requests from '../Screens/Admin/Requests';
import AdminServices from '../Screens/Admin/Services';
import OdometerRead from '../Screens/User/takeImages';
import VideoCapture from '../Screens/User/VideoCapture';
import Profile from '../Screens/User/Profile';
import ContactUs from '../Screens/User/contactUs';
import ScanDMV from '../Screens/User/ScanDMV';
import DriverTrack from '../Screens/User/trackDriver';
import DriverProfile from '../Screens/User/DriverProfile';
import TakeImages from '../Screens/Technician/TakeImages';
import ServiceSelection from '../Screens/User/serviceSelection';
import Searching from "../Screens/User/Searching";
import DriverHomeScreen from '../Screens/Driver/DriverHome';
import DriverDriverProfile from '../Screens/Driver/DriverProfile';
import DriverVehicleProfile from '../Screens/Driver/VehicleProfile';
import DriverRequest from '../Screens/Driver/DriverRequest';
import DriverOdometer from '../Screens/Driver/DriverOdometer';
import DriverNavigation from '../Screens/Driver/DriverNavigation';
import SmogTests from '../Screens/Technician/SmogTests';
import EmployeeRegistration_1 from "../Screens/Admin/EmployeeRegistration_1";
import EmployeeRegistration_2 from "../Screens/Admin/EmployeeRegistration_2";
import EmployeeProfile from '../Screens/Admin/EmployeeProfile';
import AddService from '../Screens/Admin/AddServices';
import ServiceInfo from '../Screens/Admin/ServiceInfo';
import AssignEmployees from '../Screens/Admin/AssignEmployees';
import UserReview from '../Screens/User/UserReview';
import PreviousChecks from "../Screens/User/PreviousChecks";
import CheckDetails from "../Screens/User/CheckDetails";
import PaypalScreen from "../Screens/User/PaypalScreen";
import AsyncStorage from '@react-native-community/async-storage';
import PdfViewer from '../Screens/Admin/checkDetails';
import AdminUserProfile from '../Screens/Admin/UserProfile';
import Settings from '../Screens/Admin/Settings';
import BaseUrl from '../Config'
import { Platform } from 'react-native';
import { PERMISSIONS, request } from 'react-native-permissions';

request(
    Platform.select({
        android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    }),
);
request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then((result) => {
    console.log("RESPONSE RESULT", result)
    // …
});

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();



function NewUser() {
    return (
        <Stack.Navigator name="Registration" initialRouteName="UserRegistration_1" screenOptions={{ animationEnabled: false, headerShown: false }}>
            <Stack.Screen name="UserRegistration_1" component={UserRegistration_1} />
            <Stack.Screen name="UserRegistration_2" component={UserRegistration_2} />
        </Stack.Navigator>

    );
}



function RequestProcess() {
    return (
        <Stack.Navigator initialRouteName="ServiceSelection" screenOptions={{ animationEnabled: false, headerShown: false }}>
            <Stack.Screen name="ServiceSelection" component={ServiceSelection} />
            <Stack.Screen name="ScanDMV" component={ScanDMV} />
            <Stack.Screen name="OdometerRead" component={OdometerRead} />
            <Stack.Screen name="VideoCapture" component={VideoCapture} />
            <Stack.Screen name="Searching" component={Searching} />
        </Stack.Navigator>

    );
}

function UserHomeScreen() {
    const [currentState, setcurrentState] = useState(null)
    const [payable, setpayable] = useState(false)
    const user = firebase.auth().currentUser;
    useEffect(() => {

        fetch(BaseUrl.Url + '/user/assign/driver/' + user.uid)
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.isDriverAssigned) {
                    console.log("DRIVER", resJson.assignedDriver)
                    firebase.database().ref('location/' + resJson.assignedDriver + '/currentStage').on('value', snapshot => {
                        console.log("current state:", snapshot.val())
                        setcurrentState(snapshot.val())
                    })
                }
            }).catch((e) => { })



    }, [])
    useEffect(() => {
        if (currentState == 7) {
            console.log("CURRENT STAGE USERRRRRRRR", currentState)
            fetch(BaseUrl.Url + '/user/amount/' + user.uid)
                .then((res) => res.json())
                .then((resJson) => {
                    console.log("ISPAID>>", resJson)
                    if (!resJson.isPaid) setpayable(true)
                    else if (resJson.isPaid) setpayable(false)
                })
                .catch((e) => { })
        }
    }, [currentState])
    return (
        <Drawer.Navigator initialRouteName="Home" screenOptions={{ animationEnabled: false, headerShown: false }} drawerContent={props => <HomeDrawerContent {...props} />}>
            {
                payable ?
                    <Drawer.Screen name="PaypalScreen" component={PaypalScreen} options={{ gestureEnabled: false }} />
                    :
                    <>
                        <Drawer.Screen name="Home" component={Home} />
                        <Drawer.Screen name="Profile" component={Profile} options={{ gestureEnabled: false }} />
                        <Drawer.Screen name="ContactUs" component={ContactUs} options={{ gestureEnabled: false }} />
                        <Drawer.Screen name="DriverTrack" component={DriverTrack} options={{ gestureEnabled: false }} />
                        <Drawer.Screen name="DriverProfile" component={DriverProfile} options={{ gestureEnabled: false }} />
                        <Drawer.Screen name="UserReview" component={UserReview} options={{ gestureEnabled: false }} />
                    </>


            }




        </Drawer.Navigator>
    );
}
function UserMenuScreens() {
    return (
        <Stack.Navigator initialRouteName="UserHomeScreen" screenOptions={{ animationEnabled: false, headerShown: false }}>
            <Stack.Screen name="UserHomeScreen" component={UserHomeScreen} />
            <Stack.Screen name="RequestProcess" component={RequestProcess} />
            <Stack.Screen name="PreviousChecks" component={PreviousChecks} />
            <Stack.Screen name="CheckDetails" component={CheckDetails} />
        </Stack.Navigator>
    );
}

function DriverMenuScreens() {

    return (
        <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{ animationEnabled: false, headerShown: false }}>
            <Stack.Screen name="DriverHomeScreen" component={DriverHomeScreen} />
            <Stack.Screen name="DriverRequest" component={DriverRequest} />
            <Stack.Screen name="DriverDriverProfile" component={DriverDriverProfile} />
            <Stack.Screen name="DriverVehicleProfile" component={DriverVehicleProfile} />
            <Stack.Screen name="DriverOdometer" component={DriverOdometer} />
        </Stack.Navigator>
    );
}

function TechnicianScreens() {
    return (
        <Stack.Navigator initialRouteName="SmogTests" screenOptions={{ animationEnabled: false, headerShown: false }}>
            <Stack.Screen name="SmogTests" component={SmogTests} />
            <Stack.Screen name="TakeImages" component={TakeImages} />
        </Stack.Navigator>
    )
}

function AdminMenu() {
    return (
        <Stack.Navigator initialRouteName="AdminHome" screenOptions={{ animationEnabled: false, headerShown: false }}>
            <Stack.Screen name="AdminHome" component={AdminHome} />
            <Stack.Screen name="Process" component={Process} />
            <Stack.Screen name="TrackDriver" component={TrackDriver} />

        </Stack.Navigator>
    );
}
function ServicesStack() {
    return (
        <Stack.Navigator initialRouteName="AdminServices" screenOptions={{ animationEnabled: false, headerShown: false }}>
            <Stack.Screen name="AdminServices" component={AdminServices} />
            <Stack.Screen name="AddService" component={AddService} />
            <Stack.Screen name="ServiceInfo" component={ServiceInfo} />
        </Stack.Navigator>
    );
}

function ManageUsersStack({ route }) {
    return (
        <Stack.Navigator initialRouteName="ManageUsers" screenOptions={{ animationEnabled: false, headerShown: false }}>
            <Stack.Screen name="ManageUsers" component={ManageUsers} />
            <Stack.Screen name="InterfaceSelection" component={InterfaceSelection} />
            <Stack.Screen name="AdminUserProfile" component={AdminUserProfile} />
            <Stack.Screen name="EmployeeProfile" component={EmployeeProfile} />
            <Stack.Screen name="EmployeeRegistration_1" component={EmployeeRegistration_1} />
            <Stack.Screen name="EmployeeRegistration_2" component={EmployeeRegistration_2} />
        </Stack.Navigator>
    );
}

function RequestStack() {
    return (
        <Stack.Navigator initialRouteName="Requests" screenOptions={{ animationEnabled: false, headerShown: false }}>
            <Stack.Screen name="Requests" component={Requests} />
            <Stack.Screen name="AssignEmployees" component={AssignEmployees} />
        </Stack.Navigator>
    );
}



function AdminScreens() {
    return (
        <Drawer.Navigator initialRouteName="AdminMenu" screenOptions={{ animationEnabled: false, headerShown: false }} drawerContent={props => <AdminDrawerContent {...props} />}>
            <Drawer.Screen name="AdminMenu" component={AdminMenu} />
            <Drawer.Screen name="ShopProfile" component={ShopProfile} options={{ gestureEnabled: false }} />
            <Drawer.Screen name="Settings" component={Settings} options={{ gestureEnabled: false }} />
            <Drawer.Screen name="ServicesStack" component={ServicesStack} options={{ gestureEnabled: false }} />
            <Drawer.Screen name="ManageUsersStack" component={ManageUsersStack} options={{ gestureEnabled: false }} />
            <Drawer.Screen name="Sales" component={Sales} options={{ gestureEnabled: false }} />
            <Drawer.Screen name="RequestStack" component={RequestStack} options={{ gestureEnabled: false }} />
            <Drawer.Screen name="PdfViewer" component={PdfViewer} options={{ gestureEnabled: false }} />

        </Drawer.Navigator>
    );
}


function WelcomeScreen() {
    const [LoggedIn, setLoggedIn] = useState(false)
    const [appOpened, setappOpened] = useState(false)
    const [initializing, setinitializing] = useState(true)
    const [role, setrole] = useState(null)
    const setUid = async (user) => {
        console.log("SETUSER", user)
        try {
            await AsyncStorage.setItem('userId', user.uid)
        } catch (e) {
            alert("User is not Logged Properly")
        }
    }

    const datafetch = async (user) => {
        let fcmToken = await AsyncStorage.getItem('fcmToken');
        console.log("BASEURL", BaseUrl.Url)

        fetch(BaseUrl.Url + `/user/${user.uid}`)
            .then((response) => response.json())
            .then((Json) => {
                fetch(BaseUrl.Url + '/user/fcm/' + user.uid, {
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        fcm: fcmToken
                    }),
                })
                    .then((resJson) => {
                        if (resJson.status == 200) {
                            setrole(Json.role);
                            setUid(user)
                            setLoggedIn(true);
                            setappOpened(true);
                        }

                        else {
                            firebase.auth().signOut()
                            alert("FCM not sent")
                        }

                    })
                    .catch((e) => {
                        alert("Fuck error" + e)
                        firebase.auth().signOut();

                    })



            })
            .catch((e) => {
                console.log("INDEX ERROR", e)
                alert("Something has wrong")
                firebase.auth().signOut();
                setappOpened(true);
            });

    }

    useEffect(() => {
        Platform.OS == "android" ?
            RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({ interval: 10000, fastInterval: 5000 })
                .then(data => {

                    firebase.auth().onAuthStateChanged(user => {
                        console.log("Init", initializing)
                        if (!user) {
                            setLoggedIn(false);
                            setappOpened(true);

                        }
                        else {
                            console.log("ENABLE", data)
                            datafetch(user)
                        }


                    });
                }).catch(err => {

                }) : (
                firebase.auth().onAuthStateChanged(user => {
                    console.log("Init", initializing)
                    if (!user) {
                        setLoggedIn(false);
                        setappOpened(true);

                    }
                    else {
                        datafetch(user)
                    }


                })
            )

    }, []);







    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Splash" screenOptions={{ animationEnabled: false, headerShown: false }}>
                {
                    !appOpened ?
                        <Stack.Screen name="Splash" component={Splash} />
                        :
                        null
                }
                {
                    !LoggedIn ? (
                        <>
                            <Stack.Screen name="Login" component={Login} />
                            <Stack.Screen name="NewUser" component={NewUser} />
                        </>
                    ) :
                        role == 'CUSTOMER' ? (
                            <Stack.Screen name="UserMenuScreens" component={UserMenuScreens} />
                        )
                            :
                            role == 'DRIVER' ? (
                                <Stack.Screen name="DriverMenuScreens" component={DriverMenuScreens} />
                            )
                                :
                                role == 'TECHNICIAN' ? (
                                    <Stack.Screen name="TechnicianScreens" component={TechnicianScreens} />
                                )
                                    : role == 'ADMIN' ? (
                                        <Stack.Screen name="AdminScreens" component={AdminScreens} />
                                    )
                                        : null
                }
            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default WelcomeScreen;
