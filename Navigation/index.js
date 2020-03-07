import React, { useState, useEffect } from "react";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import firebase from 'react-native-firebase';


import InterfaceSelection from '../Screens/interfaceSelection';
import UserRegistration from '../Screens/User/UserRegistration';
import Login from '../Screens/login';
import Splash from '../Screens/splash';
import Home from '../Screens/User/HomeScreen';
import Notification from '../Screens/notificationScreen';
import HomeDrawerContent from '../Components/HomeDrawer';
import OdometerRead from '../Screens/User/takeImages';
import VideoCapture from '../Screens/User/VideoCapture';
import Profile from '../Screens/User/Profile';
import ContactUs from '../Screens/User/contactUs';
import ScanDMV from '../Screens/User/ScanDMV';
import DriverTrack from '../Screens/User/trackDriver';
import DriverProfile from '../Screens/User/DriverProfile';
import ServiceSelection from '../Screens/User/serviceSelection';
import Searching from "../Screens/User/Searching";
import DriverHomeScreen from '../Screens/Driver/DriverHome';
import DriverDriverProfile from '../Screens/Driver/DriverProfile';
import DriverVehicleProfile from '../Screens/Driver/VehicleProfile';
import DriverRequest from '../Screens/Driver/DriverRequest';
import DriverNavigation from '../Screens/Driver/DriverNavigation';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();



function NewUser() {
    return (
        <Stack.Navigator name="Registration" initialRouteName="InterfaceSelection" screenOptions={{ animationEnabled: false, headerShown: false }}>
            <Stack.Screen name="UserRegistration" component={UserRegistration} />
            <Stack.Screen name="Notification" component={Notification} />
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
            <Stack.Screen name="Tracking" component={DriverProfile} />
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
        </Stack.Navigator>
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
                fetch('https://smogbuddy-dev.herokuapp.com/user/' + user.uid)
                    .then((response) => response.json())
                    .then((responseJson) => {
                        setrole(responseJson.role);
                        setLoggedIn(true);
                        setappOpened(true);
                    })
                    .catch((e) => alert(e));

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
                                null
                }
            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default WelcomeScreen;
