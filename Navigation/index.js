import React from "react";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import InterfaceSelection from '../Screens/interfaceSelection';
import RegisterScreen1 from '../Screens/registrationScreen1';
import RegisterScreen2 from '../Screens/registrationScreen2';
import Login from '../Screens/login';

const Stack = createStackNavigator();
function NewUser() {
    return (
        <Stack.Navigator name="Registration" initialRouteName="InterfaceSelection" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="InterfaceSelection" component={InterfaceSelection} />
            <Stack.Screen name="RegisterScreen1" component={RegisterScreen1} />
            <Stack.Screen name="RegisterScreen2" component={RegisterScreen2} />
        </Stack.Navigator>

    );
}



function WelcomeScreen() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="NewUser" component={NewUser}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default WelcomeScreen;
