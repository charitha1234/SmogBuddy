import React from "react";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import InterfaceSelection from '../Screens/interfaceSelection';
import UserRegistration from '../Screens/UserRegistration';
import DriverRegistration from '../Screens/DriverRegistration';
import Login from '../Screens/login';
import Splash from '../Screens/splash';
import Home from '../Screens/HomeScreen';

const Stack = createStackNavigator();
function NewUser() {
    return (
        <Stack.Navigator name="Registration" initialRouteName="InterfaceSelection" screenOptions={{animationEnabled:false, headerShown: false }}>
            <Stack.Screen name="InterfaceSelection" component={InterfaceSelection} />
            <Stack.Screen name="UserRegistration" component={UserRegistration} />
            <Stack.Screen name="DriverRegistration" component={DriverRegistration} />
        </Stack.Navigator>

    );
}



function WelcomeScreen() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Splash" screenOptions={{animationEnabled:false, headerShown: false }}>
                <Stack.Screen name="Splash" component={Splash}/>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="NewUser" component={NewUser}/>
                <Stack.Screen name="Home" component={Home}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default WelcomeScreen;
