import React, { useState, useEffect } from "react";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import firebase from 'react-native-firebase';


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

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();



function NewUser() {
    return (
        <Stack.Navigator name="Registration" initialRouteName="UserRegistration_1" screenOptions={{ animationEnabled: false, headerShown: false }}>
            <Stack.Screen name="UserRegistration_1" component={UserRegistration_1} />
            <Stack.Screen name="UserRegistration_2" component={UserRegistration_2}/>
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
    return (
        <Drawer.Navigator initialRouteName="Home" screenOptions={{ animationEnabled: false, headerShown: false }} drawerContent={props => <HomeDrawerContent {...props} />}>
            <Drawer.Screen name="Home" component={Home} options={{ gestureEnabled: false }} />
            <Drawer.Screen name="Profile" component={Profile} options={{ gestureEnabled: false }} />
            <Drawer.Screen name="ContactUs" component={ContactUs} options={{ gestureEnabled: false }} />
            <Drawer.Screen name="DriverTrack" component={DriverTrack} options={{ gestureEnabled: false }} />
            <Drawer.Screen name="DriverProfile" component={DriverProfile} options={{ gestureEnabled: false }} />
        </Drawer.Navigator>
    );
}
function UserMenuScreens() {
    return (
        <Stack.Navigator initialRouteName="UserHomeScreen" screenOptions={{ animationEnabled: false, headerShown: false }}>
            <Stack.Screen name="UserHomeScreen" component={UserHomeScreen} />
            <Stack.Screen name="RequestProcess" component={RequestProcess} />
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
            <Stack.Screen name="DriverOdometer" component={DriverOdometer}/>
        </Stack.Navigator>
    );
}

function TechnicianScreens(){
    return(
        <Stack.Navigator initialRouteName="SmogTests" screenOptions={{ animationEnabled: false, headerShown: false }}>
            <Stack.Screen name="SmogTests" component ={SmogTests}/>
            <Stack.Screen name="TakeImages" component={TakeImages}/>
        </Stack.Navigator>
    )
}

function AdminMenu(){
return(
    <Stack.Navigator initialRouteName="AdminHome" screenOptions={{ animationEnabled: false, headerShown: false }}>
    <Stack.Screen name="AdminHome" component ={AdminHome}/>
    <Stack.Screen name="Process" component={Process} />
    <Stack.Screen name="TrackDriver" component={TrackDriver}/>
    </Stack.Navigator>
);
}




function AdminScreens() {
    return (
        <Drawer.Navigator initialRouteName="AdminMenu" screenOptions={{ animationEnabled: false, headerShown: false }} drawerContent={props => <AdminDrawerContent {...props} />}>
            <Drawer.Screen name="AdminMenu" component ={AdminMenu} options={{ gestureEnabled: false }} />
            <Drawer.Screen name="ShopProfile" component={ShopProfile} options={{ gestureEnabled: false }} />
            <Drawer.Screen name="AdminServices" component={AdminServices} options={{ gestureEnabled: false }}/>
            <Drawer.Screen name="ManageUsers" component={ManageUsers} options={{ gestureEnabled: false }} />
            <Drawer.Screen name="Sales" component={Sales} options={{ gestureEnabled: false }} />
            <Drawer.Screen name="Requests" component={Requests} options={{ gestureEnabled: false }} />
            <Drawer.Screen name="InterfaceSelection" component={InterfaceSelection} options={{ gestureEnabled: false }} />
            <Drawer.Screen name="EmployeeRegistration_1" component={EmployeeRegistration_1} options={{ gestureEnabled: false }}/>
        <Drawer.Screen name="EmployeeRegistration_2" component={EmployeeRegistration_2} options={{ gestureEnabled: false }}/>
        </Drawer.Navigator>
    );
}


function WelcomeScreen() {
    const [LoggedIn, setLoggedIn] = useState(false)
    const [appOpened, setappOpened] = useState(false)
    const [role, setrole] = useState(null)
    useEffect(() => {

        firebase.auth().onAuthStateChanged(user => {
            if (!user) {
                setLoggedIn(false);
                setappOpened(true);
            }
            else {
                console.log(user)
                fetch('https://smogbuddy-dev.herokuapp.com/user/' + user.uid)
                    .then((response) => response.json())
                    .then((responseJson) => {
                        console.log("RESPONSEJSONNAVIGATION",responseJson)
                        setrole(responseJson.role);
                        setLoggedIn(true);
                        setappOpened(true);
                    })
                    .catch((e) =>{
                        setappOpened(true);
                    });

            }

        });
    });
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
                                role == 'TECHNICIAN'?(
                                    <Stack.Screen name="TechnicianScreens" component={TechnicianScreens}/>
                                )
                                :role == 'ADMIN'?(
                                    <Stack.Screen name="AdminScreens" component={AdminScreens}/>
                                )
                                :null
                }
            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default WelcomeScreen;
