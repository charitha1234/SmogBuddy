import React from "react";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import InterfaceSelection from '../Screens/interfaceSelection';
import RegisterScreen1 from '../Screens/registrationScreen1';
import RegisterScreen2 from '../Screens/registrationScreen2';
import Login from '../Screens/login';
import Splash from '../Screens/splash';
import User from '../Screens/userScreen';

const Stack = createStackNavigator();
function NewUser() {
    return (
        <Stack.Navigator name="Registration" initialRouteName="InterfaceSelection" screenOptions={{animationEnabled:false, headerShown: false }}>
            <Stack.Screen name="InterfaceSelection" component={InterfaceSelection} />
            <Stack.Screen name="RegisterScreen1" component={RegisterScreen1} />
            <Stack.Screen name="RegisterScreen2" component={RegisterScreen2} />
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
                <Stack.Screen name="User" component={User}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default WelcomeScreen;
