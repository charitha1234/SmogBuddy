import React from "react";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';


import InterfaceSelection from '../Screens/interfaceSelection';
import UserRegistration from '../Screens/UserRegistration';
import DriverRegistration from '../Screens/DriverRegistration';
import Login from '../Screens/login';
import Splash from '../Screens/splash';
import Home from '../Screens/HomeScreen';
import Notification from '../Screens/notificationScreen';
import HomeDrawerContent from '../Components/HomeDrawer';
import OdometerRead from '../Screens/odometerRead';
import VideoCapture from '../Screens/VideoCapture';
import Profile from '../Screens/Profile';
import ContactUs from '../Screens/contactUs';
import ScanDMV from '../Screens/ScanDMV';
import DriverTrack from '../Screens/trackDriver';
import DriverProfile from '../Screens/DriverProfile';
import ServiceSelection from '../Screens/serviceSelection';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
function NewUser() {
    return (
        <Stack.Navigator name="Registration" initialRouteName="InterfaceSelection" screenOptions={{ animationEnabled: false, headerShown: false }}>
            <Stack.Screen name="InterfaceSelection" component={InterfaceSelection} />
            <Stack.Screen name="UserRegistration" component={UserRegistration} />
            <Stack.Screen name="DriverRegistration" component={DriverRegistration} />
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
        </Stack.Navigator>

    );
}

function HomeScreen() {
    return (
        <Drawer.Navigator initialRouteName="Home" screenOptions={{ animationEnabled: false, headerShown: false}} drawerContent={props => <HomeDrawerContent {...props} />}>
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Profile" component={Profile} options={{gestureEnabled:false}} />
            <Drawer.Screen name="ContactUs" component={ContactUs} options={{gestureEnabled:false}} />
            <Drawer.Screen name="DriverTrack" component={DriverTrack} options={{gestureEnabled:false}} />
            <Drawer.Screen name="DriverProfile" component={DriverProfile} options={{gestureEnabled:false}} />
        </Drawer.Navigator>
    );
}
function MenuScreens() {
    return (
        <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{ animationEnabled: false, headerShown: false }}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="RequestProcess" component={RequestProcess} />
        </Stack.Navigator>
    );
}



function WelcomeScreen() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Splash" screenOptions={{ animationEnabled: false, headerShown: false }}>
                <Stack.Screen name="Splash" component={Splash} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="NewUser" component={NewUser} />
                <Stack.Screen name="MenuScreens" component={MenuScreens} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default WelcomeScreen;
